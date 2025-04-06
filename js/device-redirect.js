// デバイス判定とリダイレクト用のスクリプト

(function() {
    // リダイレクト機能を無効化
    // PC版の内容をレスポンシブデザインで表示するため、
    // モバイルサイトへのリダイレクトは行わない
    
    // 以下のコードはコメントアウト
    /*
    // モバイルデバイスかどうかを判定
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    }
    
    // 現在のパス情報を取得
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // モバイルディレクトリへのパス
    const mobilePath = '/mobile/';
    
    // モバイルサイトかPCサイトかを判定してリダイレクト
    if (isMobileDevice()) {
        // すでにモバイルパスにいる場合はリダイレクトしない
        if (!currentPath.includes('/mobile/')) {
            // モバイル用のパスにリダイレクト
            window.location.href = mobilePath + currentPage;
        }
    } else {
        // すでにモバイルパスにいて、PCデバイスの場合はPC用のパスにリダイレクト
        if (currentPath.includes('/mobile/')) {
            // PC用のパスにリダイレクト
            window.location.href = currentPath.replace('/mobile/', '/');
        }
    }
    */
    
    console.log('レスポンシブデザインモードで表示中');
})();