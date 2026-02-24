import { motion } from 'framer-motion';
import { Target, Users, Globe, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import './About.css';

const About = () => {
  const values = [
    {
      icon: <Target size={40} />,
      title: 'Our Mission',
      description: 'Empower farmers to create sustainable value-added products and connect with global markets.'
    },
    {
      icon: <Users size={40} />,
      title: 'Community First',
      description: 'Building a supportive community that promotes rural entrepreneurship and collaboration.'
    },
    {
      icon: <Globe size={40} />,
      title: 'Global Reach',
      description: 'Connecting local farmers with international buyers to expand market opportunities.'
    },
    {
      icon: <Award size={40} />,
      title: 'Quality Assured',
      description: 'Ensuring high standards for all products through rigorous quality control processes.'
    }
  ];

  return (
    <div className="about-page">
      <Navbar />
      
      <div className="about-hero">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>About FarmConnect</h1>
            <p>Transforming agriculture through technology and entrepreneurship</p>
          </motion.div>
        </div>
      </div>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Empowering Rural Communities</h2>
              <p>
                FarmConnect is a revolutionary platform designed to support farmers in creating value-added 
                agricultural products and connecting them with buyers worldwide. We believe in the power of 
                rural entrepreneurship to transform lives and communities.
              </p>
              <p>
                Our platform provides farmers with the tools, resources, and market access they need to 
                succeed in the modern agricultural economy. From organic honey to handcrafted goods, we 
                help farmers showcase their products to a global audience.
              </p>
            </motion.div>

            <motion.div
              className="about-image"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80" alt="Farming" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
