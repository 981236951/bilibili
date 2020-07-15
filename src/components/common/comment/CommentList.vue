<template>
  <div class="comparent" v-if="commentlist">
    <div class="comitem" v-for="(item,index) in commentlist" :key="index">
      <div class="com_left">
        <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
        <img v-else src="../../../assets/img/default_img.jpg" alt="">
      </div>
      <div class="com_right">
        <p class="com_nd">
          <span v-if="item.userinfo && item.userinfo.name">{{item.userinfo.name}}</span>
          <span v-else>此用户无姓名</span>
          <span> {{item.comment_date}}</span>
        </p>
        <div class="com_com">
          {{item.comment_content}}
          <span class="publish" @click="publishclick(item.comment_id)">回复</span>
        </div>
        <div class="com_items">
          <comment-items :comchild="item.child" @PostPublish="publishclick"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommentItems from 'components/common/comment/CommentItems'
export default {
  name:'CommentList',
  data(){
    return{
      commentlist:null,
      comcontent:''
    }
  },
  components:{
    CommentItems
  },
  methods:{
    async commentData(){
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      this.commentlist = this.changeCommnetData(res.data)
    },
    changeCommnetData(data){
      function fn(temp){
        let arr = [];
        for(var i = 0; i<data.length; i++){
          if(data[i].parent_id == temp){
            arr.push(data[i]);
            data[i].child = fn(data[i].comment_id);
          }
        }
        return arr;
      }
      return fn(null)
    },
    publishclick(id){
      console.log(id)
      this.$emit('publishclick',id)
    }
  },
  created(){
    this.commentData()
  }
}
</script>

<style>
.comparent{
  padding: 0 10px;
  border-bottom: 1px solid #e7e7e7;
}
.comitem{
  display: flex; 
  padding-top: 15px;
}
.com_left{
  width: 35px;
  height: 35px;
}
.com_left img{
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.com_right{
  flex: 1;
  width:100%;
  padding-left: 10px;
}
.com_nd{
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #777;
  margin-bottom: 10px;
}
.com_com{
  width: 100%;
  font-size: 13px;
  word-wrap: break-word;
  word-break: normal;
}
.com_items{
  padding: 10px 0;
  font-size: 13px;
}
</style>