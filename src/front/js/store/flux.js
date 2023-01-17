import { Link } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {},
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
            financing: data.financing,
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
      //Nueva action aqui
    },
  };
};
export default getState;
