import BigNumber from 'bignumber.js'
import { Message } from 'element-ui';
export default {
  _isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    console.dir(flag)
    return flag
  },
  _isMobileTheme() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    let arr = ""
    if (flag) {
      arr = "-m.scss"
    } else {
      arr = ".scss"
    }
    return arr
  },
  formatStr(value, length) {
    return (
      value.substring(0, length) +
      "..." +
      value.substring(Math.abs(value.length - length), value.length)
    );
  },
  formatMoney(value) {
    return new BigNumber(value || 0).toFormat(2, BigNumber.ROUND_FLOOR, {
      prefix: "¥ ",
      decimalSeparator: ".",
      groupSeparator: ",",
      groupSize: 3,
      secondaryGroupSize: 3
    });
  },
  formatFansNumber(num) {
    return num > 10000 ? (num - num % 1000) / 10000 + "W" : num;
  },
  checkPhoneNumber(phone) {
    /**
     * 检查国内手机号是否正确
     * @params {number} phone 手机号
     * @return {boolean}
     */
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  },
  // 防抖函数
  debounce(fn, delay) {
    let timer = null; //通过闭包缓存了一个定时器
    return function () {
      const args = [...arguments];
      const that = this
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(that, args);
      }, delay);
    }
  },
  //  截流函数
  throttle(fn, delay) {
    let flag = true;
    return function () {
      if (!flag) {
        return;
      }
      const that = this
      const args = [...arguments];
      flag = false;
      setTimeout(() => {
        fn.apply(that, args);
        flag = true;
      }, delay);
    }
  },
  uniqueAry(arr, key) {
    let map = new Map();
    let array = new Array(); // 数组用于返回结果
    for (let i = 0; i < arr.length; i++) {
      if (map.has(arr[i][key])) { // 如果有该key值
        map.set(arr[i][key], true);
      } else {
        map.set(arr[i][key], false); // 如果没有该key值
        array.push(arr[i]);
      }
    }
    return array;
  },
  checkPrice(val) {
    return val.search(/^[0-9]*\.?[0-9]*$/ig) !== -1
  },
  copyFn(val) {
    let copyInput = document.createElement('input')
    copyInput.value = val
    document.body.appendChild(copyInput)
    copyInput.select()
    try {
      var copyed = document.execCommand('copy')
      if (copyed) {
        document.body.removeChild(copyInput)
        Message.success('复制成功')
      }
    } catch {
      Message.error('复制失败，请检查浏览器兼容')
    }
  },
	dateFormat(time) {
	  var date = new Date(time);
	  var year = date.getFullYear();
	  /* 在日期格式中，月份是从0开始的，因此要加0
	      * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
	      * */
	  var month =
	      date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	  var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	  // 拼接
	  return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
	},
}