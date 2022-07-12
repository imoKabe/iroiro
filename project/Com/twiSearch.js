// 初期表示時
$(function () {
  // クッキーから復元
  var words = $.cookie("words");
  alert(words);
  if (words != null ) {
    //配列化
    var wordsArray = words.split(",");

    // 履歴行最初以外削除
    $("#history .hisRow:not(:eq(0))").remove();

    //行の数だけコピーして増やす
    for (var j = 0; j < wordsArray.length; j++) {
      addRow(wordsArray[j] );
    }

    // テーブルの行を最初だけ削除
    $("#history .hisRow").eq(0).remove();
  }
});

/* 最後に行を追加 */
function addRow(word) {
  $("#history .hisRow:last").clone(true).appendTo("#history .hisRow:last");
  var lastRow = $("#history .hisRow:last:last");
  // 指定があれば上書き
  if (word != "") {    lastRow.find(".hisTxt").text(word);}
}

// 検索時
$("#btnSearch").click(function () {
  // 空なら中断
  if ($("#txtSearch").val() == "") {
    return;
  }

  //履歴被り確認＝＝＝＝＝＝＝＝＝＝
  var kaburi = -1;
  $(".hisRow .hisTxt").each(function () {
    if ($(this).text() == $("#txtSearch").val()) {
      kaburi = $(".hisRow .hisTxt").index(this);
    }
  });
  // 履歴ありの場合
  if (kaburi > -1) {
    //被り列は一番上に
    $("#history .hisRow").eq(kaburi).insertBefore($("#history .hisRow").eq(0));

    //TODO 検索
    return;
  }
  //履歴被りなし、通常検索＝＝＝＝＝＝＝＝＝＝
  //行を増やす
  $("#history .hisRow:first").clone(true).prependTo("#history");
  $("#history .hisRow:first .hisTxt").text($("#txtSearch").val());

  //10行こえたら削除
  if ($("#history .hisRow").length > 10) {
    $("#history .hisRow:last").remove();
  }

  //TODO cookie search
  saveCookie();
});

//履歴クリック時
$(".hisRow .hisTxt").click(function () {
  //インデックスを取得
  var index = $(".hisRow .hisTxt").index(this);
  //クリック行を一番上に
  $("#history .hisRow").eq(index).insertBefore($("#history .hisRow").eq(0));
  //検索テキスト上書き
  $("#txtSearch").val($(this).text());

  //TODO cookie search
  saveCookie();
});

//履歴削除時
$(".btnDel").click(function () {
  if ($("#history .hisRow").length < 2) {
    alert("最後の行です。これ以上は削除できません。");
    return;
  }
  $(this).parent().remove();

  //Cookie
  saveCookie();
});

//転記ボタン
//最低10
$("#btnMin10").click(function () {
  copy(" min_faves:10");
});
//F条件
$("#btnFollow").click(function () {
  copy(" filter:follows");
});

//Copy
function copy(txt) {
  var get = String($("#txtSearch").val());
  $("#txtSearch").val(get + txt);
}

//Cookieに保存
function saveCookie() {
  //テキストを取得
  var words = $("#txtSearch").val() + ",";
  var hisTxts = $("#history .hisRow .hisTxt");
  hisTxts.each(function (index, elem) {
    words = words + $(elem).text() + ",";
  });

  $.cookie("words", words, { expires: 180 });
    alert(words);
}
