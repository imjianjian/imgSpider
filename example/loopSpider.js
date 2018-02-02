const imgSpider = require('../src/imageSpider');
const urlManager = require('../src/urlManager');

imgSpider('https://www.douyu.com','/directory/all', 'data-original',true,function(imgSet){
    var unfinished = urlManager.unfinished();
    console.log('未完成页面:'+unfinished.size);
    console.log('下载图片数量:'+imgSet.size);
});