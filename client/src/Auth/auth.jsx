import React, { useState } from "react";
import logo from "../assets/lemonpay.png";
import AuthForm from "../Components/Form";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Signing up with:", formData);
    } else {
      console.log("Signing in with:", formData);
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-[linear-gradient(to_top_left,#4444A3_5%,white_90%)] overflow-hidden pt-16 sm:pt-8">
      {/* Yellow Circles */}
      <div className="absolute w-[250px] h-[250px] bg-[#FDBC31] rounded-full top-[-40px] right-[-140px] opacity-15 z-0 md:right-[-140px] md:top-[-1px] sm:right-[-20px] sm:top-[10px]"></div>
      <div className="absolute w-[200px] h-[200px] bg-[#FDBC31] rounded-full bottom-[-90px] left-[-70px] opacity-15 z-0 sm:left-[-40px]"></div>
      <div className="absolute w-[300px] h-[300px] bg-[#FDBC31] rounded-full bottom-[-150px] right-[40%] opacity-20 hidden md:block z-0"></div>

      {/* Left Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <img
          src={logo}
          alt="Lemonpay"
          className="w-[200px] md:w-[329px] h-auto md:h-[102px] mx-auto md:mx-0"
        />
        <div className="flex flex-col justify-end flex-grow mt-8 md:mt-0">
          <h1 className="text-3xl md:text-4xl font-bold mb-10 md:mb-24 text-white hidden md:block">
            Join 8 Million Businesses <br />
            <span className="text-yellow-400">Powering Growth with</span>{" "}
            Lemonpay!
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 md:p-10 z-10">
        <div className="w-full max-w-[378px] bg-transparent">
          <div className="mb-6">
            <h2 className="text-3xl md:text-3xl font-semibold text-white">
              {isSignUp ? "Welcome Sign Up System" : "Welcome Login System"}
            </h2>
            <p className="text-white mt-1 text-2xl font-thin md:text-2xl">
              Your gateway to seamless transactions and easy payments.
            </p>
          </div>

          <AuthForm
            type={isSignUp ? "signUp" : "signIn"}
            email={formData.email}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={handleChange}
            onSubmit={handleSubmit}
            showConfirmPassword={isSignUp}
            toggleMode={toggleMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
