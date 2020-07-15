<template>
  <div class="registertext">
    <form-text lable="昵称" placeholder="请输入昵称" rule="^.{6,16}$" @inputChange="res => user.name = res"></form-text>
    <form-text lable="账号" placeholder="请输入账号" rule="^.{6,16}$" @inputChange="res => user.username = res"></form-text>
    <form-text lable="密码" placeholder="请输入密码" rule="^.{6,16}$" type="password" @inputChange="res => user.password = res"></form-text>
    <form-btn btntext="注册" @registerSubmit="registerSubmit"></form-btn>
  </div>
</template>

<script>
import FormText from 'components/common/form/FormText'
import FormBtn from 'components/common/form/FormBtn'
export default {
  name:'RegisterText',
  data(){
    return{
      user:{
        name:'',
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
    registerSubmit(){
      let rulg = /^.{6,16}$/
      if(rulg.test(this.user.name) && rulg.test(this.user.username) && rulg.test(this.user.password)){
        this.$http.post('/register', this.user).then(res =>{
          this.$msg.fail(res.data.msg)
          localStorage.setItem('id',res.data.id)
          localStorage.setItem('token',res.data.objtoken)
          setTimeout(()=>{
            this.$router.push('/userinfo')
          },1000)
        })
      }else{
        this.$msg.fail('格式错误，请重新输入')
      }
    }
  }
}
</script>

<style>

</style>