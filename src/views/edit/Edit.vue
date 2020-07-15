<template>
  <div> 
    <home-nav-bar :userimg="model.user_img"></home-nav-bar>
    <div class="user_info">
      <div class="uploadfile">
        <van-uploader class="uploadimg" preview-size='100vw' :after-read="afterRead" />
        <edit-banner left='头像'>
          <img :src="model.user_img" alt="" slot="right" v-if="model.user_img">
          <img src="../../assets/img/default_img.jpg" alt="" slot="right" v-else>
        </edit-banner>
      </div>
      <edit-banner left='昵称' @bannerClick="show = true">
        <a href="javascript:" slot="right">{{model.name}}</a>
      </edit-banner>
      <edit-banner left='UID'>
        <a href="javascript:" slot="right">{{model.username}}</a>
      </edit-banner>
      <edit-banner left='性别' @bannerClick="gendershow = true">
         <a href="javascript:" slot="right">{{model.gender == 1 ? '男' : '女'}}</a>
      </edit-banner>
      <edit-banner left='个性签名' @bannerClick="textshow = true">
        <a href="javascript:" slot="right">{{model.user_desc}}</a>
      </edit-banner>

      <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="confirmClick" @cancel="centent = ''">
        <van-field v-model="content" autofocus/>
      </van-dialog>

      <van-dialog v-model="textshow" title="个性签名" show-cancel-button @confirm="textareaClick" @cancel="centent = ''">
        <van-field v-model="content" type="textarea" autofocus/>
      </van-dialog>
    
      <van-action-sheet v-model="gendershow" :actions="actions" @select="onSelect" cancel-text="取消"/>
      <div class="editback" @click="$router.back()">返回</div>
    </div>
  </div>
</template>

<script>
import HomeNavBar from 'components/common/navbar/HomeNavBar'
import EditBanner from 'components/common/banner/EditBanner'
export default {
  name:'Edit',
  data(){
    return {
      show:false,
      textshow:false,
      gendershow:false,
      model:{},
      content:'',
       actions: [{ name: '男', val:1 },{ name: '女', val:0 }],
    }
  },
  components:{
    HomeNavBar,
    EditBanner
  },
  methods:{
    async selectUser(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async afterRead(file){
      const formdata = new FormData()
      formdata.append('file',file.file)
      const res = await this.$http.post('upload', formdata)
      this.model.user_img = res.data.url
      this.UserUpdate()
    },
    async UserUpdate(){
      const res = await this.$http.post('/update/' + localStorage.getItem('id'),this.model)
      if(res.data.code == 200){
        this.$msg.fail('修改成功')
      }
    },
    confirmClick(){
      this.model.name = this.content
      this.UserUpdate()
      this.content = ''
    },
    textareaClick(){
      this.model.user_desc = this.content
      this.UserUpdate()
      this.content = ''
    },
    onSelect(data){
      this.model.gender = data.val
      this.UserUpdate()
      this.gendershow = false
    }
  },
  created(){
    this.selectUser()
  }
}
</script>

<style>
.user_info{
  margin: 10px 0;
}
.user_info a{
  color: #333;
}
.user_info img{
  width: 46px;
  height: 46px;
  border-radius: 50%;
}
.uploadfile{
  position: relative;
  overflow: hidden;
}
.uploadimg{
  position: absolute;
  opacity: 0;
}
.editback{
  background-color: #ff9db5;
  color: white;
  width: 150px;
  height: 35px;
  border-radius: 3px;
  margin: auto;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>