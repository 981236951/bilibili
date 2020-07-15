<template>
  <div>
    <nav-bar >
      <div slot="center">注册bilibili</div>
      <div slot="right" @click="$router.push('/login')">登录</div>
    </nav-bar>
    <register-text/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import RegisterText from './childComps/RegisterText'
export default {
  components:{
    NavBar,
    RegisterText,
  }
}
</script>

<style>

</style>