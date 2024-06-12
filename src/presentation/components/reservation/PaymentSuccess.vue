<template>
    <div class="modal">
        <div id="success-modal">
            <h1 id="success">Prenotazione effettuata</h1>
            <p id="success-p" >La prenotazione è stata confermata, per ogni necessità è recuperabile nella sezione <i>"Prenotaizoni effettuate"</i> del menù principale</p>
            <button @click="goToMenu">Ritorna al menù</button>
            <button @click="goToBookedPage">Vai a prenotazioni effettuate</button>
            
        </div>
    </div>
  </template>
    
    <script>
    import { useRouter } from "vue-router"
    export default {
        name: 'PaymentSuccess',
        setup(){
            const router = useRouter();
            return { router }
        },

        methods: {
            async goToMenu(){
                await this.router.replace({name: "LoggedInDefault"})
            },
            async goToBookedPage(){
                await this.router.replace({name: "LoggedInShowBooked"})
            }
        } 
    }

    </script>
  
  <style scoped>

  @import "/src/authModals.css";


    .modal {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: beige;
    }  

    #success {
        font-size: 26px;
        margin: 0;
    }

    #success-p{
        max-width: 300px;
    }

    #success-modal{
        max-width: 400px;
        margin: 20px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        background-color: #fff;
        height: 200px;
    }

    #success-modal > button {
        width: 275px;
        margin-top: 10px;
    }

    button {
        border: none;
        height: 30px;
        background-color: #FDD85D;
        border-radius: 5px;
        color: #272525;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 0 auto;
        font-family: 'Roboto';
        font-weight: 500;
        padding: 10px;
    }

  </style>