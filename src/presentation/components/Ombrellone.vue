<template>
  <div :data-custom="cellId" :class="{
    ombrellone: true, 
    activePlace: selectedPlace === cellId,
    busy: cellData.reservations.includes(date.toISOString()), 
    free: !cellData.reservations.includes(date.toISOString()) }">{{ cellId }}</div>
</template>

<script>
export default {
  name: "Ombrellone",
  
  props: {
    selectedPlace: String,
    date: Date,
    cellId : String,
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

  .free:hover {
    background-color: #C0F54F;
    cursor: pointer;
    border: 5px solid black;
  }

  .activeDaysNumber{
    -webkit-box-shadow: inset 0px 0px 0px 3px #1d1c1c;
    -moz-box-shadow: inset 0px 0px 0px 3px #1d1c1c;
    box-shadow: inset 0px 0px 0px 3px #1d1c1c;
  }

  .busy {
    background-color: #f5684f;
  }

</style>