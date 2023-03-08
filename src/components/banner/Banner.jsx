import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getBannerProducts,
  selectBannerProducts,
  selectBannerProductsError,
  selectBannerProductsStatus,
} from "../../features/product/productSlice";

import "./Banner.scss";

const Banner = () => {
  const dispatch = useDispatch();
  const bannerData = useSelector(selectBannerProducts);
  const bannerDataError = useSelector(selectBannerProductsError);
  const bannerDataStatus = useSelector(selectBannerProductsStatus);

  useEffect(() => {
    dispatch(getBannerProducts());
  }, []);

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>{bannerData[0]?.banner?.title}</h1>
          <p>{bannerData[0]?.banner?.text}</p>
          <div className="ctas">
            <Link to={`/products/${bannerData[0]?._id}`} className="banner-cta">
              Read More
            </Link>
            {/* TODO: order the product directly */}
            <Link
              to={`/products/${bannerData[0]?._id}`}
              className="banner-cta v2"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <img
          className="banner-img"
          src={bannerData[0]?.images[0]?.url}
          alt={bannerData[0]?.title}
        />
      </div>
    </div>
  );
};
export default Banner;
