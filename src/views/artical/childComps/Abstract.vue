<template>
  <div>
    <div class="detailtext">
        <div class="articleuser">
          <div class="userinfo">
            <img v-if="article.userinfo && article.userinfo.user_img" :src="article.userinfo.user_img" alt="">
            <img v-else src="../../../assets/img/default_img.jpg" alt="">
            <b class="username">{{article.userinfo.name}}</b>
          </div>
          <div v-if="!attentionactive" @click="attentionclick" class="attention">
            +关注
          </div>
          <div v-else @click="attentionclick" class="attention" style="background-color:#aaa">
            已关注
          </div>
        </div>
      <van-collapse v-model="collapsectiveNames">
        <van-collapse-item name="1">
          <template #title>
            <div>
              <van-tag class="categorytitle" color="#ff9db5" mark>{{article.category.title}}</van-tag>
              <b class="articletitle">{{article.name}}</b>
            </div>
            <div class="videoinfo">
              <span class="vediotext">150万次观看</span>
              <span class="vediotext">5218弹幕</span>
              <span class="vediotext">{{article.date}}</span>
              <span class="vediotext"><van-icon name="warning-o" color="red" size="13"/>未经作者授权禁止转载</span>
            </div>
          </template>
          <div class="Introduction">
            <pre>这里应该是作者写的简介，但我没有接口数据……

作品类型：原创曲
作曲/编曲/调校/混音：青色靘
策划/作词/PV：沧弦落尘
曲绘：阿喜，不要动我可可爱的柚子
封面：阿喜，苗库里Owo</pre>
          </div>
        </van-collapse-item>
      </van-collapse>
        <div class="icon">
          <p @click="collectionclick" :class="{activecolor:collectionactive}">
            <van-icon name="star" size="15" />
            <span>收藏</span>
          </p>
          <p>
            <van-icon name="down" size="15" />
            <span>缓存</span>
          </p>
          <p @click="showShare = true">
            <van-icon name="share" size="15" />
            <span>分享</span>
          </p>
        </div>
      </div>
      <div>
        <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" @select="onSelect"/>
      </div>
  </div>
</template>

<script>
export default {
  name:'Abstract',
  data(){
    return{
      collapsectiveNames:['0'],
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
      ],
    }
  },
  props:[
    'article',
    'commentlist',
    'collectionactive',
    'attentionactive'
  ],
  methods:{
    collectionclick(){
      this.$emit('collection')
    },
    attentionclick(){
      this.$emit('attention')
    },
    onSelect(option){
      this.$emit('share',option)
      this.showShare = false
    },
  },
}
</script>

<style>
.detailtext{
    padding: 5px 0;
  }
  .categorytitle{
    margin-right: 10px;
  }
  .articletitle{
    font-size: 14px;
  }
  .articleuser{
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
  }
  .userinfo{
    display: flex;
  }
  .articleuser img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .username{
    font-size: 15px;
    margin-left: 10px;
    color: #ff9db5;
    display: flex;
    align-items: center;
  }
  .attention{
    font-size: 3.2vw;
    width: 17.333vw;
    height: 6.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.867vw;
    border-radius: 0.8vw;
    color: white;
    background-color: #ff9db5;
  }
  .vediotext{
    padding: 5px 15px 5px 0;
    color: #aaa;
    font-size: 10px;
  }
  .icon{
    color: #757575;
    padding: 10px 20px;
    display: flex;
    border-bottom: 1px solid #eeeeee;
  }
  .icon p{
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }
  .icon span{
    font-size: 12px;
    padding: 0 20px 0 4px;
  }
  .activecolor{
    color: #ff9db5;
  }
  .Introduction pre{
    margin: 0;
    padding: 0;
    font-size: 12px;
  }
</style>