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
                <div class="toast-header" style="background: #0D6EFD; color: white;">
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
                <div className="spinner-border" style={{ 
                    color: '#0D6EFD',
                    width: "3rem", 
                    height: "3rem" 
                }} />
                <p className="mt-3 text-muted">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid px-4 py-5">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: '#0D6EFD' }}>📦 Product Catalog</h2>
                    <p className="text-muted mb-0">Discover our amazing collection</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <span className="badge rounded-pill px-4 py-2" style={{ background: '#0D6EFD' }}>
                        {products.length} Items
                    </span>
                    <button 
                        className="btn btn-sm" 
                        onClick={fetchProducts}
                        style={{
                            background: '#0D6EFD',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'rotate(180deg)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'rotate(0deg)';
                        }}
                    >
                        🔄
                    </button>
                </div>
            </div>
            <hr className="mt-0" style={{ borderColor: '#0D6EFD', opacity: 0.3 }} />

            {/* Product Grid */}
            <div className="row g-4">
                {products.map((product) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={product.productId}>
                        <div className="card h-100 border-0 shadow-sm hover-card rounded-4" style={{
                            border: '1px solid rgba(13, 110, 253, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(13, 110, 253, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
                        }}>
                            <div className="card-img-top d-flex align-items-center justify-content-center position-relative" 
                                style={{ 
                                    height: "200px", 
                                    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                                    borderRadius: "16px 16px 0 0" 
                                }}>
                                <span style={{ fontSize: "4rem", opacity: 0.7 }}>📦</span>
                                <span className="position-absolute top-0 end-0 m-3 badge rounded-pill px-3" style={{
                                    background: '#0D6EFD',
                                    color: '#fff'
                                }}>In Stock</span>
                            </div>
                            
                            <div className="card-body d-flex flex-column p-4">
                                <h5 className="fw-bold mb-2" style={{ color: '#2d3436' }}>{product.productName}</h5>
                                <p className="text-muted small mb-3" style={{ minHeight: "2.5rem" }}>{product.description}</p>
                                
                                <div className="mt-auto">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <span style={{ color: '#f39c12' }}>⭐⭐⭐⭐½</span>
                                        <small className="text-muted">(4.5)</small>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <div>
                                            <small className="text-muted">Price</small>
                                            <h4 className="fw-bold mb-0" style={{ color: '#0D6EFD' }}>₹{product.price}</h4>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn rounded-pill px-3 py-2 fw-semibold"
                                                onClick={() => addToCart(product.productId)}
                                                disabled={addingToCart === product.productId}
                                                style={{
                                                    background: '#0D6EFD',
                                                    color: '#fff',
                                                    border: 'none',
                                                    fontSize: "13px",
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'scale(1.05)';
                                                    e.target.style.boxShadow = '0 6px 20px rgba(13, 110, 253, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'scale(1)';
                                                    e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                                                }}
                                            >
                                                {addingToCart === product.productId ? (
                                                    <span className="spinner-border spinner-border-sm" />
                                                ) : (
                                                    "🛒 Add"
                                                )}
                                            </button>
                                            <button
                                                className="btn rounded-pill px-3 py-2"
                                                onClick={() => navigate(`/productdetails/${product.productId}`)}
                                                style={{
                                                    background: 'transparent',
                                                    color: '#0D6EFD',
                                                    border: '2px solid #0D6EFD',
                                                    fontSize: "13px",
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
                    <div className="card shadow-lg border-0 rounded-4 d-inline-block px-5 py-4" style={{
                        border: '2px solid #0D6EFD'
                    }}>
                        <span style={{ fontSize: "4rem" }}>📭</span>
                        <h4 className="mt-3" style={{ color: '#0D6EFD' }}>No Products Available</h4>
                        <p className="text-muted">Check back later for new arrivals!</p>
                    </div>
                </div>
            )}

            <style>{`
                .hover-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
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

export default Products;