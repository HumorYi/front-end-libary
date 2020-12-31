## 1、微信和QQ对大图片直接转成文件，目前发现大于 2M 就会

## 2、复制多个 （文本 + 图片）到微信时，最前 或 最后一行有空格，或者发送了一个空行

**原因：**

	1. 使用了块级元素
	2. 列表遍历，下面某个内容可能没有，不存在时没有清掉，导致多了一个空节点
	3. 列表套列表遍历，子列表不存在时没有清掉，导致多了一个空节点

**解决：**

	1. 全部使用**行内元素**，因为复制的内容不会展示出来，所以内部的结果不需要细化
	2. 元素之间不要用换行或空格，复制的模板每个元素都是仅仅连在一起的
	3. 在遍历节点的同时也做存在判断，为了实现功能，消耗点性能可能做了无用功都是由意义的

**例子：**

```html
<div id="graphic-copy" class="graphic-copy">
	<span id="graphic-product"><img :src="activeProduct.guideCopyWritingImg" alt="" />
	【商品】{{activeProduct.shortTitle}}
  <br />
  【在售价】{{activeProduct.originPrice}}
  <br />
  ---------------
  <br />
  【券后价】{{activeProduct.postCouponPrice}}
  <br />
  【下单方法】长按复制这条信息，打开手机淘宝，可领券并下单{{taobaoCode}}</span><span
	v-if="activeProduct.tabGraphic[activeProduct.activeTabGraphicIndexWithShowAll].data.length > 0"
  v-for="graphic, i in activeProduct.tabGraphic[activeProduct.activeTabGraphicIndexWithShowAll].data"
  :key="i"
	><span v-if="graphic.copy_text" v-html="graphic.copy_text" :id="'graphic-desc' + i"></span><img v-if="graphic.image && graphic.image.length > 0" v-for="imageObj, imageIndex in graphic.image" :key="imageIndex" :src="imageObj.data" alt="" /></span>
</div>
```
