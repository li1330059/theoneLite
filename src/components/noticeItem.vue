<template>
  <div class="lite-notice-item"  @click="linkTo(`/notice/${detail.uuid}`)">
    <div
      class="pic"
      v-lazy:background-image="detail.cover"
    ></div>
    <div class="info">
      <div class="title hidden-txt-2">{{ detail.name }}</div>
      <div class="content hidden-txt-2">{{ detail.summarize }}</div>
      <div class="time">
        <span>{{ detail.releaseTime | time }}</span>
        <span class="icon-arrow-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detail: {
      type: Object,
      detail: function () {
        return {};
      },
    },
  },
  filters:{
    time: function(val){
      if(val){
        return  val.replace(/\//g,'.')
      }else {
        return '-'
      }    
    }
  },
  created() {},
  methods: {
    linkTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss">
.lite-notice-item {
  display: flex;
  padding: 0.2rem 0;
  cursor: pointer;
  position: relative;
  line-height: .17rem;
  &:not(:last-child) {
    border-bottom: 1px solid $color-border;
  }
  .pic {
    flex: none;
    width: 3.2rem;
    height: 1.8rem;
    background-size: cover;
    background-color: #eee;
	border-radius: $radius;
  }
  .info {
    margin-left: 0.3rem;
    flex: auto;
    padding-right: 0.7rem;
    .title {
      font-size: 0.14rem;
      color: #333;
      position: relative;
      padding-top: 0.2rem;
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0.45rem;
        width: 20px;
        height: 2px;
        background: #e93f33;
        border-radius: 2px;
      }
    }
    .content {
      font-size: 0.12rem;
      color: #666;
      margin-top: 0.45rem;
      line-height: .17rem;
    }
    .time {
      color: #666;
      font-size: 0.12rem;
      margin-top: 0.3rem;
    }
  }
  .icon-arrow-right {
    position: absolute;
    right: 0.43rem;
    bottom: 0.25rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url(../assets/icon/icon-arrow-right.png) no-repeat center;
    background-size: contain;
  }
  &:hover {
    .icon-arrow-right {
      background: url(../assets/icon/icon-arrow-right-active.png) no-repeat
        center;
    }
  }
}

@media screen and (max-width: 800px) {
  .lite-notice-item {
    display: flex;
    padding: 0.2rem 0;
    cursor: pointer;
    position: relative;
	border-top: 1px solid #EEEEEE!important;
    &:not(:last-child) {
      border: none;
    }
    .pic {
      width: 1.11rem;
      height: 0.95rem;
    }
    .info {
      margin-left: 0.05rem;
      flex: auto;
      padding-right: 0;
      .title {
        padding-top: 0.02rem;
        &::after {
          content: "";
          display: none;
        }
      }
      .content {
        margin-top: 0.05rem;
      }
      .time {
        color: #666;
        font-size: 0.12rem;
        margin-top: 0.15rem;
      }
    }
    .icon-arrow-right {
      display: none;
    }
  }
}
@media screen and (max-width: 540px) {
	.lite-notice-item {
	  display: flex;
	  padding: 0.2rem 0;
	  cursor: pointer;
	  position: relative;
	  &:not(:last-child) {
	    border: none;
	  }
	  .pic {
	    width: 1.11rem;
	    height: 0.95rem;
	  }
	  .info {
	    margin-left: 0.05rem;
	    flex: auto;
	    padding-right: 0;
	    .title {
	      padding-top: 0.02rem;
	      &::after {
	        content: "";
	        display: none;
	      }
	    }
	    .content {
	      margin-top: 0.05rem;
		  -webkit-line-clamp: 1;
	    }
	    .time {
	      color: #666;
	      font-size: 0.12rem;
	      margin-top: 0.15rem;
	    }
	  }
	  .icon-arrow-right {
	    display: none;
	  }
	}
}
</style>
