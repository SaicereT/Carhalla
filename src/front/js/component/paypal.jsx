import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const App = (props) => {
  const { store, actions } = useContext(Context);
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AWupyIZCF6KfoZLwqH_T6hA0FoET8Usdl_L8VYdBf8S1wm7J5IRbDSmHIV6jqQlYU2Sf42XJBfH73ryU",
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10",
                },
              },
            ],
          });
        }}
        onApprove={(data, action) => {
          return action.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            actions.Setpremium(props.id);
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};
export default App;
