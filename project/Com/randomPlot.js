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

//画像取得
  html2canvas(document.querySelector("#plotResult")).then(canvas => {
    document.body.appendChild(canvas);
   // $("#plotResult").appendChild(canvas);
  });


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
  
  //test
  var data = [];
  var tr = $("table tr");//全行を取得
  for( var i=0,l=tr.length;i<l;i++ ){
    var cells = tr.eq(i).children();//1行目から順にth、td問わず列を取得
    for( var j=0,m=cells.length;j<m;j++ ){
      if( typeof data[i] == "undefined" )
        data[i] = [];
      data[i][j] = cells.eq(j).text();//i行目j列の文字列を取得
    }
  }

  if($('#span1').length){
    var txt1 = data[1][0].trim() + $("#select1 option:selected").text().trim() + data[1][2].trim();
    $('#span1').html(txt1.replace(" ",""));
  }
  if($('#span2').length){
    var txt2 = data[2][0].trim() + $("#select2 option:selected").text().trim() + data[2][2].trim();
    $('#span2').html(txt2.replace(" ",""));
  }
  if($('#span3').length){
    var txt3 = data[4][0].trim() + $("#select3 option:selected").text().trim() + data[4][2].trim();
    $('#span3').html(txt3.replace(" ",""));
  }
  if($('#span4').length){
    var txt4 = data[5][0].trim() + $("#select4 option:selected").text().trim() + data[5][2].trim();
    $('#span4').html(txt4.replace(" ",""));
  }
  if($('#span5').length){
    var txt5 = data[6][0].trim() + $("#select5 option:selected").text().trim() + data[6][2].trim();
    $('#span5').html(txt5.replace(" ",""));
  }
  if($('#span6').length){
    var txt6 = data[7][0].trim() + $("#select6 option:selected").text().trim() + data[7][2].trim();
    $('#span6').html(txt6.replace(" ",""));
  }
  if($('#span7').length){
    var txt7 = data[8][0].trim() + $("#select7 option:selected").text().trim() + data[8][2].trim();
    $('#span7').html(txt7.replace(" ","").replace(" ",""));
  }
}
