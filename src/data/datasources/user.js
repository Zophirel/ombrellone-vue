import Axios from "axios";
const axios = Axios.create({
    withCredentials: true
})

export const UserDatasource = {
    
    initServerSession: async () => {
        try{
            await axios.get('http://localhost:3000/');
            return true;
        } catch(err){
            return err;
        } 
    },

    login: async ( userData ) => {
 
        let isInit = await UserDatasource.initServerSession();
        if(isInit){
            const jsonData = { 
                email: userData.email, 
                password: userData.password 
            };
    
            try {
                let response = await axios.post('http://localhost:3000/login', jsonData);
                return response;
            
            } catch (err) {
                console.error('Error during POST request: ', err);
                throw err;
            }
        }
    },

    signup: async ( userData ) => {
       
        let isInit = await UserDatasource.initServerSession();
        if(isInit){
            const jsonData = {
                name: userData.name,  
                surname: userData.surname,
                email: userData.email, 
                password: userData.password,
                tel: userData.tel,
            };

            try {
                let response = await axios.post('http://localhost:3000/signup', jsonData);     
                return response;        
                
            } catch (err) {
                throw err
            }
        }
    },

    editUserInfo: async (data) => {
        try{
            let response = await axios.put('http://localhost:3000/edit-user-info', data);
            return response;
        } catch (err){
            console.error(err);
            return err;
        }
    },
    
    logout: async () => {
        try{
            let response = await axios.post('http://localhost:3000/logout');
            console.log(response);
            return response;
      
        } catch (err){
            console.error(err);
            return err;
        }
    },

    changePassword: async (data) => {
        try{
            let response = await axios.post('http://localhost:3000/change-password', data);
            console.log(response);
            return response;
      
        } catch (err){
            console.error(err);
            return err;
        }
    },

    requestChangePassword: async (email) => {
        try{
            let response = await axios.post('http://localhost:3000/request-change-password', {email: email});
            return response;
      
        } catch (err){
            console.error(err);
            return err;
        }
    }
}