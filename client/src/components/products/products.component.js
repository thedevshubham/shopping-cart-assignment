import React, { useEffect, useState } from "react";
import "./products.styles.css";
import CustomButton from "../custom-button/custom-button.component";

export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [productToShow, setProductToShow] = useState([]);
  const [filterId, setFilterId] = useState(null);
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        let response = await fetch("http://127.0.0.1:5000/products");
        if (response.ok) {
          response = await response.json();
          setProducts(response);
          setProductToShow(response);
        }
      } catch (error) {
        console.error(error, "something went wrong!");
      }
    }
    async function fetchCategories() {
      try {
        let response = await fetch("http://127.0.0.1:5000/categories");
        response = await response.json();
        setCategory(response);
      } catch (error) {
        console.error(error, "something went wrong!");
      }
    }
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filterTypeId = new URLSearchParams(window.location.search).get(
      "filter_type"
    );
    if (filterTypeId) {
      setFilterId(filterTypeId);
    }
  }, [products]);

  useEffect(() => {
    let filterItems = products;
    if (filterId) {
      filterItems = filterItems.filter((item) => {
        if (filterId === item.category) {
          return item;
        }
        return false;
      });
    }
    setProductToShow(filterItems);
  }, [filterId, products]);

  const setFilter = (id) => {
    setFilterId(id);
    let queryParams = new URLSearchParams(window.location.search);
    queryParams.set("filter_type", id);
    props.history.push("?" + queryParams);
  };

  return (
    <main className="products__parent_container">
      <aside className="products__filter">
        <ul>
          <li
            onClick={() => setFilterId(null)}
            className={
              `products__filter_item` + (filterId === null ? "_active" : "")
            }
          >
            All Products
          </li>
          {categories &&
            categories.map((item) => {
              return (
                item.enabled && (
                  <li
                    key={item.id}
                    onClick={() => setFilter(item.id)}
                    className={
                      `products__filter_item` +
                      (filterId === item.id ? "_active" : "")
                    }
                  >
                    {item.name}
                  </li>
                )
              );
            })}
        </ul>
      </aside>
      <section className="products__container">
        {productToShow &&
          productToShow.map((item) => {
            return (
              <div className="products__card" key={item.id}>
                <h3>{item.name}</h3>
                <div className="product__image">
                  <img src={item.imageURL} alt="product" />
                </div>
                <h4>{item.description}</h4>
                <CustomButton>Buy Now @ Rs.{item.price}</CustomButton>
              </div>
            );
          })}
      </section>
    </main>
  );
}
