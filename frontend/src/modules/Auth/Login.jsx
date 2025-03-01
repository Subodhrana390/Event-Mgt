import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService from "../../api/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/features/authSlice";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleOtpTimer = () => {
    setTimer(30);
    setIsResendDisabled(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendOtp = async () => {
    if (!isChecked) {
      toast.error("You must agree to the Terms & Conditions.");
      return;
    }

    setLoading(true);
    try {
      await AuthService.sendOtp(phone);
      setIsOtpSent(true);
      handleOtpTimer();
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      const res = await AuthService.verifyOtp(phone, otp);
      dispatch(setAuth(res.data));
      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-bold text-center">Login</h2>
        {!isOtpSent ? (
          <>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full mt-4"
            />
            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <span className="text-blue-500 cursor-pointer">
                  Terms & Conditions
                </span>
              </span>
            </div>
            <button
              onClick={sendOtp}
              className="btn btn-primary w-full mt-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered w-full mt-4"
            />
            <button
              onClick={verifyOtp}
              className="btn btn-success w-full mt-3"
              disabled={verifying}
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </button>
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-500 text-sm">
                {isResendDisabled
                  ? `Resend OTP in ${timer}s`
                  : "Didn't receive OTP?"}
              </span>
              <button
                onClick={sendOtp}
                className="btn btn-link btn-sm"
                disabled={isResendDisabled || loading}
              >
                Resend OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
