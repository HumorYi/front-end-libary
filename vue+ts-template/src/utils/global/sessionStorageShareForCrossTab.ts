export default function() {
  //当前页面没有sessionStorage【当开启了一个新的tab页时触发】
  if (!sessionStorage.length) {
    localStorage.setItem('getSessionStorage', Date.now() + '')
  }

  // 利用同源页面-storage的监听事件
  window.addEventListener('storage', function handler(event) {
    /*
      1、目的：触发原页面在localStorage存一下sessionStorage，
              向其它的tab页面发送一个信号，触发下面那个key='sessionStorage'的分支
      2、解释：在原来的页面就会触发事件，将sessionStorage存入localStorage，
              为了触发storage监听，然后清除localStorage，不留痕迹，也就一瞬间的事情
      */
    if (event.key == 'getSessionStorage') {
      // Some tab asked for the sessionStorage -> send it
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
      localStorage.removeItem('sessionStorage')
    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      /*
        1、目的：在tabs页面中通过上面的触发，接受sessionStorage的参数
        2、解释：storage监听到key = sessionStorage时取出存入的sessionStorage，循环存入新的tab页
      */
      // sessionStorage is empty -> fill it
      const data = JSON.parse(event.newValue + '')
      Object.keys(data).forEach(key => sessionStorage.setItem(key, data[key]))

      // 当填充完 storage后，清除监听事件，避免后续刷新又导致注入 storage
      window.removeEventListener('storage', handler)
    }
  })
}
