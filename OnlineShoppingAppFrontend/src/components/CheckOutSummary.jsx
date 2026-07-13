const CheckoutSummary = ({ cart, onCheckout }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Order Summary</h5>
            </div>

            <div className="card-body">

                <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <strong>₹{cart.subTotal}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                    <span>Discount (10%)</span>
                    <strong className="text-success">
                        -₹{cart.discount}
                    </strong>
                </div>

                <hr />

                <div className="d-flex justify-content-between mb-3">
                    <h5>Grand Total</h5>
                    <h5 className="text-primary">
                        ₹{cart.grandTotal}
                    </h5>
                </div>

                <button
                    className="btn btn-success w-100"
                    onClick={onCheckout}
                >
                    Buy Now
                </button>

            </div>
        </div>
    );
};

export default CheckoutSummary;