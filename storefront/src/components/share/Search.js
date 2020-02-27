import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiShare';

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);
  const { categories, category, search, results, searched } = data;
  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };
  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };
  const handleOnChange = name => e => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };
  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select
                className='btn mr-2'
                onChange={handleOnChange('category')}
              >
                <option value='All'>Pick Category</option>
                {categories.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type='search'
              className='form-control'
              onChange={handleOnChange('search')}
              placeholder='Search by name'
            />
          </div>
          <div className='btn input-group-apped' style={{ border: 'none' }}>
            <button className='input-group-text'>Search</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className='row'>
      <div className='container mb-3'>
        {searchForm()}
        {JSON.stringify(results)}
      </div>
    </div>
  );
};

export default Search;
