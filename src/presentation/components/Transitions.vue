<template>
    <transition :name="transitionName">
      <slot></slot>
    </transition>
  </template>
  
  
  <script>
  export default {
    props: ['transitionName']
  }
  </script>
  
  <style>
  .slide-bottom-top-enter-active,
  .slide-bottom-top-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  
  .slide-bottom-top-enter {
    transform: translateY(100%) scale(0.9);
    opacity: 0;
  }
  
  .slide-bottom-top-leave-to {
    transform: translateY(-100%) scale(0.9);
    opacity: 0;
  }
  </style>