<template>
  <div class="shopping-mobiletabbar" v-if="!isHideIosHeader">
    <van-tabbar
      v-model="active"
      active-color="#353840"
      inactive-color="#353840"
    >
      <van-tabbar-item
        v-for="(item, index) in $webConfig.tabbarList"
        :key="index"
        replace
        @click="switchTab(item)"
      >
        <span>{{ item.name }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 1,
    };
  },
  computed: {
    isHideIosHeader() {
      return this.$store.state.isHideIosHeader;
    },
  },
  methods: {
    switchTab(info) {
      if (info.target == 1) {
        location.href = info.url;
      } else {
        this.$router.push(info.url);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
