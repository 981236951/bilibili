<template>
<div>
  <div class="userdetail">   
    <div class="user_img">
      <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
      <img src="../../../assets/img/default_img.jpg" alt="" v-else>
    </div>
    <div class="user_edit"> 
      <div class="user_fgh">
        <p class="line">
          <span>0</span>
          <span class="user_text">粉丝</span>
        </p>
        <p class="line">
          <span>0</span>
          <span class="user_text">关注</span>
        </p>
        <p>
          <span>0</span>
          <span class="user_text">获赞</span>
        </p>
      </div>
      <div>
        <div class="user_editBtn" @click="$router.push('/edit')">编辑资料</div>
      </div>
    </div>
  </div>
  <div class="user_lable">
    <h2>{{userInfo.name}}</h2>
    <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
    <p v-else>这个人很神秘，什么也没留下</p>
  </div>
</div>

</template>

<script>
export default {
  props:['userInfo']
}
</script>

<style >
.userdetail{
  background-color: white;
  padding: 0 12px;
  display: flex;
}
.user_img{
  height: 90px;
  width: 90px;
  margin: 10px;
}
.user_img img{
  width: 100%;
  border-radius: 50%;
}
.user_edit{
  flex: 1;
  margin: 10px 20px;
}
.user_fgh{
  display: flex;

}
.user_fgh p{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
}
.user_text{
  color: #aaa;
}
.line{
  border-right: 1px solid #ccc;
}
.user_editBtn{
  border: 1px solid #fb7a9f;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fb7a9f;
  border-radius: 3px;
}
.user_lable{
  padding: 0 12px;
  background-color: white;
}
.user_lable h2{
  margin: 0;
  padding: 10px 0 3px 0 ;
  font-weight: 400;
}
.user_lable p{
  padding: 0;
  margin: 10px 0;
  font-size: 14px;
  color: #999;
}
</style>