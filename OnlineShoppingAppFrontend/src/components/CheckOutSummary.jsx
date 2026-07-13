const CheckoutSummary = ({ cart, onCheckout }) => {
    return (
        <div className="card border-0 shadow-lg" style={{
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'sticky',
            top: '20px'
        }}>
            {/* Header */}
            <div className="card-header p-4" style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                border: 'none'
            }}>
                <h5 className="mb-0 fw-bold text-white" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <span>🛒</span> Order Summary
                </h5>
            </div>

            <div className="card-body p-4" style={{ background: '#fafafa' }}>
                {/* Items Count */}
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{
                    borderBottom: '2px dashed #e0e0e0'
                }}>
                    <span style={{ color: '#636e72', fontSize: '0.95rem' }}>
                        Items ({cart.cartItems?.length || 0})
                    </span>
                    <span className="badge" style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: '#fff',
                        padding: '5px 12px',
                        borderRadius: '20px'
                    }}>
                        {cart.cartItems?.length || 0} products
                    </span>
                </div>

                {/* Price Breakdown */}
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center py-2">
                        <span style={{ color: '#636e72' }}>
                            📦 Subtotal
                        </span>
                        <strong style={{ color: '#2d3436', fontSize: '1.1rem' }}>
                            ₹{cart.subTotal}
                        </strong>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-2">
                        <span style={{ color: '#636e72' }}>
                            🎯 Discount (10%)
                        </span>
                        <strong style={{
                            color: '#00b894',
                            fontSize: '1.1rem',
                            background: '#e8f8f5',
                            padding: '2px 12px',
                            borderRadius: '20px'
                        }}>
                            -₹{cart.discount}
                        </strong>
                    </div>

                    {cart.shipping && (
                        <div className="d-flex justify-content-between align-items-center py-2">
                            <span style={{ color: '#636e72' }}>
                                🚚 Shipping
                            </span>
                            <strong style={{ color: '#2d3436', fontSize: '1.1rem' }}>
                                ₹{cart.shipping}
                            </strong>
                        </div>
                    )}
                </div>

                <hr style={{
                    border: 'none',
                    height: '2px',
                    background: 'linear-gradient(to right, #f093fb, #f5576c)',
                    margin: '15px 0'
                }} />

                {/* Grand Total */}
                <div className="d-flex justify-content-between align-items-center mb-4 p-3" style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h5 className="fw-bold mb-0" style={{ color: '#2d3436' }}>
                        💰 Grand Total
                    </h5>
                    <h4 className="fw-bold mb-0" style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.8rem'
                    }}>
                        ₹{cart.grandTotal}
                    </h4>
                </div>

                {/* Checkout Button */}
                <button
                    className="btn w-100 fw-bold py-3"
                    onClick={onCheckout}
                    style={{
                        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 6px 25px rgba(245, 87, 108, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
                    }}
                >
                    🚀 Proceed to Checkout
                    <span className="ms-2">→</span>
                </button>

                {/* Secure Checkout Badge */}
                <div className="text-center mt-3">
                    <small style={{ color: '#b2bec3', fontSize: '0.8rem' }}>
                        🔒 Secure Checkout • 100% Protected
                    </small>
                </div>

                {/* Payment Methods */}
                <div className="d-flex justify-content-center gap-2 mt-2">
                    <span style={{ fontSize: '1.5rem' }}>💳</span>
                    <span style={{ fontSize: '1.5rem' }}>🏦</span>
                    <span style={{ fontSize: '1.5rem' }}>📱</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary;