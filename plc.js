/* Like a PLC */
$(function(){

$("div.contextual").css("display","none") // 「編集」非表示

$(".version-article").each(function( ndx ){

// プロジェクト枠の調整
$(this).css({
"border":"solid 1px green","border-radius":"4px","width":"150px","height":"110px",
"line-height":"98%","padding":"3px","margin":"5px","float":"left",
"overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis" })

$("header > h3 > a",this).css("font-size","85%")

var $versionoverview = $("div.version-overview",this);
var sdate = $("p:first",$versionoverview).text().match(/(\()(.*)(\))/)
if ( $(this).hasClass("version-closed")) {
    $(this).css("background-color","darkgray") // 完了
} else {
  if ( sdate != null ) {
    var idate = Date.parse(sdate[2]) // 期限日
    var idate0 = new Date() // 当日
    var idatediff = Math.floor((idate - idate0)/86400000) + 1; // 差分
    if ( idatediff < 0 ) {
      $(this).css("background-color","salmon") // 期限超過
    } else if ( idatediff < 14) {
      $(this).css("background-color","yellow") // 余裕なし
    } else {
      $(this).css("background-color","skyblue") // 余裕あり
    }
  } else {
    $(this).css("background-color","lightyellow") // その他
  }
}

var $firstp = $("p:first", $versionoverview)
if ( $("strong", $firstp).text() == "" ) {
  var str = $firstp.text()
  $firstp.html("(---/--/--)")
  $("<p>" + str + "</p>").insertAfter( $firstp )
} else {
  /* 期限までn日、n日遅れ を非表示 */
  $("p:first > strong",$versionoverview).css("display","none")
}

$("table.progress",this).css({"width":"100%","align":"center","border":"solid 1px skyblue"}) // Pバーの調整
$("table.progress td.closed",this).css("background-color","steelblue") // Pバーの調整
$("form",this).css("display","none") // 関連チケット一覧を非表示

var $progressinfo = $(".progress-info",this)
if ( $progressinfo.text().match(/^.+/) != null ) {
  $progressinfo.css("display","none")
} else {
  var sstr = $progressinfo.html().match( /(<a .*\/a>)(.*\n.*\n.*\()(.*)(\n.*\n\s+)(.*)(\))/ )
  $progressinfo.html( sstr[3] + " / " + sstr[5] + " - " + $progressinfo.prev("p").text() ) 

}

});

});
