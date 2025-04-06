// 画面サイズによってテキストを切り替える機能
document.addEventListener('DOMContentLoaded', function() {
    // テキスト切り替えの処理
    function switchResponsiveText() {
        // data-full-text と data-short-text 属性を持つ要素を全て取得
        const responsiveTextElements = document.querySelectorAll('[data-full-text][data-short-text]');
        
        // スマホとPCの判定（画面幅が768px以下ならスマホと判断）
        const isMobile = window.innerWidth <= 768;
        
        // デバイスに応じてテキストを切り替え
        responsiveTextElements.forEach(element => {
            if (isMobile) {
                // スマホの場合は短いテキストを表示
                element.innerHTML = element.getAttribute('data-short-text');
            } else {
                // PCの場合は完全なテキストを表示
                element.innerHTML = element.getAttribute('data-full-text');
            }
        });
    }
    
    // ページ読み込み時に実行
    switchResponsiveText();
    
    // リサイズ時にも実行（throttleで処理を間引く）
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            switchResponsiveText();
        }, 200);
    });
});
