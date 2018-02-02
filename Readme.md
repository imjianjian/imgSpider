# imgSpide
>简单的网页**图片**爬虫

# 使用
```
//引入imgSpider文件
const imgSpider = require('../src/imageSpider');

//带用函数
imgSpider('https://www.douyu.com','/directory/all', 'data-original',false,function(imgSet){
    console.log('下载图片数量:'+imgSet.size);
});
```

# 参数
>imgSpider(baseUrl,url,lazyAttr,loop,callback)

## baseUrl - 必选参数
url的域名部分
>例如：
>https://github.com/imjianjian/的baseUrl就是https://github.com

## url - 必选参数
目标地址，可以是全部地址，也可以是去除baseUrl的地址
>例如：
>https://github.com/imjianjian/
>或者/imjianjian/

## lazyAttr - 必选参数
许多网站采用图片懒加载的方式，图片的url地址在初始化时很可能写在类似**data-original**的自定义属性中,该参数用于填写需要抓取的自定义属性。
## loop - 必选参数
是否继续访问网页中的其他url
>true - 继续抓取网页中的其他链接
>false - 只抓取当前页面的图片

## callback - 必选参数
这里写对所得的图片的Set集合的操作
>callback(imgSet)
>imgSet - 该页面抓取的所有图片的集合
