function init_tree() { 

	if ( !$('div.project-name').length) { 	// Element PROJECT
		return; // 存在しない場合は処理なし
	}
	
	// position:absoluteを解除。上の要素が消えたら上方に詰める動作のため。
	$('div.issue-subject,div.version-name,div.project-name').css({"position":"relative","top":"25px"});
	
	// clicked on ISSUE
		$('div.issue-subject,div.version-name').on('click', function() { 
			
			// 弟要素を調べる
			var $myLeft = parseInt( $(this).css('left') );
			// すぐ下の弟が非表示だったら弟をすべて表示
			var flagHide = $(this).next().is(':hidden') ? true : false;
			
			$(this).nextAll().each( function(i,elem) {
				var $brLeft = parseInt( $(this).css('left') );
				// 奥にいる弟だけ非表示に
				if ( $brLeft > $myLeft ) { 
					if ( flagHide ) {
						$(this).removeClass('div_hidden');
					} else {
						$(this).addClass('div_hidden'); 
					}
					
				} else { exit; }
			});
		});

} 
	 
// 動的な機能を開始 
$(document).ready(function() { init_tree(); }); 
