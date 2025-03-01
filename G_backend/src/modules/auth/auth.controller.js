import { sendOTPFromTwilio } from "../../../Twillo/twillo.js";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError.js";
import { OtpModel } from "../../../Database/models/otp.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { UserModel } from "../../../Database/models/user.model.js";
import { TokenModel } from "../../../Database/models/token.model.js";

const sendOtp = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const otpRecord = await OtpModel.findOneAndUpdate(
    { phoneNumber },
    { $setOnInsert: { phoneNumber } },
    { new: true, upsert: true }
  );

  if (otpCode.length !== 6 || !otpCode) {
    throw new AppError(
      500,
      "Something went wrong while generating the OTP code"
    );
  }

  if (otpRecord.isBlocked) {
    const now = new Date();
    if (now < otpRecord.blockedUntil) {
      const remainingTime = Math.ceil(
        (otpRecord.blockedUntil - now) / (1000 * 60)
      );
      throw new AppError(
        429,
        `Too many attempts. Please try again after ${remainingTime} minutes.`
      );
    } else {
      otpRecord.isBlocked = false;
      otpRecord.blockedUntil = null;
      otpRecord.attempts = 0;
    }
  }

  if (otpRecord.attempts >= 3) {
    otpRecord.isBlocked = true;
    otpRecord.blockedUntil = new Date(Date.now() + 10 * 60 * 1000);
    await otpRecord.save();
    throw new AppError(429, "Too many attempts. Try again in 10 minutes.");
  }

  otpRecord.code = otpCode;
  otpRecord.expiresAt = expiresAt;
  otpRecord.attempts = (otpRecord.attempts || 0) + 1;
  await otpRecord.save();

  // try {
  //   await sendOTPFromTwilio(phoneNumber, otpCode);
  // } catch (error) {
  //   throw new AppError(500, "Failed to send OTP");
  // }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { phoneNumber, otp } = req.body;
  let otpDoc = await OtpModel.findOne({ phoneNumber });
  if (!otpDoc) {
    throw new AppError(400, "OTP record does not exist");
  }

  if (otpDoc.expiresAt < new Date()) {
    await otpDoc.deleteOne();
    throw new AppError(400, "OTP has expired");
  }

  if (otpDoc.code !== otp) {
    throw new AppError(400, "Invalid OTP");
  }

  await otpDoc.deleteOne();

  let user = await UserModel.findOne({ phoneNumber });
  let isNewUser = user ? false : true;
  if (!user) user = await UserModel.create({ phoneNumber });

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRE_IN,
      algorithm: "HS512",
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRE_IN,
      algorithm: "HS512",
    }
  );
  await TokenModel.findOneAndUpdate(
    { user: user._id },
    {
      token: refreshToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    {
      upsert: true,
      new: true,
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        accessToken,
        refreshToken,
        role: user.role,
        isNewUser,
      },
      "OTP verified successfully"
    )
  );
});

const refreshTokenRotation = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const token = await TokenModel.findOne({ token: refreshToken });

  if (!token || token.blacklisted || token.expires < Date.now()) {
    throw new AppError(401, "Invalid or expired token");
  }

  if (!refreshToken) {
    throw new AppError(403, "Invalid refresh token");
  }

  let decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const user = await UserModel.findById(decoded.id);
  if (!user) throw new AppError(404, "User not found");

  const newAccessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRE_IN,
      algorithm: "HS512",
    }
  );
  const newRefreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRE_IN,
      algorithm: "HS512",
    }
  );

  await TokenModel.findOneAndUpdate(
    { user: user._id },
    {
      token: refreshToken,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    {
      upsert: true,
      new: true,
    }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken: newAccessToken, refreshToken: newRefreshToken },
        "Access token refreshed successfully"
      )
    );
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, "Refresh token is required");
  }

  const userId = req.user.id;
  let user = await UserModel.findById(userId);
  if (!user) throw new AppError(404, "User not found");

  await TokenModel.findOneAndUpdate(
    { token: refreshToken },
    { blacklisted: true },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});

const protectedRoutes = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(401, "Token was not provided!"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new AppError(401, "Invalid token format!"));
  }

  try {
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return next(new AppError(404, "User not found!"));
    }

    // Check if the password has been changed after the token was issued
    if (user.passwordChangedAt) {
      const passwordChangedAt = parseInt(user.passwordChangedAt.getTime() / 1000);
      if (passwordChangedAt > decoded.iat) {
        return next(
          new AppError(401, "Token is no longer valid. Please log in again!")
        );
      }
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(new AppError(401, "Invalid token!"));
    } else if (err.name === "TokenExpiredError") {
      return next(new AppError(401, "Token has expired! Please log in again."));
    } else {
      return next(new AppError(500, "Something went wrong with token verification"));
    }
  }
});


const allowedTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          401,
          `You are not authorized to access this route. Your role is ${req.user.role}`
        )
      );
    }
    next();
  });
};

export {
  sendOtp,
  verifyOtp,
  refreshTokenRotation,
  logout,
  protectedRoutes,
  allowedTo,
};
