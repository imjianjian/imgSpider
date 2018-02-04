const htmlDownloader = require('../src/htmlDownloader');
const urlManager = require('../src/urlManager');
const cheerio = require('cheerio');

const imageSpider = (options, callback) => {
    let {baseUrl, url, lazyAttr, loop} = options;
    htmlDownloader(urlManager.urlFormat(baseUrl, url)).then(html => {
        //cheerio加载html
        let $ = cheerio.load(html, {
            decodeEntities: false
        });
        //图片集合
        let imgSet = new Set();
        //获得图片的src
        let getImgSrc = img => {
            if (!imgSet.has($(img).attr('src'))) {
                imgSet.add($(img).attr('src'));
            }
            if (lazyAttr) {
                if (!imgSet.has($(img).attr(lazyAttr))) {
                    imgSet.add($(img).attr(lazyAttr));
                }
            }
        };
        //将网页中的其他url添加到url管理器中
        let loopUrl = url => {
            urlManager.addUrl(baseUrl + url);
        };
        //遍历图片标签
        $('img').each((index, item) => getImgSrc(item));
        //遍历链接
        if (loop) {
            $('a').each((index, item) => loopUrl($(item).attr('href')));
            callback(imgSet);
            let nextUrl = urlManager.getNext();
            options.url = nextUrl;
            if (!urlManager.unfinished().size == 0) {
                imageSpider(options, callback);
            }
        } else {
            callback(imgSet);
        }

    }, err => {
        let nextUrl = urlManager.getNext();
        options.url = nextUrl;
        imageSpider(options, callback);
        console.log(err);
    });
};

module.exports = imageSpider;