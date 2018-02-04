const finishedUrls = new Set(),
    unfinishedUrls = new Set();

const finish = url => {
    unfinishedUrls.delete(url);
    finishedUrls.add(url);
};

const addUrl = url => {
    if (!finishedUrls.has(url))
        unfinishedUrls.add(url);
};

const selectUrl = url => {
    return unfinishedUrls.has(url);
};

const unfinished = () => {
    return unfinishedUrls;
};

const finished = () => {
    return finished;
};

const getNext = () =>{
    return Array.from(unfinishedUrls)[0];
};

const urlFormat = (baseUrl,url) =>{
    var urlReg = /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}/;
    return urlReg.test(url)?url:baseUrl+url;
};

module.exports = {
    finish,
    addUrl,
    selectUrl,
    unfinished,
    finished,
    getNext,
    urlFormat
};