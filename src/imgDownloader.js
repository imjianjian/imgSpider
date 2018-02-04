const http = require('http');
const https = require('https');
var fs = require('fs');
var path = require('path');


const imgDownloader = (url, dir) => {
    let imgDownload;
    var reghttps = /^https/;
    var reghttp = /^http/;
    
    if (reghttps.test(url))
        imgDownload = loadByHttps(url);
    else if(reghttp.test(url))
        imgDownload = loadByHttp(url);
    else {
        url = `http:${url}`;
        imgDownload = loadByHttp(url);
    }

    var downloadSrc = `${path.dirname(dir)}/${dir}`;

    imgDownload.then(img => {
        if (!fs.existsSync(downloadSrc)) {
            fs.mkdirSync(downloadSrc);
        }
        let imgStr = path.basename(url);

        fs.writeFile(`${downloadSrc}/${imgStr}`, img, 'binary', err => {
            if (err) {
                console.log(`图片保存失败${url}`);
                console.log(err);
            }
            console.log(`图片保存成功${url}`);
        });
    }, err => {
        console.log(`下载失败${url}`);
        console.log(err);
    });

};

const loadByHttps = url => {

    return new Promise((resolve, reject) => {

        https.get(url, res => {
            res.setEncoding('binary');
            var img = '';
            res.on('data', (data) => {
                console.log(`正在下载图片${url}...`);
                img += data;
            });

            res.on('end', () => {
                console.log(`下载完成${url}`);
                resolve(img);
            });

        }).on('error', (e) => {
            console.log(`下载失败${url}`);
            reject(e);
        });
    });

};

const loadByHttp = url => {

    return new Promise((resolve, reject) => {

        http.get(url, res => {
            res.setEncoding('binary');
            var img = '';
            res.on('data', (data) => {
                console.log(`正在下载图片${url}...`);
                img += data;
            });

            res.on('end', () => {
                console.log(`下载完成${url}`);
                resolve(img);
            });

        }).on('error', (e) => {
            console.log(`下载失败${url}`);
            reject(e);
        });
    });

};

module.exports = imgDownloader;