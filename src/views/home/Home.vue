<template>
  <div class="home">
    <home-nav-bar :userimg="model.user_img"></home-nav-bar>
    <van-tabs v-model="active" sticky swipeable color="#ff9db5">
      <van-tab v-for="(item,index) in category" :key="index" :title="item.title" >
        <van-list v-model="item.loading" :immediate-check="false" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
          <div class="detailparent">
            <detail class="detailitem" v-for="(categoryitem, categoryindex) in item.list" :key="categoryindex" :detailitem="categoryitem"></detail>
          </div>
        </van-list>     
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HomeNavBar from 'components/common/navbar/HomeNavBar'
import Detail from 'components/common/detail/Detail'

export default {
  data(){
    return{
      model:{},
      category:[],
      active:0
    }
  },
  components:{
    HomeNavBar,
    Detail
  },
  methods:{
    async selectUser(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    },
    async selectCategory(){
      const res = await this.$http.get('/category')
      this.changecategory(res.data)
    },
    changecategory(data){
      const category1 = data.map((item) => {
        item.list = []
        item.page = 0
        item.pagesize = 10
        item.finished = false
        item.loding = false
        return item
      })
      this.category = category1
      this.selectAtticle()
    },
    async selectAtticle(){
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id,{
        params:{
          page: categoryitem.page,
          pagesize: categoryitem.pagesize
        }
      })
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if(res.data.length < categoryitem.pagesize){
        categoryitem.finished = true
      }
    },
    categoryItem(){
      const categoryitem = this.category[this.active]
      return categoryitem
    },
    onLoad(){
      const categoryitem = this.categoryItem()
      setTimeout(() => {
        categoryitem.page += 1
        this.selectAtticle()
      },1000)
    }
  },
  watch:{
      active(){
        this.selectAtticle()
      }
  },
  created(){
     if(localStorage.getItem('token')){
      this.selectUser()
    }
    this.selectCategory()
  }
}
</script>

<style>
  .home{
    background-color: #fff;
  }
  .detailparent{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .detailitem{
    margin: 1.333vw 2.133vw;
    width: 45%;
  }
</style>