import { defineStore } from 'pinia'

export const usePlaceStore = defineStore('place', {
    state: () => ({ listOfBookingRatio: [], bookinPerPlace: [] }),

    getters: {
      getBookingRatio: (state) => state.listOfBookingRatio,
      getBookingPerPlace: (state) => state.bookinPerPlace
    },

    actions: {
      setBookingRatioList(list) {
        this.listOfBookingRatio = list;
      },

      setBookingPerPlaceList(list){
        this.bookinPerPlace = list;
      }
    },
    //persist: true,
});