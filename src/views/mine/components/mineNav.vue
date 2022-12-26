<template>
  <!-- 面包屑导航 -->
  <div class="v1-mine-nav">
    <template v-for="(item, index) in navList">
      <span :key="index" @click="linkTo(item)"  :class="{'mine-nav-active pointer': item.path}">
        <template>{{ item.name }} </template>
        <template v-if="index < navList.length - 1"> / </template>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  methods:{
    linkTo(item){
      if(item.path)this.$router.push(item.path)
    }
  }
};
</script>

<style lang="scss" scoped>
.v1-mine-nav{
  margin-bottom: 0.16rem;
  color: $fc-label;
  .mine-nav-active{
    color: #EE4242;
  }
}
</style>
