const imgSpider = require('../src/imageSpider');
var http = require('http');
var https = require('https');
const fs = require('fs');
var uuid = require('uuid');

imgSpider('https://www.douyu.com', '/directory/all', 'data-original', true, function (imgSet) {
    console.log('下载图片数量:' + imgSet.size);
    // fs.writeFileSync(__dirname+'/public/img.txt',imgSet);
    imgSet.forEach(url => {
        download(url).then(data => {
            
            let imgStr = uuid.v1()+url.match(/\.(png|jpg|jpeg|gif)$/g)[0];

            var downloadSrc = `${__dirname}/download`;
            if (!fs.existsSync(downloadSrc)) {
                fs.mkdirSync(downloadSrc);
            }
            fs.writeFile(`${__dirname}/download/${imgStr}`,data,'binary');
        }, err => {
            console.log(err);
        });

    });
});


const download = url => {
    let data;
    if (/^https/.test(url))
        data = loadByHttps(url);
    else
        data = loadByHttp(url);
    return data;
};

const loadByHttps = url => {

    return new Promise((resolve, reject) => {

        https.get(url, res => {
            var img = '';
            res.setEncoding('binary');
            res.on('data', (data) => {
                console.log(`正在下载图片${url}...`);
                img += data;
            });

            res.on('end', () => {
                resolve(img);
                console.log('下载完成');
            });

        }).on('error', (e) => {
            reject(e);
            console.log('下载失败');
        });
    });

};

const loadByHttp = url => {

    return new Promise((resolve, reject) => {

        http.get(url, res => {
            var img = '';

            res.on('data', (data) => {
                img += data;
            });

            res.on('end', () => {
                resolve(img);
                console.log('下载完成');
            });

        }).on('error', (e) => {
            reject(e);
            console.log('下载失败');
        });
    });

};