<template>
  <div class="shopping-inlne-prvice">
    <div class="shopping-s-title shopping-c-main">身份证所在省市区/县</div>
    <div class="row-between-center mt16">
      <el-select
        size="medium"
        v-model="provinceCode"
        placeholder="请选择省"
        @change="queryCity"
      >
        <el-option
          v-for="item in province"
          :key="item.provinceCode"
          :label="item.provinceName"
          :value="item.provinceCode"
        >
        </el-option>
      </el-select>
      <el-select
        size="medium"
        v-model="cityCode"
        placeholder="请选择市"
        :disabled="!provinceCode"
        @change="queryDistrict"
      >
        <el-option
          v-for="item in city"
          :key="item.cityCode"
          :label="item.cityName"
          :value="item.cityCode"
        >
        </el-option>
      </el-select>
      <el-select
        size="medium"
        v-model="districtCode"
        placeholder="请选择区/县"
        :disabled="!cityCode"
        @change="setDistrictCode"
      >
        <el-option
          v-for="item in district"
          :key="item.districtCode"
          :label="item.districtName"
          :value="item.districtCode"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import { queryYbAddress } from "../../../api/my";
export default {
  data() {
    return {
      province: [],
      city: [],
      district: [],
      provinceCode: "",
      cityCode: "",
      districtCode: "",
    };
  },
  created() {
    this.getAddres();
  },
  methods: {
    getAddres() {
      queryYbAddress({}).then((res) => {
        this.province = res.data.data;
      });
    },
    queryCity() {
      queryYbAddress({
        provinceCode: this.provinceCode,
      }).then((res) => {
        this.city = res.data.data;
      });
    },
    queryDistrict() {
      queryYbAddress({
        provinceCode: this.provinceCode,
        cityCode: this.cityCode,
      }).then((res) => {
        this.district = res.data.data;
      });
    },
    setDistrictCode(){
      this.$emit('handlerDistrictCode', this.districtCode)
    }
  },
};
</script>

<style lang='scss' scoped>
.shopping-inlne-prvice{
  .el-select {
      margin-right: .12rem;
      width: 1.73rem;
      height: .48rem;
	  ::v-deep .el-input--medium{
		  width: 1.73rem;
		  height: .48rem;
		  .el-input__inner{
			  width: 1.73rem;
			  height: .48rem;
		  }
	  }
	  &:first-child {
		  width: 1.14rem;
		  ::v-deep .el-input--medium{
			  width: 1.14rem;
			  .el-input__inner{
				  width: 1.14rem;
			  }
		  }
	  }
    }
	.shopping-s-title{
		color: $fc-label;
	}
}
</style>