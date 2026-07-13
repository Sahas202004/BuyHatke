import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productService.getProductById(id);
            setProduct(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!product) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-body">
                    <h2>{product.productName}</h2>

                    <hr />

                    <h5>Description</h5>
                    <p>{product.description}</p>

                    <h4 className="text-success">
                        ₹{product.price}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;