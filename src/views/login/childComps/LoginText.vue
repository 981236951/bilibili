<template>
  <div>
    <form-text lable="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputChange="res => user.username = res"></form-text>
    <form-text lable="密码" placeholder="请输入密码" rule="^.{6,16}$" type="password" @inputChange="res => user.password = res"></form-text>
    <form-btn btntext="登录" @registerSubmit="registerSubmit"></form-btn>
  </div>
</template>

<script>
import FormText from 'components/common/form/FormText'
import FormBtn from 'components/common/form/FormBtn'
export default {
  data(){
    return{
      user:{
        username:'',
        password:''
      }
    }
  },
  components:{
    FormText,
    FormBtn
  },
  methods:{
    async registerSubmit(){
      if(this.user.username && this.user.password){
        const res = await this.$http.post('/login', this.user)
        this.$msg.fail(res.data.msg)
        if(res.data.code == 301 || res.data.code == 302){
          return
        } 
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.token)
        setTimeout(()=>{
          this.$router.push('/home')
        },1000)
      }else{
        this.$msg.fail('格式错误，请重新输入')
      }
    }
  }
}
</script>

<style>

</style>