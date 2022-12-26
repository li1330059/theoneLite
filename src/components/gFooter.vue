<template>
  <div class="v1-footer" v-if="isShowFooter">
    <div class="v1-footer-main">
<!--      <div>
       <div class="logo"></div>
      </div> -->
      <div v-for="(item, index) in menuList" :key="index">
        <h1>{{ item.name }}</h1>
        <ul>
          <li
            :class="itemChild.icon"
            v-for="(itemChild, indexChild) in item.children"
            :key="indexChild"
            @click="goPage(itemChild)"
          >
            <a :href="itemChild.to">{{ itemChild.name }}</a>
            <img
              class="hover"
              v-show="index == 0 && indexChild == 2"
              :src="`https://static.theone.art/pc/images/weixin.png?timer=${new Date().getTime()}`"
              alt=""
            />
            <img
              class="hover"
              v-show="index == 0 && indexChild == 4"
              src="//static.theone.art/pc/images/red.png"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
   <div class="version" v-html="versionName">
  
 
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowFooter: true,
      menuList: [
        {
          name: "关注我们",
          children: [
            {
              icon: "icon1",
              name: "微博",
              url: "https://weibo.com/u/7612430345",
            },
            {
              icon: "icon2",
              name: "抖音",
              url: "https://www.douyin.com/user/MS4wLjABAAAAxzy6P5RFyjtvtLwhvT16ruaLPTr9-O5EOXG3K_5gjpyo3EjqEDyx6t3FN1MG-Rdp?extra_params=%7B%22search_id%22%3A%22202108031507510102120651360D035582%22%2C%22search_result_id%22%3A%222744796156528366%22%2C%22search_keyword%22%3A%22%E5%94%AF%E8%89%BA%E5%8A%A0%E5%AF%86%E8%89%BA%E6%9C%AF%22%2C%22search_type%22%3A%22video%22%7D&enter_method=search_result&enter_from=search_result",
            },
            { icon: "icon3", name: "微信" },
            {
              icon: "icon4",
              name: "bilibili",
              url: "https://space.bilibili.com/1106814175?spm_id_from=333.788.b_765f7570696e666f.1",
            },
            // { icon: "icon5", name: "小红书" },
            // { icon: "icon6", name: "邮箱", url: "mailto:service@theone.art" },
          ],
        },
        {
          name: "新闻动态",
          children: [
            { name: "新闻动态", to: "/notice" },
            { name: "平台公告" },
          ],
        },
        // {
        //   name: "帮助中心",
        //   children: [{ name: "平台规则和常见问题", to: "/question" }], //, { name: "在线客服" }
        // },
        // {
        //   name: "合作伙伴",
        //   children: [{ name: "中国美术学院" }, { name: "杭州美术家协会" }],
        // },
        {
          name: "关于我们",
          children: [
            { name: "关于OONFT" },
          ],
        },
      ],
      versionName: `京ICP备2022012253号-3｜京石艺 [2022] 0017号｜ © 2018-2021 TheOne.All rights reserved`,
    };
  },
  created() {
    // this.getNewsCategory();
    this.checkFooterStatus(this.$route.meta);
  },
  watch: {
    $route: function (to, from) {
      console.log(to.meta);
      this.checkFooterStatus(to.meta);
    },
  },
  methods: {
    checkFooterStatus(meta) {
      this.isShowFooter = !(meta.isShowFooter === false);
    },
    goPage(item) {
      if (item.url) {
        window.open(item.url);
      }
    },
    pagewechat() {
      window.open(
        "https://www.yuque.com/books/share/9034652a-92b5-4175-b8c7-bc3435c6e6c6"
      );
    },
    addImgClick() {
      this.isShowAddImg = !this.isShowAddImg;
    },
    goAboutUs() {
      const aboutUs = this.$router.resolve({ path: "/about" });
      window.open(aboutUs.href, "_blank");
    },
    //获取新闻动态分类
    // async getNewsCategory() {
    //   if (this.$common.isMobile()) {
    //     return;
    //   }
    //   let result = await this.$api.service.category_findList({ name: "" });
    //   if (result && result.data.code == 200) {
    //     this.menuList[1].children = result.data.data.map((item) => {
    //       item.to = `/hotspot?type=${item.id}`;
    //       return item;
    //     });
    //   } else {
    //     // this.$message.error("获取新闻信息失败");
    //   }
    // },
  },
};
</script>
<style lang="scss" scoped>
.v1-footer {
  padding: .16rem 0 0;
  border-top: 1px solid rgba(192, 192, 192, .1);
  position: relative;
  z-index: 3;
  .auth-wrap{
    color:rgba(102, 102, 102, 0.7);
   img{
     display: inline-block;
     width:14px;
     transform: translateY(1px);
   }
  }
  .v1-footer-main {
    display: flex;
    justify-content: space-between;
	max-width: 1340px;
	padding: 0 70px;
	margin: 40px auto;
    .logo {
      background: url("../assets/images/logo-nft.png")
        no-repeat center center;
      background-size: 100% 100%;
      width: 2.22rem;
      height: .6rem;
    }
    > div {
	  text-align: center;
    }
    > div:nth-child(1) {
      ul {
		  flex-wrap: wrap;
        li {
		  @media screen and(max-width:800px) {
			  width: .95rem;
		  }
		  margin-bottom: .1rem;
          padding-left: .25rem;
          background: url("~@/assets/images/footer/footer-icon1.png") no-repeat
            left center;
          background-size: .2rem .2rem;
          position: relative;
          @for $i from 1 through 6 {
            &.icon#{$i} {
              background-image: url("~@/assets/images/footer/footer-icon#{$i}.png");
            }
          }
          .hover {
            display: none;
            position: absolute;
            bottom: -0.8rem;
            right: -0.8rem;
            z-index: 10;
            width: 1rem;
            height: 1rem;
          }
          &:hover {
            .hover {
              display: inline-block;
              transition: all 9s;
            }
          }
        }
      }
    }
	// > div:last-child {
	// 	width: 91px;
	// 	flex: none;
	// }
    h1 {
      color: $fc-title;
      line-height: .22rem;
      font-size: .16rem;
      margin-bottom: .3rem;
	  font-weight: 400;
	  margin-top: 0;
    }
    ul {
		display: flex;
		justify-content: center;
      li {
        font-size: .12rem;
        line-height: .17rem;
		margin: 0 .2rem;
        a {
          color: $fc-sub;
          cursor: pointer;
        }
      }
    }
  }
  .version {
    font-size: .12rem;
    color: rgba($color: #666, $alpha: 0.7);
    line-height: .24rem;
    text-align: center;
	padding: .14rem;
	border-top: 1px solid rgba(192, 192, 192, .1);
  }
  @media screen and(max-width:800px) {
	  padding: .18rem;
	  .v1-footer-main {
		  display: block;
		  margin: 0 0 .4rem;
		  padding: 0;
		  > div {
		    text-align: left;
		  }
		  > div:nth-child(1) {
		    ul {
				justify-content: space-between;
		      li {
				  @media screen and(max-width:800px) {
					  width: auto;
					  margin-right: 0;
				  }
		      }
		    }
		  }
		  h1 {
		    line-height: .21rem;
		    font-size: .15rem;
		    margin-bottom: .2rem;
		    margin-top: 0;
		  }
		  ul{
			  width: 100%!important;
			  display: flex;
			  justify-content: flex-start;
			  margin-bottom: .2rem;
			  li{
				  margin: 0;
				  margin-right: .42rem;
				  a {
				    color: $fc-label;
				  }
			  }
		  }
	  }
  }
}
</style>
