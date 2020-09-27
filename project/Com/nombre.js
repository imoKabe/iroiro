$(function () {
  // 初期表示時
  calc();

  var sum;
  var option = {
    handle: 'span.move',
    axis: 'y',
    stop: function(event, ui){
      calc();
    }
  }
  
  $("#tblSortable tbody").sortable(option);
  
  // クッキーから復元
    var titles = $.cookie('titles');
    var pages = $.cookie('pages');
    var rowNam = $.cookie('rowNam');

  if((titles != null) && (pages != null)&& (rowNam != null)){

    //配列化
    var titlesArray = titles.split(',');
    var pagesArray = pages.split(',');

    // テーブルの行最初以外削除
    $('#tblSortable tbody tr:not(:eq(0))').remove();
    
    //行の数だけコピーして増やす
    for(var j=0; j < rowNam ; j++ ){
      addRow(titlesArray[j]+'', pagesArray[j]);
    }
    
    // テーブルの行を最初だけ削除
    $('#tblSortable tbody tr').eq(0).remove();

  }
  calc();

});

// ページ変更時
$(".page").change(function () {
  calc();
});
// コピーボタン押下時
$(".addCopy").on("click", function () {
  //最終行コピー
  addRow("", "");
  calc();
});
// 調整追加ボタン押下時
$(".addAdjust").on("click", function () {
  addRow("調整用ページ", "1");
  calc();
});

// 最後追加ボタン押下時
$(".addLast").on("click", function () {
  addRow("奥付", "1");
  addRow("表３、表４", "2");
  calc();
});

// 削除ボタン押下時
$(".del").on("click", function () {
  if ($(".tblCalc tr").length < 3) {
    alert("最後の行は削除できません。\n行を追加してください。");
  } else {
    $(this).parent().parent().remove();
    calc();
  }
});

//計算
function calc() {
  sumAll();
  sumEach();
}
/* 全ページ合計 */
function sumAll() {
  sum = 0;
  $(".page").each(function () {
    var page = $(this).val();
    sum = parseInt(page) + sum;
  });
  $("#sum").text("合計：" + sum + "ページ");

  if (sum % 4 == 0) {
    $("#sumAlert").text("４の倍数です").css("color", "green")
    .attr("class","lsf-icon").attr("title","laugh");
  } else if (sum % 2 == 0) {
    $("#sumAlert").text("２の倍数です").css("color", "black")
    .attr("class","lsf-icon").attr("title","smile");
  } else {
    $("#sumAlert").text("２の倍数ではありません").css("color", "red")
    .attr("class","lsf-icon").attr("title","frustrate");
  }
}
/* 各行の集計 */
function sumEach() {
  /*始めの行  */
  var firstPage = $(".tblCalc tbody tr:first-child .page");
  var firstStart = $(".tblCalc tbody tr:first-child .start");
  var firstEnd = $(".tblCalc tbody tr:first-child .end");

  firstStart.text(1);
  firstEnd.text(parseInt(firstPage.val()) + parseInt(firstStart.text())-1);
  var firstFlg = true;

  $(".tblCalc tbody tr").each(function () {
    var start = $(this).find(".start");
    var end = $(this).find(".end");

    if (!firstFlg) {
        /* 二行目以降 */
        var pageVal = parseInt($(this).find(".page").val());
        var prevEndVal = parseInt($(this).prev().find(".end").text());
     
        start.text(prevEndVal + 1);
        end.text(pageVal + prevEndVal);
    }else{
      firstFlg = false;
    }

    /* 左右表示 */
    $(this).find(".sayu").text("");
    if (parseInt(start.text()) % 2 == 0) {
      $(this).find(".sayu").append('<img class="sayu" src="../../Com/img/rightBook.png" alt="右">');
    } else {
      $(this).find(".sayu").append('<img class="sayu" src="../../Com/img/leftBook.png" alt="左">');
    }
  
  });
}
/* 最後に行を追加 */
function addRow(name, page) {
  $(".tblCalc tbody tr:last-child").clone(true).appendTo(".tblCalc tbody");
  var lastRow = $(".tblCalc tbody tr:last-child");
  // 指定があれば上書き
  if (name != "") {
    lastRow.find(".name").val(name);
  }
  if (page != "") {
    lastRow.find(".page").val(page);
  }
}
function clickSave(){
  
  //Cookieに保存
  //行数
  var rowNam = $("#tblSortable tbody").children().length;

  //テーブルの中身を配列で取得
  var data = [];
  var tr = $("table tr");//全行を取得
  for( var i=0,l=tr.length;i<l;i++ ){
    var cells = tr.eq(i).children();//1行目から順にth、td問わず列を取得
    for( var j=0,m=cells.length;j<m;j++ ){
      if( typeof data[i] == "undefined" )
        data[i] = [];
      data[i][j] = cells.eq(j).find('input').val();//i行目j列のインプット文字列を取得
    }
  }
  var titles = "";
  var pages = "";
  //必要な分だけ格納
  for(var j=1; j <= rowNam ; j++ ){
    titles = titles + data[j][1].trim();
    titles = titles + ",";
    pages = pages + data[j][2].trim();
    pages = pages + ",";
  }

  $.cookie('rowNam', rowNam, { expires: 180 });
  $.cookie('titles', titles, { expires: 180 });
  $.cookie('pages', pages, { expires: 180 });
  alert("Cookieに入力情報を保存しました。\n次回同じブラウザからのアクセス時、復元します。");

}