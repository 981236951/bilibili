<template>
  <div class="article" v-if="article">
    <home-nav-bar :userimg="model.user_img" ></home-nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video :src="article.content" controls="controls"></video>
      </div>
      <div>
        <van-tabs v-model="tabactiveName" color="#ff9db5" sticky>
          <van-tab title="简介" name="0">
            <abstract :article="article" :commentlist="commentlist" 
            :collectionactive="collectionactive" @collection="collection" 
            :attentionactive="attentionactive" @attention="attention"
            @share="share"/>
            <div class="detailparent">
              <detail class="detailitem" v-for="(commentitem, commentindex) in commentlist" :key="commentindex" :detailitem="commentitem"></detail>
            </div>
          </van-tab>
        <van-tab :title="comlength" name="1">
          <div class="combottom">
            <comment-title :myuser="model" @Postcomment="PostSuccess" :datalength="comlength" ref="commentIpt"></comment-title>
          </div>
          <div class="comlist">
            <comment-list @publishclick="PostChildClick" ref="commentPublish"></comment-list>
          </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavBar from 'components/common/navbar/HomeNavBar'
import CommentTitle from 'components/common/comment/CommentTitle'
import CommentList from 'components/common/comment/CommentList'
import Detail from 'components/common/detail/Detail'


import Abstract from './childComps/Abstract'

export default {
  name:'Artical',
  data(){
    return{
      model:{},
      tabactiveName:0,
      article:null,
      commentlist:null,
      comlength:'',
      postcomment:{
        comment_content:'',
        comment_date:'',
        parent_id:null,
        article_id:null
      },
      collectionactive:null,
      attentionactive:null
    }
  },
  components:{
    HomeNavBar,
    CommentTitle,
    CommentList,
    Detail,
    Abstract
  },
  methods:{
    async selectUser(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async selectArticle(){
      const res = await this.$http.get('/article/' + this.$route.params.id)
      this.article = res.data[0]
      if(this.article){
        this.attentionInit()
      }
    },
      async commendData(){
      const res = await this.$http.get('/commend/')
      this.commentlist= res.data
    },
    async PostSuccess(res){
      const date = new Date()
      let m =date.getMonth() + 1
      let d = date.getDate()
      if(m<10){
        m = '0' + m
      }
      if(d<10){
        d = '0' + d
      }
      let str = `${m}-${d}`
      this.postcomment.comment_content = res
      this.postcomment.comment_date = str
      this.postcomment.article_id = this.$route.params.id
      const result = await this.$http.post('/comment_post/'+ localStorage.getItem('id'),this.postcomment)
      this.$refs.commentPublish.commentData()
      if(result.status == 200){
        this.$msg.success('评论发表成功')
      }
    },
    async selectlength(){
      const res = await this.$http.get('/comment/' + this.$route.params.id)
      this.comlength = '评论' + res.data.length
    },
    PostChildClick(id){
      this.postcomment.parent_id = id
      this.$refs.commentIpt.focusIpt()
    },
    async collection(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/collection/' + localStorage.getItem('id'), {article_id:this.$route.params.id})
        this.$msg.success(res.data.msg)
        if(res.data.msg == '收藏成功'){
          this.collectionactive = true
        }else{
          this.collectionactive = false
        }
      }
    },
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/collection/' + localStorage.getItem('id'), {params:{article_id:this.$route.params.id}})
        this.collectionactive = res.data.success
      }
    },
    async attention(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/sub_scription/' + localStorage.getItem('id'), {sub_id:this.article.userid})
        this.$msg.success(res.data.msg)
        if(res.data.msg == '关注成功'){
          this.attentionactive = true
        }else{
          this.attentionactive = false
        }
      }
    },
    async attentionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'), {params:{sub_id:this.article.userid}})
        console.log(res)
        this.attentionactive = res.data.success
      }
    },
    share(option){
      this.$msg.success(option.name + '分享成功')
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.selectUser()
    }
    this.selectArticle()
    this.commendData()
    this.selectlength()
    this.collectionInit()
  },
  watch:{
    $route(){
      this.selectUser()
      this.selectArticle()
      this.commendData()
      this.collectionInit()
    }
  }
}
  
</script>

<style>
  .article{
    background-color: #fff;
    position: relative;
  }
  .video{
    width: 100%;
  }
  .video video{
    width: 100%;
  }
  
  .detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .detailitem{
    margin: 5px 8px;
    width: 45%;
  }

  .combottom{
    border-top: 1px solid #dddddd;
    position: fixed;
    bottom: 0;
    background-color: white;
    width: 100vw;
    z-index: 2;
  }
  .comlist{
    margin-bottom: 59px;
  }
</style>