const imgSpider = require('../src/imageSpider');
const imgDownloader = require('../src/imgDownloader');

let options = {
    'baseUrl':'https://www.douyu.com',
    'url':'/directory/game/yz',
    'lazyAttr':'data-original',
    'loop':false
};

imgSpider(options, function (imgSet) {

    imgSet.forEach(url => {
        imgDownloader(url,'download');
    });
    
});

