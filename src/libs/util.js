let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : '充值平台';
    window.document.title = title;
};

export default util;