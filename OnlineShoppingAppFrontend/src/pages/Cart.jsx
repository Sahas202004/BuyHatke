import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartService";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [removingItem, setRemovingItem] = useState(null);

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const response = await cartService.getCart(userId);
            setCart(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            setRemovingItem(cartItemId);
            await cartService.removeFromCart(cartItemId);
            window.dispatchEvent(new Event("cartUpdated"));
            loadCart();
        } catch (error) {
            console.error(error);
            alert("Unable to remove item.");
        } finally {
            setRemovingItem(null);
        }
    };

    const updateQuantity = async (item, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await cartService.updateQuantity(item.cartItemId, newQuantity);
            loadCart();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" style={{ 
                    color: '#0D6EFD',
                    width: "3rem", 
                    height: "3rem" 
                }} />
                <p className="mt-3 text-muted">Loading your cart...</p>
            </div>
        );
    }

    if (!cart || cart.cartItems.length === 0) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="card border-0 shadow-lg rounded-4 p-4" style={{
                            border: '2px solid #0D6EFD'
                        }}>
                            <span style={{ fontSize: "4rem" }}>🛒</span>
                            <h3 className="fw-bold mt-3" style={{ color: '#0D6EFD' }}>Your Cart is Empty</h3>
                            <p className="text-muted">Looks like you haven't added any items yet.</p>
                            <button 
                                className="btn px-5 py-2 mx-auto text-white"
                                onClick={() => navigate("/")}
                                style={{
                                    background: '#0D6EFD',
                                    border: 'none',
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 6px 25px rgba(13, 110, 253, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                                }}
                            >
                                ← Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#0D6EFD' }}>🛒 Shopping Cart</h2>
                    <p className="text-muted mb-0">Review and manage your items</p>
                </div>
                <div className="d-flex gap-2">
                    <span className="badge rounded-pill px-4 py-2" style={{ background: '#0D6EFD' }}>
                        {cart.cartItems.length} Items
                    </span>
                    <button 
                        className="btn btn-sm" 
                        onClick={loadCart}
                        style={{
                            background: '#0D6EFD',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'rotate(180deg)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'rotate(0deg)';
                        }}
                    >
                        🔄
                    </button>
                </div>
            </div>
            <hr className="mb-4" style={{ borderColor: '#0D6EFD', opacity: 0.3 }} />

            <div className="row g-4">
                <div className="col-lg-8">
                    <div className="cart-items-wrapper" style={{ 
                        maxHeight: "calc(100vh - 300px)", 
                        overflowY: "auto", 
                        paddingRight: "5px" 
                    }}>
                        {cart.cartItems.map((item) => (
                            <div className="card shadow-sm mb-3 border-0 rounded-3" key={item.cartItemId} style={{
                                border: '1px solid rgba(13, 110, 253, 0.1)',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(13, 110, 253, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
                            }}>
                                <div className="card-body p-4">
                                    <div className="row align-items-center g-3">
                                        <div className="col-md-5">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-3" 
                                                    style={{ 
                                                        width: "55px", 
                                                        height: "55px", 
                                                        flexShrink: 0,
                                                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
                                                    }}>
                                                    <span style={{ fontSize: "1.5rem" }}>📦</span>
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0" style={{ color: '#2d3436' }}>{item.productName}</h6>
                                                    <small className="text-muted">SKU: #{item.cartItemId}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row align-items-center g-2">
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Price</small>
                                                    <span className="fw-bold" style={{ color: '#0D6EFD' }}>₹{item.price}</span>
                                                </div>
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Qty</small>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-sm rounded-circle"
                                                            onClick={() => updateQuantity(item, item.quantity - 1)}
                                                            disabled={item.quantity === 1}
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                padding: 0,
                                                                background: '#f1f2f6',
                                                                border: 'none',
                                                                color: '#2d3436',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                                            onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="mx-2 fw-bold" style={{ 
                                                            minWidth: "25px", 
                                                            textAlign: "center",
                                                            color: '#0D6EFD'
                                                        }}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="btn btn-sm rounded-circle"
                                                            onClick={() => updateQuantity(item, item.quantity + 1)}
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                padding: 0,
                                                                background: '#f1f2f6',
                                                                border: 'none',
                                                                color: '#2d3436',
                                                                transition: 'all 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                                            onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Total</small>
                                                    <span className="fw-bold" style={{ color: '#0D6EFD' }}>₹{item.totalPrice}</span>
                                                </div>
                                                <div className="col-12 col-md-3 text-md-end">
                                                    <button
                                                        className="btn btn-sm"
                                                        onClick={() => removeItem(item.cartItemId)}
                                                        disabled={removingItem === item.cartItemId}
                                                        style={{
                                                            minWidth: "70px",
                                                            background: '#dc3545',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '8px',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.transform = 'scale(1.05)';
                                                            e.target.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.transform = 'scale(1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    >
                                                        {removingItem === item.cartItemId ? (
                                                            <span className="spinner-border spinner-border-sm" />
                                                        ) : (
                                                            "✕ Remove"
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="position-sticky" style={{ top: "100px" }}>
                        <div className="card border-0 shadow-lg rounded-4" style={{
                            border: '2px solid #0D6EFD'
                        }}>
                            <div className="card-header text-white py-3" style={{
                                background: '#0D6EFD',
                                borderBottom: 'none',
                                borderRadius: '14px 14px 0 0'
                            }}>
                                <h5 className="fw-bold mb-0">📋 Order Summary</h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between mb-2 pb-2" style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-semibold" style={{ color: '#2d3436' }}>₹{cart.subTotal}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2 pb-2" style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <span className="text-muted">Shipping</span>
                                    <span className="fw-semibold" style={{ color: '#28a745' }}>Free</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pb-2" style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <span className="text-muted">Discount</span>
                                    <span className="fw-semibold" style={{ color: '#0D6EFD' }}>₹{cart.discount}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5" style={{ color: '#2d3436' }}>Total</span>
                                    <span className="fw-bold fs-4" style={{ color: '#0D6EFD' }}>₹{cart.subTotal}</span>
                                </div>

                                <button
                                    className="btn w-100 py-2 fw-bold text-white mb-2"
                                    onClick={() => navigate("/checkout")}
                                    style={{
                                        background: '#0D6EFD',
                                        border: 'none',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 25px rgba(13, 110, 253, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                                    }}
                                >
                                    🔒 Proceed to Checkout
                                </button>
                                <button
                                    className="btn w-100 py-2"
                                    onClick={() => navigate("/")}
                                    style={{
                                        background: 'transparent',
                                        color: '#0D6EFD',
                                        border: '2px solid #0D6EFD',
                                        borderRadius: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#0D6EFD';
                                        e.target.style.color = '#fff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'transparent';
                                        e.target.style.color = '#0D6EFD';
                                    }}
                                >
                                    ← Continue Shopping
                                </button>

                                <div className="mt-3 pt-3 border-top d-flex justify-content-center gap-3">
                                    <small className="text-muted">🛡️ Secure</small>
                                    <small className="text-muted">🚚 Fast</small>
                                    <small className="text-muted">🔄 Returns</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .cart-items-wrapper {
                    scrollbar-width: thin;
                    scrollbar-color: #d1d5db #f3f4f6;
                }
                .cart-items-wrapper::-webkit-scrollbar {
                    width: 6px;
                }
                .cart-items-wrapper::-webkit-scrollbar-track {
                    background: #f3f4f6;
                    border-radius: 10px;
                }
                .cart-items-wrapper::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 10px;
                }
                .cart-items-wrapper::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }
                .position-sticky {
                    position: sticky;
                }
                .btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .btn:disabled:hover {
                    transform: none !important;
                }
            `}</style>
        </div>
    );
};

export default Cart;