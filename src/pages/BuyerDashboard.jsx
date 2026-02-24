import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Package, Star, X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { orders } from '../data/orders';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [myOrders, setMyOrders] = useState(orders.filter(o => o.buyerId === user.id));
  const approvedProducts = products.filter(p => p.status === 'approved');

  const filteredProducts = approvedProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === selectedProduct.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...selectedProduct, quantity: 1 }]);
    }
    alert('Product added to cart!');
    setShowDetailsModal(false);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        if (newQuantity <= 0) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Date.now(),
      buyerId: user.id,
      buyerName: user.name,
      products: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity
      })),
      total: cartTotal,
      orderDate: new Date().toLocaleDateString('en-IN'),
      status: 'processing'
    };
    
    setMyOrders([newOrder, ...myOrders]);
    setCart([]);
    setSelectedTab('orders');
    alert('Order placed successfully! Order ID: #' + newOrder.id);
  };

  const handleAddToWishlist = () => {
    if (!selectedProduct) return;
    const exists = wishlist.find(item => item.id === selectedProduct.id);
    if (exists) {
      alert('Product already in wishlist!');
    } else {
      setWishlist([...wishlist, selectedProduct]);
      alert('Added to wishlist!');
    }
    setShowDetailsModal(false);
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const stats = [
    { icon: <ShoppingBag size={28} />, label: 'Total Orders', value: myOrders.length, color: '#3b82f6' },
    { icon: <Package size={28} />, label: 'Delivered', value: myOrders.filter(o => o.status === 'delivered').length, color: '#16a34a' },
    { icon: <ShoppingCart size={28} />, label: 'Cart Items', value: cart.length, color: '#f59e0b' },
    { icon: <Heart size={28} />, label: 'Wishlist', value: wishlist.length, color: '#ef4444' }
  ];

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
            <h1>Buyer Dashboard</h1>
            <p>Welcome back, {user.name}!</p>
          </div>
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
            className={`tab ${selectedTab === 'browse' ? 'active' : ''}`}
            onClick={() => setSelectedTab('browse')}
          >
            Browse Products
          </button>
          <button 
            className={`tab ${selectedTab === 'cart' ? 'active' : ''}`}
            onClick={() => setSelectedTab('cart')}
          >
            Cart ({cart.length})
          </button>
          <button 
            className={`tab ${selectedTab === 'orders' ? 'active' : ''}`}
            onClick={() => setSelectedTab('orders')}
          >
            My Orders
          </button>
          <button 
            className={`tab ${selectedTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setSelectedTab('wishlist')}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {selectedTab === 'browse' && (
            <div>
              <div className="filters-bar">
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Search products..." 
                  style={{ maxWidth: '400px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select 
                  className="input" 
                  style={{ maxWidth: '200px' }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Processed Foods</option>
                  <option>Organic Goods</option>
                  <option>Handmade Products</option>
                </select>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="products-grid">
                  {filteredProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>No products found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {selectedTab === 'cart' && (
            <motion.div 
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Shopping Cart</h3>
              {cart.length > 0 ? (
                <div>
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map(item => (
                          <tr key={item.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                <div>
                                  <strong>{item.name}</strong>
                                  <div style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>by {item.farmerName}</div>
                                </div>
                              </div>
                            </td>
                            <td><strong>₹{item.price}</strong></td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <motion.button 
                                  className="btn-icon btn-primary"
                                  onClick={() => handleUpdateQuantity(item.id, -1)}
                                  whileHover={{ scale: item.quantity > 1 ? 1.1 : 1 }}
                                  whileTap={{ scale: item.quantity > 1 ? 0.9 : 1 }}
                                  style={{ opacity: item.quantity <= 1 ? 0.5 : 1, cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer' }}
                                >
                                  <Minus size={16} />
                                </motion.button>
                                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                                <motion.button 
                                  className="btn-icon btn-primary"
                                  onClick={() => handleUpdateQuantity(item.id, 1)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus size={16} />
                                </motion.button>
                              </div>
                            </td>
                            <td><strong style={{ color: 'var(--primary)' }}>₹{item.price * item.quantity}</strong></td>
                            <td>
                              <motion.button 
                                className="btn-icon btn-danger"
                                onClick={() => handleRemoveFromCart(item.id)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--light)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3>Cart Total:</h3>
                      <h2 style={{ color: 'var(--primary)', fontSize: '2rem' }}>₹{cartTotal}</h2>
                    </div>
                    <motion.button 
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <ShoppingCart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>Your cart is empty</h3>
                  <p>Add products to your cart to see them here</p>
                  <motion.button 
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setSelectedTab('browse')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Products
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'orders' && (
            <motion.div 
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>Order History ({myOrders.length})</h3>
              {myOrders.length > 0 ? (
                <div className="orders-list">
                  {myOrders.map(order => (
                    <motion.div 
                      key={order.id}
                      className="order-card"
                      whileHover={{ y: -4 }}
                    >
                      <div className="order-header">
                        <div>
                          <h4>Order #{order.id}</h4>
                          <p className="order-date">{order.orderDate}</p>
                        </div>
                        <span className={`badge badge-${
                          order.status === 'delivered' ? 'success' : 
                          order.status === 'shipped' ? 'info' : 'warning'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="order-products">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                            <span>₹{item.price}</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <strong>Total: ₹{order.total}</strong>
                        {order.deliveryDate && <span>Delivered: {order.deliveryDate}</span>}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <ShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>No orders yet</h3>
                  <p>Start shopping to place your first order</p>
                  <motion.button 
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setSelectedTab('browse')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Products
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'wishlist' && (
            <div>
              <h3 style={{ marginBottom: '1.5rem' }}>My Wishlist ({wishlist.length})</h3>
              {wishlist.length > 0 ? (
                <div className="products-grid">
                  {wishlist.map((product) => (
                    <motion.div 
                      key={product.id}
                      className="product-card"
                      whileHover={{ y: -8 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                        <motion.button 
                          className="wishlist-btn"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          style={{ background: 'var(--danger)', color: 'white' }}
                        >
                          <X size={20} />
                        </motion.button>
                      </div>
                      <div className="product-info">
                        <span className="product-category">{product.category}</span>
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-farmer">by {product.farmerName}</p>
                        <div className="product-rating">
                          <Star size={16} fill="var(--secondary)" color="var(--secondary)" />
                          <span>{product.rating}</span>
                          <span className="reviews">({product.reviews} reviews)</span>
                        </div>
                        <div className="product-footer">
                          <div className="product-price">
                            <span className="price">₹{product.price}</span>
                            <span className="unit">/{product.unit}</span>
                          </div>
                          <motion.button 
                            className="btn btn-primary btn-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleViewDetails(product)}
                          >
                            View Details
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--gray)' }}>
                  <Heart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>Your wishlist is empty</h3>
                  <p>Add products to your wishlist to save them for later</p>
                  <motion.button 
                    className="btn btn-primary"
                    style={{ marginTop: '1rem' }}
                    onClick={() => setSelectedTab('browse')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Products
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowDetailsModal(false)}
        >
          <motion.div 
            className="modal" 
            style={{ maxWidth: '600px' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDetailsModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
            />
            
            <div>
              <span className="product-category" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                {selectedProduct.category}
              </span>
              <h2 style={{ margin: '0.5rem 0', fontSize: '1.75rem' }}>{selectedProduct.name}</h2>
              <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>by {selectedProduct.farmerName}</p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Star size={18} fill="var(--secondary)" color="var(--secondary)" />
                <span style={{ fontWeight: 600 }}>{selectedProduct.rating}</span>
                <span style={{ color: 'var(--gray)' }}>({selectedProduct.reviews} reviews)</span>
              </div>
              
              <p style={{ color: 'var(--dark)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {selectedProduct.description}
              </p>
              
              <div style={{ background: 'var(--light)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--gray)' }}>Price:</span>
                  <strong style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>₹{selectedProduct.price}/{selectedProduct.unit}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--gray)' }}>Stock:</span>
                  <strong>{selectedProduct.stock} units available</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--gray)' }}>Location:</span>
                  <strong>{selectedProduct.location}</strong>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <motion.button 
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                  onClick={handleAddToWishlist}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Heart size={20} />
                  Add to Wishlist
                </motion.button>
                <motion.button 
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BuyerDashboard;
