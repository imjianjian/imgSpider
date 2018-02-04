# imgSpide
>简单的网页**图片**爬虫

# 使用
```
//引入imgSpider文件
const imgSpider = require('../src/imageSpider');

//参数
let options = {
    'baseUrl':'https://www.douyu.com',
    'url':'/directory/all',
    'lazyAttr':'data-original',
    'loop':false
};

//带用函数
imgSpider(options,function(imgSet){
    console.log('获得图片地址数量:'+imgSet.size);
});
```

# 参数
>imgSpider(options,callback)
## options - 必选参数

### baseUrl
url的域名部分
>例如：
>https://github.com/imjianjian/的baseUrl就是https://github.com

### url
目标地址，可以是全部地址，也可以是去除baseUrl的地址
>例如：
>/imjianjian/,有baseUrl参数时可以简写
>https://github.com/imjianjian/,如果没有添加baseUrl参数，则该参数必须为完整地址


### lazyAttr
许多网站采用图片懒加载的方式，图片的url地址在初始化时很可能写在类似**data-original**的自定义属性中,该参数用于填写需要抓取的自定义属性。
>不填写则只抓取**src**属性

### loop
是否继续访问网页中的其他url
>true - 继续抓取网页中的其他链接
>false - 只抓取当前页面的图片
>不填写则为false

## callback - 必选参数
这里写对所得的图片的Set集合的操作
>callback(imgSet)
>imgSet - 该页面抓取的所有图片的集合
