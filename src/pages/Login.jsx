import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Sprout, User, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      const result = register({ email, password, name, role, phone, location });
      if (result.success) {
        setIsRegister(false);
        setEmail('');
        setPassword('');
        setName('');
        setPhone('');
        setLocation('');
        alert('Registration successful! Please login with your credentials.');
      } else {
        setError(result.error);
      }
    } else {
      const result = login(email, password);
      if (result.success) {
        const { role } = result.user;
        switch (role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'farmer':
            navigate('/farmer');
            break;
          case 'buyer':
            navigate('/buyer');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(result.error);
      }
    }
    
    setLoading(false);
  };

  const demoAccounts = [
    { role: 'Admin', email: 'rajesh.admin@farmconnect.com', password: 'admin123' },
    { role: 'Farmer', email: 'priya.farmer@farmconnect.com', password: 'farmer123' },
    { role: 'Buyer', email: 'neha.buyer@farmconnect.com', password: 'buyer123' }
  ];

  const quickLogin = (email, password) => {
    setEmail(email);
    setPassword(password);
    setIsRegister(false);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div 
          className="login-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="logo">
            <Sprout size={40} />
            <span>FarmConnect</span>
          </Link>
          <h1>Welcome {isRegister ? '' : 'Back'}!</h1>
          <p>{isRegister ? 'Create an account to start your journey' : 'Login to access your dashboard and manage your agricultural business'}</p>
          <img src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80" alt="Farm" />
        </motion.div>

        <motion.div 
          className="login-right"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="login-form-container">
            <h2>{isRegister ? 'Create Account' : 'Sign In'}</h2>
            <p className="subtitle">{isRegister ? 'Register to get started' : 'Enter your credentials to continue'}</p>

            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <>
                  <div className="form-group">
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <User size={20} />
                      <input
                        type="text"
                        className="input"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Role</label>
                    <select className="input" value={role} onChange={(e) => setRole(e.target.value)} required>
                      <option value="buyer">Buyer</option>
                      <option value="farmer">Farmer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Phone</label>
                    <div className="input-wrapper">
                      <Phone size={20} />
                      <input
                        type="tel"
                        className="input"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <div className="input-wrapper">
                      <MapPin size={20} />
                      <input
                        type="text"
                        className="input"
                        placeholder="City, State"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} />
                  <input
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                ) : (
                  <>
                    <LogIn size={20} />
                    {isRegister ? 'Register' : 'Sign In'}
                  </>
                )}
              </motion.button>
            </form>

            <div className="toggle-form">
              <p>
                {isRegister ? 'Already have an account?' : "Don't have an account?"}
                <button onClick={() => { setIsRegister(!isRegister); setError(''); }}>
                  {isRegister ? 'Sign In' : 'Register'}
                </button>
              </p>
            </div>

            {!isRegister && (
              <div className="demo-accounts">
                <p className="demo-title">Demo Accounts (Click to auto-fill):</p>
                <div className="demo-grid">
                  {demoAccounts.map((account, index) => (
                    <motion.button
                      key={index}
                      className="demo-btn"
                      onClick={() => quickLogin(account.email, account.password)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <strong>{account.role}</strong>
                      <span>{account.email}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div className="login-footer">
              <Link to="/">← Back to Home</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
