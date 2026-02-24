import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Package, TrendingUp, IndianRupee, CheckCircle, XCircle, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import { users } from '../data/users';
import { products } from '../data/products';
import { orders } from '../data/orders';
import './Dashboard.css';

const AdminDashboard = () => {
  const [productList, setProductList] = useState(products);
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    { icon: <Users size={32} />, label: 'Total Users', value: users.length, color: '#3b82f6' },
    { icon: <Package size={32} />, label: 'Total Products', value: products.length, color: '#16a34a' },
    { icon: <TrendingUp size={32} />, label: 'Total Orders', value: orders.length, color: '#f59e0b' },
    { icon: <IndianRupee size={32} />, label: 'Revenue', value: '₹' + orders.reduce((sum, o) => sum + o.total, 0).toFixed(0), color: '#8b5cf6' }
  ];

  const handleApprove = (productId) => {
    setProductList(productList.map(p => 
      p.id === productId ? { ...p, status: 'approved' } : p
    ));
  };

  const handleReject = (productId) => {
    setProductList(productList.map(p => 
      p.id === productId ? { ...p, status: 'rejected' } : p
    ));
  };

  const pendingProducts = productList.filter(p => p.status === 'pending');
  const farmers = users.filter(u => u.role === 'farmer');
  const buyers = users.filter(u => u.role === 'buyer');

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <motion.div 
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1>Admin Dashboard</h1>
          <p>Manage platform users, products, and analytics</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab ${selectedTab === 'overview' ? 'active' : ''}`}
            onClick={() => setSelectedTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${selectedTab === 'products' ? 'active' : ''}`}
            onClick={() => setSelectedTab('products')}
          >
            Product Approvals ({pendingProducts.length})
          </button>
          <button 
            className={`tab ${selectedTab === 'users' ? 'active' : ''}`}
            onClick={() => setSelectedTab('users')}
          >
            Users
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {selectedTab === 'overview' && (
            <div className="overview-grid">
              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>Recent Orders</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Buyer</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.buyerName}</td>
                          <td>₹{order.total}</td>
                          <td><span className={`badge badge-${order.status === 'delivered' ? 'success' : 'warning'}`}>{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {selectedTab === 'products' && (
            <motion.div 
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Pending Product Approvals</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Farmer</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                            <strong>{product.name}</strong>
                          </div>
                        </td>
                        <td>{product.farmerName}</td>
                        <td>{product.category}</td>
                        <td>₹{product.price}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <motion.button 
                              className="btn-icon btn-success"
                              onClick={() => handleApprove(product.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CheckCircle size={18} />
                            </motion.button>
                            <motion.button 
                              className="btn-icon btn-danger"
                              onClick={() => handleReject(product.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <XCircle size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pendingProducts.length === 0 && (
                  <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray)' }}>No pending products</p>
                )}
              </div>
            </motion.div>
          )}

          {selectedTab === 'users' && (
            <div className="users-grid">
              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>Farmers ({farmers.length})</h3>
                <div className="user-list">
                  {farmers.map(farmer => (
                    <div key={farmer.id} className="user-item">
                      <img src={farmer.avatar} alt={farmer.name} />
                      <div className="user-info">
                        <strong>{farmer.name}</strong>
                        <span>{farmer.email}</span>
                      </div>
                      <span className="badge badge-success">{farmer.totalProducts} products</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3>Buyers ({buyers.length})</h3>
                <div className="user-list">
                  {buyers.map(buyer => (
                    <div key={buyer.id} className="user-item">
                      <img src={buyer.avatar} alt={buyer.name} />
                      <div className="user-info">
                        <strong>{buyer.name}</strong>
                        <span>{buyer.email}</span>
                      </div>
                      <span className="badge badge-info">{buyer.totalOrders} orders</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
