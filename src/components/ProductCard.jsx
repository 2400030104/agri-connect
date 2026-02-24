import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <motion.button 
          className="wishlist-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart size={20} />
        </motion.button>
        <span className={`badge badge-${product.status === 'approved' ? 'success' : 'warning'}`}>
          {product.status}
        </span>
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
            onClick={() => onViewDetails?.(product)}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
