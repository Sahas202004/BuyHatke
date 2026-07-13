import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../services/productService";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        description: "",
        price: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await productService.addProduct({
                productName: product.productName,
                description: product.description,
                price: Number(product.price)
            });

            alert("✅ Product added successfully!");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("❌ Unable to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card border-0 shadow-lg rounded-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <div className="card-header text-white py-4 text-center" style={{
                            background: '#0D6EFD',
                            borderBottom: 'none',
                            borderRadius: '14px 14px 0 0'
                        }}>
                            <span style={{ fontSize: "2.5rem" }}>➕</span>
                            <h3 className="fw-bold mb-1">Add New Product</h3>
                            <p className="text-white-50 mb-0 small">Fill in the details to add a new product</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        📦 Product Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="productName"
                                        value={product.productName}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
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
                                        📝 Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        placeholder="Enter product description"
                                        required
                                        rows="3"
                                        disabled={loading}
                                        style={{
                                            borderRadius: '10px',
                                            border: '2px solid #e9ecef',
                                            padding: '12px',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold small" style={{ color: '#0D6EFD' }}>
                                        💰 Price
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{
                                            background: '#f8f9fc',
                                            border: '2px solid #e9ecef',
                                            borderRight: 'none',
                                            borderRadius: '10px 0 0 10px',
                                            fontWeight: 'bold',
                                            color: '#0D6EFD'
                                        }}>
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                            placeholder="Enter price"
                                            required
                                            disabled={loading}
                                            style={{
                                                borderRadius: '0 10px 10px 0',
                                                border: '2px solid #e9ecef',
                                                borderLeft: 'none',
                                                padding: '12px'
                                            }}
                                        />
                                    </div>
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
                                        <><span className="spinner-border spinner-border-sm me-2" /> Adding Product...</>
                                    ) : (
                                        "➕ Add Product"
                                    )}
                                </button>
                            </form>

                            <div className="mt-4 pt-3 border-top text-center">
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
                                    ← Back to Products
                                </button>
                            </div>

                            <div className="mt-3 d-flex justify-content-center gap-3">
                                <small className="text-muted">✅ Verified</small>
                                <small className="text-muted">🛡️ Secure</small>
                                <small className="text-muted">📦 Ready</small>
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
                .form-control:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn:disabled:hover {
                    transform: none !important;
                }
                .input-group:focus-within .input-group-text {
                    border-color: #0D6EFD;
                }
                textarea {
                    min-height: 100px;
                }
            `}</style>
        </div>
    );
};

export default AddProduct;