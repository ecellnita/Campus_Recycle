import React from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";

function ProductList(props) {
  return (
    <div className="product-list">
      <div className="row">
        {props.products && props.products
        .filter((product)=>{
          return props.categoryFilter !== "" ? product.category?.name === props.categoryFilter : 1;
        })
        .filter((product)=>{
          return props.isFilter ?  product.price <= parseInt(props.priceFilterValue) : 1;
        })
        .map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </div>
  );
}

export default ProductList;
