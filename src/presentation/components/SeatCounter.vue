<template>
    <div class="chair-option">
        <label>Sdraio</label>
        <div id="counter">
            <button id="remove" @click="removeChair"><p>-</p></button>
            <h3>{{ chair }}</h3>
            <button id="add" @click="addChair"><p>+</p></button>
        </div>
    </div>
</template>
    
  
<script>
    export default {
        name: 'SeatCounter',
        emits: ["addChair", "removeChair"],
       
        data() {
            return {chair : 1};
        },
        
        methods: {
            addChair(){
                if(this.chair < 4){
                    this.chair += 1;
                    this.$emit("addChair");
                }
                
            },

            removeChair(){
                if(this.chair > 1){
                    this.chair -= 1;
                    this.$emit("removeChair");
                }
            }
        }
    };
</script>

<style scoped>

@import '/src/authModals.css';
    
    label {
        margin:  0;
        font-size: 24px;
    }
    .chair-option{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }


    #counter {
        display: flex;
        flex-direction: row;
    }

    #counter > button{
        height: 30px;
        width: 30px;
        background-color: #D9D9D9;
        border: none;
        align-self: center;

    }

    #counter > h3{
        margin: 0;
        height: 30px;
        width: 30px;
        font-size: 24px;
        line-height: 30px;
        background-color: #5B5B5B;
        color: white;
        font-weight: 500;        
        align-self: center;
    }

    #remove{
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
        font-size: 20px;

    }

    #remove > p{
        margin: 0;
        position: relative;
        bottom: 1px;        
    }

    #add{
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px; 
        font-size: 20px;

    }

    #add > p{
        margin: 0;
        position: relative;
        bottom: 0px;
    }


</style>