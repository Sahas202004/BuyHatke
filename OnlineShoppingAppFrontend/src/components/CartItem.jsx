import { useState } from "react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleUpdate = () => {
        onUpdateQuantity(item.cartItemId, quantity);
    };

    const handleRemove = () => {
        onRemove(item.cartItemId);
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-body">

                <div className="row align-items-center">

                    <div className="col-md-4">
                        <h5>{item.productName}</h5>
                    </div>

                    <div className="col-md-2">
                        <strong>₹{item.price}</strong>
                    </div>

                    <div className="col-md-2">
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

                    <div className="col-md-2">
                        <strong>₹{item.totalPrice}</strong>
                    </div>

                    <div className="col-md-2 d-flex gap-2">

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={handleRemove}
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default CartItem;