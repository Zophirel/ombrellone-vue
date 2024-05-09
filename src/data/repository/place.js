import { PlaceDatasource } from "../datasources/place";
import Place from "../../domain/place/place"

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
}