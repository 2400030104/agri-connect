import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, IndianRupee, TrendingUp, Plus, Edit, Trash2, Eye, MessageSquare, ShoppingBag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Navbar from '../components/Navbar';
import { products } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [myProducts, setMyProducts] = useState(products.filter(p => p.farmerId === user.id));
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedTab, setSelectedTab] = useState('products');

  const [buyerInteractions, setBuyerInteractions] = useState([
    { id: 1, buyer: 'Neha Buyer', email: 'neha.buyer@farmconnect.com', product: 'Organic Honey', message: 'Is bulk order available? I need 50 units.', date: '2024-01-15', time: '10:30 AM', status: 'pending' },
    { id: 2, buyer: 'Amit Kumar', email: 'amit.kumar@example.com', product: 'Strawberry Jam', message: 'Can you ship to Delhi? What are the shipping charges?', date: '2024-01-14', time: '2:15 PM', status: 'replied' },
    { id: 3, buyer: 'Sonia Patel', email: 'sonia.patel@example.com', product: 'Olive Oil', message: 'What is the expiry date? Is it cold-pressed?', date: '2024-01-13', time: '11:45 AM', status: 'pending' },
    { id: 4, buyer: 'Rahul Singh', email: 'rahul.singh@example.com', product: 'Organic Honey', message: 'Interested in wholesale pricing for regular orders', date: '2024-01-12', time: '4:20 PM', status: 'replied' },
    { id: 5, buyer: 'Priya Sharma', email: 'priya.sharma@example.com', product: 'Turmeric Powder', message: 'Is this organic certified? Need certificate copy.', date: '2024-01-11', time: '9:00 AM', status: 'pending' }
  ]);

  const recentOrders = [
    { id: 1001, buyer: 'Neha Buyer', email: 'neha.buyer@farmconnect.com', product: 'Organic Honey', quantity: 5, total: 1250, date: '2024-01-15', status: 'processing' },
    { id: 1002, buyer: 'Amit Kumar', email: 'amit.kumar@example.com', product: 'Strawberry Jam', quantity: 10, total: 1800, date: '2024-01-14', status: 'shipped' },
    { id: 1003, buyer: 'Sonia Patel', email: 'sonia.patel@example.com', product: 'Olive Oil', quantity: 3, total: 1350, date: '2024-01-13', status: 'delivered' },
    { id: 1004, buyer: 'Rahul Singh', email: 'rahul.singh@example.com', product: 'Organic Honey', quantity: 20, total: 5000, date: '2024-01-12', status: 'delivered' },
    { id: 1005, buyer: 'Priya Sharma', email: 'priya.sharma@example.com', product: 'Turmeric Powder', quantity: 8, total: 1600, date: '2024-01-11', status: 'processing' }
  ];

  const salesData = [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 5800 },
    { month: 'Mar', sales: 7200 },
    { month: 'Apr', sales: 6500 },
    { month: 'May', sales: 8900 },
    { month: 'Jun', sales: 9600 }
  ];

  const stats = [
    { icon: <Package size={28} />, label: 'Total Products', value: myProducts.length, color: '#16a34a' },
    { icon: <IndianRupee size={28} />, label: 'Total Revenue', value: '₹' + (user.totalSales || 0), color: '#8b5cf6' },
    { icon: <TrendingUp size={28} />, label: 'Avg. Rating', value: '4.8', color: '#f59e0b' }
  ];

  const handleDelete = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setMyProducts(myProducts.filter(p => p.id !== productId));
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setMyProducts(myProducts.map(p => 
      p.id === editProduct.id ? {
        ...p,
        name: formData.get('name'),
        category: formData.get('category'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        description: formData.get('description')
      } : p
    ));
    setShowEditModal(false);
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    setBuyerInteractions(buyerInteractions.map(m => 
      m.id === selectedMessage.id ? { ...m, status: 'replied' } : m
    ));
    setShowReplyModal(false);
    alert('Reply sent successfully!');
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    alert(`Order #${orderId} status updated to: ${newStatus}`);
  };

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <motion.div 
          className="dashboard-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1>Farmer Dashboard</h1>
            <p>Welcome back, {user.name}!</p>
          </div>
          <motion.button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={20} />
            Add Product
          </motion.button>
        </motion.div>

        {/* Stats */}
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
            className={`tab ${selectedTab === 'products' ? 'active' : ''}`}
            onClick={() => setSelectedTab('products')}
          >
            My Products
          </button>
          <button 
            className={`tab ${selectedTab === 'buyers' ? 'active' : ''}`}
            onClick={() => setSelectedTab('buyers')}
          >
            Buyer Interactions
          </button>
          <button 
            className={`tab ${selectedTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setSelectedTab('analytics')}
          >
            Sales Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {selectedTab === 'products' && (
            <motion.div 
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Product Inventory</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProducts.map(product => (
                      <tr key={product.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                            <strong>{product.name}</strong>
                          </div>
                        </td>
                        <td>{product.category}</td>
                        <td>₹{product.price}</td>
                        <td>{product.stock} units</td>
                        <td>
                          <span className={`badge badge-${product.status === 'approved' ? 'success' : 'warning'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <motion.button 
                              className="btn-icon btn-primary"
                              onClick={() => handleEdit(product)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit size={18} />
                            </motion.button>
                            <motion.button 
                              className="btn-icon btn-danger"
                              onClick={() => handleDelete(product.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {selectedTab === 'buyers' && (
            <div className="analytics-grid">
              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3><MessageSquare size={20} style={{ display: 'inline', marginRight: '8px' }} />Buyer Messages ({buyerInteractions.filter(m => m.status === 'pending').length} pending)</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Buyer</th>
                        <th>Product</th>
                        <th>Message</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buyerInteractions.map(interaction => (
                        <tr key={interaction.id}>
                          <td>
                            <div>
                              <strong>{interaction.buyer}</strong>
                              <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{interaction.email}</div>
                            </div>
                          </td>
                          <td><strong>{interaction.product}</strong></td>
                          <td style={{ maxWidth: '300px' }}>{interaction.message}</td>
                          <td>
                            <div>{interaction.date}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{interaction.time}</div>
                          </td>
                          <td>
                            <span className={`badge badge-${interaction.status === 'replied' ? 'success' : 'warning'}`}>
                              {interaction.status}
                            </span>
                          </td>
                          <td>
                            <motion.button 
                              className="btn-icon btn-primary"
                              onClick={() => handleReply(interaction)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Reply to message"
                            >
                              <MessageSquare size={18} />
                            </motion.button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3><ShoppingBag size={20} style={{ display: 'inline', marginRight: '8px' }} />Recent Orders ({recentOrders.length})</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Buyer</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map(order => (
                        <tr key={order.id}>
                          <td><strong>#{order.id}</strong></td>
                          <td>
                            <div>
                              <strong>{order.buyer}</strong>
                              <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{order.email}</div>
                            </div>
                          </td>
                          <td>{order.product}</td>
                          <td>{order.quantity} units</td>
                          <td><strong>₹{order.total}</strong></td>
                          <td>{order.date}</td>
                          <td>
                            <span className={`badge badge-${order.status === 'delivered' ? 'success' : order.status === 'shipped' ? 'info' : 'warning'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            {order.status !== 'delivered' && (
                              <select 
                                className="input" 
                                style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                                defaultValue={order.status}
                                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              >
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="analytics-grid">
              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3>Monthly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="var(--primary)" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                className="card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <h3>Revenue Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowReplyModal(false)}
        >
          <motion.div 
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Reply to {selectedMessage.buyer}</h2>
            <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <p><strong>Product:</strong> {selectedMessage.product}</p>
              <p><strong>Message:</strong> {selectedMessage.message}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{selectedMessage.date} at {selectedMessage.time}</p>
            </div>
            <form onSubmit={handleSendReply}>
              <div className="form-group">
                <label>Your Reply</label>
                <textarea 
                  className="input" 
                  rows="5" 
                  placeholder="Type your reply here..." 
                  required
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowReplyModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Send Reply</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editProduct && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowEditModal(false)}
        >
          <motion.div 
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Edit Product</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" name="name" className="input" defaultValue={editProduct.name} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" className="input" defaultValue={editProduct.category} required>
                  <option>Processed Foods</option>
                  <option>Organic Goods</option>
                  <option>Handmade Products</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" className="input" defaultValue={editProduct.price} step="0.01" required />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" className="input" defaultValue={editProduct.stock} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="input" rows="3" defaultValue={editProduct.description} required></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update Product</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAddModal(false)}
        >
          <motion.div 
            className="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Product</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); }}>
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" className="input" placeholder="Enter product name" required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select className="input" required>
                  <option>Processed Foods</option>
                  <option>Organic Goods</option>
                  <option>Handmade Products</option>
                </select>
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" className="input" placeholder="0.00" step="0.01" required />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" className="input" placeholder="0" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input" rows="3" placeholder="Product description" required></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Product</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FarmerDashboard;
