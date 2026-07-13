import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../services/cartService";

const Checkout = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);

    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        loadCheckout();
    }, []);

    const loadCheckout = async () => {
        try {
            setLoading(true);
            const response = await cartService.checkout(userId);
            setSummary(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load checkout summary.");
        } finally {
            setLoading(false);
        }
    };

    const placeOrder = async () => {
        try {
            setPlacingOrder(true);
            await cartService.clearCart(userId);
            window.dispatchEvent(new Event("cartUpdated"));
            showToast("Order placed successfully! Redirecting...");
            setTimeout(() => navigate("/ordersuccess"), 1500);
        } catch (error) {
            console.error(error);
            alert("Unable to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'position-fixed top-0 end-0 p-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header" style="background: #0D6EFD; color: white;">
                    <strong class="me-auto">✅ Success!</strong>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">${message}</div>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" style={{ 
                    color: '#0D6EFD',
                    width: "3rem", 
                    height: "3rem" 
                }} />
                <p className="mt-3 text-muted">Loading checkout summary...</p>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="container mt-5 text-center">
                <div className="card border-0 shadow-lg rounded-4 d-inline-block px-5 py-4" style={{
                    border: '2px solid #0D6EFD'
                }}>
                    <span style={{ fontSize: "4rem" }}>📭</span>
                    <h4 className="mt-3" style={{ color: '#0D6EFD' }}>No Order Summary</h4>
                    <p className="text-muted">Unable to load checkout details.</p>
                    <button 
                        className="btn px-4 py-2 text-white"
                        onClick={() => navigate("/cart")}
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
                        ← Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9">
                    <div className="card border-0 shadow-lg rounded-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <div className="card-header text-white py-4 px-5" style={{
                            background: '#0D6EFD',
                            borderBottom: 'none',
                            borderRadius: '14px 14px 0 0'
                        }}>
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                                        style={{ 
                                            width: "45px", 
                                            height: "45px",
                                            background: 'rgba(255,255,255,0.2)'
                                        }}>
                                        <span style={{ fontSize: "1.3rem" }}>✅</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 fw-bold">Checkout</h4>
                                        <small className="text-white-50">Review your order</small>
                                    </div>
                                </div>
                                <span className="badge text-white px-3 py-2 rounded-pill" style={{
                                    background: 'rgba(255,255,255,0.2)'
                                }}>
                                    #ORD-{Date.now().toString().slice(-6)}
                                </span>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <div className="alert rounded-3 d-flex align-items-center gap-3 mb-4" style={{
                                background: 'rgba(13, 110, 253, 0.05)',
                                border: '1px solid rgba(13, 110, 253, 0.1)'
                            }}>
                                <span className="fs-4">ℹ️</span>
                                <div>
                                    <strong style={{ color: '#0D6EFD' }}>Review your order</strong>
                                    <p className="mb-0 text-muted small">Verify details before placing</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold mb-3" style={{ color: '#0D6EFD' }}>📋 Order Breakdown</h6>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold" style={{ color: '#2d3436' }}>Subtotal</span>
                                                    <small className="d-block text-muted">Items total</small>
                                                </td>
                                                <td className="text-end py-2 fw-semibold" style={{ color: '#2d3436' }}>₹{summary.subTotal}</td>
                                            </tr>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold" style={{ color: '#28a745' }}>Discount</span>
                                                    <small className="d-block text-muted">Applied</small>
                                                </td>
                                                <td className="text-end py-2 fw-bold" style={{ color: '#28a745' }}>-₹{summary.discount}</td>
                                            </tr>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold" style={{ color: '#2d3436' }}>Shipping</span>
                                                    <small className="d-block text-muted">Delivery</small>
                                                </td>
                                                <td className="text-end py-2 fw-semibold" style={{ color: '#28a745' }}>Free</td>
                                            </tr>
                                            <tr style={{ background: 'rgba(13, 110, 253, 0.03)' }}>
                                                <td className="py-3">
                                                    <strong className="fs-5" style={{ color: '#0D6EFD' }}>Grand Total</strong>
                                                    <small className="d-block text-muted">Amount to pay</small>
                                                </td>
                                                <td className="text-end py-3">
                                                    <strong className="fs-2" style={{ color: '#0D6EFD' }}>₹{summary.grandTotal}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold mb-2" style={{ color: '#0D6EFD' }}>💳 Payment</h6>
                                <div className="d-flex flex-wrap gap-3">
                                    {["Credit/Debit Card", "UPI", "Net Banking"].map((method, i) => (
                                        <div className="form-check" key={i}>
                                            <input 
                                                className="form-check-input" 
                                                type="radio" 
                                                name="payment" 
                                                defaultChecked={i === 0} 
                                                id={`payment-${i}`}
                                                style={{
                                                    borderColor: '#0D6EFD'
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor={`payment-${i}`}>{method}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <button className="btn w-100 py-2 fw-semibold"
                                        onClick={() => navigate("/cart")}
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
                                        }}>
                                        ← Back to Cart
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button 
                                        className="btn w-100 py-2 fw-bold text-white"
                                        onClick={placeOrder} 
                                        disabled={placingOrder}
                                        style={{
                                            background: '#0D6EFD',
                                            border: 'none',
                                            borderRadius: '10px',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!placingOrder) {
                                                e.target.style.transform = 'translateY(-2px)';
                                                e.target.style.boxShadow = '0 6px 25px rgba(13, 110, 253, 0.4)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                                        }}>
                                        {placingOrder ? (
                                            <><span className="spinner-border spinner-border-sm me-2" /> Placing...</>
                                        ) : (
                                            "🔒 Place Order"
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-top d-flex justify-content-center gap-4 flex-wrap">
                                <div className="text-center">
                                    <span className="d-block fs-4">🛡️</span>
                                    <small className="text-muted d-block">Secure</small>
                                </div>
                                <div className="text-center">
                                    <span className="d-block fs-4">🕐</span>
                                    <small className="text-muted d-block">24/7 Support</small>
                                </div>
                                <div className="text-center">
                                    <span className="d-block fs-4">🔄</span>
                                    <small className="text-muted d-block">Easy Returns</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-muted mt-3 small">
                        By placing this order, you agree to our 
                        <a href="#" className="text-decoration-none ms-1" style={{ color: '#0D6EFD' }}>Terms</a> &amp; 
                        <a href="#" className="text-decoration-none ms-1" style={{ color: '#0D6EFD' }}>Privacy</a>
                    </p>
                </div>
            </div>

            <style>{`
                .card {
                    animation: slideUp 0.4s ease-out;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-check-input:checked {
                    background-color: #0D6EFD;
                    border-color: #0D6EFD;
                }
                .form-check-input:focus {
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
                    border-color: #0D6EFD;
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn:disabled:hover {
                    transform: none !important;
                }
            `}</style>
        </div>
    );
};

export default Checkout;