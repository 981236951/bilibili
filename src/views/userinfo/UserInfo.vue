<template>
  <div>
    <home-nav-bar :userimg="model.user_img"></home-nav-bar>
    <img class="backimg" src="./bannerTop_new.png" alt="">
    <user-detail :userInfo="model"></user-detail>
  </div>
</template>

<script>
import HomeNavBar from 'components/common/navbar/HomeNavBar'
import UserDetail from './childComps/UserDetail'
export default {
  name:'UserInfo',
  data() {
    return {
      model:{}
    }
  },
  components:{
    HomeNavBar,
    UserDetail
  },
  methods:{
    async userinfoData(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  },
  created(){
    this.userinfoData()
  }
}
</script>

<style>
.backimg{
  height: 91px;
  width: 100%;
}
</style>