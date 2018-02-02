const imgSpider = require('../src/imageSpider');

imgSpider('https://www.douyu.com','/directory/all', 'data-original',false,function(imgSet){
    console.log('下载图片数量:'+imgSet.size);
});