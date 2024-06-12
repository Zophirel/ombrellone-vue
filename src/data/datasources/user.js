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
                console.error('Error during POST request: ', err);
                return err
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
    }
}