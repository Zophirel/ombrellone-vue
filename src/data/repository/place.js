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

    saveReservationInLocalStore: (bookingEvent) =>{     
        const placeStore = usePlaceStore();
        if(!bookingEvent.qrData){
            placeStore.getBookingPerPlace.filter((elem) => {
                if(elem.index){
                    if(elem.index === bookingEvent.placeIndex && elem.row === bookingEvent.placeRow){
                        elem.reservations.push(bookingEvent.date); 
                        console.log("data saved")
                        return true;
                    }
                }
            }); 
        }
        if(placeStore.getUserBooking === null){
            placeStore.setUserBooking([bookingEvent]);
        } else {
            placeStore.getUserBooking.push(bookingEvent);
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
            PlaceRepository.saveReservationInLocalStore(booking.data);
        }   
    },

    getUserBookings: async () => {
        let bookings = await PlaceDatasource.getUserBookings();
        return bookings.data;
    }
}