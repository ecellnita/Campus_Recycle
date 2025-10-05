import React, { useEffect, useState } from "react";
import { apiConnector } from "../../../utils/Apiconnecter";
import { authroutes } from "../../../apis/apis";
import Spinner from "react-bootstrap/Spinner";
import { CircleX } from "lucide-react";
import axios from "axios";

function SellerProductCard(props) {
  const [product, setProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productid: '',
    productname: '',
    productdescription: '',
    status: '',
    price: 0,
    quantity: 0,
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleEditProductOnChange = (e) => {
    if (e.target.name === "images") {
      const productImages = editFormData.images;
      for (let file of e.target.files) {
        productImages.push(file);
      }
      console.log("images after onchange: ", productImages);
      setEditFormData({ ...editFormData, images: productImages });
    } else {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveProductImage = (imageToRemove) => {
    const newProductIamges = editFormData.images.filter(
      (image) => image !== imageToRemove
    );
    setEditFormData({ ...editFormData, images: newProductIamges });
  };

  const handleSubmitEditProductForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("product id: ", editFormData.productid);
    try {
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "multipart/form-data",
      };
      const response = await apiConnector(
        "POST",
        authroutes.EDIT_PRODUCT,
        editFormData,
        api_header
      );
      console.log(response.data);
      if (response.data.success) {
        fetchProductDetails();
        console.log("product edited successfully");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const urlToImageFile = async (imageUrl, fileName) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: "blob", // Important to get the image as a Blob
      });

      const file = new File([response.data], fileName, {
        type: response.data.type,
      });

      return file;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  };

  const fetchProductDetails = async () => {
    try {
      const api_header = {
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
        "Content-Type": "multipart/form-data",
      };
      const bodyData = {
        productid: props.id,
      };
      const response = await apiConnector(
        "POST",
        authroutes.GET_PRODUCT_DETAILS,
        bodyData,
        api_header
      );
      console.log(response.data);
      if (response.data.success) {
        setProduct(response.data.data);
        const imageFiles = [];
        for (let i = 0; i < response.data.data.images.length; i++) {
          const file = await urlToImageFile(
            response.data.data.images[i],
            `${i}.png`
          );
          imageFiles.push(file);
        }
        console.log("image files: ", imageFiles);
        setEditFormData({
          productid: response.data.data._id,
          productname: response.data.data.productname,
          productdescription: response.data.data.productdescription,
          status: response.data.data.status,
          price: response.data.data.price,
          quantity: response.data.data.quantity,
          images: imageFiles,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchProductDetails();
  }, []);

  return (
    <div className="list-item">
      <div className="feature-image">
        <img src={product && product.images[0]} alt="" />
      </div>
      <div className="item-contents">
        <h5>{product && product.productname}</h5>
        <p>{product && product.productdescription}</p>
        <div className="item-contents-specs">
          <p>
            <b>Status: </b>
            {product && product.status}
          </p>
          <p>
            <b>Qty: </b>
            {product && product.quantity}
          </p>
        </div>
        <p>&#8377; {product && product.price}</p>
      </div>
      <div className="item-actions">
        <button
          className="edit-product-btn"
          data-bs-toggle="modal"
          data-bs-target={`#edit_product_modal-${props.id}`}
        >
          Edit
        </button>
        <button 
          className="delete-product-btn" 
          data-bs-toggle="modal"
          data-bs-target={`#delete_product_modal-${props.id}`}
        >
          Delete
        </button>
      </div>

      {/* Product Edit Modal Starts Here */}
      <div
        class="modal fade"
        id={`edit_product_modal-${props.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Product
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmitEditProductForm}>
                <div className="edit-product-form-section">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="productname"
                    value={editFormData && editFormData.productname}
                    onChange={handleEditProductOnChange}
                  />
                </div>
                <div className="edit-product-form-section">
                  <label>Product Description</label>
                  <input
                    type="text"
                    name="productdescription"
                    value={editFormData && editFormData.productdescription}
                    onChange={handleEditProductOnChange}
                  />
                </div>
                <div className="edit-product-form-section">
                  <label>Status</label>
                  <input
                    type="text"
                    name="status"
                    value={editFormData && editFormData.status}
                    onChange={handleEditProductOnChange}
                  />
                </div>
                <div className="edit-product-form-section">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData && editFormData.price}
                    onChange={handleEditProductOnChange}
                  />
                </div>
                <div className="edit-product-form-section">
                  <label>Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editFormData && editFormData.quantity}
                    onChange={handleEditProductOnChange}
                  />
                </div>
                <div className="edit-product-form-image-section">
                  <p>Images</p>
                  <div className="image-holder">
                    {editFormData &&
                      editFormData.images.map((image, i) => {
                        return (
                          <div className="product-edit-img" key={i}>
                            <img src={URL.createObjectURL(image)} alt="" />
                            <CircleX
                              onClick={() => handleRemoveProductImage(image)}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="image-upload-container">
                    <label htmlFor="edit-product-image-upload">
                      upload images
                    </label>
                    <input
                      type="file"
                      accept=".jpg, .png, .jpeg"
                      id="edit-product-image-upload"
                      name="images"
                      onChange={handleEditProductOnChange}
                      hidden
                    />
                  </div>
                </div>
                <div className="edit-product-form-btn-section">
                  <button
                    type="button"
                    className="edit-product-modal-btn"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="edit-product-modal-btn"
                    data-bs-dismiss="modal"
                  >
                    Update{" "}
                    {isLoading && (
                      <Spinner className="edit-product-modal-btn-spinner" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id={`delete_product_modal-${props.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete Product
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="delete-action-edit-product">
                  <button className="cancel-btn" data-bs-dismiss="modal">Cancel</button>
                  <button className="delete-btn" data-bs-dismiss="modal" 
                    onClick={()=>{
                      props.handleDeleteProduct(props.id);
                      fetchProductDetails();
                    }}
                  >
                    Delete
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProductCard;
