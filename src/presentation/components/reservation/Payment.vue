<template>
  <div class="wrapper">
    <img @click="router.replace({name:'LoggedInDefault'})" src="/src/assets/arrow_right.svg"/>
    <div class="container">
      <h1 class="title">Pagamento</h1>
      <div class="resume">
        <div>
          <p class="label">Data</p>
          <p>{{ new Date(getPaymentData.date).toLocaleDateString() }}</p>
        </div>
        <div>
          <p class="label">Nome</p>
          <p>{{ getPaymentData.fullName }}</p>
        </div>
        <div>
          <p class="label">Posto</p>
          <p>{{ getPaymentData.place }}</p>
        </div>
        <div>
          <p class="label">Prezzo</p>
          <p>€{{ getPaymentData.price }}</p>
        </div>

      </div>
      <form @submit.prevent="handleSubmit" class="order-form">
        <div class="form-group">
          <label for="numChairs" class="form-label" hidden>Number of Chairs:</label>
          <input type="number" id="numChairs" :value="this.getPaymentData.chair" min="1" max="4" required class="form-input" disabled hidden/>
        </div>
        <div id="card-element" class="card-element"></div>
        <button type="submit" class="submit-btn">Pay</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      
      <p>o</p>
      <div class="order-form"> 
        <PayPalButton
        :requestData="getPaymentData"
        :chair=this.getPaymentData.chair
        :clientId=process.env.PAYPAL_KEY 
      />
      </div>

    </div>
  </div>
</template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  import { PaymentDatasource } from '../../../data/datasources/payment';
  import PayPalButton from './PayPalButton.vue';
  import { useRouter } from 'vue-router';

  export default {
    name: 'Payment',

    props: {
      paymentDataJSON: String
    },

    computed: {
      getPaymentData(){
        return JSON.parse(this.paymentDataJSON) 
      }
    },

    setup(){
      const router = useRouter();
      return { router }
    },

    data() {
      return {
        numChairs: 0,
        errorMessage: '',
        successMessage: '',
        stripe: null,
        elements: null,
        cardElement: null,
        clientSecret: null
      };
    },
    
    components: {
      PayPalButton,
    },

    async mounted() {
      this.stripe = await loadStripe(process.env.STRIPE_KEY);
      console.log(this.stripe);
      const options = {
      layout: {
        type: 'accordion',
        defaultCollapsed: false,
        radios: false,
        spacedAccordionItems: true
      }
    };
     
      this.clientSecret = await PaymentDatasource.getStripeClientSecret();
      this.elements = this.stripe.elements({clientSecret: this.clientSecret});
      this.cardElement = this.elements.create('card');
      this.cardElement.mount('#card-element');
    },


    methods: {
      async handleSubmit() {
        try {
          this.errorMessage = '';
          this.successMessage = '';
  
          let data = this.getPaymentData;
          let response = await PaymentDatasource.stripeCheckOut(data);
          console.log(response);          
          this.clientSecret = response.data.clientSecret;

          // Confirm the payment with the client secret
          const result = await this.stripe.confirmCardPayment(this.clientSecret, {
            payment_method: {
              card: this.cardElement,
              billing_details: {
                name: this.getPaymentData.fullName,
              }
            },
          });
  
          if (result.error) {
            console.log("result error message")
            this.errorMessage = result.error.message;
            console.log(this.getPaymentData)  ;
          } else {
            this.successMessage = 'Payment successful!';
            let response = await PaymentDatasource.confirmStripePayment();
            console.log(response);
            if(response.status === 200){
              console.log("payment successful")
              this.router.back();
              this.router.replace({name: "PaymentSuccess"});
            } else {
              console.log("payment failed")
            }

          }

        } catch (e) {
          console.log(e);
          this.errorMessage = 'An error occurred. Please try again.';
        }
      }
    }
  }
  </script>

<style scoped>

.resume {
  background-color: #d3d3d370;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  border-radius: 5px;
}

.resume > div {
  margin: 10px;
}

.label {
  font-weight: bold;
}

p {
  margin: 10px 0;
}

.wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img{
  align-self: start;
  transform: rotate(180deg);
  width: 40px;
  height: 40px;
  position: absolute;
  top: 15px;
  left: 10px;
  background-color: #008cba;
  padding-left: 3px;
  border-radius: 100px;
  cursor: pointer;
}

p{
  text-align: center;
}
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
}

.title {
  text-align: center;
  color: #333;
}

.order-form {
  display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #289afd30;
    padding: 10px;
    border-radius: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 16px;
  color: #333;
}

.form-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card-element {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #005f73;
}

.error-message, .success-message {
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  color: #fff;
}

.error-message {
  background-color: #f44336;
}

.success-message {
  background-color: #4CAF50;
}
</style>