import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  // for storing email //
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="text-white w-full flex justify-center  items-center ">
      {loading ? (
        <div >Loading....</div>
      ) : (
        <div>
          <div>{!emailSent ? "Reset Your Password" : "Check Your Email"}</div>
          <p>
            {!emailSent
              ? "Have no fear, we'll email you instructions to reset your password. If you dont't have access to your email we can try account recovery"
              : ` we have sent the reset email to your ${email}`}
          </p>
          <form>
            {!emailSent && (
              <div>
                <label>
                  <p>Email Address</p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                  />
                </label>
                <button>
                  {!emailSent ? "Reset password" : "Resend email"}
                </button>
                <div>
                  <Link to="/login">
                    <p>Back to login</p>
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;