import { Outlet } from "react-router-dom";
import Footer from "../user-components/footer/Footer";
import Header from "../user-components/header/Header";
import ScrollToTop from "../common-components/scrollToTop/scrollToTop";

const Layout = () => {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </div>
  );
};
export default Layout;
