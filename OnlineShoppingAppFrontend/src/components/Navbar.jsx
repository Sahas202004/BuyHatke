import { useEffect, useState } from "react";
import { Link, useLocation,useNavigate  } from "react-router-dom";
import cartService from "../services/cartService";
import authService from "../services/authService";

const Navbar = () => {
    const navigate = useNavigate(); 
    const [cartCount, setCartCount] = useState(0);

    const customerId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const location = useLocation();
    // console.log("Customer ID in Navbar:", customerId);

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

        const handleCartUpdate = () => {
            loadCart();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg sticky-top">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    Online Shopping
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-lg-center">
                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 fw-semibold ${location.pathname === "/" ? "active" : ""}`}
                                to="/"
                            >
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link px-3 fw-semibold position-relative ${location.pathname === "/cart" ? "active" : ""}`}
                                to="/cart"
                            >
                                Cart
                                {cartCount > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartCount}
                                        <span className="visually-hidden">items in cart</span>
                                    </span>
                                )}
                            </Link>
                        </li>

                        {/* Customer ID (optional) */}
                        {userName && (
                            <li className="nav-item">
                                <span className="nav-link text-light opacity-50 small">
                                    Welcome, {userName}
                                </span>
                            </li>
                        )}
                        {customerId && (
                            <li className="nav-item">
                                <span className="nav-link text-light opacity-50 small">
                                    Welcome, {customerId}
                                </span>
                            </li>
                        )}
                        {customerId &&(
                            <li className="nav-item ms-3">
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Logout
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