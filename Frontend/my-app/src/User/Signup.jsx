import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (signupSuccess) setShowPopup(true);
  }, [signupSuccess]);

  const validate = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email';
    if (!form.phone.match(/^\d{10}$/)) errors.phone = 'Phone must be 10 digits';
    if (form.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!agreeToTerms) errors.terms = 'You must agree to the Terms & Conditions and Privacy Policy';
    return errors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitted(true);
      return;
    }
    const result = await dispatch(signupUser(form));
    if (!result.error) setSignupSuccess(true);
    setSubmitted(true);
  };

  const handlePopupOk = () => {
    setShowPopup(false);
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-teal-50 to-white px-4">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Signup Successful!</h3>
            <p className="mb-6">Your account has been created. You are now signed in.</p>
            <button onClick={handlePopupOk} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition">OK</button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Sign Up</h2>
        {error && submitted && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Enter your name" className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 ${formErrors.name ? 'border-red-500' : ''}`} />
          {formErrors.name && <div className="text-red-500 text-sm mt-1">{formErrors.name}</div>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 ${formErrors.email ? 'border-red-500' : ''}`} />
          {formErrors.email && <div className="text-red-500 text-sm mt-1">{formErrors.email}</div>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required placeholder="Enter your phone (10 digits)" className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 ${formErrors.phone ? 'border-red-500' : ''}`} />
          {formErrors.phone && <div className="text-red-500 text-sm mt-1">{formErrors.phone}</div>}
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required placeholder="Enter your password" className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 pr-10 ${formErrors.password ? 'border-red-500' : ''}`} />
            <button type="button" tabIndex={-1} className="absolute right-2 top-2 text-gray-500" onClick={() => setShowPassword(v => !v)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formErrors.password && <div className="text-red-500 text-sm mt-1">{formErrors.password}</div>}
        </div>
        <div className="mb-6">
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{' '}
              <Link to="/terms" className="text-purple-600 hover:underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>
          {formErrors.terms && <div className="text-red-500 text-sm mt-1">{formErrors.terms}</div>}
        </div>
        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div className="text-center mt-4 text-sm">
          Already have an account? <Link to="/signin" className="text-teal-600 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
