<template>
  <div :data-custom="cellId" :class="{ombrellone: true, busy: cellData.reservations.length > 0, free: cellData.reservations.length > 0 == 0 }">{{ cellId }}</div>
</template>

<script>
export default {
  name: "Ombrellone",
  
  props: {
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
  }

  .busy {
    background-color: #f5684f;
  }

</style>