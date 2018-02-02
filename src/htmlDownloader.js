const http = require('http');
const https = require('https');
const urlManager = require('./urlManager');

const htmlDownloader = url => {
    let html = '';
    if (/^https/.test(url))
        html = loadByHttps(url);
    else
        html = loadByHttp(url);
    return html; //promise
};

const loadByHttps = url => {

    return new Promise((resolve, reject) => {

        https.get(url, res => {
            var html = '';

            res.on('data', (data) => {
                console.log(`正在下载${url}...`);
                html += data;
            });

            res.on('end', () => {
                urlManager.finish(url);
                resolve(html);
                console.log('下载完成');
            });

        }).on('error', (e) => {
            urlManager.finish(url);
            reject(e);
            console.log('下载失败');
        });
    });

};

const loadByHttp = url => {

    return new Promise((resolve, reject) => {

        http.get(url, res => {
            var html = '';

            res.on('data', (data) => {
                console.log(`正在下载${url}...`);
                html += data;
            });

            res.on('end', () => {
                urlManager.finish(url);
                resolve(html);
                console.log('下载完成');
            });

        }).on('error', (e) => {
            urlManager.finish(url);
            reject(e);
            console.log('下载失败');
        });
    });

};

module.exports = htmlDownloader;