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
            alert("Unable to load cart.");
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
            <div className="container-fluid px-4 py-5 text-center">
                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
                <p className="mt-3 text-muted">Loading your cart...</p>
            </div>
        );
    }

    if (!cart || cart.cartItems.length === 0) {
        return (
            <div className="container-fluid px-4 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="card shadow-lg border-0 rounded-4 p-4">
                            <span style={{ fontSize: "4rem" }}>🛒</span>
                            <h3 className="fw-bold mt-3" style={{ color: "#1a3a5c" }}>Your Cart is Empty</h3>
                            <p className="text-muted">Looks like you haven't added any items yet.</p>
                            <button 
                                className="btn btn-primary px-5 py-2 mx-auto"
                                onClick={() => navigate("/")}
                                style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", border: "none", borderRadius: "8px" }}
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
        <div className="container-fluid px-4 py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: "#1a3a5c" }}>🛒 Shopping Cart</h2>
                    <p className="text-muted mb-0">Review and manage your items</p>
                </div>
                <div className="d-flex gap-2">
                    <span className="badge bg-primary rounded-pill px-4 py-2">{cart.cartItems.length} Items</span>
                    <button className="btn btn-outline-primary btn-sm" onClick={loadCart}>🔄</button>
                </div>
            </div>
            <hr className="mb-4" />

            <div className="row g-4">
                {/* Cart Items */}
                <div className="col-lg-8">
                    <div className="cart-items-wrapper" style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto", paddingRight: "5px" }}>
                        {cart.cartItems.map((item) => (
                            <div className="card shadow-sm mb-3 border-0 rounded-3 hover-card" key={item.cartItemId}>
                                <div className="card-body p-4">
                                    <div className="row align-items-center g-3">
                                        <div className="col-md-5">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="d-flex align-items-center justify-content-center rounded-3 bg-light" 
                                                    style={{ width: "55px", height: "55px", flexShrink: 0 }}>
                                                    <span style={{ fontSize: "1.5rem" }}>📦</span>
                                                </div>
                                                <div>
                                                    <h6 className="fw-bold mb-0" style={{ color: "#1a3a5c" }}>{item.productName}</h6>
                                                    <small className="text-muted">SKU: #{item.cartItemId}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row align-items-center g-2">
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Price</small>
                                                    <span className="fw-bold">₹{item.price}</span>
                                                </div>
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Qty</small>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary rounded-circle"
                                                            onClick={() => updateQuantity(item, item.quantity - 1)}
                                                            disabled={item.quantity === 1}
                                                            style={{ width: "28px", height: "28px", padding: 0 }}
                                                        >
                                                            −
                                                        </button>
                                                        <span className="mx-2 fw-bold" style={{ minWidth: "25px", textAlign: "center" }}>
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="btn btn-sm btn-outline-secondary rounded-circle"
                                                            onClick={() => updateQuantity(item, item.quantity + 1)}
                                                            style={{ width: "28px", height: "28px", padding: 0 }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-4 col-md-3">
                                                    <small className="text-muted d-block">Total</small>
                                                    <span className="fw-bold text-success">₹{item.totalPrice}</span>
                                                </div>
                                                <div className="col-12 col-md-3 text-md-end">
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeItem(item.cartItemId)}
                                                        disabled={removingItem === item.cartItemId}
                                                        style={{ minWidth: "70px" }}
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

                {/* Order Summary */}
                <div className="col-lg-4">
                    <div className="position-sticky" style={{ top: "100px" }}>
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-header" style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", borderBottom: "none", borderRadius: "16px 16px 0 0" }}>
                                <h5 className="fw-bold text-white mb-0">📋 Order Summary</h5>
                            </div>
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-semibold">₹{cart.subTotal}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                                    <span className="text-muted">Shipping</span>
                                    <span className="text-success fw-semibold">Free</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                                    <span className="text-muted">Discount</span>
                                    <span className="fw-semibold">₹{cart.discount}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold fs-5" style={{ color: "#1a3a5c" }}>Total</span>
                                    <span className="fw-bold fs-4 text-success">₹{cart.subTotal}</span>
                                </div>

                                <button
                                    className="btn w-100 py-2 fw-bold text-white mb-2"
                                    onClick={() => navigate("/checkout")}
                                    style={{ background: "linear-gradient(135deg, #28a745, #20c997)", border: "none", borderRadius: "8px" }}
                                >
                                    🔒 Proceed to Checkout
                                </button>
                                <button
                                    className="btn btn-outline-secondary w-100 py-2"
                                    onClick={() => navigate("/")}
                                >
                                    ← Continue Shopping
                                </button>

                                <div className="mt-3 pt-3 border-top d-flex justify-content-center gap-3">
                                    <small className="text-muted">🛡 Secure</small>
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
                .hover-card {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .hover-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.08) !important;
                }
                .position-sticky {
                    position: sticky;
                }
                .btn-outline-secondary:hover {
                    background: #6c757d;
                    color: #fff;
                }
                .btn-outline-danger:hover {
                    background: #dc3545;
                    color: #fff;
                }
                .btn-outline-secondary:disabled,
                .btn-outline-danger:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
};

export default Cart;