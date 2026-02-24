import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout, TrendingUp, Globe, Shield, ArrowRight, Users, Package, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Landing.css';

const Landing = () => {
  const features = [
    {
      icon: <Sprout size={40} />,
      title: 'Empower Farmers',
      description: 'Help farmers transform raw crops into high-value products and reach global markets.'
    },
    {
      icon: <Globe size={40} />,
      title: 'Global Marketplace',
      description: 'Connect with buyers worldwide and expand your business beyond local boundaries.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Grow Revenue',
      description: 'Increase profits by selling value-added products with better margins.'
    },
    {
      icon: <Shield size={40} />,
      title: 'Secure Platform',
      description: 'Safe and transparent transactions with built-in buyer protection.'
    }
  ];

  const stats = [
    { icon: <Users size={32} />, value: '5,000+', label: 'Active Farmers' },
    { icon: <Package size={32} />, value: '15,000+', label: 'Products Listed' },
    { icon: <Globe size={32} />, value: '50+', label: 'Countries Reached' },
    { icon: <Award size={32} />, value: '₹20L+', label: 'Revenue Generated' }
  ];

  return (
    <div className="landing">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1>Empowering Farmers Through <span className="highlight">Value-Added Products</span></h1>
              <p>Transform your crops into premium products and connect with global buyers. Join the rural entrepreneurship revolution.</p>
              
              <div className="hero-buttons">
                <Link to="/login" className="btn btn-primary btn-lg">
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  Browse Products
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="hero-image"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80" alt="Farmer" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose FarmConnect?</h2>
            <p>A platform designed to support rural entrepreneurship and sustainable agriculture</p>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Transform Your Farm Business?</h2>
            <p>Join thousands of farmers already growing their income through value-added products</p>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Start Your Journey <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="logo">
                <Sprout size={32} />
                <span>FarmConnect</span>
              </div>
              <p>Empowering rural entrepreneurship through technology</p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Platform</h4>
                <Link to="/products">Products</Link>
                <Link to="/about">About Us</Link>
              </div>
              <div>
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 FarmConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
