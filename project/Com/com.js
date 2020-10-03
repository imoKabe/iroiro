$(function () {
  // 初期表示時
 
});

  //ツイッターシェアボタン
  //ページタイトル（改行）URL
  function clickBtnShare(){

    var title=document.title;
    var nowUrl=(location.href).replace("#","");
    var strUrl = "http://twitter.com/share" 
                  + "?url=" + nowUrl + "&text=" + title +"%0a";
     window.open(strUrl, '_blank');

  }
  //ツイッターシェアボタン
  //テキスト（改行）URL、ハッシュタグの順
  function clickBtnShareTextFirst(text,hashtag){

    var nowUrl=(location.href).replace("#","");
    var strUrl = "http://twitter.com/share" 
                  + "?url=" + nowUrl + "&text=" + text +"%0a"+ "&hashtags=" + hashtag;
     window.open(strUrl, '_blank');

  }
  //ツイッターシェアボタン
  //ハッシュタグ（半角スペース）＆テキスト（改行）URLの順
  function clickBtnShareTagFirst(text,hashtag){

    var nowUrl=(location.href).replace("#","");
    var strUrl = "http://twitter.com/share" 
                  + "?url=" + nowUrl + "&text=" + "%23" + hashtag +"%20" + text +"%0a";
     window.open(strUrl, '_blank');

  }
