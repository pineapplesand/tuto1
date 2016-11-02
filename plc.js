/* Like a PLC */
$(function(){

$("div.contextual").css("display","none") // �u�ҏW�v��\��

$(".version-article").each(function( ndx ){

// �v���W�F�N�g�g�̒���
$(this).css({
"border":"solid 1px green","border-radius":"4px","width":"150px","height":"110px",
"line-height":"98%","padding":"3px","margin":"5px","float":"left",
"overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis" })

$("header > h3 > a",this).css("font-size","85%")

var $versionoverview = $("div.version-overview",this);
var sdate = $("p:first",$versionoverview).text().match(/(\()(.*)(\))/)
if ( $(this).hasClass("version-closed")) {
    $(this).css("background-color","darkgray") // ����
} else {
  if ( sdate != null ) {
    var idate = Date.parse(sdate[2]) // ������
    var idate0 = new Date() // ����
    var idatediff = Math.floor((idate - idate0)/86400000) + 1; // ����
    if ( idatediff < 0 ) {
      $(this).css("background-color","salmon") // ��������
    } else if ( idatediff < 14) {
      $(this).css("background-color","yellow") // �]�T�Ȃ�
    } else {
      $(this).css("background-color","skyblue") // �]�T����
    }
  } else {
    $(this).css("background-color","lightyellow") // ���̑�
  }
}

var $firstp = $("p:first", $versionoverview)
if ( $("strong", $firstp).text() == "" ) {
  var str = $firstp.text()
  $firstp.html("(---/--/--)")
  $("<p>" + str + "</p>").insertAfter( $firstp )
} else {
  /* �����܂�n���An���x�� ���\�� */
  $("p:first > strong",$versionoverview).css("display","none")
}

$("table.progress",this).css({"width":"100%","align":"center","border":"solid 1px skyblue"}) // P�o�[�̒���
$("table.progress td.closed",this).css("background-color","steelblue") // P�o�[�̒���
$("form",this).css("display","none") // �֘A�`�P�b�g�ꗗ���\��

var $progressinfo = $(".progress-info",this)
if ( $progressinfo.text().match(/^.+/) != null ) {
  $progressinfo.css("display","none")
} else {
  var sstr = $progressinfo.html().match( /(<a .*\/a>)(.*\n.*\n.*\()(.*)(\n.*\n\s+)(.*)(\))/ )
  $progressinfo.html( sstr[3] + " / " + sstr[5] + " - " + $progressinfo.prev("p").text() ) 

}

});

});
