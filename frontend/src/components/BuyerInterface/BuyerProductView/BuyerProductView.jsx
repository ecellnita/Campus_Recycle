import React, { useEffect, useState } from "react";
import "./BuyerProductView.css";
import {
  Flame,
  Sparkle,
  Share,
  Box,
  Plus,
  Minus,
} from "lucide-react";
import { apiConnector } from "../../../utils/Apiconnecter";
import { authroutes } from "../../../apis/apis";
import { useParams } from "react-router-dom";
import { GetContext } from "../../../context/ProductsProvider";

function BuyerProductView() {
  const { product, setProduct } = GetContext();
  const [loading, setLoading] = useState(true);
  const [isRequested, setIsRequested] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [productQuantity, setProductQuantity] = useState(0);
  const { productid } = useParams();

  // ✅ Fetch product details
  const fetchProductDetails = async () => {
    try {
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "application/json", // ✅ JSON, not form-data
      };
      const bodyData = {
        productid,
      };
      const response = await apiConnector(
        "POST",
        authroutes.GET_PRODUCT_DETAILS,
        bodyData,
        api_header
      );

      console.log("Product details:", response.data);

      if (response.data.success) {
        setProduct(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle quantity change
  const handleChangeProductQuantity = (action) => {
    if (!product) return;
    if (action === "inc") {
      if (productQuantity + 1 > product.quantity) return;
      setProductQuantity(productQuantity + 1);
    } else {
      if (productQuantity - 1 < 0) return;
      setProductQuantity(productQuantity - 1);
    }
  };

  // ✅ Request product
  const handleProductRequest = async () => {
    if (isRequested || !product) return;
    if (productQuantity === 0) {
      alert("Please select at least one product");
      return;
    }

    setIsRequesting(true);
    const user = JSON.parse(localStorage.getItem("campusrecycleuser"));
    const buyerEmail = user?.email;

    try {
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "application/json",
      };
      const bodyData = {
        buyername: buyerEmail,
        selleremail: product.owner.email,
        productid: product._id,
        quantity: productQuantity,
      };
      const response = await apiConnector(
        "POST",
        authroutes.PRODUCT_REQUEST,
        bodyData,
        api_header
      );

      console.log("Product request response:", response.data);
      if (response.data.success) {
        alert("Product requested successfully!");
        setIsRequested(true);
      }
    } catch (error) {
      console.log("Error requesting product:", error);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productid]);

  if (loading) {
    return (
      <div className="buyer-product-view">
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="buyer-product-view">
        <p style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="buyer-product-view">
      <div className="buyer-product-view-container">
        <h3>{product.productname}</h3>

        <div className="buyer-product-view-container-product-image">
          <div className="buyer-product-view-container-product-image-main">
            <img src={product.images?.[0]} alt="product main" />
          </div>

          <div className="buyer-product-view-container-product-image-secondary-first">
            {product.images?.slice(1, 3).map((img, i) => (
              <img key={i} src={img} alt={`product-${i}`} />
            ))}
          </div>

          <div className="buyer-product-view-container-product-image-secondary-second">
            {product.images?.slice(3, 5).map((img, i) => (
              <img key={i} src={img} alt={`product-${i + 3}`} />
            ))}
          </div>
        </div>

        <div className="buyer-product-view-container-product-details">
          <div className="buyer-product-view-container-product-details-info">
            <div className="seller-account">
              <div className="profile-picture">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="Seller"
                />
              </div>
              <div className="profile-desc">
                <h6>
                  Selling from {product.owner.firstname} {product.owner.lastname}
                </h6>
                <p>Seller</p>
              </div>
            </div>

            <div className="product-perks">
              <div className="icon">
                <Box />
              </div>
              <div className="perk-info">
                <h6>All your college necessities are right here</h6>
                <p>No need to search anywhere else!</p>
              </div>
            </div>

            <div className="product-perks">
              <div className="icon">
                <Flame />
              </div>
              <div className="perk-info">
                <h6>Anyone can be both a buyer and a seller!</h6>
                <p>Join us in our recycling initiative.</p>
              </div>
            </div>

            <div className="product-perks">
              <div className="icon">
                <Share />
              </div>
              <div className="perk-info">
                <h6>Share with friends</h6>
                <p>Help them to find what they need and support sustainable choices.</p>
              </div>
            </div>

            <div className="product-perks">
              <div className="icon">
                <Sparkle />
              </div>
              <div className="perk-info">
                <h6>Give your unused items a new purpose</h6>
                <p>
                  Let’s reduce waste together. Turn clutter into cash while contributing to
                  a greener campus!
                </p>
              </div>
            </div>

            <div className="what-will-you-do">
              <h6>Product Description</h6>
              <p>{product.productdescription}</p>
            </div>

            <div className="meet-your-seller">
              <h5>Meet your seller</h5>
              <div className="card">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt="Seller"
                />
                <h5>
                  {product.owner.firstname} {product.owner.lastname}
                </h5>
                <span>Seller</span>
                <span>Email: {product.owner.email}</span>
              </div>
            </div>
          </div>

          <div className="buyer-product-view-container-product-details-request">
            <div className="price-card">
              <h5>&#x20B9;{product.price} per item</h5>
              <p>
                {product.quantity} left — {product.status}
              </p>

              <div className="quantity-input">
                <span
                  className={`quantity-input-btn-plus ${
                    productQuantity + 1 > product.quantity ? "disabled" : ""
                  }`}
                  onClick={() => handleChangeProductQuantity("inc")}
                >
                  <Plus />
                </span>
                <span className="quantity-input-counter">{productQuantity}</span>
                <span
                  className={`quantity-input-btn-minus ${
                    productQuantity - 1 < 0 ? "disabled" : ""
                  }`}
                  onClick={() => handleChangeProductQuantity("dec")}
                >
                  <Minus />
                </span>
              </div>

              <button
                className="btn"
                onClick={handleProductRequest}
                disabled={isRequested || isRequesting}
                style={{
                  cursor: isRequested ? "no-drop" : "pointer",
                  backgroundColor: isRequested ? "#63cd81" : "",
                }}
              >
                {isRequested
                  ? "Requested"
                  : isRequesting
                  ? "Requesting..."
                  : "Request"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerProductView;