

<template>
  <div class="endState" v-show="isVisible">
      <div id="messageColor" :class="messageType">
          <p id="resultDescription"> {{ message }}</p>
      </div> 
  </div> 
</template>
  
<script>
  export default {
      name: 'ResponseNotification',

      data(){
          return {

            error: false,
            success: false
          }
      },

      props: {
          isVisible: Boolean,
          messageType: String,
          message: String   
      },

      computed: {
        isError() { return this.messageType === "error" },
        isSuccess () {  return this.messageType === "success" }
      }
  };
</script>

<style scoped>

#messageColor {
  padding: 9px;
  border-radius: 2px;
  height: auto;
  margin: 5px auto;
  margin-bottom: 30px;
}

.success {
  background-color: lightgreen;
}

.error {
  background-color: #f14c4c;
}

#resultHeader{
  margin: 0;
  font-weight: 900;
  text-align: center;
}

#resultDescription {
  max-width: 212px;
  font-weight: 600;
  text-align: center;
  margin: 0;
}


</style>