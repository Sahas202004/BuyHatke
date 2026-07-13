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
        <div className="container-fluid px-4 py-5">
            <div className="row justify-content-center align-items-center min-vh-75">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header */}
                        <div className="card-header text-white py-4 text-center"
                            style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", borderBottom: "none" }}>
                            <div className="mb-2">
                                <span style={{ fontSize: "2.5rem" }}>🔐</span>
                            </div>
                            <h3 className="fw-bold mb-1">Welcome Back</h3>
                            <p className="text-white-50 mb-0 small">Login to your account</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Error Alert */}
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-3" role="alert">
                                    <span className="fs-5">❌</span>
                                    <div>
                                        <strong>Login Failed!</strong>
                                        <p className="mb-0 small">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Email Address
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <span>📧</span>
                                        </span>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control form-control-lg border-0"
                                            style={{ background: "#f8f9fc" }}
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
                                        <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                            Password
                                        </label>
                                        <Link to="/forgot-password" className="small text-decoration-none">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <span>🔒</span>
                                        </span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control form-control-lg border-0"
                                            style={{ background: "#f8f9fc" }}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-light border-0"
                                            onClick={togglePasswordVisibility}
                                            disabled={loading}
                                            style={{ 
                                                background: "#f8f9fc",
                                                borderRadius: "0 8px 8px 0",
                                                padding: "0 15px"
                                            }}
                                        >
                                            {showPassword ? (
                                                <span style={{ fontSize: "1.2rem" }}>👁️</span>
                                            ) : (
                                                <span style={{ fontSize: "1.2rem" }}>👁️‍🗨️</span>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-2 fw-bold text-white mb-3"
                                    disabled={loading}
                                    style={{
                                        background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)",
                                        border: "none",
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    {loading ? (
                                        <><span className="spinner-border spinner-border-sm me-2" /> Logging in...</>
                                    ) : (
                                        "🚀 Login"
                                    )}
                                </button>

                                {/* Remember Me */}
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="remember" />
                                    <label className="form-check-label small text-muted" htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                            </form>

                            {/* Divider */}
                            <div className="position-relative my-3">
                                <hr />
                                <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 small text-muted">
                                    or
                                </span>
                            </div>

                            {/* Social Login */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary w-50 py-2" style={{ borderRadius: "8px" }}>
                                    <span>📧</span> Google
                                </button>
                                <button className="btn btn-outline-secondary w-50 py-2" style={{ borderRadius: "8px" }}>
                                    <span>📱</span> Facebook
                                </button>
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-3 border-top text-center">
                                <p className="mb-0 text-muted small">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                                        Create Account
                                    </Link>
                                </p>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-3 d-flex justify-content-center gap-3">
                                <small className="text-muted">🛡 Secure</small>
                                <small className="text-muted">🔒 Encrypted</small>
                                <small className="text-muted">✅ Verified</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .min-vh-75 {
                    min-height: 75vh;
                }
                .card {
                    animation: slideUp 0.4s ease-out;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-control:focus {
                    border-color: #4a90e2 !important;
                    box-shadow: 0 0 0 0.2rem rgba(26, 58, 92, 0.15) !important;
                    background: #fff !important;
                }
                .input-group-text {
                    border-radius: 8px 0 0 8px;
                }
                .form-control {
                    border-radius: 0 !important;
                }
                .form-control:last-child {
                    border-radius: 0 8px 8px 0 !important;
                }
                .btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(26, 58, 92, 0.3);
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn-outline-secondary:hover {
                    background: #6c757d;
                    color: #fff;
                    border-color: #6c757d;
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
                    background-color: #1a3a5c;
                    border-color: #1a3a5c;
                }
                .form-check-input:focus {
                    box-shadow: 0 0 0 0.2rem rgba(26, 58, 92, 0.15);
                }
                /* Password toggle button hover */
                .btn-light:hover {
                    background: #e9ecef !important;
                }
            `}</style>
        </div>
    );
};

export default Login;