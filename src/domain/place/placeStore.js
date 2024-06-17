import { defineStore } from 'pinia'

export const usePlaceStore = defineStore('place', {
    state: () => ({ 
      listOfBookingRatio: [], 
      bookinPerPlace: [], 
      bookedPlace: [],
      userBooking: null
    }),

    getters: {
      getBookingRatio: (state) => state.listOfBookingRatio,
      getBookingPerPlace: (state) => state.bookinPerPlace,
      getUserBooking: (state) => state.userBooking
    },

    actions: {
      setBookingRatioList(list) {
        this.listOfBookingRatio = list;
      },

      setBookingPerPlaceList(list){
        this.bookinPerPlace = list;
      },

      setUserBooking(list){
        this.userBooking = list;
      }
    },
    persist: true,
});