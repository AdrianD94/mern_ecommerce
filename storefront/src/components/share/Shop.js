import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts, getCategories } from "./apiShare";
import Card from "./Card";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  return (
    <Layout
      title="Shop Page"
      description=" Search and find products of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">{JSON.stringify(categories)}</div>
        <div className="col-8">right sidebar</div>
      </div>
    </Layout>
  );
};

export default Shop;
