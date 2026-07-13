import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            await authService.register(formData);
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            if (Array.isArray(err.response?.data)) {
                setError(err.response.data.map((x) => x.description).join(", "));
            } else {
                setError("Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7 col-12">
                    <div className="card border-0 shadow-lg rounded-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <div className="card-header text-white py-4 text-center" style={{
                            background: '#0D6EFD',
                            borderBottom: 'none',
                            borderRadius: '14px 14px 0 0'
                        }}>
                            <h3 className="fw-bold mb-1">📝 Create Account</h3>
                            <p className="text-white-50 mb-0 small">Join us and start shopping</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {error && (
                                <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center gap-2" role="alert">
                                    <span>❌</span>
                                    <div>
                                        <strong>Error!</strong>
                                        <p className="mb-0 small">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        className="form-control"
                                        placeholder="Choose a username"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        minLength={6}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />

                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        minLength={6}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px'
                                        }}
                                    />
                                    <small className="text-muted">🔑 Minimum 6 characters</small>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-2 fw-bold text-white"
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
                                        <><span className="spinner-border spinner-border-sm me-2" /> Creating Account...</>
                                    ) : (
                                        "🔐 Create Account"
                                    )}
                                </button>
                            </form>

                            <div className="mt-4 pt-3 border-top text-center">
                                <p className="mb-0 text-muted small">
                                    Already have an account?{" "}
                                    <Link to="/login" style={{ color: '#0D6EFD', fontWeight: '600', textDecoration: 'none' }}>
                                        Login
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
            `}</style>
        </div>
    );
};

export default Register;