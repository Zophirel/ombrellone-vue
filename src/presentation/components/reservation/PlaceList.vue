<template>
    <div id="authModalCtn">
        <input :class="{warn : warn.msg != ''}" :disabled="$props.date === null" :value="getPlace" type="text" @click="openList" >
        <p id="warnText" v-show="warn.msg != '' ">{{ warn.msg }}</p>
        <Transition name="placeList" > 
            <div class="placeListWrapper">
                <div class="placeList" v-show="isListOpen && date !== null">
                    <ul>
                        <li 
                        @click = "clickedLi(place)"
                        :class=" 
                            { 
                                listLabel: isListLabel(place),  
                                notBooked: isNotBooked(place), 
                                booked: isBooked(place),
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
        emits: ['setPlace'],
        props: {
            warn: Object,
            date: Date,
            placeProp: String
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
        
            if(this.placeProp !== null){
                this.selectedPlace = this.placeProp;
                this.getPlace;
            }

            if(this.date !== null){
                this.lastDateSelected = this.date
            }
        },
        
        
        setup(){
            const placeStore = usePlaceStore();
            return { placeStore }
        },

        computed: {

            getPlace(){
                const { selectedPlace } = this;
                if(this.placeProp === undefined && this.selectedPlace === null){
                    return '';
                }  else if(this.placeProp !== undefined && this.selectedPlace === null){
                    return this.placeProp;
                } else if(this.date === null) {
                    return '';
                } else {
                    let elementFound = this.places.find((elem) => {           
                       if(elem.index && elem.reservations){
                            return `${elem.index}${elem.row}` === this.selectedPlace 
                                && elem.reservations.includes(this.date.toISOString())
                        }
                           
                    });
                    // reset the input
                    if(elementFound !== undefined){
                        this.$emit('setPlace', undefined);
                        return "";
                    } else {
                        return selectedPlace;
                    }
                }
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
                if(!this.isListLabel(place) && this.isNotBooked(place)){
                    if( this.selectedPlace != `${place.index}${place.row}`){
                        this.selectedPlace = `${place.index}${place.row}`;
                    }else{
                        // Refresh the input value when the user 
                        // select the same place in two different dates
                        this.getPlace;
                    }
                    this.$emit('setPlace', this.selectedPlace);
                    
                    this.isListOpen = false;                
                } 
            },

            isListLabel(place){
                if(place.index){
                    return false;
                }
                return true
            },
            
            isBooked(place){
                if(!this.isListLabel(place)){
                    if(this.date !== null && place.reservations.includes(this.date.toISOString())){
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            },
            
            isNotBooked(place){
                if(!this.isListLabel(place)){
                    if(this.date !== null && !place.reservations.includes(this.date.toISOString())){
                        return true;
                    } else {
                        return false;
                    }
                }
                return false;
            }
        }
    };
</script>

<style scoped>
@import '/src//authModals.css';

input[type=text]{
    height: 30px;
    border-radius: 5px;
    margin-bottom: 0px;
    padding: 0 15px;
    margin-bottom: 10px;
    
}

input[type=text].warn {
        border: 2px solid red;
    }

#warnText {
    margin: 0;
    position: relative;
    bottom: 6px;
    font-size: 14px;
    color: red;
    text-align: start;
}

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