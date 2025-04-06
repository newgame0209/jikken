document.addEventListener('DOMContentLoaded', function() {
    // レスポンシブテキスト切り替え機能
    function updateResponsiveText() {
        const isMobile = window.innerWidth <= 480;
        
        // 長いテキストと短いテキストのペアを持つ要素を全て取得
        const responsiveTextElements = document.querySelectorAll('[data-full-text][data-short-text]');
        
        responsiveTextElements.forEach(element => {
            if (isMobile) {
                // モバイル表示の場合は短いテキストを表示
                element.textContent = element.getAttribute('data-short-text');
            } else {
                // デスクトップ表示の場合は完全なテキストを表示
                element.textContent = element.getAttribute('data-full-text');
            }
        });
    }
    
    // 初期ロード時に実行
    updateResponsiveText();
    
    // ウィンドウサイズ変更時にも実行
    window.addEventListener('resize', updateResponsiveText);
});
