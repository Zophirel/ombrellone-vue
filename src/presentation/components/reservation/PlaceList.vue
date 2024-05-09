<template>
    <div id="authModalCtn">
        <input :disabled="$props.date === null" :value="setPlaceInputValue" type="text" @click="openList" >
        <Transition name="placeList" > 
            <div class="placeListWrapper">
                <div class="placeList" v-show="isListOpen && $props.date !== null">
                    <ul>
                        <li 
                        @click = "clickedLi(place)"
                        :class=" 
                            { 
                                listLabel: place.index === undefined,  
                                notBooked: place.index === undefined && date !== null ? false : $props.date === null ? false : !place.reservations.includes(date.toISOString()), 
                                booked: place.index === undefined && date !== null ?  false : $props.date === null ? false : place.reservations.includes(date.toISOString()),
                            }" 
                        v-for="place in places"> {{ place.index === undefined ? place : `${place.index}${place.row}`}} </li>
                    </ul>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script>


    import { usePlaceStore } from '../../../domain/place/placeStore';    
    import { PlaceRepository } from '../../../data/repository/place';

    export default {
        name: 'PlaceList',

        props: {
            date: Date
        },

        data(){
            return {
                isListOpen: false,
                places: [],
                selectedPlace: null,
                lastDateSelected: null
            }
        },

        async mounted(){
           
            // Get all the data regarding the avaliable places
            if(this.placeStore.getBookingPerPlace.length === 0){
                this.placeStore.setBookingPerPlaceList(await PlaceRepository.getAllReservationsPerPlace()); 
            }
            this.places = this.placeStore.getBookingPerPlace;
        },
        
        
        setup(){
            const placeStore = usePlaceStore();
            return { placeStore }
        },

        computed: {
            setPlaceInputValue(){
                const { selectedPlace } = this;

                if(this.$props.date === null){
                    return "";
                } else if(this.$props.date !== null && this.lastDateSelected !== this.$props.date){
                    this.lastDateSelected = this.$props.date;
                    return "";
                } 
                return selectedPlace;
            }
        },

        methods: {
            openList() {
                this.isListOpen = true
            },

            closeList() {
                this.isListOpen = false;
            },
            
            clickedLi(place) {
               
                // If place tile has been clicked it will have an index prop
                // if label tile has been clicked it won't
                if(place.index !== undefined){
                    if( this.selectedPlace != `${place.index}${place.row}`){
                        this.selectedPlace = `${place.index}${place.row}`;
                    }else{

                        // Refresh the input value when the user 
                        // select the same place in two different dates
                        this.setPlaceInputValue;
                    }
                    this.isListOpen = false;                
                } 
            },
        }
    };
</script>

<style scoped>
@import '/src//authModals.css';

.placeList {
    position: relative;
    width: 334px;
    right: 65px;
    background-color: whitesmoke;
    border: 2px solid;
    border-radius: 5px;
    z-index: 1;
}

ul {
    list-style: none;
    padding: 0;
    overflow: auto;
    margin-top: 0;
    height: 400px;
    margin-bottom: 5px;
}

li {
    padding: 10px;
    margin: 4px;
}

.notBooked {
    background-color: lightgreen;
}

.booked {
    background-color: indianred;
}

.listLabel {
    background-color: whitesmoke;   
}

.placeListWrapper {
    height: 0;
    width: 0;
    position: absolute;
}

select{
    height: 34px;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 0 15px;
    position: relative;
    float: left;
    width: 100%;
    border: 2px solid #655a5a;
}
</style>