$(function () {
  // 初期表示時
  var sum;
  var option = {
    handle: 'span.move',
    axis: 'y',
    stop: function(event, ui){
      calc();
  }
  }
  $("#tblSortable tbody").sortable(option);
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

    /*     左右表示 */
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
