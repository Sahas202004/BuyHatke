import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cartService from "../services/cartService";
import authService from "../services/authService";

const Navbar = () => {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const customerId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const location = useLocation();

    const loadCart = async () => {
        try {
            const response = await cartService.getCart(customerId);
            setCartCount(response.data.cartItems.length);
        } catch {
            setCartCount(0);
        }
    };

    const handleLogout = async () => {
        await authService.logout();
        navigate("/");
    };

    useEffect(() => {
        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        return () => window.removeEventListener("cartUpdated", loadCart);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg sticky-top" style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            boxShadow: '0 4px 20px rgba(245, 87, 108, 0.3)'
        }}>
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/" style={{ 
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    🛒 BuyHatke
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ color: '#fff' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 fw-semibold ${location.pathname === "/products" ? "active" : ""}`}
                                to="/products"
                                style={{
                                    color: location.pathname === "/" ? '#fff' : 'rgba(255,255,255,0.85)',
                                    background: location.pathname === "/" ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                                onMouseLeave={(e) => e.target.style.background = location.pathname === "/" ? 'rgba(255,255,255,0.2)' : 'transparent'}
                            >
                                📦 Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 fw-semibold position-relative ${location.pathname === "/cart" ? "active" : ""}`}
                                to="/cart"
                                style={{
                                    color: location.pathname === "/cart" ? '#fff' : 'rgba(255,255,255,0.85)',
                                    background: location.pathname === "/cart" ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
                                onMouseLeave={(e) => e.target.style.background = location.pathname === "/cart" ? 'rgba(255,255,255,0.2)' : 'transparent'}
                            >
                                🛒 Cart
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" style={{
                                        background: '#ffd93d',
                                        color: '#333',
                                        boxShadow: '0 2px 8px rgba(255,217,61,0.5)',
                                        fontSize: '0.7rem',
                                        padding: '0.35rem 0.6rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                        <span className="visually-hidden">items in cart</span>
                                    </span>
                                )}
                            </Link>
                        </li>

                        {userName && (
                            <li className="nav-item">
                                <span className="nav-link" style={{ 
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    👋 {userName}
                                </span>
                            </li>
                        )}

                        {customerId && (
                            <li className="nav-item ms-2">
                                <button
                                    className="btn btn-sm px-4 py-2 fw-semibold"
                                    onClick={handleLogout}
                                    style={{
                                        background: 'rgba(255,255,255,0.2)',
                                        color: '#fff',
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        borderRadius: '25px',
                                        transition: 'all 0.3s ease',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#fff';
                                        e.target.style.color = '#f5576c';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'rgba(255,255,255,0.2)';
                                        e.target.style.color = '#fff';
                                    }}
                                >
                                    🚪 Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;