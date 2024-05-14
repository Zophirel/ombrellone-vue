<template> 
    <div class="bg">
        <div class="ctn"> 
            <div class="tile">
                <img class="icon" src="/src/assets/book.svg"/>
                <p>Nuova prenotazione</p>
            </div>
            <div class="tile">
                <img class="icon" src="/src/assets/booked.svg"/>
                <p>Prenotazioni effettuate</p>
            </div>
            <div class="tile">
                <img class="icon" src="/src/assets/account.svg"/>
                <p>Account</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoggedIn',        
    }
</script>

<style scoped>

    .bg{
        background-color: aliceblue;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .ctn {
        background-color: rgb(160, 160, 160);
        border-radius: 5px;
    }

    .tile{
        display: flex;
        gap: 15px;
        flex-direction: row;
        padding: 10px;
        border-radius: 5px;
        cursor: pointer;
        background-color: rgb(160, 160, 160);
        transition: all 0.4s;
    }

    .tile > p {
        align-self: center;
        margin: 0;
    }

    .tile:hover{
        background-color: cadetblue ;
    }  
</style>
  