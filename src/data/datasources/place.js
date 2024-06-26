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

    bookPlace: async (date, place, chair) => {
    
        try{
            const jsonData = {
                row: place.length < 3 ? parseInt(place.charAt(0)) : parseInt(`${place.charAt(0)}${place.charAt(1)}`),
                column: place.length < 3 ? place.charAt(1) : place.charAt(2),
                date: date, 
                chair: chair
            }
            
            let response = await axios.post('http://localhost:3000/book', jsonData);
            return response;
        } catch(err){
            console.log("error catched")
            return err;
        } 
    },

    getUserBookings: async () => {
        try{
            let response = await axios.get('http://localhost:3000/booked');            
            return response;
        } catch(err){
            console.log("error catched")
            return err;
            
        } 
    }
}