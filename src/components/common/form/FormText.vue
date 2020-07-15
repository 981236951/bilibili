<template>
  <div class="formtext"><van-field
  :label="lable" 
  :placeholder="placeholder" 
  :type="type" 
  :rule="rule"
  v-model="content" /></div>
</template>

<script>
export default {
  data(){
    return {
      content:''
    }
  },
  props: ['lable','placeholder','type','rule'],
  methods:{
    handlerulg(){
      const rue =new RegExp(this.rule)
      if(rue.test(this.content)){
        this.$emit('inputChange',this.content)
      }
    }
  },
  watch:{
    content(){
      this.handlerulg()
    }
  }
}
</script>

<style>
  .formtext{
    margin: 10px;
  }
</style>