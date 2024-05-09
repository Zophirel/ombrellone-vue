import Axios from "axios";
const axios = Axios.create({
    withCredentials: true
})

export const PlaceDatasource = {
    getBookedRatios: async () => {
        try{
            let response = await axios.get('http://localhost:3000/booked-place-ratio');
            return response;
        } catch(err){
            return err;
        } 
    }, 


    getPlaceList: async () => {
        try{
            let response = await axios.get('http://localhost:3000/place');
            return response.data;
        } catch(err){
            return err;
        } 
    },
}