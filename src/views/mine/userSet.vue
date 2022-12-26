<template>
  <div class="shop-page-userset">
	  <div class="title"><div></div>基本资料</div>
	  <div class="wrap">
		  <div class="label">我的昵称</div>
		  <div class="input">
		  	<el-input v-model="form.name"></el-input>
		  </div>
		  <div class="label">我的个人签名</div>
		  <div class="input">
		  	<el-input type="textarea" :rows="3" v-model="form.introduce"></el-input>
		  </div>
		  <div class="btngroup">
		  	<div class="btn btn-primary" v-if="form.name&&form.introduce&&!isEdit" @click="saveInfo">确认修改</div>
        <div class="btn btn-disabled" v-else>确认修改</div>
		  </div>
	  </div>
  </div>
</template>

<script>
import utils from "../../utils/utils.js";
import { treasureList } from "../../api/my";
export default {
  data() {
    return {
      form:{
        name:"",
        introduce:""
      },
      isEdit:true
    };
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        if(oldValue) {
           for(let key in this.formOrigin) {
             if(newValue[key]!= this.formOrigin[key]&&newValue[key]!='') {
              this.isEdit = false;
              break;
             }
             else {
               this.isEdit = true;
             }
           }
        }
      },
      deep: true, //true 深度监听
    },
  },

  mounted() {

  },
  created() {
    this.getInfo();
  },

  computed: {

  },
  methods: {
    async getInfo() {
      const res = await this.$api.userInfoLite({});
      if (res.data.code == 200) {
        this.form.name = res.data.data.nickname;
        this.form.introduce = res.data.data.introduce;
        this.formOrigin = Object.assign({},this.form)
      }
    },
	async saveInfo() {
		if(!this.form.name){
			this.$message({
			  message: "昵称不能为空",
			  type: "warning",
			});
			return;
		}
	  const res = await this.$api.userChange({
		  nickname:this.form.name,
		  introduce:this.form.introduce,
	  });
	  if (res.data.code == 200) {
		  this.$store.commit("setUserInfo", { nickname: this.form.name,introduce:this.form.introduce });
		  this.$message({
		    message: "设置成功",
		    type: "success",
		  });
      this.isEdit = true;
	  }else{
		  this.$message({
		    message: res.data.message,
		    type: "warning",
		  });
	  }
	},
  },
};
</script>

<style lang='scss' scoped>
.shop-page-userset {
	max-width: 10rem;
	background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
	box-shadow: 0px 2px 42px 0px rgba(67,39,39,0.0600);
	border: 3px solid #FFFFFF;
	padding: .24rem;
	margin-right: .19rem;
  > div{
  		width: 100%;
  	}
	.title{
		font-size: .14rem;
		color: $fc-title;
		line-height: .2rem;
		letter-spacing: 1px;
		display: flex;
		align-items: center;
		margin-bottom: .3rem;
		div{
			width: 10px;
			height: 10px;
			background: $color-theme;
			margin-right: .05rem;
		}
	}
	.wrap{
		padding-left: .16rem;
		.label{
			font-size: 0.14rem;
			color: $fc-title;
			margin-bottom: 0.12rem;
		}
		.input{
			margin-bottom: .24rem;
		}
		.btngroup{
			display: flex;
			justify-content: flex-end;
			.btn{
				margin: 0;
				width: 1.16rem;
			}
		}
	}
}
@media screen and (max-width: 540px) {
	.shop-page-userset {
		padding: .15rem;
		width: 100%;
		.title{
			font-size: .14rem;
			color: $fc-title;
			line-height: .2rem;
			letter-spacing: 1px;
			display: flex;
			align-items: center;
			margin-bottom: .3rem;
			div{
				width: 10px;
				height: 10px;
				background: $color-theme;
				margin-right: .05rem;
			}
		}
		.wrap{
			padding-left: 0;
			.btngroup{
				.btn{
					width: 100%;
				}
			}
		}
	}
}
</style>
