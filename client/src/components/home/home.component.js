import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarouselComponent from "../carousel/carousel.component";
import CustomButton from "../custom-button/custom-button.component";
import "./home.styles.css";

export default function Home() {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        let response = await fetch("http://127.0.0.1:5000/categories");
        response = await response.json();
        setCategory(response);
      } catch (error) {
        console.error(error, "something went wrong!");
      }
    }
    fetchCategories();
  }, []);

  return (
    <main className="home__parent container">
      <CarouselComponent />
      <div className="home__categories">
        {categories &&
          categories.map((item, index) => {
            if (item.enabled) {
              return (
                <div
                  className={
                    `home__category` + (index % 2 === 0 ? ` right` : ` left`)
                  }
                  key={item.id}
                >
                  <div className="home__category_info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="home__explore_btn">
                      <Link
                        to={{
                          pathname: "/products",
                          search: `?filter_type=${item.id}`,
                        }}
                      >
                        <CustomButton>Explore</CustomButton>
                      </Link>
                    </div>
                  </div>
                  <div className="home__category_image">
                    <img
                      src={item.imageUrl}
                      alt="category logo"
                      height="auto"
                      width="100%"
                    />
                  </div>
                </div>
              );
            }
          })}
      </div>
    </main>
  );
}
