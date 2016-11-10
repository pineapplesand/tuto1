$(function(){

  var $sidebar = $('#sidebar');

  $sidebar.prepend( $('<input id="plc" type="checkbox">PLC</input>').on('change',function() {   
    if ( $(this).prop('checked') ) { plc(); legend(); }
    else { location.reload(); }
  }) )
  
  function legend(){
    $('#content').prepend($('<div id="legend"/>').css({'position':'absolute','top':'125px','left':'200px','width':'80%','height':'25px'})
      .append($('<div style="float:left"><span style="background-color:ivory; border:solid 1px steelblue; width:15px; height:15px; float:left;">&nbsp;</span>未定&nbsp;&nbsp;</div>'))
      .append($('<div style="float:left"><span style="background-color:lightskyblue; width:15px; height:15px; float:left;">&nbsp;</span>余裕&nbsp;&nbsp;</div>'))
      .append($('<div style="float:left"><span style="background-color:yellow; border:solid 1px steelblue;width:15px; height:15px; float:left;">&nbsp;</span>切迫&nbsp;&nbsp;</div>'))
      .append($('<div style="float:left"><span style="background-color:yellow; border:solid 1px red; width:15px; height:15px; float:left;">&nbsp;</span>緊迫&nbsp;&nbsp;</div>'))
      .append($('<div style="float:left"><span style="background-color:salmon; border:solid 1px steelblue;width:15px; height:15px; float:left;">&nbsp;</span>超過&nbsp;&nbsp;</div>'))
      .append($('<div style="float:left"><span style="background-color:tan; border:solid 1px steelblue;width:15px; height:15px; float:left;">&nbsp;</span>終了&nbsp;&nbsp;</div>'))
      .append($('<div><span style="background-color:silver; border:solid 1px steelblue; width:15px; height:15px; float:left;">&nbsp;</span>完了</div>'))
    )
  }

  function plc(){
    $("div.contextual").css("display","none")

    $(".version-article").each(function( ndx ){

      $(this).css({
      "border":"solid 2px steelblue","border-radius":"4px","width":"148px","height":"100px",
      "line-height":"50%","padding":"5px 2px","margin":"5px","float":"left",
      "overflow":"hidden","white-space":"nowrap","text-overflow":"ellipsis" })

      $("header > h3 > a",this).css("font-size","85%")

      var $versionoverview = $("div.version-overview",this);
      var $firstp = $("p:first", $versionoverview)
      if ( $(this).hasClass("version-closed")) {
        $(this).css("background-color","silver") 
      } else if ( null != $firstp.text().match(/^\d{4}\/\d{2}\/\d{2}$/) ) {
        $(this).css("background-color","tan")
        $('p:nth-child(2)',this).append("&nbsp;")
      } else {
        var sdate = $firstp.text().match(/(\()(.*)(\))/)
        if ( sdate != null ) {
          $firstp.text( sdate[2] )
          var diff = Math.floor((Date.parse(sdate[2]) - (new Date()))/86400000) +1;
          if ( diff < 0 ) { $(this).css({"background-color":"salmon"}) }
            else if ( diff < 3) { $(this).css({"background-color":"yellow","border-color":"red"}) }
            else if ( diff < 7) { $(this).css("background-color","yellow") } 
            else { $(this).css("background-color","lightskyblue") }
          } else {
          $(this).css("background-color","ivory")
        }
      }

      if ( $('p:nth-child(2)',this).html() == undefined ) {
        var str = ("" == $firstp.text()) ? "&nbsp;" : $firstp.text();
        $firstp.html("&nbsp;").after( $("<p>" + str + "</p>") )
      }
      $("p:first > strong",$versionoverview).css("display","none")
      $("table.progress",this).css({"width":"100%","align":"center","border":"solid 1px steelblue"})
      $("table.progress td.closed",this).css("background-color","steelblue")
      $("table.progress td.done",this).css("background-color","lightskyblue")
      $("form",this).css("display","none")

      var $progressinfo = $(".progress-info",this)
      if ( $progressinfo.text().match(/^.+/) != null ) {
        $progressinfo.css("display","none")
      } else {
        var sstr = $progressinfo.html().match( /(<a .*\/a>)(.*\n.*\n.*\()(.*)(\n.*\n\s+)(.*)(\))/ )
        $progressinfo.html( $progressinfo.prev("p").text() + " - " + sstr[3] + " / " + sstr[5] ).css({"font-size":"85%","line-height":"120%"})
      }

    }) // end of each
      
  } // function plc
  
});
