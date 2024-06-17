import { Axios, AxiosError } from "axios";
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
    }, 

    logout: async () => {
        return await UserDatasource.logout();
    },

    changePassword: async (data) => {
        const response = await UserDatasource.changePassword(data);
        console.log(response);
        if(response instanceof AxiosError){
            if(response.response.data.errors !== undefined){
                return {error: response.response.data.errors[0].msg}
            }
            return {error: response.response.data.error}
        } 

        
        return {msg: response.data.msg};
    },

    requestChangePassword: async (email) => {
        const data = await UserDatasource.requestChangePassword(email);
        console.log(data);
        if(data instanceof AxiosError){
            if(data.response.data.errors !== undefined){
                return {error: data.response.data.errors[0].msg}
            }
            return {error: data.response.data.error}
        } 

        
        return {msg: data.data.msg};
    } 
}