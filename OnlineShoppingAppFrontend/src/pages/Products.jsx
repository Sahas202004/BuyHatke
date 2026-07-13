import { useEffect, useState } from "react";
import productService from "../services/productService";
import cartService from "../services/cartService";
import { useNavigate } from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(null);
    const navigate = useNavigate();
    const customerId = localStorage.getItem("userId");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.getAllProducts();
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId) => {
        try {
            setAddingToCart(productId);
            await cartService.addToCart({ customerId, productId, quantity: 1 });
            window.dispatchEvent(new Event("cartUpdated"));
            showToast("Product added to cart successfully!");
        } catch (error) {
            console.error("Add to cart failed:", error);
            alert("Unable to add product.");
        } finally {
            setAddingToCart(null);
        }
    };

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.className = 'position-fixed bottom-0 end-0 p-3';
        toast.style.zIndex = '9999';
        toast.innerHTML = `
            <div class="toast show" role="alert">
                <div class="toast-header bg-success text-white">
                    <strong class="me-auto">✅ Success</strong>
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
                <p className="mt-3 text-muted">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: "#1a3a5c" }}>📦 Product Catalog</h2>
                    <p className="text-muted mb-0">Discover our amazing collection</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className="badge bg-primary rounded-pill px-4 py-2">{products.length} Items</span>
                    <button className="btn btn-outline-primary btn-sm" onClick={fetchProducts}>🔄</button>
                </div>
            </div>
            <hr className="mt-0" />

            {/* Product Grid */}
            <div className="row g-4">
                {products.map((product) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={product.productId}>
                        <div className="card h-100 border-0 shadow-sm hover-card rounded-4">
                            <div className="card-img-top d-flex align-items-center justify-content-center position-relative" 
                                style={{ height: "200px", background: "#f8f9fc", borderRadius: "16px 16px 0 0" }}>
                                <span style={{ fontSize: "4rem", opacity: 0.7 }}>📦</span>
                                <span className="position-absolute top-0 end-0 m-3 badge bg-success rounded-pill px-3">In Stock</span>
                            </div>
                            
                            <div className="card-body d-flex flex-column p-4">
                                <h5 className="fw-bold mb-2" style={{ color: "#1a3a5c" }}>{product.productName}</h5>
                                <p className="text-muted small mb-3" style={{ minHeight: "2.5rem" }}>{product.description}</p>
                                
                                <div className="mt-auto">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span className="text-warning">⭐⭐⭐⭐½</span>
                                        <small className="text-muted">(4.5)</small>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <div>
                                            <small className="text-muted">Price</small>
                                            <h4 className="fw-bold mb-0" style={{ color: "#1a3a5c" }}>₹{product.price}</h4>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-primary rounded-pill px-3 py-2 fw-semibold"
                                                onClick={() => addToCart(product.productId)}
                                                disabled={addingToCart === product.productId}
                                                style={{ background: "linear-gradient(135deg, #1a3a5c, #2c5f8a)", border: "none", fontSize: "13px" }}
                                            >
                                                {addingToCart === product.productId ? (
                                                    <span className="spinner-border spinner-border-sm" />
                                                ) : (
                                                    "🛒 Add"
                                                )}
                                            </button>
                                            <button
                                                className="btn btn-outline-primary rounded-pill px-3 py-2"
                                                onClick={() => navigate(`/productdetails/${product.productId}`)}
                                                style={{ fontSize: "13px" }}
                                            >
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
                <div className="text-center py-5">
                    <div className="card shadow-lg border-0 rounded-4 d-inline-block px-5 py-4">
                        <span style={{ fontSize: "4rem" }}>📭</span>
                        <h4 className="mt-3" style={{ color: "#1a3a5c" }}>No Products Available</h4>
                        <p className="text-muted">Check back later for new arrivals!</p>
                    </div>
                </div>
            )}

            <style>{`
                .hover-card {
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    cursor: pointer;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1) !important;
                }
                .btn-primary:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                .btn-outline-primary {
                    border-color: #1a3a5c;
                    color: #1a3a5c;
                }
                .btn-outline-primary:hover {
                    background: #1a3a5c;
                    color: #fff;
                }
            `}</style>
        </div>
    );
};

export default Products;