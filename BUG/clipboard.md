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
