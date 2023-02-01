import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
const getState = ({ getStore, getActions, setStore }) => {
  const [posts, setPosts] = useState([]);
  return {
    store: {
      accessToken: "",
      refreshToken: "",
      posts: [],
      userPosts: [],
      userFavorites: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      NewUser: async (data) => {
        let respuesta = await fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            firstname: data.firstname,
            lastname: data.lastname,
            is_active: true,
            telnumber: data.phone,
            address: data.address,
            country: data.city,
            age: data.age,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      LogOn: async (data) => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/login", {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (resp.status == 200) {
          let info = await resp.json();
          setStore({
            ...getStore(),
            accessToken: info.token,
            refreshToken: info.refresh,
          });
          localStorage.setItem("accessToken", info.token);
          localStorage.setItem("refreshToken", info.refresh);
          console.log(getStore());
          return true;
        } else {
          console.error("Invalid Login");
        }
      },
      loadToken: (access, refresh) => {
        setStore({
          ...getStore(),
          accessToken: access,
          refreshToken: refresh,
        });
      },
      getAuthorizationHeader: () => {
        let { accessToken } = getStore();
        return { Authorization: "Bearer " + accessToken };
      },
      getPosts: async () => {
        let response = await fetch(process.env.BACKEND_URL + "/api/posts");
        if (!response.ok) {
          console.log(response.status + ": " + response.statusText);
          return;
        }
        let data = await response.json();
        let newStore = getStore();
        newStore.posts = data.results;
        setStore(newStore);
      },
      getPostDetails: async (postid) => {
        let response = await fetch(
          process.env.BACKEND_URL + "/api/posts/" + postid
        );
        if (!response.ok) {
          console.log(response.status + ": " + response.statusText);
          return;
        }
        let data = await response.json();
        console.log(data);
        return data.results;
      },

      NewPost: async (formdata) => {
        console.log(formdata);
        let resp = await fetch(process.env.BACKEND_URL + "/api/posts/new", {
          method: "POST",
          body: formdata,
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
      },
      DeletePost: async (postid) => {
        let { userPosts } = getStore();
        let newPosts = [...userPosts];
        console.log(userPosts);
        if (userPosts.length > 0) {
          setPosts(newPosts);
          let resp = await fetch(
            process.env.BACKEND_URL + "/api/posts/delete/" + postid,
            {
              method: "DELETE",
              headers: {
                ...getActions().getAuthorizationHeader(),
              },
            }
          );
          let postindex = posts.findIndex((post) => post.id == postid);
          newPosts.splice(postindex);
          console.log(postindex);
          setStore({ userPosts: newPosts });
        }
      },
      logOut: async () => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/logout", {
          method: "POST",
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
        if (resp.status == 200 || 401) {
          setStore({
            ...getStore(),
            accessToken: "",
            refreshToken: "",
          });
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          console.log("Logged out");
        }
      },
      specificUserPosts: async () => {
        let store = getStore();
        let resp = await fetch(process.env.BACKEND_URL + "/api/user_posts", {
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        store.userPosts = data.results;
        setStore(store);
      },

      getUserInfo: async () => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/user_info", {
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        console.log(data);
        return data.results;
      },
      getUserFavorites: async () => {
        let store = getStore();
        let resp = await fetch(process.env.BACKEND_URL + "/api/favorites", {
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        store.userFavorites = data.results;
        setStore(store);
      },
      /*Nueva action arriba de esta linea*/
    },
  };
};
export default getState;
