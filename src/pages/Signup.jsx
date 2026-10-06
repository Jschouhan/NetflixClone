import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../utils/AuthContext';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous errors
    setEmailError('');
    setPasswordError('');
    setFormError('');

    // Check if email is empty or not in valid format
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Check if password is empty or less than 6 characters
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      await signUp(email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
      setFormError(
        error.message || 'Sign up failed. Please check your Firebase configuration.'
      );
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt=""
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              {formError && <p className="p-3 bg-red-600 my-2">{formError}</p>}
              <form
                className="w-full flex flex-col py-4"
                onSubmit={handleSubmit}
              >
                {/* Email input */}
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                />
                {/* Email error message */}
                {emailError && <p className="text-red-600">{emailError}</p>}

                {/* Password input */}
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                {/* Password error message */}
                {passwordError && (
                  <p className="text-red-600">{passwordError}</p>
                )}

                {/* Sign up button */}
                <button className="bg-red-600 py-3 my-6 rounded font-bold hover:bg-red-700">
                  Sign Up
                </button>

                {/* Remember me checkbox */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  {/* Need Help? link */}
                  <p className="cursor-pointer">Need Help?</p>
                </div>

                {/* Sign in link */}
                <p className="py-8">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>{' '}
                  <Link to="/login" className="font-bold text-xl text-red-600">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
