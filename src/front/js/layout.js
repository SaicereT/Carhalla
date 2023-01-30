import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { FormUser } from "./pages/formUser.jsx";
import injectContext from "./store/appContext.js";
import { Profile } from "./component/profile_page.jsx";
import { Frontpage } from "./pages/FrontPage.jsx";
import { AddPost } from "./pages/addPost.jsx";
import { Navbar } from "./component/navbar.jsx";
import { Footer } from "./component/footer";
import { PostDetailsPage } from "./pages/postDetailsPage.jsx";
import { AccountRecovery } from "./pages/AccountRecovery.jsx";

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
            <Route element={<Frontpage />} path="/" />
            <Route element={<PostDetailsPage />} path="/posts/:postid" />
            <Route element={<FormUser />} path="/formUser" />
            <Route element={<AddPost />} path="/addPost" />
            <Route element={<Profile />} path="/profile_page" />
            <Route element={<AccountRecovery />} path="/accountRecovery" />
            <Route element={<h1>Not found!</h1>} path="*" />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
