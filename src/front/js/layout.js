import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { FormUser } from "./pages/formUser.jsx";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Profile } from "./component/profile_page.jsx";
import { AddPost } from "./pages/addPost.jsx";
import { AddPhotos } from "./component/add_photos.jsx";

import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<FormUser />} path="/formUser" />
            <Route element={<AddPost />} path="/addPost" />
            <Route element={<AddPhotos />} path="/add_photos" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Profile />} path="/profile_page" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
