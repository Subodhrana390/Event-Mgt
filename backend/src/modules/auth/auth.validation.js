import Joi from "joi";

const sentOTPValidation = Joi.object({
  phoneNumber: Joi.string().required(),
});

const verifyOTPValidation = Joi.object({
  phoneNumber: Joi.string().required(),
  otp: Joi.string().required().required(),
});
const refreshTokenValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

const logoutValidation = Joi.object({
  refreshToken: Joi.string().required(),
});

export {
  sentOTPValidation,
  verifyOTPValidation,
  refreshTokenValidation,
  logoutValidation,
};
