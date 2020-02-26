import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = e => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        onChange={handleChange}
        type="radio"
        className="mr-2 ml-4"
        name={p}
        value={`${p._id}`}
      />
      <label className="form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
