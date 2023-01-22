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
      // userLogin: (username, password) => {
      //     let sesion = username==data.email && password==data.password

      //     if(sesion){
      //       setStore({...getStore(),
      //         accessToken:data.token
      //       })
      //     }
      // },
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
          setStore({ ...getStore(), 
            accessToken: data.token,
            refreshToken: data.refresh,
          
          });
        return true;
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
      NewPost: async (data) => {
        let res = await fetch(process.env.BACKEND_URL + "/api/posts/new", {
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
      // loadToken: (access, refresh) => {
      //   setStore({...getStore(),
      //     accessToken: access,
      //     refreshToken: refresh,
      //   }
      //   )
      // }
    },
  };
};
export default getState;
