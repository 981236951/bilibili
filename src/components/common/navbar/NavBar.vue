<template>
  <div class="NavBar">
    <div class="left"><slot name="left"> </slot></div>
    <div class="center"><slot name="center"> </slot></div>
    <div class="right"><slot name="right"> </slot></div>
  </div>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style>
.NavBar{
  display: flex;
  line-height: 11.733vw;
  height: 11.733vw;
  background-color: #fff;
  text-align: center;
}
.left, .right{
  width: 21.333vw;
}
.center{
  flex: 1;
}
</style>