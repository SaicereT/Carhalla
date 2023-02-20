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
      userPostsPub: [],
      userFavorites: [],
      profilePicPub: [],
      profilePicPriv: [],
      postPicsPub: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      NewUser: async (formdata) => {
        let respuesta = await fetch(process.env.BACKEND_URL + "/api/signup", {
          method: "POST",
          body: formdata,
        });
        if (respuesta.status == 200) {
          return true;
        } else {
          false;
        }
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
          return false;
        }
      },
      loadToken: (access, refresh) => {
        setStore({
          ...getStore(),
          accessToken: access,
          refreshToken: refresh,
        });
      },
      getAuthorizationHeader: async (refresh = false) => {
        let { accessToken } = getStore();
        if (refresh) {
          let { refreshToken } = getStore();
          let resp = await fetch(process.env.BACKEND_URL + "/api/refresh", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + refreshToken,
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
            console.log(accessToken);
          } else {
            console.error(resp.statusText);
            return null;
          }
        }
        return { Authorization: "Bearer " + accessToken };
      },
      getPosts: async (page = 1, append = false) => {
        let { postPicsPub } = getStore();
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
        return data.results;
      },

      NewPost: async (formdata) => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/posts/new", {
          method: "POST",
          body: formdata,
          headers: {
            ...getActions().getAuthorizationHeader(),
          },
        });
        if (!resp.ok) {
          console.log(response.status + ": " + response.statusText);
          return false;
        } else {
          return true;
        }
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
          return true;
        } else {
          return false;
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
      specificUserPostsPub: async (userid) => {
        let store = getStore();
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/user_posts/" + userid,
          {
            headers: {
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        store.userPostsPub = data.results;
        setStore(store);
      },

      getUserInfo: async () => {
        const { getAuthorizationHeader } = getActions();
        const { profilePicPriv } = getStore();
        let authorization = await getAuthorizationHeader();
        if (!authorization) {
          console.log("Token Error");
          return false;
        }
        let resp = await fetch(process.env.BACKEND_URL + "/api/user_info", {
          headers: {
            ...authorization,
          },
        });
        if (!resp.ok) {
          let errorResp = await resp.json();
          if (errorResp.msg == "Token has expired") {
            let refreshAuthorization = await getAuthorizationHeader(true);
            resp = await fetch(process.env.BACKEND_URL + "/api/user_info", {
              headers: {
                ...refreshAuthorization,
              },
            });
          } else {
            console.error(resp.statusText);
            return null;
          }
          console.log(resp.status + ": " + resp.statusText);
          return null;
        }
        let data = await resp.json();
        let pic = data.results.profile_pic;
        setStore({
          profilePicPriv: pic,
        });
        return data.results;
      },
      getUserInfoPub: async (userid) => {
        let { profilePicPub } = getStore();
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/user/" + userid,
          {
            headers: {
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
        let data = await resp.json();
        let pic = data.results.profile_pic;
        setStore({
          profilePicPub: pic,
        });
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
            setStore({
              userFavorites: [...userFavorites, new_fav.results],
            });
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
      requestPassword: async (data) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/requestresetpassword",
          {
            method: "POST",
            body: JSON.stringify({ email: data.email }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!resp.ok) {
          console.log(resp.status + ": " + resp.statusText);
          return;
        }
      },
      passwordChange: async (data, token) => {
        console.log(data.password);
        console.log(token);
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/reset_password",
          {
            method: "POST",
            body: JSON.stringify({ password: data.password }),
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (!resp.ok) {
          console.error(request.statusText);
          return false;
        } else {
          return true;
        }
      },
      updateProfileInfo: async (data) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/user_info/update",
          {
            method: "PUT",
            body: JSON.stringify({
              email: data.email,
              username: data.username,
              telnumber: data.phone,
              address: data.address,
              country: data.city,
            }),
            headers: {
              "Content-Type": "application/json",
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (resp.status == 200) {
          return true;
        } else {
          return false;
        }
      },
      updateProfilePic: async (formdata) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/uploadProfilePic",
          {
            method: "POST",
            body: formdata,
            headers: { ...getActions().getAuthorizationHeader() },
          }
        );
        if (resp.status == 200) {
          return true;
        } else {
          return false;
        }
      },
      updatePostInfo: async (data, post_id) => {
        console.log(data);
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/posts/update/" + post_id,
          {
            method: "PUT",
            body: JSON.stringify({
              title: data.title,
              model: data.model,
              make: data.make,
              style: data.style,
              fuel: data.fuel,
              transmission: data.transmission,
              financing: data.financing,
              doors: data.doors,
              year: data.year,
              miles: data.miles,
              price: data.price,
              description: data.description,
            }),
            headers: {
              "Content-Type": "application/json",
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (resp.status == 200) {
          return true;
        } else {
          return false;
        }
      },
      Setpremium: async (post_id) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/posts/update/" + post_id,
          {
            method: "PUT",
            body: JSON.stringify({
              premium: true,
            }),

            headers: {
              "Content-Type": "application/json",
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
      },
      uploadPostPic: async (formdata, post_id) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/post_images/upload/" + post_id,
          {
            method: ["POST"],
            body: formdata,
            headers: {
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (!resp.ok) {
          console.error(request.statusText);
          return false;
        } else {
          return true;
        }
      },
      deletePostPic: async (pic_id) => {
        let resp = await fetch(
          process.env.BACKEND_URL + "/api/post_images/delete/" + pic_id,
          {
            method: ["DELETE"],
            headers: {
              ...getActions().getAuthorizationHeader(),
            },
          }
        );
        if (!resp.ok) {
          console.error(request.statusText);
          return false;
        } else {
          return true;
        }
      },
      /*Nueva action arriba de esta linea*/
    },
  };
};
export default getState;
