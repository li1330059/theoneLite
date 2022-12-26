<template>
  <div v-if="isShow" class="m-num-wrap">
    <slot></slot>
    <div class="v1-icon-skuno" v-if="isShowNumber">
      <div>
      </div>
      <div>
        {{ number ? number : "--" }}/{{ amountNumber ? amountNumber : "--" }}
      </div>
    </div>
    <div class="v1-icon-skuno" v-else>
      <div>
        <img
          class="icon-star"
          src="https://static.theone.art/pc/icons/icon-number.png"
        />
      </div>
      <div>--/--</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    treasure: {
      type: Object,
      default: function () {
        return { commoditySku: {}, commodity: {} };
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    isShowNumber() {
      if (
        typeof this.amountNumber == "number" ||
        typeof this.number == "number"
      ) {
        if (
          this.amountNumber &&
          this.number &&
          typeof this.amountNumber == "number" &&
          typeof this.number == "number"
        ) {
          return this.number <= this.amountNumber;
        }
        return true;
      } else {
        return false;
      }
    },
    number() {
      if (this.treasure.commodity && this.treasure.commodity.typeMarket == 1) {
        return 1;
      }
      return (
        (this.treasure.commoditySku && this.treasure.commoditySku.number) ||
        (this.treasure.commodity && this.treasure.commodity.number) ||
        this.treasure.number
      );
    },
    amountNumber() {
      if (this.treasure.commodity && this.treasure.commodity.typeMarket == 1) {
        return 1;
      }
      const num =
        (this.treasure.commoditySku &&
          this.treasure.commoditySku.amountNumber) ||
        (this.treasure.commodity && this.treasure.commodity.amountSku);
      return num == -1 ? "纪念品" : Number(num);
    },
    isShow() {
      return false
      if (this.treasure.commodity) {
        if (
          this.treasure.commodity.typeMarket == 1 ||
          (this.treasure.commodity.typeMarket == 2 &&
            this.treasure.commodity.statusNumber == 1)
        ) {
          return true;
        }
      }
      return false;

    },
  },
};
</script>
<style lang='scss' scoped>
/* .m-num-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding-left: 8px;
}
.v1-icon-skuno {
  white-space: nowrap;
  text-overflow: ellipsis;
} */
</style>
