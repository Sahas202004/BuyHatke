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
        <div className="container-fluid px-4 py-5">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-7 col-12">
                    <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                        {/* Header */}
                        <div className="card-header text-white py-4 text-center"
                            style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", borderBottom: "none" }}>
                            <h3 className="fw-bold mb-1">Create Account</h3>
                            <p className="text-white-50 mb-0 small">Join us and start shopping</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Error Alert */}
                            {error && (
                                <div className="alert alert-danger d-flex align-items-center gap-2 border-0 rounded-3" role="alert">
                                    <span className="fs-5">❌</span>
                                    <div>
                                        <strong>Error!</strong>
                                        <p className="mb-0 small">{error}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        className="form-control form-control-lg"
                                        placeholder="Choose a username"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="form-control form-control-lg"
                                        placeholder="Enter phone number"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold small" style={{ color: "#1a3a5c" }}>
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                        minLength={6}
                                    />
                                    <small className="text-muted">Minimum 6 characters</small>
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-2 fw-bold text-white"
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
                                        <><span className="spinner-border spinner-border-sm me-2" /> Registering...</>
                                    ) : (
                                        "🔐 Create Account"
                                    )}
                                </button>
                            </form>

                            {/* Footer */}
                            <div className="mt-4 pt-3 border-top text-center">
                                <p className="mb-0 text-muted small">
                                    Already have an account?{" "}
                                    <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                                        Login
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
                .card {
                    animation: slideUp 0.4s ease-out;
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .form-control:focus {
                    border-color: #4a90e2;
                    box-shadow: 0 0 0 0.2rem rgba(26, 58, 92, 0.15);
                }
                .btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(26, 58, 92, 0.3);
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
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