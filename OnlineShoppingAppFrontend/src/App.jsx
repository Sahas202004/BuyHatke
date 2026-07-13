import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/products/AddProduct";
import OrderConfirmed from "./pages/OrderConfirmed";
import ProductDetails from "./components/ProductDetails";
import Login from "./pages/Login";
import Documentation from "./pages/Documentation";
function App() {
    return (
        <BrowserRouter>
          <Navbar />
            <Routes>
                <Route path="/" element={<Documentation />} />
                <Route path="/products" element={<Products />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/ordersuccess" element={<OrderConfirmed />} />
                <Route path="/productdetails/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;