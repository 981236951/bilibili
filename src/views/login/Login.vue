<template>
  <div>
    <nav-bar >
      <div slot="center">登录bilibili</div>
      <div slot="right" @click="$router.push('/register')">注册</div>
    </nav-bar>

    <login-text/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import LoginText from './childComps/LoginText'
export default {
  components:{
    NavBar,
    LoginText,
  }
}
</script>

<style>

</style>