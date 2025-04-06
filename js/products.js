// プロダクトフィルター機能
document.addEventListener('DOMContentLoaded', function() {
    // フィルターボタンの取得
    const filterButtons = document.querySelectorAll('.filter-btn');
    // プロダクトアイテムの取得
    const productItems = document.querySelectorAll('.product-item');
    
    // フィルターボタンにイベントリスナーを追加
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 選択されたフィルターの値を取得
            const filterValue = this.getAttribute('data-filter');
            
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // プロダクトのフィルタリング
            productItems.forEach(item => {
                // 'all'が選択された場合は全て表示
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    // フェードインアニメーション
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    // カテゴリーが一致するかチェック
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                        // フェードインアニメーション
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        // フェードアウトしてから非表示
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // 詳細リンクのスムーススクロール
    const detailLinks = document.querySelectorAll('.btn-detail');
    detailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーの高さを考慮したスクロール位置の計算
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // スムーススクロール
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // プロダクトアイテムのマウスオーバーエフェクト
    productItems.forEach(item => {
        const card = item.querySelector('.product-card');
        
        item.addEventListener('mouseenter', function() {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
        });
        
        item.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 初期表示時はすべてのプロダクトを表示（透明度アニメーション）
    productItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100);
    });
}); 