document.addEventListener('DOMContentLoaded', function() {
    // 遅延読み込み用のIntersectionObserverを設定
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px' // 画面の下から200pxの位置に来たら読み込み開始
    });
    
    // 画像要素を取得して監視
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        lazyLoadObserver.observe(img);
    });
});
