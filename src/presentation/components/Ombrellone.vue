<template>
  <div :data-custom="cellId" 
  :class="{
    ombrellone: true, 
    activePlace: getSelectedPlace === cellId && !cellData.reservations.includes(date.toISOString()),
    busy: cellData.reservations.includes(date.toISOString()), 
    free: !cellData.reservations.includes(date.toISOString())}"
    @click="goToHome()"
    >
      {{ cellId }}
    </div>
</template>

<script>

import { useRouter } from 'vue-router';

export default {
  name: "Ombrellone",
  
  setup(){
      const router = useRouter();
      return {router};
  },

  methods: {
    async goToHome(){
      await this.router.push({ name: "HomeAnimation"});
    }
  },

  computed: {
    getSelectedPlace(){
      return this.selectedPlace
    }
  },

  props: {
    selectedPlace: String,
    date: Date,
    cellId: String,
    cellData: Object
  },
};
</script>
  
<style scoped>
  .ombrellone {
    height: 7vw;
    width: 7vw;
    max-width: 50px;
    max-height: 50px;
    justify-self: center;
    align-self: center;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 15px;
  }

  .free {
    background-color: #C0F54F;
    cursor: pointer;
    transition: all 0.3s ease-in;
  }


  .activePlace {
    -webkit-box-shadow: inset 0px 0px 0px 3px #1d1c1c;
    -moz-box-shadow: inset 0px 0px 0px 3px #1d1c1c;
    box-shadow: inset 0px 0px 0px 3px #1d1c1c;
  }

  .busy {
    background-color: #f5684f;
  }

</style>