import { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart(product.productId, quantity);
        setQuantity(1);
    };

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">

                    <h5 className="card-title">{product.productName}</h5>

                    <h6 className="text-success mb-3">
                        ₹{product.price}
                    </h6>

                    <div className="mb-3">
                        <label className="form-label">
                            Quantity
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                        />
                    </div>

                    <button
                        className="btn btn-primary mt-auto"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;