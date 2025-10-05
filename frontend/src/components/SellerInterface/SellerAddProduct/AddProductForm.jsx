import React, { useEffect, useRef, useState } from "react";
import "./AddProductFrom.css";
import Spinner from "react-bootstrap/Spinner";
import { apiConnector } from "../../../utils/Apiconnecter";
import { authroutes } from "../../../apis/apis";
import { X } from "lucide-react";

function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [addProductData, setAddProductData] = useState({
    productname: "",
    productdescription: "",
    price: "",
    status: "",
    quantity: "",
    categoryid: "",
  });
  const [isImageAddErr, setIsImageAddErr] = useState(false);
  const [productImageFiles, setProductImageFiles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  const imagesInputRef = useRef();
  const addProductFormRef = useRef();

  const fetchAllCategories = async() => {
    try {
        const api_header = { 
          Authorization: `Bearer ${localStorage.getItem('campusrecycletoken')}`,
          "Content-Type": "multipart/form-data"
        };
        const bodyData = {
            // Need to write something
        }
        const response = await apiConnector("POST", authroutes.GET_ALL_CATEGORIES, bodyData, api_header);
        console.log(response.data);
        if (response.data.success) {
            console.log("Categories fetched successfully");
            setAllCategories(response.data.data);
        }
    } catch (error) {
        console.log(error);
    }
  }

  const handleOnChange = (e) => {
    console.log(e.target.value)
    setAddProductData({ ...addProductData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(productImageFiles < 6){
      return setIsImageAddErr(true);
    }

    setIsLoading(true);

    var formData = new FormData();

    for (var key in addProductData) {
        formData.append(key, addProductData[key]);
    }

    for (let i = 0; i < imagesInputRef.current.files.length; i++) {
      formData.append('images', productImageFiles[i], productImageFiles[i].name);
    }
    
    try {
      console.log(addProductData)
      const api_header = { 
        Authorization: `Bearer ${localStorage.getItem('campusrecycletoken')}`,
        "Content-Type": "multipart/form-data"
      };
      const response = await apiConnector("POST", authroutes.ADD_PRODUCT, formData, api_header);
      console.log(response.data);
      if (response.data.success) {
        setAddProductData({
          productname: "",
          productdescription: "",
          price: "",
          status: "",
          quantity: "",
          categoryid: "",
        });
        console.log("Product added");
        addProductFormRef.current.reset();
        setIsLoading(false);
        const user = localStorage.getItem('campusrecycleuser');
        const userObj = JSON.parse(user);
        const allProductIds = userObj.products;
        allProductIds.push(response.data.data._id);
        userObj.products = allProductIds;
        localStorage.setItem('campusrecycleuser', JSON.stringify(userObj));
      }else{
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const productImagefilesOnchange = (e) => {
    var files = [];
    for(let file of productImageFiles){
      files.push(file);
    }
    for(let file of e.target.files){
      console.log("file: ", file);
      files.push(file);
    }
    setProductImageFiles(files); 
  }

  const removeProductImageFile = (fileToDelete) => {
    const allFiles = productImageFiles;
    const newFiles = allFiles.filter((file)=>file!==fileToDelete);

    setProductImageFiles(newFiles);
  }

  useEffect(()=>{
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
              />
            </div>
            <div className="form-segment">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={addProductData.price}
                onChange={handleOnChange}
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
                <option value="Forsale">Forsale</option>
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
                value={addProductData.quantity}
                onChange={handleOnChange}
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
                <option>Select category</option>
                {
                  allCategories.map((category, i)=>{
                    return <option value={category._id}>{category.name}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <div className="form-block-text">
          <label htmlFor="productdescription">Product Description</label>
          <textarea
            type="text"
            rows={10}
            cols={10}
            id="productdescription"
            name="productdescription"
            value={addProductData.productdescription}
            onChange={handleOnChange}
          />
        </div>
        <div className="add-product-form-attachments">
          <div>
            <label htmlFor="product_imaged">Upload Images</label>
            <input
              type="file"
              id="product_imaged"
              accept=".jpg, .png, .jpeg"
              name="images"
              ref={imagesInputRef}
              onChange={(e)=>productImagefilesOnchange(e)}
              multiple
              hidden
            />
            {
                productImageFiles.map((file, i)=>{
                return <div key={i} className="product_img_file_div">
                  <span>{file.name.slice(0, 30)+'...'}</span>
                  <X style={{ cursor: 'pointer', margin: '0 5px' }} onClick={()=>removeProductImageFile(file)}/>
                </div>
              })
            }
            {
              isImageAddErr && <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>You must add minimum 6 images</p>
            }
          </div>
        </div>
        <div className="add-product-form-footer">
          <button
            onClick={() =>
              setAddProductData({
                productname: "",
                productdescription: "",
                price: "",
                status: "",
                quantity: "",
                categoryid: "",
              })
            }
          >
            Cancel
          </button>
          <button type="sumbit" style={{padding: isLoading ? '1px 10px' : ''}}>
            Add Product {isLoading && <Spinner className="add-product-spinner"/>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
