<template>
  <div class="comitems">
    <div class="comitem" v-for="(item,index) in comchild" :key="index">
      <div style="display:flex">
        <div class="com_left_img">
          <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="../../../assets/img/default_img.jpg" alt="">
        </div>
        <div class="com_right">
          <p class="com_nd">
            <span v-if="item.userinfo.name">{{item.userinfo.name}}</span>
            <span v-else>此用户无姓名</span>
            <span> {{item.comment_date}}</span>
          </p>
          <div class="com_com">
            <div v-if="!temp">{{item.comment_content}} <span class="publish" @click="PostiItemcomment(item)">回复</span></div> 
            <div v-else>回复 <span style="color:#3ba1da">@{{item.parent_user_info.name}}</span> :{{item.comment_content}} <span class="publish" @click="PostiItemcomment(item.comment_id)">回复</span></div> 
          </div>
        </div>
      </div>
      <div><comment-items :comchild="item.child" temp="true" @postChild="postChild"></comment-items></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'CommentItems',
  props:['comchild','temp'],
  methods:{
    PostiItemcomment(id){
      // this.$emit('postChild',id)
      // this.$emit('PostPublish',id)
      console.log('postic',id)
    },
    postChild(id){
      // this.PostiItemcomment(id)
      // this.$emit('PostPublish',id)
      console.log('postc',id)
    }
  },
}
</script>

<style>
.comitems .comitem{
  display: flex;
  flex-direction: column;
}
.com_left_img{
  width: 30px;
  height: 30px;
}
.com_left_img img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.com_com{
  position: relative;
}
.publish{
  position: absolute;
  right: 10px;
  color: #ff9db5;
}
</style>