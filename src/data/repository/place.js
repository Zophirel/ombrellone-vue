import { PlaceDatasource } from "../datasources/place";
import Place from "../../domain/place/place"
import { usePlaceStore } from "../../domain/place/placeStore";
import { useUserStore } from "../../domain/user/userStore";
import { AxiosError } from "axios";

export const PlaceRepository = {
    getBookedRatios: async () => {
        try{
            let response = await PlaceDatasource.getBookedRatios();
            return response;
        } catch(err){
            return err;
        } 
    }, 

    getAllReservationsPerPlace: async () => {
        try{
            let listOfPlace = [];
            let data = await PlaceDatasource.getPlaceList();
            
            data.map((elem) => {
             
                if(elem.beachId !== undefined){
                    listOfPlace.push(new Place(elem.beachId, elem.row, elem.index, elem.reservations));
                } else {
                    listOfPlace.push(elem);
                }
            });

            return listOfPlace;
        } catch(err){
            return err;
        } 
    },

    saveReservationInLocalStore: (booking) =>{     
        
        const placeStore = usePlaceStore();
        
        placeStore.getBookingPerPlace.filter((elem) => {
            if(elem.index){
                if(elem.index === booking.placeIndex && elem.row === booking.placeRow){
                    elem.reservations.push(date.toISOString()); 
                    return true;
                }
            }
        });

        if(placeStore.getUserBooking === null){
            placeStore.setUserBooking([booking]);
        } else {
            placeStore.getUserBooking.push(booking);
        }
    },


    makeReservarions: async (date, place, chair) => {
        let booking = await PlaceDatasource.bookPlace(date, place, chair);
        
        if(booking instanceof AxiosError ){            
            if(booking.response.status === 403){
                const userStore = useUserStore();
                userStore.logOutUser();
                return booking;
            }
        }else if(booking.status === 200) {
            
            PlaceRepository.saveReservationInLocalStore(booking);
            console.log("booking saved")
        }   
    },

    getUserBookings: async () => {
        let bookings = await PlaceDatasource.getUserBookings();
        return bookings.data;
    }
}