import Header from "./Component/Layout/Header";
import Footer from "./Component/Layout/Footer";
import Home from "./Component/Page/Home";
import ProductList from "./Component/Page/ProductList";
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProductDetails from "./Component/Page/ProductDetails";
import SignUp from "./Component/Page/SignUp";
import SignIn from "./Component/Page/SignIn";
import ForgotPassword from "./Component/Page/ForgotPassword";
import AccountPage from "./Component/Page/AccountPage";
import Wishlist from "./Component/Page/Wishlist";
import Cart from "./Component/Page/Cart";
import Checkout from "./Component/Page/Checkout";
import Blog from "./Component/Page/Blog";
import Contact from "./Component/Page/Contact";
import AboutUs from "./Component/Page/AboutUs";
import PrivacyPolicy from "./Component/Page/PrivacyPolicy";
import ReturnAndRefund from "./Component/Page/ReturnAndRefund";
import TermsAndConditions from "./Component/Page/TermsAndConditions";
import TermsOfUse from "./Component/Page/TermsOfUse";
import SuccessPage from "./Component/Page/SuccessPage";
import Shippingpolicy from "./Component/Page/Shippingpolicy";
import Subcategorylist from "./Component/Page/Subcategorylist";
import Brand from "./Component/Page/Brand";
import Questionanswer from "./Component/Page/Questionanswer";
import Invoice from "./Component/Page/Invoice"; // Import the Invoice component
import OtpForgotPassword from "./Component/Page/OtpForgotPassword";
import ScrollToTopOnPageChange from "./Component/Page/ScrollToTopOnPageChange";
import FAQ from "./Component/Page/FAQ";

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showHeaderAndFooter = !location.pathname.includes('/invoice');

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <ScrollToTopOnPageChange />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorylist/:id" element={<ProductList />} />
        <Route path="/brand/:id" element={<Brand />} />
        <Route path="/Subcategorylist/:id" element={<Subcategorylist />} />
        <Route path="ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Otp" element={<OtpForgotPassword />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/MyAccount" element={<AccountPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/SuccessPage" element={<SuccessPage />} />
        <Route path="/Shippingpolicy" element={<Shippingpolicy />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/ReturnAndRefund" element={<ReturnAndRefund />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/TermsOfUse" element={<TermsOfUse />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        <Route path="/questionanswer/:id" element={<Questionanswer />} />
        <Route path="/invoice/:id" element={<Invoice />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </>
  );
};

export default App;
