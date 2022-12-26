<template>
  <div class="shooping-bind-card">
    <mine-load
      :list="cardList"
      :noMore="noMore"
      :loading="loading"
      @handlerLoad="load"
    >
      <div class="card-list">
        <card-item
          v-for="item in cardList"
          :key="item.id"
          :cardObj="item"
          @handlerEditCard="editCard"
          @handlerDeletCard="handlerDeletCard"
        >
        </card-item>
      </div>
    </mine-load>

    <!-- 无卡 -->
    <div v-if="cardList.length == 0 && !loading">
      <empty page="bindcard"  />
    </div>
	<div class="btn-group">
		<div class="btn btn-line btn-bank-add" @click="showBindCard">绑定银行卡 </div>
	</div>
    <dialog-bindcard
      v-if="isShowBindCard"
      ref="bankSubmit"
      :userInfo="userInfo"
      @bindSucess="listenBankSubmit"
    ></dialog-bindcard>
    <dialog-bindcard-new
      v-if="isShowBindCardNew"
      ref="bankSubmitNew"
      :userInfo="userInfo"
      @bindSucess="listenBankSubmit"
    ></dialog-bindcard-new>
    <dialog-bind-name
      v-if="isShowBindName"
      ref="bankName"
      :detail="curCard"
      @bindSucess="listenBankNameSubmit"
    ></dialog-bind-name>
    <dialog-success
      v-if="isShowSccess"
      ref="success"
      @handlerClose="handlerClose"
    />
  </div>
</template>

<script>
import { bankList, bankUnbound } from "../../api/my";
import cardItem from "./bankcard/cardItem.vue";
import empty from "@/components/page/empty.vue";
import mineLoad from "./components/mineLoad.vue";
export default {
  components: { cardItem, empty, mineLoad },
  data() {
    return {
      isShowBindCard: false,
      isShowBindCardNew: false,
      userAttrResult: {},
      cardList: [],
      loading: false,
      noMore: false,
      isShowBindName: false,
      form: {
        pageCount: 1,
        pageSize: 10,
      },
      curCard: {},
      list: [],
      isShowSccess: false,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userStore.userInfo;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },

  created() {
    this.$store.dispatch("getUserInfo");
    this.load();
  },
  methods: {
    showBindCard() {
      if (this.userInfo.statusVerified == 1) {
        this.isShowBindCardNew = true;
        this.$nextTick(() => {
          this.$refs.bankSubmitNew.init();
        });
      } else {
        this.isShowBindCard = true;
        this.$nextTick(() => {
          this.$refs.bankSubmit.init();
        });
      }
    },
    listenBankSubmit(res) {
      this.isShowBindCard = false;
      this.handlerClose();
      this.$message({
        type: "success",
        message: "添加成功!",
      });
    },
    listenBankNameSubmit() {
      // this.isShowBindName = false
      this.handlerClose();
      this.$message({
        type: "success",
        message: "修改成功!",
      });
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
    handlerClose() {
      this.form = {
        pageCount: 1,
        pageSize: 10,
      };
      (this.cardList = []), this.load();
    },
    editCard(item) {
      this.curCard = item;
      this.isShowBindName = true;
      this.$nextTick(() => {
        console.log(this.$refs);
        this.$refs.bankName.init();
      });
    },
    handlerDeletCard(item) {
      this.$confirm("确定删除这张卡片吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          bankUnbound({
            uuid: item.uuid,
          }).then((res) => {
            if (res.data.code == 200) {
              this.handlerClose();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.message,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.shooping-bind-card {
  margin: 0;
  max-width: 9.85rem;
  ::v-deep .shop-empty{
	  width:7.9rem;
	  margin-bottom: .32rem;
	  @media screen and (max-width: 1064px) {
		 width: 3.79rem;
	  }
  }
  .shopping-load{
	  ::v-deep .load{
		  width:7.9rem;
	  }
	  ::v-deep .nomore{
	  	display: none;
	  }
  }
  .card-list {
	display: flex;
	flex-wrap: wrap;
  }
  .btn-group{
  	  width:7.9rem;
  	  .btn {
  		width: 3.79rem;
  	    margin: 0.32rem auto 0.32rem auto;
  		@media screen and (max-width: 1064px) {
  			 margin: 0
  		}
  	  }
  }
}
@media screen and (max-width: 540px) {
  .shooping-bind-card {
    margin: 0;
	::v-deep .shop-empty{
		width:100%;
	}
    .card-list {
      display: block;
    }
	.btn-group{
	  width:100%;
	  .btn {
		width: 100%;
		margin: .16rem auto 0.32rem auto;
		padding: 0;
	  }
	}
  }
}
</style>
