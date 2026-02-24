import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, LogOut, User, ShoppingCart, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin': return '/admin';
      case 'farmer': return '/farmer';
      case 'buyer': return '/buyer';
      default: return '/';
    }
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
            <Sprout size={32} />
            <span>FarmConnect</span>
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
            
            {user ? (
              <>
                <Link to={getDashboardLink()} className="nav-btn" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="nav-btn logout-btn">
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-btn" onClick={() => setMobileMenuOpen(false)}>
                <User size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
