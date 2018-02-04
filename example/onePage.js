const imgSpider = require('../src/imageSpider');

let options = {
    // 'baseUrl':'https://www.douyu.com',
    'url':'https://www.douyu.com/directory/all',
    'lazyAttr':'data-original',
    'loop':false
};

imgSpider(options,function(imgSet){
    console.log('获得图片地址数量:'+imgSet.size);
});