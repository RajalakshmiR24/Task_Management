import React from "react";

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
          className="w-full h-[46.3px] rounded-md bg-transparent border border-gray-400 px-3 text-zinc-200 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@domain.com"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-white mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength={8}
          autoComplete="off"
          className="w-full h-[46.3px] rounded-md bg-transparent border border-gray-400 px-3 text-zinc-200 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Min 8 characters"
        />
      </div>

      {showConfirmPassword && (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-white mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            minLength={8}
            autoComplete="off"
            className="w-full h-[46.3px] rounded-md bg-transparent border border-gray-400 px-3 text-zinc-200 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Min 8 characters"
          />
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
