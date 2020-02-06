import React, { useState } from "react";
import Layout from "../share/Layout";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const handleChange = e => {
    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  const signUpForm = () => (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          value={values.name}
          name="name"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange}
          type="email"
          className="form-control"
          value={values.email}
          name="email"
        />
      </div>
      <div className="form-group">
        <label className="text-muted" value={values.password}>
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          name="password"
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );

  return (
    <Layout
      title="Signup Page"
      description="Signup to Node E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
