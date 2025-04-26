import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthForm = ({
  type,
  email,
  password,
  confirmPassword,
  onChange,
  onSubmit,
  showConfirmPassword,
  toggleMode,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const focusShadow =
  "focus:shadow-md focus:shadow-yellow-400/90 focus:outline-none ";


  const inputClasses =
    "w-full h-[46.3px] rounded-md bg-white bg-opacity-20 border border-[#E4E4E7] px-3 text-white placeholder-white focus:outline-none";

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 max-w-[378px] w-full mx-auto"
      autoComplete="off"
    >
      <div className="flex flex-col">
        <label className="text-sm font-medium text-white mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          autoComplete="off"
          className={`${inputClasses} ${focusShadow}`}
          placeholder="example@domain.com"
        />
      </div>

      <div className="flex flex-col relative">
        <label className="text-sm font-medium text-white mb-1">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength={8}
          autoComplete="off"
          className={`${inputClasses} ${focusShadow}`}
          placeholder="Min 8 characters"
        />
        {password && (
          <div
            className="absolute right-3 top-[38px] cursor-pointer text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        )}
      </div>

      {showConfirmPassword && (
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-white mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength={8}
            autoComplete="off"
            className={`${inputClasses} ${focusShadow}`}
            placeholder="Min 8 characters"
          />
          {confirmPassword && (
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-white"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 bg-transparent appearance-none border border-white checked:bg-white checked:border-white"
          />
          <label className="text-sm text-white">Remember me</label>
        </div>

        <button
          type="button"
          onClick={toggleMode}
          className="text-sm font-semibold text-white hover:underline"
        >
          {type === "signIn" ? "Sign Up" : "Sign In"}
        </button>
      </div>

      <button
        type="submit"
        className="mt-4 w-full h-[46.3px] rounded-md bg-white font-semibold text-black hover:bg-gray-200 transition"
      >
        {type === "signIn" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default AuthForm;
