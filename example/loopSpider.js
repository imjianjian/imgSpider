const imgSpider = require('../src/imageSpider');
const urlManager = require('../src/urlManager');

let options = {
    'baseUrl':'https://www.douyu.com',
    'url':'/directory/all',
    'lazyAttr':'data-original',
    'loop':true
};

imgSpider(options,function(imgSet){
    var unfinished = urlManager.unfinished();
    console.log('未完成页面数量:'+unfinished.size);
    console.log('下载图片地址数量:'+imgSet.size);
});