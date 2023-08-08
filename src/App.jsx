import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";

import Home from "./pages/Home";
import Alergens from "./pages/Alergens";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NoPage from "./pages/NoPage";

import CakeDetail from "./components/Gallery/CakeDetail";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ControlledPopup from "./components/Popup";
import BlogPostDetail from "./components/Blog/BlogPostDetail";
import Category from "./components/Category/Category";
import Tags from "./components/Tag/Tags";
import MainPostDetail from "./components/Posts/MainPostDetail";
import ScrollTo from "./components/ScrollTo";

import "./App.scss";

function App() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "light"
  );

  const handleThemeChange = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <SkeletonTheme baseColor="#ddd" highlightColor="#eee">
        <BrowserRouter>
          <Navigation handleThemeChange={handleThemeChange} theme={theme} />
          <Routes>
            <Route path="*" element={<NoPage />} />
            <Route path="/" element={<Home />} exact />
            <Route path="/alergens" element={<Alergens />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cake/:id" element={<CakeDetail />} />
            <Route path="/post/:id" element={<MainPostDetail />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/tag/:id" element={<Tags />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
          </Routes>

          <Footer />
          <ScrollTo />
          <ControlledPopup />
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;

