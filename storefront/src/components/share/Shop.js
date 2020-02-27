import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts, getCategories, getFilteredProducts } from "./apiShare";
import Card from "./Card";
import Checkbox from "./Checkbox";
import { prices } from "./fixedPrices";
import RadioBox from "./RadioBox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setfilteredResults] = useState(0);
  const [myFilters, setmyFilters] = useState({
    filters: { category: [], price: [] }
  });

  useEffect(() => {
    init();
    loadFilteredResuls(skip, limit, myFilters.filters);
  }, []);

  const loadFilteredResuls = newFilters => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setfilteredResults(data.data);
      }
    });
  };

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

    if (filterBy == "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResuls(myFilters.filters);
    setmyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title="Shop Page"
      description=" Search and find products of your choice"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">
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
        <div className="col-9">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults &&
              filteredResults.map((p, i) => {
                return <Card key={i} product={p} />;
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
