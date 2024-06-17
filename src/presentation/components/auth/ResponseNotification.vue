

<template>
  <div class="endState" v-show="isVisible">
      <div id="messageColor" :class="messageType">
        <p id="resultDescription"> {{ message }}</p>
        <div :class="{ basicTimeline: !isVisible, animatedTimeline: isVisible }"></div>
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
  padding: 10px;
  padding-bottom: 1px;
  border-radius: 2px;
  height: auto;
  margin: 5px auto;
  margin-bottom: 30px;
}

.basicTimeline {
  height: 5px;
  background-color: black;
  border-radius: 1px;
  margin: 5px auto;
}

.animatedTimeline {
  height: 5px;
  background-color: black;
  border-radius: 1px;
  margin: 5px auto;
  animation: timeline 5s ease-in ;
}

@keyframes timeline {
  0% {
    width: 100%;
  }
  
  100% {
    width: 0%;
  }
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