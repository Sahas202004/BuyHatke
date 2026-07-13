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
        <div className="card border-0 shadow-sm mb-3" style={{
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            background: '#ffffff'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(4px)';
            e.currentTarget.style.boxShadow = '0 6px 25px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
            e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
        }}>
            <div className="card-body p-4">
                <div className="row align-items-center g-3">
                    {/* Product Image & Name */}
                    <div className="col-md-4">
                        <div className="d-flex align-items-center gap-3">
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                flexShrink: 0
                            }}>
                                📦
                            </div>
                            <div>
                                <h5 className="fw-bold mb-1" style={{
                                    color: '#2d3436',
                                    fontSize: '1.1rem'
                                }}>
                                    {item.productName}
                                </h5>
                                <span className="badge" style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    color: '#fff',
                                    fontSize: '0.7rem',
                                    padding: '4px 10px'
                                }}>
                                    In Stock
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="col-md-2">
                        <div>
                            <small style={{ color: '#b2bec3', fontSize: '0.7rem' }}>
                                Price
                            </small>
                            <h6 className="fw-bold mb-0" style={{
                                color: '#2d3436',
                                fontSize: '1.2rem'
                            }}>
                                ₹{item.price}
                            </h6>
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-md-2">
                        <div>
                            <small style={{ color: '#b2bec3', fontSize: '0.7rem' }}>
                                Quantity
                            </small>
                            <div className="d-flex align-items-center gap-2 mt-1">
                                <button
                                    className="btn btn-sm"
                                    style={{
                                        background: '#f1f2f6',
                                        color: '#2d3436',
                                        border: 'none',
                                        borderRadius: '8px',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                    onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    className="form-control text-center"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Math.max(1, Number(e.target.value) || 1))
                                    }
                                    style={{
                                        width: '50px',
                                        borderRadius: '8px',
                                        border: '2px solid #f1f2f6',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        padding: '4px 0',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    className="btn btn-sm"
                                    style={{
                                        background: '#f1f2f6',
                                        color: '#2d3436',
                                        border: 'none',
                                        borderRadius: '8px',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => setQuantity(quantity + 1)}
                                    onMouseEnter={(e) => e.target.style.background = '#dfe6e9'}
                                    onMouseLeave={(e) => e.target.style.background = '#f1f2f6'}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="col-md-2">
                        <div>
                            <small style={{ color: '#b2bec3', fontSize: '0.7rem' }}>
                                Total
                            </small>
                            <h6 className="fw-bold mb-0" style={{
                                color: '#f5576c',
                                fontSize: '1.2rem'
                            }}>
                                ₹{item.totalPrice}
                            </h6>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="col-md-2">
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-sm fw-semibold px-3"
                                onClick={handleUpdate}
                                style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease',
                                    padding: '8px 16px',
                                    fontSize: '0.85rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(245, 87, 108, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                🔄 Update
                            </button>
                            <button
                                className="btn btn-sm fw-semibold px-3"
                                onClick={handleRemove}
                                style={{
                                    background: '#ff6b6b',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '10px',
                                    transition: 'all 0.3s ease',
                                    padding: '8px 16px',
                                    fontSize: '0.85rem'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(255,107,107,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                🗑️ Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;