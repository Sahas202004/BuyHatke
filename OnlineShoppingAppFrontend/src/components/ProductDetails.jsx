import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import productService from "../services/productService";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productService.getProductById(id);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" style={{
                    color: '#0D6EFD',
                    width: '3rem',
                    height: '3rem'
                }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <h5 className="mt-3" style={{ color: '#636e72' }}>Loading product details...</h5>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mt-5 text-center">
                <div className="card border-0 shadow-sm" style={{ 
                    borderRadius: '16px',
                    border: '2px solid #0D6EFD'
                }}>
                    <div className="card-body p-5">
                        <span style={{ fontSize: '4rem' }}>🔍</span>
                        <h3 className="mt-3" style={{ color: '#2d3436' }}>Product not found</h3>
                        <p style={{ color: '#636e72' }}>The product you're looking for doesn't exist.</p>
                        <Link to="/" className="btn" style={{
                            background: '#0D6EFD',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '10px 30px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                            e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = 'none';
                        }}>
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <Link to="/" className="btn mb-4" style={{
                background: '#0D6EFD',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                padding: '8px 20px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
            }}>
                ← Back to Products
            </Link>

            <div className="card border-0 shadow-lg" style={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#ffffff',
                border: '2px solid #0D6EFD'
            }}>
                <div className="row g-0">
                    {/* Product Image Section */}
                    <div className="col-md-5" style={{
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        minHeight: '400px',
                        position: 'relative'
                    }}>
                        <div className="text-center">
                            <span style={{ fontSize: '8rem' }}>📦</span>
                            <p style={{ color: '#636e72', fontSize: '0.9rem', marginTop: '10px' }}>
                                Product Image
                            </p>
                        </div>
                        {/* Decorative overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(13, 110, 253, 0.03)',
                            pointerEvents: 'none'
                        }}></div>
                    </div>

                    {/* Product Details Section */}
                    <div className="col-md-7">
                        <div className="card-body p-5">
                            <div className="mb-3">
                                <span className="badge" style={{
                                    background: '#0D6EFD',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {product.category || 'General'}
                                </span>
                            </div>

                            <h2 className="fw-bold mb-3" style={{
                                color: '#2d3436',
                                fontSize: '2.2rem'
                            }}>
                                {product.productName}
                            </h2>

                            <div className="mb-4" style={{
                                background: '#f8f9fa',
                                borderRadius: '12px',
                                padding: '15px 20px',
                                borderLeft: '4px solid #0D6EFD'
                            }}>
                                <h5 className="fw-semibold mb-2" style={{ color: '#2d3436' }}>
                                    📝 Description
                                </h5>
                                <p style={{
                                    color: '#636e72',
                                    lineHeight: '1.8',
                                    fontSize: '1rem',
                                    margin: 0
                                }}>
                                    {product.description}
                                </p>
                            </div>

                            <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                                <div>
                                    <small style={{ color: '#b2bec3', fontSize: '0.8rem' }}>
                                        Price
                                    </small>
                                    <h2 className="fw-bold" style={{
                                        color: '#0D6EFD',
                                        fontSize: '2.5rem',
                                        margin: 0
                                    }}>
                                        ₹{product.price}
                                    </h2>
                                </div>
                            </div>

                            {/* Additional Product Info */}
                            <hr className="my-4" style={{ 
                                border: 'none',
                                height: '2px',
                                background: '#0D6EFD'
                            }} />

                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="d-flex align-items-center gap-2 p-2" style={{
                                        background: '#f8f9fa',
                                        borderRadius: '10px'
                                    }}>
                                        <span style={{ fontSize: '1.2rem' }}>⭐</span>
                                        <div>
                                            <small style={{ color: '#b2bec3', fontSize: '0.7rem' }}>Rating</small>
                                            <p className="fw-semibold mb-0" style={{ color: '#2d3436' }}>
                                                4.5 / 5.0
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="d-flex align-items-center gap-2 p-2" style={{
                                        background: '#f8f9fa',
                                        borderRadius: '10px'
                                    }}>
                                        <span style={{ fontSize: '1.2rem' }}>🛍️</span>
                                        <div>
                                            <small style={{ color: '#b2bec3', fontSize: '0.7rem' }}>Stock</small>
                                            <p className="fw-semibold mb-0" style={{ 
                                                color: product.stock > 0 ? '#0D6EFD' : '#dc3545'
                                            }}>
                                                {product.stock > 0 ? `✅ ${product.stock} available` : '❌ Out of Stock'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Features Section */}
                            <div className="mt-4 p-3" style={{
                                background: 'rgba(13, 110, 253, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid rgba(13, 110, 253, 0.1)'
                            }}>
                                <div className="row text-center">
                                    <div className="col-4">
                                        <span style={{ fontSize: '1.5rem' }}>🚚</span>
                                        <p className="mb-0" style={{ fontSize: '0.8rem', color: '#636e72' }}>
                                            Free Shipping
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <span style={{ fontSize: '1.5rem' }}>🔄</span>
                                        <p className="mb-0" style={{ fontSize: '0.8rem', color: '#636e72' }}>
                                            7 Days Return
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <span style={{ fontSize: '1.5rem' }}>🔒</span>
                                        <p className="mb-0" style={{ fontSize: '0.8rem', color: '#636e72' }}>
                                            Secure Payment
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Buy Now Button */}
                            <div className="mt-4">
                                <button className="btn w-100 fw-bold py-3" style={{
                                    background: '#0D6EFD',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.02)';
                                    e.target.style.boxShadow = '0 6px 25px rgba(13, 110, 253, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(13, 110, 253, 0.3)';
                                }}>
                                    🛒 Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;