$(function(){
  
  var toggleFlag = false;
  $('#content').prepend($('<a href="#">PLCÅÑ</a>')
    .css({'position':'absolute','top':'112px','left':'0','width':'10px','height':'10px'})
        .click( function(event){
          if (toggleFlag==false) { parking_lot_chart(); $(this).text("roadmapÅÑ")} 
            else { location.reload(); }
        } )
  )
  
function parking_lot_chart(){
  toggleFlag = !toggleFlag;
  $("div.contextual").css("display","none")

  $(".version-article").each(function( ndx ){
  $(this).css({
  "border":"solid 1px steelblue","border-radius":"4px","width":"200px","height":"100px",
  "line-height":"50%","padding":"5px 2px","margin":"5px","float":"left",
  "overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis" })

  $("header > h3 > a",this).css("font-size","85%")

  var $versionoverview = $("div.version-overview",this);
  var $firstp = $("p:first", $versionoverview)
  if ( $(this).hasClass("version-closed")) {
    // ticket has been closed.
    $(this).css("background-color","darkgray")
  } else {
    var sdate = $firstp.text().match(/(\()(.*)(\))/)
    if ( sdate != null ) {
      var diff = Math.floor((Date.parse(sdate[2]) - (new Date()))/86400000) +1;
      if ( diff < 0 ) { $(this).css({"background-color":"salmon"}) }
        else if ( diff < 3) { $(this).css({"background-color":"yellow","border":"solid 2px red"}) }
        else if ( diff < 7) { $(this).css("background-color","yellow") } 
        else { $(this).css("background-color","lightskyblue") }
      } else {
      $(this).css("background-color","ivory")
    }
  }

  if ( null != $firstp.text().match(/^\d{4}\/\d{2}\/\d{2}$/) ) {
    // ticket has done but not closed.
    $(this).css("background-color","tan")
  } else {
    if ( undefined == $("strong",$firstp)[0] ) {
      var str = ("" == $firstp.text()) ? "&nbsp;" : $firstp.text();
      $firstp.html("&nbsp;").after( $("<p>" + str + "</p>") )
    }
    $("p:first > strong",$versionoverview).css("display","none")
  }
   
  $("table.progress",this).css({"width":"100%","align":"center","border":"solid 1px deepskyblue"})
  $("table.progress td.closed",this).css("background-color","steelblue")
  $("table.progress td.done",this).css("background-color","lightskyblue")
  $("form",this).css("display","none")

  var $progressinfo = $(".progress-info",this)
  if ( $progressinfo.text().match(/^.+/) != null ) {
    $progressinfo.css("display","none")
  } else {
    var sstr = $progressinfo.html().match( /(<a .*\/a>)(.*\n.*\n.*\()(.*)(\n.*\n\s+)(.*)(\))/ )
    $progressinfo.html( $progressinfo.prev("p").text() + " - " + sstr[3] + " / " + sstr[5] ).css({"font-size":"90%","line-height":"120%"})
  }

}) // end of each
    
} // function parking_lot_chart()
  
});