<template>
    <div id="modal-bg">
        <div id="modal">
            <div id="close" @click="this.$emit('closeModal')">x</div>
           <div class="user-info">
            <label>Posto</label>
            <input type="text" class="input" :placeholder="place" disabled>
           </div>
           
           <div class="user-info">
            <label>Data</label>
            <input type="text" class="input" :placeholder="this.localDate" disabled>
           </div>
           
           <div class="user-info">
            <label>Nome e Congnome</label>
            <input type="text" class="input" :placeholder="fullName" disabled>
           </div>

           <SeatCounter @addChair="addChair" @removeChair="removeChair"/>
           
           <div class="total">
            <label>Totale</label>
            <label id="value">€{{ (price + (this.chair * 5) - 5 ) }}</label>
           </div>

           <button @click="book">Conferma</button>
        </div>
    </div>
</template>
    
  
<script>
    import SeatCounter from './SeatCounter.vue';    

    export default {
        name: 'Auth',

        data(){
            return {
                price : 10, 
                chair: 1,
                date : null
            }
        },

        components: {
            SeatCounter,
        },

        methods : {
            addChair(){
                this.chair++;
            },

            removeChair(){
                this.chair--;
            },

            setDate() {
                if (this.date === null) {
                    console.log(`SET DATE ${this.date.toLocaleDateString("it-IT")}`);
                    this.localDate = this.date.toLocaleDateString("it-IT");
                }
            },

            book() {
                let clickedPlace = document.getElementsByClassName("ombrellone")[parseInt(this.place-1)];
                clickedPlace.style.backgroundColor = "red";
            }
        }
    };
</script>

<style scoped>


    #modal-bg {
        display: flex;
        z-index: 2;
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #000000a1;
        justify-content: center;
        align-items: center;
    }

    #modal {
        width: 60vw;
        background-color: white;
        z-index: 3;
        padding: 30px;        
    }

    
    .user-info{
        margin-bottom: 18px;
    }

    .user-info > label {
        font-size: 6vw;

        font-weight: 900;
        font-family: 'Inter', sans-serif;
        margin-bottom: 10px;
        text-align: start;
        display: block;
    }

    .input {
        height: 40px;
        width: 94%;
        padding-left: 10px;
        border-radius: 0;
        border: none;
        background-color: lightgray;
        font-size: 20px;
        font-weight: bold;      
    }

    .total{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 900;
        margin-top: 40px;   
    }

    .total > label{
        font-size: 7vw;
    }

    button{
        width: 100%;
        height: 50px;
        margin-top: 40px;
        background-color: #33A8CC;
        border: 0;
        color: white;
        font-weight: 300;
        font-size: 18px;
    }

    #close{
        align-items: center;
        height: 30px;
        width: 30px;
        background-color: #33A8CC;
        display: flex;
        justify-content: center;
        position: relative;
        left: 20px;
        bottom: 20px;
        color: white;
        line-height: 8vw;
        text-align: center;
        align-self: end;
    }

    
</style>