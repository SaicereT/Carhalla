import { Link } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      accessToken: "",
      refreshToken: "",
      posts: [],
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
      getPostsDetail: async () => {
        let response = await fetch(process.env.BACKEND_URL + "/api/posts");
        if (!response.ok) {
          console.log(response.status + ": " + response.statusText);
          return;
        }
        let data = await response.json();
        console.log(data);
        let newStore = getStore();
        newStore.posts = data.results;
        setStore(newStore);
      },

      NewPost: async (data) => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/posts/new", {
          method: "POST",
          body: JSON.stringify({
            title: data.title,
            make: data.make,
            model: data.model,
            style: data.style,
            fuel: data.fuel,
            transmission: data.transmission,
            financing: true,
            doors: data.doors,
            year: data.year,
            price: data.price,
            description: data.description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      logOut: async (access) => {
        let resp = await fetch(process.env.BACKEND_URL + "/api/logout", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + access,
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
      /*Nueva action arriba de esta linea*/
    },
  };
};
export default getState;
