<template>
  <div @click="$router.push(`/artical/${detailitem.id}`)"> 
    <div class="detailItem">
      <div class="imgparent">
        <img :src="detailitem.img" alt="">
        <div class="bottom">
          <span class="videonum"><van-icon name="video-o" color="white" size="3.2vw" />123</span>
          <span class="commentnum"><van-icon name="good-job-o" color="white" size="3.2vw" />456</span>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'Detail',
  props:[
    'detailitem'
  ]
}
</script>

<style>
  .detailItem p, span{
    margin: 0;
    font-size: 3.2vw;
  }
  .imgparent{
    height: 28.533vw;
  }
  .imgparent img{
    width:100%;
    height: 28.533vw;
  }
  .imgparent{
    position: relative;
    color: white;
  }
  .bottom{
    display: flex;
    position: absolute;
    justify-content: space-between;
    bottom: 0;
    padding: 0.8vw 1.333vw;
    left: 0;
    right: 0;
    background: linear-gradient(0deg, rgba(0,0,0,.85), transparent);
  }
</style>