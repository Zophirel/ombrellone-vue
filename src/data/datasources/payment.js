import Axios from "axios";
import { PlaceRepository } from "../repository/place";
const axios = Axios.create({
    withCredentials: true
})

export const PaymentDatasource = {    
    getStripeClientSecret: async () => {
        let response = await axios.get('http://localhost:3000/initpayment');
        return response.data.clientSecret;
    },

    stripeCheckOut: async (data) => {

        try{
            console.log(data);
            
            data.row = parseInt(data.place.substring(0, data.place.length-1));
            data.column = data.place[data.place.length-1]; 

            console.log(data);
            let response = await axios.post('http://localhost:3000/checkout', data);
            console.log("RESPONSE");
            console.log(response);
            return response;
        } catch(err){
            return err;
        } 
    },

    confirmStripePayment: async () => {
        try{
            let response = await axios.post("http://localhost:3000/confirm-stripe-payment")
            if(response.status === 200){
                PlaceRepository.saveReservationInLocalStore(response.data);
            }
            
            return response;
        }catch(err){
            return err;
        }
    },

    payPalCheckout: async(data) => {
        data.row = parseInt(data.place.substring(0, data.place.length-1));
        data.column = data.place[data.place.length-1]; 
        
        delete data.place;
        delete data.price;
        delete data.fullName;
        return await axios.post('http://localhost:3000/paypal-checkout', data);
    },

    payPalBuy: async() => {
        return await axios.post('http://localhost:3000/paypal-buy');
    }
}