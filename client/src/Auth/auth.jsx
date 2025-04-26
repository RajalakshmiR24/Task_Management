import React, { useState } from 'react';
import logo from '../assets/lemonpay.png';
import AuthForm from '../Components/Form';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Signing up with:', formData);
    } else {
      console.log('Signing in with:', formData);
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ email: '', password: '', confirmPassword: '' });
  };

  return (
<div className="flex min-h-screen bg-gradient-to-br from-white to-blue-800">
  <div className="w-1/2 p-8 flex flex-col">
    <img src={logo} alt="Lemonpay" className="w-[329px] h-[102px]" />

    <div className="flex flex-col justify-center flex-grow">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Join 8 Million Businesses <br />
        <span className="text-yellow-400">Powering Growth with</span> Lemonpay!
      </h1>
    </div>
  </div>

  <div className="w-1/2 flex items-center justify-center p-10">
  <div className="w-full max-w-[378px] bg-transparent">
  <div className="mb-6">
    <h2 className="text-3xl font-bold text-white">
      {isSignUp ? 'Welcome Sign Up System' : 'Welcome Login System'}
    </h2>
    <p className="text-white mt-1">
      Your gateway to seamless transactions and easy payments.
    </p>
  </div>
  
  <AuthForm
    type={isSignUp ? 'signUp' : 'signIn'}
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
