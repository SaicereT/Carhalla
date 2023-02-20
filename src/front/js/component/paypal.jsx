import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from "react-router-dom";

const App = (props) => {
  const { store, actions } = useContext(Context);
  const [completed, setCompleted] = useState(false);

  const handleApproval = (data, action) => {
    return action.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      actions.Setpremium(props.id);
      alert(`Transaction completed by ${name}`);
      setCompleted(true);
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.PAYPAL_TOKEN,
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
        onApprove={handleApproval}
      />
      {/* {completed && <Navigate to="/" replace={true} />} */}
    </PayPalScriptProvider>
  );
};

export default App;
