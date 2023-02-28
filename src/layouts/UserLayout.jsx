import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Categories from "../components/categories/Categories";
import NewsLetter from "../components/news-letter/NewsLetter";
// import ScrollToTop from "../common-components/scrollToTop/scrollToTop";

const Layout = () => {
  return (
    <>
      {/* <div className="container my-5"> */}
      <Header />
      <Outlet />
      <NewsLetter />
      <Footer />
      {/* </div> */}
      {/* <ScrollToTop /> */}
    </>
  );
};

export default Layout;
