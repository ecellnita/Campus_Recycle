import React, { useEffect, useRef, useState } from "react";
import "./AddProductFrom.css";
import Spinner from "react-bootstrap/Spinner";
import { apiConnector } from "../../../utils/Apiconnecter";
import { authroutes } from "../../../apis/apis";
import { X } from "lucide-react";

function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageAddErr, setIsImageAddErr] = useState(false);
  const [productImageFiles, setProductImageFiles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const [addProductData, setAddProductData] = useState({
    productname: "",
    productdescription: "",
    price: "",
    status: "For Sale",
    quantity: "",
    categoryid: "",
  });

  const imagesInputRef = useRef();
  const addProductFormRef = useRef();

  const fetchAllCategories = async () => {
    try {
      const api_header = { 
        Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
      };
      const response = await apiConnector(
        "POST",
        authroutes.GET_ALL_CATEGORIES,
        {},
        api_header
      );

      if (response.data.success) {
        console.log("Categories fetched successfully");
        setAllCategories(response.data.data);
      } else {
        console.log("Failed to fetch categories:", response.data.message);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleOnChange = (e) => {
    setAddProductData({ ...addProductData, [e.target.name]: e.target.value });
  };

  const productImagefilesOnchange = (e) => {
    const newFiles = [...productImageFiles];
    for (let file of e.target.files) {
      if (!newFiles.find((f) => f.name === file.name && f.size === file.size)) {
        newFiles.push(file);
      }
    }
    setProductImageFiles(newFiles);
    setIsImageAddErr(false);
  };

  const removeProductImageFile = (fileToDelete) => {
    const newFiles = productImageFiles.filter((file) => file !== fileToDelete);
    setProductImageFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productImageFiles.length < 6) {
      setIsImageAddErr(true);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();

    for (const key in addProductData) {
      formData.append(key, addProductData[key]);
    }

    productImageFiles.forEach((file) => {
      formData.append("images", file, file.name);
    });

    try {
    const api_header = { 
      Authorization: `Bearer ${localStorage.getItem("campusrecycletoken")}`,
      "Content-Type": "multipart/form-data",
    };

    const response = await apiConnector(
      "POST",
      authroutes.ADD_PRODUCT,
      formData,
      api_header
    );

      if (response.data.success) {
        console.log("Product added successfully");
        alert("✅ Product added successfully!");

        setAddProductData({
          productname: "",
          productdescription: "",
          price: "",
          status: "For Sale",
          quantity: "",
          categoryid: "",
        });
        setProductImageFiles([]);
        imagesInputRef.current.value = null;
        addProductFormRef.current.reset();


        const user = localStorage.getItem("campusrecycleuser");
        if (user) {
          const userObj = JSON.parse(user);
          userObj.products.push(response.data.data._id);
          localStorage.setItem("campusrecycleuser", JSON.stringify(userObj));
        }
      } else {
        alert(`❌ Error: ${response.data.message}`);
      }
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Something went wrong while adding the product!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="add-product-form">
      <form onSubmit={handleSubmit} ref={addProductFormRef}>
        <div className="add-product-form-heading">
          <h3>Add New Product</h3>
        </div>

        <div className="add-product-form-body">
          <div className="form-block">
            <div className="form-segment">
              <label htmlFor="productname">Product Name</label>
              <input
                type="text"
                id="productname"
                name="productname"
                value={addProductData.productname}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="form-segment">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                min="1"
                value={addProductData.price}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <div className="form-block">
            <div className="form-segment">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={addProductData.status}
                onChange={handleOnChange}
              >
                <option value="For Sale">For Sale</option>
                <option value="Sold">Sold</option>
                <option value="Purchased">Purchased</option>
              </select>
            </div>

            <div className="form-segment">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={addProductData.quantity}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="form-segment">
              <label htmlFor="categoryid">Category</label>
              <select
                id="categoryid"
                name="categoryid"
                value={addProductData.categoryid}
                onChange={handleOnChange}
                required
              >
                <option value="">Select category</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-block-text">
          <label htmlFor="productdescription">Product Description</label>
          <textarea
            rows={10}
            id="productdescription"
            name="productdescription"
            value={addProductData.productdescription}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="add-product-form-attachments">
          <label htmlFor="product_images">Upload Images</label>
          <input
            type="file"
            id="product_images"
            accept=".jpg, .png, .jpeg"
            name="images"
            ref={imagesInputRef}
            onChange={productImagefilesOnchange}
            multiple
          />

          {productImageFiles.map((file, i) => (
            <div key={i} className="product_img_file_div">
              <span>{file.name.length > 30 ? file.name.slice(0, 30) + "..." : file.name}</span>
              <X
                style={{ cursor: "pointer", marginLeft: "8px" }}
                onClick={() => removeProductImageFile(file)}
              />
            </div>
          ))}

          {isImageAddErr && (
            <p style={{ color: "red", fontSize: "14px" }}>
              ⚠ You must add a minimum of 6 images
            </p>
          )}
        </div>

        <div className="add-product-form-footer">
          <button
            type="button"
            onClick={() => {
              setAddProductData({
                productname: "",
                productdescription: "",
                price: "",
                status: "For Sale",
                quantity: "",
                categoryid: "",
              });
              setProductImageFiles([]);
              imagesInputRef.current.value = null;
            }}
          >
            Cancel
          </button>

          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Adding... <Spinner size="sm" className="add-product-spinner" />
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
