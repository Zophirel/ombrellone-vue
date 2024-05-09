<template>
  <div :data-custom="computedGridId" class="ombrellone"></div>
</template>

<script>
export default {
  name: "Ombrellone",
  props: {
    gridId : Map
  },
 
  computed: {
    computedGridId() {
      console.log(this.gridId);
      return this.gridId;
    }
  },

};
</script>
  
<style scoped>
  .ombrellone {
    height: 5vw;
    width: 5vw;
    max-width: 50px;
    max-height: 50px ;
    background-color: #C0F54F;
    justify-self: center;
    align-self: center;
  }
</style>