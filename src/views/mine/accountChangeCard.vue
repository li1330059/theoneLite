<template>
  <div class="shopping-changeCard">
    <mine-nav :navList="navList"></mine-nav>
    <div class="card-list">
      <div
        class="card-item shopping-c-title"
        v-for="(item, index) in cardList"
        :class="[userBankCardId == item.uuid ? 'active' : '']"
        :key="index"
        @click="userBankCardId = item.uuid"
      >
        <h4 class="shopping-c-title card-item-name shopping-s-title">
          {{ item.bankShortName }}
        </h4>
        <p class="card-item-phone shopping-s-main mt16">
          银行预留手机号：{{ item.phone }}
        </p>
        <p class="card-item-number shopping-s-main">{{ item.bankAccont }}</p>
        <i class=""></i>
      </div>
    </div>
    <div v-if="cardList.length == 0 && !loading">
      <empty page="buy" />
    </div>
	<div class="btn-group">
		<div class="btn btn-line shopping-s-title" @click="setBindCard">确定</div>
	</div>
  </div>
</template>

<script>
/* eslint-disable */
import { bankList, changeYbSettleBankCard } from "../../api/my";
import mineNav from "./components/mineNav.vue";
export default {
  components: { mineNav },
  data() {
    return {
      userBankCardId: "",
      loading: false,
      noMore: false,
      cardList: [],
      form: {
        pageCount: 1,
        pageSize: 10,
      },
      navList: [
        { name: "账户管理", path: "accountmanagement" },
        { name: "更换银行卡", path: "" },
      ],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  created() {
    this.load();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll, true);
  },
  methods: {
    handleScroll() {
      let scrollDom = document.getElementsByClassName("shopping-mine");
      scrollDom = scrollDom && scrollDom[0];
      let scrollTop = scrollDom.scrollTop;
      let windowHeight = scrollDom.clientHeight;
      let scrollHeight = scrollDom.scrollHeight;
      if (
        scrollHeight - scrollTop - windowHeight < 100 &&
        !this.noMore &&
        !this.loading
      ) {
        this.load(); //也可以使用setTimeout定时器延时追加内容
      }
    },
    load() {
      this.loading = true;
      bankList(this.form).then((res) => {
        if (res.data.code == 200) {
          this.loading = false;
          if (res.data.data.length < 10) {
            this.noMore = true;
          }
          this.form.pageCount++;
          this.cardList = this.cardList.concat(res.data.data);
        }
      });
    },
    setBindCard() {
      if (!this.userBankCardId) {
        this.$message("请选择卡片");
        return;
      }
      changeYbSettleBankCard({ userBankCardId: this.userBankCardId }).then(
        (res) => {
          this.$message.success("绑定成功");
          this.$router.push("accountmanagement");
        }
      );
    },
  },
};
</script>

<style lang='scss' scoped>
// 切换卡片
.shopping-changeCard {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 32px;
    .card-item {
      width: 3.79rem;
      height: 1.18rem;
      background-image: url('../../assets/images/mine/card-bg-c.png');
      background-size: 100% 100%;
      padding: 0.24rem;
      overflow: hidden;
      border: 0.01rem solid transparent;
	  box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
	  margin-right: 0.32rem;
	  margin-bottom: .32rem;
      &.active {
        border: 0.02rem solid $color-theme;
		border-radius: $radius;
      }
    }
    .card-item-name {
      line-height: 1;
      margin: 0;
    }
    .card-item-pgine {
      margin-top: 0.04rem;
    }
    .card-item-number {
      margin-top: 0.11rem;
    }
  }
  .btn-group{
	  width:7.9rem;
	  .btn {
		width: 3.79rem;
	    margin: 0.32rem auto 0.32rem auto;
		@media screen and (max-width: 1057px) {
			 margin: 0
		}
	  }
  }
}
@media screen and (max-width: 540px) {
  .shopping-changeCard .card-list {
    display: block;
    .card-item {
      width: 100%;
	  margin-bottom: .22rem;
    }
  }
  .btn-group{
  	width: 100%!important;
  }
}
</style>