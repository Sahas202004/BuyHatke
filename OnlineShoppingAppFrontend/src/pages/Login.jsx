import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await authService.login(formData);
            navigate("/");
        } catch (err) {
            if (Array.isArray(err.response?.data)) {
                setError(err.response.data.map((x) => x.description).join(", "));
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="card border-0 shadow-lg rounded-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <div className="card-header text-white py-4 text-center" style={{
                            background: '#0D6EFD',
                            borderBottom: 'none',
                            borderRadius: '14px 14px 0 0'
                        }}>
                            <div className="mb-2">
                                <span style={{ fontSize: "2.5rem" }}>🔐</span>
                            </div>
                            <h3 className="fw-bold mb-1">Welcome Back</h3>
                            <p className="text-white-50 mb-0 small">Login to your account</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {error && (
                                <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center gap-2" role="alert">
                                    <span>❌</span>
                                    <div>
                                        <strong>Login Failed!</strong>
                                        <p className="mb-0 small">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Email Address
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{
                                            background: '#f8f9fc',
                                            border: '2px solid #e9ecef',
                                            borderRight: 'none',
                                            borderRadius: '10px 0 0 10px'
                                        }}>
                                            📧
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            style={{
                                                background: "#f8f9fc",
                                                border: '2px solid #e9ecef',
                                                borderLeft: 'none',
                                                borderRadius: '0 10px 10px 0',
                                                padding: '12px'
                                            }}
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                            Password
                                        </label>
                                        <Link to="/forgot-password" style={{ 
                                            color: '#0D6EFD', 
                                            fontSize: '0.8rem',
                                            textDecoration: 'none'
                                        }}>
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{
                                            background: '#f8f9fc',
                                            border: '2px solid #e9ecef',
                                            borderRight: 'none',
                                            borderRadius: '10px 0 0 10px'
                                        }}>
                                            🔒
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            style={{
                                                background: "#f8f9fc",
                                                border: '2px solid #e9ecef',
                                                borderLeft: 'none',
                                                borderRight: 'none',
                                                padding: '12px'
                                            }}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            className="btn"
                                            onClick={togglePasswordVisibility}
                                            disabled={loading}
                                            style={{
                                                background: "#f8f9fc",
                                                border: '2px solid #e9ecef',
                                                borderLeft: 'none',
                                                borderRadius: '0 10px 10px 0',
                                                padding: '0 15px'
                                            }}
                                        >
                                            {showPassword ? "👁️" : "👁️‍🗨️"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-2 fw-bold text-white mb-3"
                                    disabled={loading}
                                    style={{
                                        background: '#0D6EFD',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontSize: '16px',
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
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2" /> Logging in...</>
                                    ) : (
                                        "🚀 Login"
                                    )}
                                </button>

                                <div className="form-check mb-3">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="remember"
                                        style={{
                                            borderColor: '#0D6EFD'
                                        }}
                                    />
                                    <label className="form-check-label small text-muted" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                            </form>

                            <div className="position-relative my-3">
                                <hr />
                                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">
                                    or
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <button className="btn w-50 py-2" style={{
                                    border: '2px solid #e9ecef',
                                    borderRadius: '10px',
                                    background: '#fff',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#f8f9fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#fff';
                                }}>
                                    📧 Google
                                </button>
                                <button className="btn w-50 py-2" style={{
                                    border: '2px solid #e9ecef',
                                    borderRadius: '10px',
                                    background: '#fff',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#f8f9fa';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = '#fff';
                                }}>
                                    📱 Facebook
                                </button>
                            </div>

                            <div className="mt-4 pt-3 border-top text-center">
                                <p className="mb-0 text-muted small">
                                    Don't have an account?{" "}
                                    <Link to="/register" style={{ 
                                        color: '#0D6EFD', 
                                        fontWeight: '600', 
                                        textDecoration: 'none' 
                                    }}>
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            <div className="mt-3 d-flex justify-content-center gap-3">
                                <small className="text-muted">🛡️ Secure</small>
                                <small className="text-muted">🔒 Encrypted</small>
                                <small className="text-muted">✅ Verified</small>
                            </div>
                        </div>
                    </div>
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
                .form-control:focus {
                    border-color: #0D6EFD !important;
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15) !important;
                    background: #fff !important;
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn:disabled:hover {
                    transform: none !important;
                }
                .alert {
                    animation: shake 0.5s ease;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .position-relative hr {
                    margin: 0;
                }
                .position-absolute {
                    background: white;
                    padding: 0 10px;
                }
                .form-check-input:checked {
                    background-color: #0D6EFD;
                    border-color: #0D6EFD;
                }
                .form-check-input:focus {
                    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.15);
                    border-color: #0D6EFD;
                }
            `}</style>
        </div>
    );
};

export default Login;