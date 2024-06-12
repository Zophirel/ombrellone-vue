<template>
    <div id="paypal-button-container"></div>
  </template>
  
  <script>
  import { loadScript } from "@paypal/paypal-js";
  import { PaymentDatasource } from "../../../data/datasources/payment";
  import { PlaceRepository } from "../../../data/repository/place";
  import { useRouter } from "vue-router";


  export default {
    name: "PayPalButton",
    props: {

      chair: {
        type: Number,
        required: true,
      
      },

      requestData: Object
    },

    setup(){
      const router = useRouter();
      return { router };
    },
    mounted() {
      this.initializePayPalButton();
    },
    methods: {
      initializePayPalButton() {
        loadScript({ "client-id": import.meta.env.VITE_PAYPAL_KEY, currency: "EUR" })
          .then((paypal) => {
            paypal.Buttons({
              createOrder: async () => {
                try {
                  const response = await PaymentDatasource.payPalCheckout(this.requestData);
                  return response.data.id;
                } catch (error) {
                  throw error;
                }
              },
              onApprove: async () => {
                try {
                  const response = await PaymentDatasource.payPalBuy();
                  if(response.status === 200){
                    PlaceRepository.saveReservationInLocalStore(response.data);
                    this.router.back();
                    this.router.replace({name: "PaymentSuccess"});
                  }
                  return;
                } catch (error) {
                  console.error("Error capturing order", error.response || error.message);
                }
              },
              onCancel: () => {
                console.log("operation cancelled");
              },

              onError: (err) => {
                console.error("PayPal Button error", err);
              },
            }).render("#paypal-button-container");
          })
          .catch((err) => {
            console.error("Failed to load PayPal JS SDK", err);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  #paypal-button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  