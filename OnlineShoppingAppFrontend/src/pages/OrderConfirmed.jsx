import { Link } from "react-router-dom";

const OrderConfirmed = () => {
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    return (
        <div className="container-fluid px-4 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header */}
                        <div className="card-header text-white py-3 px-4" 
                            style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", borderBottom: "none" }}>
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div>
                                    <span className="badge bg-white text-primary px-3 py-1 rounded-pill">✅ Confirmed</span>
                                    <h6 className="text-white-50 mt-1 mb-0 fw-light">Thank you for your purchase</h6>
                                </div>
                                <div className="text-end">
                                    <small className="text-white-50 d-block">Order ID</small>
                                    <span className="fw-bold text-white" style={{ letterSpacing: "0.5px", fontSize: "0.9rem" }}>
                                        #{orderNumber}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Success Icon */}
                            <div className="text-center mb-4">
                                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        background: "rgba(26, 58, 92, 0.08)",
                                        border: "3px solid #4a90e2",
                                        animation: "pulse 2s infinite"
                                    }}>
                                    <span style={{ fontSize: "2.8rem" }}>✅</span>
                                </div>
                                <h3 className="fw-bold" style={{ color: "#1a3a5c" }}>Order Placed!</h3>
                                <p className="text-muted">We're processing your order.</p>
                            </div>

                            {/* Status Cards */}
                            <div className="row g-2 mb-4">
                                {[
                                    { icon: "📦", label: "Status", value: "Confirmed", color: "#28a745" },
                                    { icon: "💳", label: "Payment", value: "Completed", color: "#28a745" },
                                    { icon: "🚚", label: "Delivery", value: "Processing", color: "#2c5f8a" }
                                ].map((item, i) => (
                                    <div className="col-4" key={i}>
                                        <div className="p-2 rounded-3 text-center bg-light">
                                            <span className="d-block fs-4">{item.icon}</span>
                                            <small className="text-muted d-block">{item.label}</small>
                                            <span className="fw-semibold small" style={{ color: item.color }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Details */}
                            <div className="bg-light rounded-3 p-3 mb-4">
                                <h6 className="fw-bold mb-2 small" style={{ color: "#1a3a5c" }}>📋 Order Details</h6>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <small className="text-muted d-block">Order Date</small>
                                        <span className="fw-semibold small">
                                            {new Date().toLocaleDateString('en-US', { 
                                                month: 'short', day: 'numeric', 
                                                hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block">Delivery</small>
                                        <span className="fw-semibold text-success small">
                                            {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                <Link to="/" className="btn btn-primary px-4 py-2 fw-semibold"
                                    style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", border: "none", borderRadius: "8px" }}>
                                    ← Continue Shopping
                                </Link>
                            </div>

                            {/* Info */}
                            <div className="mt-4 pt-3 border-top d-flex justify-content-center gap-3 flex-wrap">
                                {[
                                    { icon: "📧", label: "Email sent" },
                                    { icon: "📱", label: "Track order" },
                                    { icon: "💬", label: "24/7 Support" }
                                ].map((item, i) => (
                                    <div className="text-center" key={i}>
                                        <span className="d-block fs-5">{item.icon}</span>
                                        <small className="text-muted">{item.label}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="row g-2 mt-3">
                        {[
                            { icon: "🔒", label: "Secure", sub: "256-bit SSL" },
                            { icon: "🔄", label: "Free Returns", sub: "30 days" },
                            { icon: "🎧", label: "Support", sub: "24/7" },
                            { icon: "⭐", label: "Trusted", sub: "4.8 rating" }
                        ].map((item, i) => (
                            <div className="col-3 text-center" key={i}>
                                <div className="p-2 bg-white rounded-3 shadow-sm">
                                    <span className="d-block fs-4">{item.icon}</span>
                                    <small className="text-muted d-block">{item.label}</small>
                                    <small className="text-muted d-block" style={{ fontSize: "0.6rem" }}>{item.sub}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .card {
                    animation: slideUp 0.4s ease-out;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(26,58,92,0.3);
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmed;