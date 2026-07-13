import { Link } from "react-router-dom";

const OrderConfirmed = () => {
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                    <div className="card border-0 shadow-lg rounded-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <div className="card-header text-white py-3 px-4" style={{
                            background: '#0D6EFD',
                            borderBottom: 'none',
                            borderRadius: '14px 14px 0 0'
                        }}>
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                <div>
                                    <span className="badge text-white px-3 py-1 rounded-pill" style={{
                                        background: 'rgba(255,255,255,0.2)'
                                    }}>✅ Confirmed</span>
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
                            <div className="text-center mb-4">
                                <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        background: "rgba(13, 110, 253, 0.08)",
                                        border: "3px solid #0D6EFD",
                                        animation: "pulse 2s infinite"
                                    }}>
                                    <span style={{ fontSize: "2.8rem" }}>✅</span>
                                </div>
                                <h3 className="fw-bold" style={{ color: '#0D6EFD' }}>Order Placed!</h3>
                                <p className="text-muted">We're processing your order.</p>
                            </div>

                            <div className="row g-2 mb-4">
                                {[
                                    { icon: "📦", label: "Status", value: "Confirmed", color: "#28a745" },
                                    { icon: "💳", label: "Payment", value: "Completed", color: "#28a745" },
                                    { icon: "🚚", label: "Delivery", value: "Processing", color: "#0D6EFD" }
                                ].map((item, i) => (
                                    <div className="col-4" key={i}>
                                        <div className="p-2 rounded-3 text-center" style={{
                                            background: 'rgba(13, 110, 253, 0.05)',
                                            border: '1px solid rgba(13, 110, 253, 0.1)'
                                        }}>
                                            <span className="d-block fs-4">{item.icon}</span>
                                            <small className="text-muted d-block">{item.label}</small>
                                            <span className="fw-semibold small" style={{ color: item.color }}>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-3 p-3 mb-4" style={{
                                background: 'rgba(13, 110, 253, 0.05)',
                                border: '1px solid rgba(13, 110, 253, 0.1)'
                            }}>
                                <h6 className="fw-bold mb-2 small" style={{ color: '#0D6EFD' }}>📋 Order Details</h6>
                                <div className="row g-2">
                                    <div className="col-6">
                                        <small className="text-muted d-block">Order Date</small>
                                        <span className="fw-semibold small" style={{ color: '#2d3436' }}>
                                            {new Date().toLocaleDateString('en-US', { 
                                                month: 'short', day: 'numeric', 
                                                hour: '2-digit', minute: '2-digit' 
                                            })}
                                        </span>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-muted d-block">Delivery</small>
                                        <span className="fw-semibold small" style={{ color: '#0D6EFD' }}>
                                            {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                                <Link to="/" className="btn px-4 py-2 fw-semibold text-white" style={{
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
                                }}>
                                    ← Continue Shopping
                                </Link>
                            </div>

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

                    <div className="row g-2 mt-3">
                        {[
                            { icon: "🔒", label: "Secure", sub: "256-bit SSL" },
                            { icon: "🔄", label: "Free Returns", sub: "30 days" },
                            { icon: "🎧", label: "Support", sub: "24/7" },
                            { icon: "⭐", label: "Trusted", sub: "4.8 rating" }
                        ].map((item, i) => (
                            <div className="col-3 text-center" key={i}>
                                <div className="p-2 bg-white rounded-3 shadow-sm" style={{
                                    border: '1px solid rgba(13, 110, 253, 0.1)'
                                }}>
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
                    box-shadow: 0 6px 20px rgba(13, 110, 253, 0.4);
                }
            `}</style>
        </div>
    );
};

export default OrderConfirmed;