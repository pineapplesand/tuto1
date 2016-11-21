function init_tree() {
	// 要素は存在するか
	if ( !$('ul.tree').length) {
		return; // 存在しない場合は終了
	}
	// 展開と折りたたみ
	$('p.tree_controls a.expand_all, p.tree_controls a.collapse_all')
		.click(function() {
			// クラスを調べる
			if ( $(this).hasClass('collapse_all') ) {
				$(this).parent('p').next('ul').find('a.tree_trigger')
				.addClass('trigger_expanded')
				.end().find('ul').addClass('tree_expanded');
				return false;
			} else {
				$(this).parent('p').next('ul').find('a.tree_trigger')
				.removeClass('trigger_expanded')
				.end().find('ul').removeClass('tree_expanded');
			}
			// リンクをたどらない
			this.blur();
			return false;
		});
	
		// ツリーのクリックを待ち受ける
		$('ul.tree a.tree_trigger').live('click', function() {
			// 次のulは非表示か
			if ( $(this).next('ul').is(':hidden')) {
				$(this).removeClass('trigger_expanded').next('ul')
				.removeClass('tree_expanded');
			} else {
				$(this).addClass('trigger_expanded').next('ul')
				.addClass('tree_expanded');
			}
			//リンクをたどらない
			this.blur();
			return false;
		});
		
		// 最後のliにクラスを追加する
		$('ul.tree li:last-child').addClass('last');
		
		// トリガの状態を変更する
		$('ul.tree_expanded').prev('a').addClass('trigger_expanded');
}
	
// 動的な機能を開始
$(document).ready(function() { init_tree(); });
