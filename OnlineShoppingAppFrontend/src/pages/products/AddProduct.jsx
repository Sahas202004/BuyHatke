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

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
            [e.target.description]:e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await productService.addProduct({
                productName: product.productName,
                description: product.description,
                price: Number(product.price)
            });

            alert("Product added successfully.");

            setProduct({
                productName: "",
                description: "",
                price: ""
            });

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Unable to add product.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h3>Add New Product</h3>
                        </div>

                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="productName"
                                        value={product.productName}
                                        onChange={handleChange}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        placeholder="Enter product description"
                                        required
                                        rows="3"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Add Product
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;