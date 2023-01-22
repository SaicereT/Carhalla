import { Link } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
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
      userLogin: (username, password) => {},
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
        }
      },
      getPosts: async () => {
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NDM3NzI1MSwianRpIjoiMTk2ZDI2MWQtZTFhMi00NGMyLWJhYmYtYjczOWQwZjdiY2IzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjc0Mzc3MjUxLCJleHAiOjE2NzQzNzgxNTF9.yjH-wMRJzX3wgCxtU_0hRCfpmhmHtiZM1qEOlQjntwA",
          },
        });
      },
      //Nueva action aqui
    },
  };
};
export default getState;
