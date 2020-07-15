<template>
  <div>
    <nav-bar >
      <div slot="left" >
        <img class="nbimg" src="./logo.png" alt="" @click="$router.push('/home')" >
      </div>
      <div class="center" slot="center">
        <div class="search">
          <van-icon class="searchicon" name="search" />| 请输入搜索内容
        </div>
        <div class="user">
          <img :src="userimg" alt="" slot="right" v-if="userimg" @click="$router.push('/userinfo')">
          <img src="../../../assets/img/default_img.jpg" alt=""  @click="$router.push('/login')" slot="right" v-else>
        </div>
      </div>
      <div class="download" slot="right" >下载app</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  props:['userimg'],
  components:{
    NavBar,
  },
}
</script>

<style>
  .nbimg{
    width: 18.667vw;
    margin-top: 1.867vw;
  }
  .center{
    display: flex;
  }
  .search{
    background-color: #f4f4f4;
    height: 6.667vw;
    width: 40vw;
    border-radius: 4vw;
    font-size: 3.2vw;
    margin: 2.667vw 2.667vw;
    display: flex;
    align-items: center;
    color: #5a5a5a;
  }
  .searchicon{
    margin-left: 2.667vw;
  }
  .user img{
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    margin: 1.867vw 1.333vw;
  }
  .download{
    font-size: 3.2vw;
    width: 17.333vw;
    height: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.867vw;
    border-radius: 0.8vw;
    color: white;
    background-color: #ff9db5;
  }
</style>