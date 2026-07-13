import { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart(product.productId, quantity);
        setQuantity(1);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 border-0" style={{
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(13, 110, 253, 0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                overflow: 'hidden',
                border: '2px solid #0D6EFD'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(13, 110, 253, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(13, 110, 253, 0.08)';
            }}>
                <div className="card-body d-flex flex-column p-4">
                    {/* Product Image Placeholder */}
                    <div className="text-center mb-3" style={{
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        borderRadius: '12px',
                        padding: '20px',
                        minHeight: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <span style={{ fontSize: '3rem' }}>📦</span>
                        {/* Decorative overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(13, 110, 253, 0.03)',
                            borderRadius: '12px',
                            pointerEvents: 'none'
                        }}></div>
                    </div>

                    <h5 className="card-title fw-bold mb-2" style={{
                        color: '#2d3436',
                        fontSize: '1.1rem',
                        minHeight: '3rem'
                    }}>
                        {product.productName}
                    </h5>

                    <h6 className="mb-3" style={{
                        color: '#0D6EFD',
                        fontSize: '1.3rem',
                        fontWeight: '700'
                    }}>
                        ₹{product.price}
                    </h6>

                    <div className="mb-3">
                        <label className="form-label fw-semibold" style={{
                            color: '#636e72',
                            fontSize: '0.9rem'
                        }}>
                            Quantity
                        </label>
                        <div className="d-flex align-items-center gap-2">
                            <button
                                className="btn btn-sm"
                                style={{
                                    background: '#f1f2f6',
                                    color: '#2d3436',
                                    border: 'none',
                                    borderRadius: '8px',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                className="form-control text-center"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                                }
                                style={{
                                    width: '60px',
                                    borderRadius: '8px',
                                    border: '2px solid #f1f2f6',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    padding: '6px 0',
                                    outline: 'none',
                                    color: '#0D6EFD'
                                }}
                            />
                            <button
                                className="btn btn-sm"
                                style={{
                                    background: '#f1f2f6',
                                    color: '#2d3436',
                                    border: 'none',
                                    borderRadius: '8px',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => setQuantity(quantity + 1)}
                                onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        className="btn mt-auto fw-semibold py-2"
                        onClick={handleAddToCart}
                        style={{
                            background: '#0D6EFD',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.02)';
                            e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                        }}
                    >
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;