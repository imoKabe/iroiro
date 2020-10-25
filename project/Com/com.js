$(function () {
    // 初期表示時

});

//ツイッターシェアボタン
//ページタイトル（改行）URL
function clickBtnShare() {

    var title = document.title;
    var nowUrl = (location.href).replace("#", "");
    var strUrl = "http://twitter.com/share"
        + "?url=" + nowUrl + "&text=" + title + "%0a";
    window.open(strUrl, '_blank');

}
//ツイッターシェアボタン
//テキスト（改行）URL、ハッシュタグの順
function clickBtnShareTextFirst(text, hashtag) {

    var nowUrl = (location.href).replace("#", "");
    var strUrl = "http://twitter.com/share"
        + "?url=" + nowUrl + "&text=" + text + "%0a" + "&hashtags=" + hashtag;
    window.open(strUrl, '_blank');

}
//ツイッターシェアボタン
//ハッシュタグ（半角スペース）＆テキスト（改行）URLの順
function clickBtnShareTagFirst(text, hashtag) {

    var nowUrl = (location.href).replace("#", "");

    var strUrl = "http://twitter.com/share"
        + "?url=" + nowUrl + "&text=" + "%23" + hashtag + "%20" + text + "%0a";
    window.open(strUrl, '_blank');

}
//ツイッターシェアボタン※GETパラメータあり
//ハッシュタグ（半角スペース）＆テキスト（改行）URLの順
function clickBtnShareTagFirstParam(text, hashtag) {

    var nowUrl = (location.href).replace("#", "");

    // URLとパラメータを分ける
    var href = nowUrl;
    var param = location.search;
    var url = href.replace(param, '');

    // パラメータをエンコード
    param = encodeURIComponent(param);


    var strUrl = "http://twitter.com/share"
        + "?url=" + url + param + "&text=" + "%23" + hashtag + "%20" + text + "%0a";
    window.open(strUrl, '_blank');

}

//時分秒取得
function getNow() {

    var dd = new Date();
    var YYYY = dd.getFullYear();
    var MM = dd.getMonth() + 1;
    var DD = dd.getDate();
    var minutes = dd.getMinutes();
    var sec = dd.getSeconds();
    var milliSec = dd.getMilliseconds();
    return ("" + YYYY + "" + MM + "" + DD + "" + minutes + "" + sec + "" + milliSec);

}
