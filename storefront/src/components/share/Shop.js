import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts, getCategories } from "./apiShare";
import Card from "./Card";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [myFilters, setmyFilters] = useState({
    filters: { category: [], price: [] }
  });

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

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    setmyFilters(newFilters);
   
  };

  return (
    <Layout
      title="Shop Page"
      description=" Search and find products of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by category</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, "category")}
            />
          </ul>
          <h4>Filter by price</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={filters => handleFilters(filters, "price")}
            />
          </div>
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
