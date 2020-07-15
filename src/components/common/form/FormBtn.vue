<template>
  <div class="formbtn" @click="registerClick">{{btntext}}</div>
</template>

<script>
export default {
  name:"FromBtn",
  props:[
    'btntext'
  ],
  methods:{
    registerClick(){
      this.$emit('registerSubmit')
    }
  }
}
</script>

<style>
  .formbtn{
    width: 150px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 10px;
    background-color: #ff9db5;
    color: white;
  }
</style>