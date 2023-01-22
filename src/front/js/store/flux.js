import { Link } from "react-router-dom";
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      accessToken: "",
      refreshToken: "",
      userInfo: [],
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
        }
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
