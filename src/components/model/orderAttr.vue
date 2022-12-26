
<template>
  <div class="shop-com-orderattr">
    <div class="line-bar">
      <div class="key">授权方：</div>
      <div class="val">
        {{ goods.author.nickname || goods.author.name }}
      </div>
    </div>

    <div class="line-bar">
      <div class="key">认证标识：</div>
      <div class="val">
        <copy
          v-if="$authInfomation.getNftId(goods)"
          class="m-copy-blue"
          @listen="
            $authInfomation.goNftId(
              $authInfomation.getChainName(goods),
              $authInfomation.contractAddress(goods),
              $authInfomation.getNftId(goods),
              $authInfomation.getChainContract(goods)
            )
          "
          :short="6"
          :is-full="false"
          :txt="$authInfomation.getNftId(goods)"
        />
        <div v-else>上链确认中</div>
      </div>
    </div>

    <div class="line-bar">
      <div class="key">合约地址：</div>
      <div class="val">
        <copy
          v-if="$authInfomation.contractAddress(goods)"
          class="m-copy-blue"
          @listen="
            $authInfomation.goContractAddress(
              $authInfomation.getChainName(goods),
              $authInfomation.contractAddress(goods),
              $authInfomation.getChainContract(goods)
            )
          "
          :is-full="false"
          :short="6"
          :txt="$authInfomation.contractAddress(goods)"
        />
        <div v-else>上链确认中</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    goods: {
      type: Object,
    },
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang='scss' scoped>
.shop-com-orderattr {
  .line-bar {
    display: flex;
    align-items: center;
    padding: 0.08rem 0;
    .key {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-label;
      min-width: 0.73rem;
    }
    .val {
      font-size: 0.14rem;
      font-weight: 400;
      color: $fc-title;
    }
  }
  @media screen and (max-width: 540px) {
  	line-height: .2rem;
	.line-bar {
		justify-content: space-between;
	}
  }
}
</style>