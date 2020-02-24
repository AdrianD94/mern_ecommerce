import React, { useState, useEffect } from "react";
import Layout from "../share/Layout";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: "false",
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    console.log(formData);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(values);
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          createdProduct: data.name
        });
      }
    });
    //
  };

  const newProductForm = () => (
    <form onSubmit={onSubmit} className="mb-3">
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          className="form-control"
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          className="form-control"
          onChange={handleChange("description")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          className="form-control"
          onChange={handleChange("price")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleChange("category")}>
          <option>Please select</option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          className="form-control"
          onChange={handleChange("quantity")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={handleChange("shipping")}>
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button className="btn btn-outline-primary">Create Product</button>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to dashboard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Add a new product"
      description={`Hello ${user.name},ready to add a new product?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newProductForm()}</div>
      </div>
    </Layout>
  );
};
export default AddProduct;
