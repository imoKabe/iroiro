$(function () {
  // 初期表示時

  //getを取得
  var arg = new Object();
  url = location.search.substring(1).split("&");
  for (i = 0; url[i]; i++) {
    var k = url[i].split("=");
    arg[k[0]] = k[1];
  }
  //getをselectに反映
  if (!isNaN(arg.s1)) {
    $("#select1").val(arg.s1);
  }
  if (!isNaN(arg.s2)) {
    $("#select2").val(arg.s2);
  }
  if (!isNaN(arg.s3)) {
    $("#select3").val(arg.s3);
  }
  if (!isNaN(arg.s4)) {
    $("#select4").val(arg.s4);
  }
  if (!isNaN(arg.s5)) {
    $("#select5").val(arg.s5);
  }
  if (!isNaN(arg.s6)) {
    $("#select6").val(arg.s6);
  }
  if (!isNaN(arg.s7)) {
    $("#select7").val(arg.s7);
  }
  // セレクトの内容をテキストに反映
  haneiTxt();

  //画像取得して画面に表示
  // html2canvas(document.querySelector("plotResult")).then(canvas => {
  //   document.body.appendChild(canvas);
  // });

});

//一括ボタン押下時
function clicckRandomAll() {
  clickBtnEach($("#select1"));
  clickBtnEach($("#select2"));
  clickBtnEach($("#select3"));
  clickBtnEach($("#select4"));
  clickBtnEach($("#select5"));
  clickBtnEach($("#select6"));
  clickBtnEach($("#select7"));
}

//各ボタン押下時
function clickBtnEach(target) {
  randomEach(target);
}

//セレクトについてランダム選択
function randomEach(target) {
  //選択肢個数
  var optNum = target.children().length;
  // 0から（選択肢個数－１）までの乱数
  var random = Math.floor(Math.random() * optNum);
  target.val(random);
}

// セレクトの内容をテキストに反映
function haneiTxt() {

  if ($("#span1").length) {
    var txt1 =
      "二人は"+
      $("#select1 option:selected").text().trim() +
      "という障害を乗り越え、";
    $("#span1").html(txt1.replace(" ", ""));
  }
  if ($("#span2").length) {
    var txt2 =
    "全体を通して"+
      $("#select2 option:selected").text().trim() +
      "。";
    $("#span2").html(txt2.replace(" ", ""));
  }
  if ($("#span3").length) {
    var txt3 =
      "行為のきっかけは"+
      $("#select3 option:selected").text().trim() +
      "で、";
    $("#span3").html(txt3.replace(" ", ""));
  }
  if ($("#span4").length) {
    var txt4 =
      "場所は" +
      $("#select4 option:selected").text().trim() +
      "だ。";
    $("#span4").html(txt4.replace(" ", ""));
  }
  if ($("#span5").length) {
    var txt5 =
    "オプションは"+
      $("#select5 option:selected").text().trim() +
      "で、";
    $("#span5").html(txt5.replace(" ", ""));
  }
  if ($("#span6").length) {
    var txt6 =
    "最中は"+
      $("#select6 option:selected").text().trim() +
      "交わり、";
    $("#span6").html(txt6.replace(" ", ""));
  }
  if ($("#span7").length) {
    var txt7 =
    "結果は"+
      $("#select7 option:selected").text().trim() +
      "。";
    $("#span7").html(txt7.replace(" ", "").replace(" ", ""));
  }
}

//画像取得DLメソッド
function downloadImage(data) {
  var fname = "echiPlot"+ getNow() +".png";
  var encdata = atob(data.replace(/^.*,/, ""));
  var outdata = new Uint8Array(encdata.length);
  for (var i = 0; i < encdata.length; i++) {
    outdata[i] = encdata.charCodeAt(i);
  }
  var blob = new Blob([outdata], ["image/png"]);

  if (window.navigator.msSaveBlob) {
    //IE用
    window.navigator.msSaveOrOpenBlob(blob, fname);
  } else {
    //それ以外？
    document.getElementById("getImage").href = data; //base64そのまま設定
    document.getElementById("getImage").download = fname; //ダウンロードファイル名設定
    document.getElementById("getImage").click(); //自動クリック
  }
}
//画像保存ボタン押下時
function getDisplayImage() {
  //html2canvas実行
  alert("プロット画像をダウンロードします。\nしばらくしたらダウンロードフォルダを確認してください");
  html2canvas(document.getElementById("plotResult")).then(function (canvas) {
    downloadImage(canvas.toDataURL());
  });
}

//以下ボツ　今回は向いてなかった----------------------
//// テキストをクリップボードにコピーさせる
//function execCopy(string) {
//  // 空div 生成
//  var tmp = document.createElement("div");
//  // 選択用のタグ生成
//  var pre = document.createElement("pre");

//  // 親要素のCSSで user-select: none だとコピーできないので書き換える
//  pre.style.webkitUserSelect = "auto";
//  pre.style.userSelect = "auto";

//  tmp.appendChild(pre).textContent = string;

//  // 要素を画面外へ
//  var s = tmp.style;
//  s.position = "fixed";
//  s.right = "200%";

//  // body に追加
//  document.body.appendChild(tmp);
//  // 要素を選択
//  document.getSelection().selectAllChildren(tmp);

//  // クリップボードにコピー
//  var result = document.execCommand("copy");

//  // 要素削除
//  document.body.removeChild(tmp);

//  return result;
//}
//var copyText = $("#plotText").val();

//// コピーボタンクリック時
//function clickCopy() {
//  if (execCopy(copyText)) {
//    alert("クリップボードにコピーしました" + copyText + "456");
//  } else {
//    alert("このブラウザでは対応していません");
//  }
//}
