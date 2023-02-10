import React from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
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
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
