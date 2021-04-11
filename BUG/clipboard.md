## clipboard 异步请求结束后复制失败

**原因：**原生事件是直接执行的，当没有后续执行操作时认为执行结束

**解决：**异步请求结束后程序内部触发点击复制事件，此时为同步，即可复制成功

```js
{
    isRequested: false,
    async copy(e) {
   		if (this.isRequested) {
            new clipboard(e.target.id)
            
            return
        }
        
    	const data = await request()
        
    	this.isRequested = true
        
        e.target.click()
	}
}
```

## url 协议不一致导致复制不了图片

**原因：**网站协议为 http，图片地址协议为 https，复制不了图片

**解决：**去除图片地址前面的协议，让图片协议随网站协议走

**注意：**必须确保与网站协议一致的图片地址协议有该图

```js
function replaceUrlProtocol(url) {
	return url.replace(/https?:/, '')
}
```

