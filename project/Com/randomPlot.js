$(function () {


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

});

//一括ボタン押下時
function clickRandomAll() {
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
      "二人は【"+
      $("#select1 option:selected").text().trim() +
      "】という障害を乗り越え、";
    $("#span1").html(txt1.replace(" ", ""));
  }
  if ($("#span2").length) {
    var txt2 =
    "全体を通して【"+
      $("#select2 option:selected").text().trim() +
      "】。";
    $("#span2").html(txt2.replace(" ", ""));
  }
  if ($("#span3").length) {
    var txt3 =
      "行為のきっかけは【"+
      $("#select3 option:selected").text().trim() +
      "】で、";
    $("#span3").html(txt3.replace(" ", ""));
  }
  if ($("#span4").length) {
    var txt4 =
      "場所は【" +
      $("#select4 option:selected").text().trim() +
      "】だ。";
    $("#span4").html(txt4.replace(" ", ""));
  }
  if ($("#span5").length) {
    var txt5 =
    "オプションは【"+
      $("#select5 option:selected").text().trim() +
      "】で、";
    $("#span5").html(txt5.replace(" ", ""));
  }
  if ($("#span6").length) {
    var txt6 =
    "最中は【"+
      $("#select6 option:selected").text().trim() +
      "】交わり、";
    $("#span6").html(txt6.replace(" ", ""));
  }
  if ($("#span7").length) {
    var txt7 =
    "結果は【"+
      $("#select7 option:selected").text().trim() +
      "】。";
    $("#span7").html(txt7.replace(" ", "").replace(" ", ""));
  }
}


// プロット確定ボタン押下時
function clickEnter(){

    // 動的にパスを作成
    var targetUrl = './randomEchiResult.html?';

    targetUrl = targetUrl + 's1=' + $("#select1").val();
    targetUrl = targetUrl + '&' + 's2=' + $("#select2").val();
    targetUrl = targetUrl + '&' + 's3=' + $("#select3").val();
    targetUrl = targetUrl + '&' + 's4=' + $("#select4").val();
    targetUrl = targetUrl + '&' + 's5=' + $("#select5").val();
    targetUrl = targetUrl + '&' + 's6=' + $("#select6").val();
    targetUrl = targetUrl + '&' + 's7=' + $("#select7").val();

    window.location.href = targetUrl; 
    //window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示

}



//画像表示
function dispImage() {
    var scrollVal = $(window).scrollTop();//スクロール位置を保持

    $(window).scrollTop(0);   // スクロール
    $(window).scrollLeft(0);  // スクロール

    html2canvas(document.querySelector("#picArea")).then(canvas => {

        // canvasをimgtタグに挿入できる形に変更
        var imageData = canvas.toDataURL();
        // imgタグに画像として、canvasの内容を挿入
        document.getElementById('canvas-image').setAttribute("src", canvas.toDataURL());
    });

    $("#imageArea").css("display", "inline-block");//画像エリア表示
    $(window).scrollTop(scrollVal);   // スクロールもどす

}

//シェアボタンクリック時
function clickBtnShareCustom() {

    var result = $("#span1").html() + $("#span2").html() + $("#span3").html() +
        $("#span4").html() + $("#span5").html() + $("#span6").html() + $("#span7").html();
    var cutStr = '';
    var maxLength = 100;

    if (result.length > maxLength) {
        cutStr = result.substr(0, maxLength) + '……'
    }

    //カスタムテキスト
    var txt = "%0a"
        + cutStr + "%0a"
        ;

    clickBtnShareTagFirstParam(txt, 'ランダムえちえちプロット');
}

function clickBtnBack() {

    // 動的にパスを作成
    var targetUrl = './randomEchiTool.html?';

    targetUrl = targetUrl + 's1=' + $("#select1").val();
    targetUrl = targetUrl + '&' + 's2=' + $("#select2").val();
    targetUrl = targetUrl + '&' + 's3=' + $("#select3").val();
    targetUrl = targetUrl + '&' + 's4=' + $("#select4").val();
    targetUrl = targetUrl + '&' + 's5=' + $("#select5").val();
    targetUrl = targetUrl + '&' + 's6=' + $("#select6").val();
    targetUrl = targetUrl + '&' + 's7=' + $("#select7").val();

    window.location.href = targetUrl;

}
