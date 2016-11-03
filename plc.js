/* Like a PLC */
$(function(){

$("div.contextual").css("display","none")

$(".version-article").each(function( ndx ){

$(this).css({
"border":"solid 1px steelblue","border-radius":"4px","width":"150px","height":"110px",
"line-height":"98%","padding":"3px","margin":"5px","float":"left",
"overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis" })

$("header > h3 > a",this).css("font-size","85%")

var $versionoverview = $("div.version-overview",this);
if ( $(this).hasClass("version-closed")) {
	$(this).css("background-color","darkgray")
} else {
	var sdate = $("p:first",$versionoverview).text().match(/(\()(.*)(\))/)
	if ( sdate != null ) {
		var diff = Math.floor((Date.parse(sdate[2]) - (new Date()))/86400000) +1;
		if ( diff < 0 ) { $(this).css({"background-color":"salmon"}) }
			else if ( diff < 3) { $(this).css({"background-color":"yellow","border":"solid 2px red"}) }
			else if ( diff < 7) { $(this).css("background-color","yellow") } 
			else { $(this).css("background-color","lightskyblue") }
		} else {
		$(this).css("background-color","silver")
	}
}

var $firstp = $("p:first", $versionoverview)
if ( $("strong", $firstp).text() == "" ) {
	var str = $firstp.text()
	$firstp.html("(---/--/--)")
	$("<p>" + str + "</p>").insertAfter( $firstp )
} else {
	$("p:first > strong",$versionoverview).css("display","none")
}

$("table.progress",this).css({"width":"100%","align":"center","border":"solid 1px skyblue"})
$("table.progress td.closed",this).css("background-color","steelblue")
$("form",this).css("display","none")

var $progressinfo = $(".progress-info",this)
if ( $progressinfo.text().match(/^.+/) != null ) {
	$progressinfo.css("display","none")
} else {
	var sstr = $progressinfo.html().match( /(<a .*\/a>)(.*\n.*\n.*\()(.*)(\n.*\n\s+)(.*)(\))/ )
	$progressinfo.html( sstr[3] + " / " + sstr[5] + " - " + $progressinfo.prev("p").text() ) 
}

	
});

});