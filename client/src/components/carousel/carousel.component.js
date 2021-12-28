import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./carousel.styles.css";

export default function CarouselComponent() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        let response = await fetch("http://127.0.0.1:5000/banners");
        response = await response.json();
        setBanners(response);
      } catch (error) {
        console.error(error, "something went wrong!");
      }
    }
    fetchBanners();
  }, []);

  return (
    <Carousel
      autoPlay={true}
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
    >
      {banners &&
        banners.map((item) => {
          return (
            <div key={item.id}>
              <img src={item.bannerImageUrl} alt={item.bannerImageAlt} />
            </div>
          );
        })}
    </Carousel>
  );
}
