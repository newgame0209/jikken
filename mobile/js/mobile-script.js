// モバイル用のJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ローディングアニメーション
    const loading = document.querySelector('.loading');
    
    if (loading) {
        setTimeout(function() {
            loading.classList.add('hide');
            setTimeout(function() {
                loading.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // ハンバーガーメニュー
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburgerMenu && nav) {
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.toggle('active');
            nav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // オーバーレイクリックでメニューを閉じる
        if (overlay) {
            overlay.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        // ナビゲーションリンククリックでメニューを閉じる
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                nav.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // FAQのトグル機能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // すべてのアイテムから'active'クラスを削除
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // クリックされたアイテムの'active'クラスをトグル
                item.classList.toggle('active');
            });
        }
    });

    // スムーズスクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロール検出でヘッダースタイル変更
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        if (scrollTop > lastScrollTop) {
            // 下にスクロール
            header.classList.add('header-hidden');
        } else {
            // 上にスクロール
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Intersection Observer非対応ブラウザ用のフォールバック
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}); 