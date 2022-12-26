export default (vue) => {
  vue.directive('preventReClick', {
    inserted: function (el) {
      el.addEventListener('click', () => {
        if (el.style.pointerEvents != 'none') {
          el.style.pointerEvents = 'none'
          setTimeout(() => {
            el.style.pointerEvents = 'auto'
          }, 3000)
        }
      })
    }
  })
}