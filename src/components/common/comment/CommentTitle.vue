<template>
  <div class="comment">
    <div class="myuser">
      <img :src="myuser.user_img" alt="" slot="right" v-if="myuser.user_img" @click="$router.push('/userinfo')" >
      <img src="../../../assets/img/default_img.jpg" alt="" @click="$router.push('/login')" slot="right" v-else>
      <input type="text" v-model="comcontent" ref="Postipt" placeholder="说点什么吧" >
      <button @click="commentPublish">发布</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'CommentTitle',
  data(){
    return{
      comcontent:''
    }
  },
  props:[
    'myuser',
    'datalength'
  ],
  methods:{
    commentPublish(){
      if(!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')){
        this.$msg.fail('请先登录')
        return
      }
      this.$emit('Postcomment',this.comcontent)
      this.comcontent = ''
    },
    focusIpt(){
      this.$refs.Postipt.focus()
    }
  }
}
</script>

<style>
.comment{
  padding: 2.667vw;
}
.myuser{
  padding: 1.333vw 0;
  display: flex;
}
.myuser img{
  height: 7.2vw;
  width: 7.2vw;
  border-radius: 50%;
}
.myuser input{
  outline: none;
  border: 0;
  flex: 1;
  background-color: #f4f4f4;
  height: 6.667vw;
  border-radius: 4vw;
  font-size: 12px;
  margin-left: 5.333vw;
  color: #5a5a5a;
}
.myuser button{
  outline: none;
  border: 0;
  font-size: 3.2vw;
  padding: 0 2.667vw;
  margin-left: 2.667vw;
  border-radius: 1.333vw;
  color: white;
  background-color: #ff9db5;
}
</style>