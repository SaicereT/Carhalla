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
      getPosts: async (page = 1, append = false) => {
        let response = await fetch(
          process.env.BACKEND_URL + "/api/posts?page=" + page
        );
        if (!response.ok) {
          console.log(response.status + ": " + response.statusText);
          return;
        }
        let data = await response.json();
        if (data.results.length == 0) {
          return false;
        }
        let newStore = getStore();
        if (append) {
          setStore({ posts: [...newStore.posts, ...data.results] });
          return true;
        } else {
          newStore.posts = data.results;
          setStore(newStore);
          return true;
        }
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
          let postindex = userPosts.findIndex((post) => post.post_id == postid);
          newPosts.splice(postindex, 1);
          console.log(newPosts);
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
      handleFavorites: async (postid) => {
        let { userFavorites } = getStore();
        let newFavorites = [...userFavorites];
        let favIndex = userFavorites.findIndex(
          (favorite) => favorite.post_id == postid
        );
        console.log(favIndex);
        console.log(postid);
        if (favIndex == -1) {
          let respAdd = await fetch(
            process.env.BACKEND_URL + "/api/favorites/" + postid,
            {
              method: "POST",
              headers: {
                ...getActions().getAuthorizationHeader(),
              },
            }
          );
          if (respAdd) {
            let new_fav = await respAdd.json();
          }
        } else {
          let favId = userFavorites[favIndex].id;
          let respDel = await fetch(
            process.env.BACKEND_URL + "/api/favorites/" + favId,
            {
              method: "DELETE",
              headers: {
                ...getActions().getAuthorizationHeader(),
              },
            }
          );
          newFavorites.splice(favIndex, 1);
          console.log(favId);
          setStore({ userFavorites: newFavorites });
        }
      },
      /*Nueva action arriba de esta linea*/
    },
  };
};
export default getState;
