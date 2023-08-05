import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.scss";
import Home from "./pages/Home";
import CakeDetail from "./components/Gallery/CakeDetail";
import { SkeletonTheme } from "react-loading-skeleton";
import Navigation from "./components/Navigation";
import Alergens from "./pages/Alergens";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import NoPage from "./pages/NoPage";
import ControlledPopup from "./components/Popup";
import Blog from "./pages/Blog";
import BlogPostDetail from "./components/Blog/BlogPostDetail";
import Category from "./components/Category/Category";
import Tags from "./components/Tags";
import MainPostDetail from "./components/Posts/MainPostDetail";

function App() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  const handleThemeChange = () => {
    if (theme === "white") {
      setTheme("dark");
    } else {
      setTheme("white");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <SkeletonTheme baseColor="#cd90de" highlightColor="#e399f8">
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
          <ControlledPopup />
        </BrowserRouter>
      </SkeletonTheme>
    </div>
  );
}

export default App;




