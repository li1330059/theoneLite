<template>
	<div class="shopping-bankselect">
		<div class="select-body">
		  <div class="form-line">
		    <h1 class="title">银行</h1>
		    <div>
		      <div class="input-line select-line">
		        <el-input
		          v-model="bankInfoListShortNameParam.bankShortName"
		          placeholder="请选择银行"
		          @input="onSearchBank"
		        ></el-input>
		
		        <ul v-if="bankInfoListShortNameResult && bankParam.search">
		          <li
		            v-for="(item, index) in bankInfoListShortNameResult.records"
		            :key="index"
		            @click="chooseBank(item)"
		          >
		            {{ item.bankShortName }}
		          </li>
		          <li v-if="bankInfoListShortNameResult.records.length == 0">
		            未能查询到此银行有关信息
		          </li>
		        </ul>
		      </div>
		    </div>
		  </div>
		  <div class="form-line">
		    <h1 class="title">开户行</h1>
		    <div class="input-line select-line">
		      <el-input
		        v-model="bankInfoListParam.bankDetailName"
		        placeholder="请选择开户行"
		        @input="onSearchBankDetail"
		        :disabled="
		          bankInfoListParam.bankShortName &&
		          bankInfoListShortNameParam.bankShortName
		            ? false
		            : true
		        "
		      ></el-input>
		      <ul v-if="bankInfoListResult && bankParam.searchDetail">
		        <li
		          v-for="(item, index) in bankInfoListResult.records"
		          :key="index"
		          @click="chooseBankDetail(item)"
		        >
		          {{ item.bankDetailName }}
		        </li>
		        <li v-if="bankInfoListResult.records.length == 0">
		          未能查询到此开户行有关信息
		        </li>
		      </ul>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      bankInfoListShortNameParam: {
        bankShortName: "",
        pageCount: 1,
        pageSize: 5,
      },
      bankParam: {
        search: true, //开启搜索
        searchDetail: true, //开启支行搜索
      },
      bankInfoListShortNameResult: null,
      bankInfoListParam: {
        bankDetailName: "",
        bankShortName: "",
        pageCount: 1,
        pageSize: 5,
      },
      bankInfoListResult: null,

      userBankUpdateBnakInfoParam: {
        bankUuid: "",
        uuid: "",
      },
    };
  },
  methods: {
    async init() {
      this.bankInfoListShortNameParam.bankShortName = "";
      this.bankInfoListParam.bankDetailName = "";
    },
    async onSearchBank() {
      this.restBankDetail();

      if (this.bankInfoListShortNameParam.bankShortName) {
        this.bankParam.search = true;
        let result = await this.$api.bankListShortName(
          this.bankInfoListShortNameParam
        );
        this.bankInfoListShortNameResult = result.data.data;

        console.log(`银行列表`, this.bankInfoListShortNameResult.records);
      }
    },
    restBankDetail() {
      this.bankInfoListParam.bankDetailName = "";
      this.userBankUpdateBnakInfoParam.bankUuid = "";
    },
    chooseBank(item) {
      this.bankParam.search = false;
      this.bankInfoListShortNameParam.bankShortName = item.bankShortName;
      this.bankInfoListParam.bankShortName = item.bankShortName;
    },
    async onSearchBankDetail() {
      if (
        this.bankInfoListParam.bankShortName &&
        this.bankInfoListParam.bankDetailName.length >= 2
      ) {
        this.bankParam.searchDetail = true;
        let result = await this.$api.bankListName(this.bankInfoListParam);
        this.bankInfoListResult = result.data.data;
        console.log(`支行列表`, this.bankInfoListResult.records);
      }
    },
    chooseBankDetail(item) {
      this.bankParam.searchDetail = false;
      this.bankInfoListParam.bankDetailName = item.bankDetailName;
      this.userBankUpdateBnakInfoParam.bankUuid = item.uuid;
    },
    getBankInfo() {
      return this.userBankUpdateBnakInfoParam;
    },
  },
};
</script>
<style lang='scss' scoped>
	.shopping-bankselect{
		.select-body{
		    margin-top:-.2rem;
		}
		.form-line {
		  &.flex {
		    display: flex;
		    justify-content: space-between;
		  }
		}
		.phone-code {
		  display: flex;
		  align-items: center;
		}
		.form-btns {
		  margin-top: 36px;
		}
		.success-tip-wrap {
		  position: fixed;
		  top: 0;
		  left: 0;
		  width: 100%;
		  height: 100%;
		  display: flex;
		  justify-content: center;
		  background-color: rgba(0, 0, 0, 0.3);
		  z-index: 999999;
		  .content {
		    padding-top: 26vh;
		    .des {
		      color: $white;
		      font-size: 0.28rem;
		      font-weight: 500;
		      margin-top: 0.38rem;
		      text-align: center;
		    }
		    .txt-btn {
		      font-size: 0.28rem;
		      font-weight: 500;
		      color: #e61f1a;
		      line-height: 0.4rem;
		      text-align: center;
		      padding-top: 0.22rem;
		      cursor: pointer;
		    }
		  }
		}
		.select-line {
		  position: relative;
		
		  ul {
		    position: absolute;
		    width: 100%;
		    z-index: 100;
		    background: #fff;
		    border: 1px solid rgba($color: #ee4242, $alpha: 1);
		    border-top: 0;
		
		    li {
		      line-height: 40px;
		      padding: 0 0.14rem;
		      cursor: pointer;
		      &:hover {
		        background: rgba($color: #000000, $alpha: 0.1);
		      }
		    }
		  }
		}
		.title {
		  font-size: 0.14rem;
		  font-weight: 400;
		  color: $fc-sub;
		  margin-top: 0.24rem;
		}
	}
</style>
