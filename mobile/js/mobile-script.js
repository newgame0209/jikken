// モバイル用のJavaScript

document.addEventListener('DOMContentLoaded', () => {
    // ハンバーガーメニューの初期化
    initHamburgerMenu();
    
    // スムーススクロール
    initSmoothScroll();
    
    // スクロールアニメーションの初期化
    initScrollAnimation();
});

// ハンバーガーメニューの初期化
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    if (hamburger && nav && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('no-scroll');
        });
        
        // ナビゲーションリンクがクリックされたらメニューを閉じる
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
}

// スムーススクロール
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// スクロールアニメーションの初期化
function initScrollAnimation() {
    // アニメーション対象の要素
    const targets = [
        '.fade-in',
        '.fade-up',
        '.fade-left',
        '.fade-right'
    ];
    
    // IntersectionObserverの設定
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // スクロール時に要素が画面内に入ったらvisibleクラスを追加
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // 各ターゲット要素を監視
    targets.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
} 