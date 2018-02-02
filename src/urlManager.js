const finishedUrls = new Set(),
    unfinishedUrls = new Set();

const finish = url => {
    unfinishedUrls.delete(url);
    finishedUrls.add(url);
};

const addUrl = url => {
    unfinishedUrls.add(url);
};

const selectUrl = url => {
    return unfinishedUrls.has(url);
};

module.exports={
    finish,
    addUrl,
    selectUrl
};