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
                <div class="toast-header bg-success text-white">
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
            <div className="container-fluid px-4 py-5 text-center">
                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} />
                <p className="mt-3 text-muted">Loading checkout summary...</p>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="container-fluid px-4 py-5 text-center">
                <div className="card shadow-lg border-0 rounded-4 d-inline-block px-5 py-4">
                    <span style={{ fontSize: "4rem" }}>📭</span>
                    <h4 className="mt-3" style={{ color: "#1a3a5c" }}>No Order Summary</h4>
                    <p className="text-muted">Unable to load checkout details.</p>
                    <button 
                        className="btn btn-primary px-4 py-2"
                        onClick={() => navigate("/cart")}
                        style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", border: "none", borderRadius: "8px" }}
                    >
                        ← Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-9">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header */}
                        <div className="card-header text-white py-4 px-5" 
                            style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", borderBottom: "none" }}>
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center" 
                                        style={{ width: "45px", height: "45px" }}>
                                        <span style={{ fontSize: "1.3rem" }}>✅</span>
                                    </div>
                                    <div>
                                        <h4 className="mb-0 fw-bold">Checkout</h4>
                                        <small className="text-white-50">Review your order</small>
                                    </div>
                                </div>
                                <span className="badge bg-white text-primary px-3 py-2 rounded-pill">
                                    #ORD-{Date.now().toString().slice(-6)}
                                </span>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Alert */}
                            <div className="alert alert-info border-0 rounded-3 d-flex align-items-center gap-3 mb-4" 
                                style={{ background: "#f0f7ff" }}>
                                <span className="fs-4">ℹ️</span>
                                <div>
                                    <strong>Review your order</strong>
                                    <p className="mb-0 text-muted small">Verify details before placing</p>
                                </div>
                            </div>

                            {/* Order Breakdown */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3" style={{ color: "#1a3a5c" }}>📋 Order Breakdown</h6>
                                <div className="table-responsive">
                                    <table className="table table-borderless mb-0">
                                        <tbody>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold">Subtotal</span>
                                                    <small className="d-block text-muted">Items total</small>
                                                </td>
                                                <td className="text-end py-2 fw-semibold">₹{summary.subTotal}</td>
                                            </tr>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold text-success">Discount</span>
                                                    <small className="d-block text-muted">Applied</small>
                                                </td>
                                                <td className="text-end py-2 text-success fw-bold">-₹{summary.discount}</td>
                                            </tr>
                                            <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold">Shipping</span>
                                                    <small className="d-block text-muted">Delivery</small>
                                                </td>
                                                <td className="text-end py-2 text-success fw-semibold">Free</td>
                                            </tr>
                                            {/* <tr className="border-bottom">
                                                <td className="py-2">
                                                    <span className="fw-semibold">Tax</span>
                                                    <small className="d-block text-muted">GST</small>
                                                </td>
                                                <td className="text-end py-2 fw-semibold">₹0</td>
                                            </tr> */}
                                            <tr style={{ background: "#f8f9fc" }}>
                                                <td className="py-3">
                                                    <strong className="fs-5" style={{ color: "#1a3a5c" }}>Grand Total</strong>
                                                    <small className="d-block text-muted">Amount to pay</small>
                                                </td>
                                                <td className="text-end py-3">
                                                    <strong className="fs-2 text-success">₹{summary.grandTotal}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-2" style={{ color: "#1a3a5c" }}>💳 Payment</h6>
                                <div className="d-flex flex-wrap gap-3">
                                    {["Credit/Debit Card", "UPI", "Net Banking"].map((method, i) => (
                                        <div className="form-check" key={i}>
                                            <input className="form-check-input" type="radio" name="payment" 
                                                defaultChecked={i === 0} id={`payment-${i}`} />
                                            <label className="form-check-label" htmlFor={`payment-${i}`}>{method}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <button className="btn btn-outline-secondary w-100 py-2 fw-semibold"
                                        onClick={() => navigate("/cart")}
                                        style={{ borderRadius: "8px", borderWidth: "2px" }}>
                                        ← Back to Cart
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn w-100 py-2 fw-bold text-white"
                                        onClick={placeOrder} disabled={placingOrder}
                                        style={{ background: "linear-gradient(135deg, #28a745, #20c997)", border: "none", borderRadius: "8px" }}>
                                        {placingOrder ? (
                                            <><span className="spinner-border spinner-border-sm me-2" /> Placing...</>
                                        ) : (
                                            "🔒 Place Order"
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-4 pt-3 border-top d-flex justify-content-center gap-4 flex-wrap">
                                <div className="text-center">
                                    <span className="d-block fs-4">🛡</span>
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

                    {/* Footer */}
                    <p className="text-center text-muted mt-3 small">
                        By placing this order, you agree to our 
                        <a href="#" className="text-primary text-decoration-none ms-1">Terms</a> &amp; 
                        <a href="#" className="text-primary text-decoration-none ms-1">Privacy</a>
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
                    background-color: #1a3a5c;
                    border-color: #1a3a5c;
                }
                .form-check-input:focus {
                    box-shadow: 0 0 0 0.2rem rgba(26,58,92,0.15);
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn-outline-secondary:hover {
                    background: #6c757d;
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default Checkout;