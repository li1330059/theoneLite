<template>
  <div class="shopping-hamburger-body">
    <div class="main-btn" :class="{ active: isShowPhoneNav }">
      <div class="custom-menu-toggle openMenu"></div>
    </div>
    <div class="side-btns">
      <div class="side-btn"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    isShowPhoneNav() {
      return this.$store.state.isShowPhoneNav;
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang='scss' scoped>
$height: 0.04rem;
$width: 0.3rem;
.shopping-hamburger-body{
	.main-btn {
	  position: relative;
	  width: 0.6rem;
	  height: 0.6rem;
	  font-size: 0.25rem;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  margin: auto;
	  border-radius: 50%;
	  cursor: pointer;
	  color: $fc-mask;
	  transition: 400ms;
	  transform: rotate(0deg);
	  opacity: 1;
	  &:hover {
	    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.04);
	  }
	  &.active {
	    .custom-menu-toggle {
	      background-color: rgba(255, 255, 255, 0);
	      &:before {
	        position: absolute;
	        width: $width;
	        height: $height;
	        border-radius: 2px;
	        background-color: #000000;
	        display: block;
	        margin: auto;
	        transition: 400ms;
	        content: "";
	        transform: rotate(45deg) translateY(0px);
	      }
	      &:after {
	        position: absolute;
	        width: $width;
	        height: $height;
	        border-radius: 2px;
	        background-color: #000000;
	        display: block;
	        margin: auto;
	        transition: 400ms;
	        content: "";
	        transform: rotate(-45deg) translateY(0px);
	      }
	    }
	  }
	}
	.custom-menu-toggle {
	  position: absolute;
	  width: $width;
	  height: $height;
	  border-radius: 2px;
	  background-color: #000000;
	  display: block;
	  margin: auto;
	  transition: 400ms;
	  &:before {
	    position: absolute;
	    width: $width;
	    height: $height;
	    border-radius: 2px;
	    background-color: #000000;
	    display: block;
	    margin: auto;
	    transition: 400ms;
	    content: "";
	    backface-visibility: hidden;
	    transform: rotate(0deg) translateY(7px);
	  }
	  &:after {
	    position: absolute;
	    width: $width;
	    height: $height;
	    border-radius: 2px;
	    background-color: #000000;
	    display: block;
	    margin: auto;
	    transition: 400ms;
	    content: "";
	    backface-visibility: hidden;
	    transform: rotate(0deg) translateY(-7px);
	  }
	}

}
</style>