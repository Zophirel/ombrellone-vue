import User from "../../domain/user/user"
import { UserDatasource } from "../datasources/user";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const UserRepository = {

    login: async ( userData ) => {
        try {
            let response = await UserDatasource.login(userData)
            if(response.status == 200){
                return new User(getCookie("name"), getCookie("surname"));
            } 
            return response.data;
        
        } catch (err) {
            console.error('Error during POST request: ', err);
            return err;
        }
    },


    signup: async ( userData ) => {
        try {
            let response = await UserDatasource.signup(userData);
            if(response.status == 200){
                return "Utente registrato, si prega di fare login";
            } 
            return response.data;
            
        } catch (err) {
            console.error('Error during POST request: ', err);
            return err
        }
    },

    editUserInfo: async ( userData ) => {
        try {
            let response = await UserDatasource.editUserInfo(userData);
            if(response.status == 200){
                return { msg : "Dati utente modificati correttamente" };
            } 
            return { error: response.response.data[0].msg }
        } catch (err) {
            console.error('Error during POST request: ', err);
            return { error: err }
        }
    }
}