// DOMコンテンツの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // スクロールアニメーションの初期化
    initScrollAnimation();
    
    // ヘッダースクロール時の挙動
    initHeaderScroll();
    
    // スムーススクロール
    initSmoothScroll();
    
    // プロダクトカードのアニメーション初期化
    initProductCardAnimation();
    
    // ハンバーガーメニューの初期化
    initHamburgerMenu();
    
    console.log('全ての初期化が完了しました');
});

// ハンバーガーメニューの初期化
function initHamburgerMenu() {
    console.log('ハンバーガーメニュー初期化開始');
    
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    if (!hamburger) {
        console.error('ハンバーガーメニュー要素が見つかりません');
        return;
    }
    
    if (!nav) {
        console.error('ナビゲーション要素が見つかりません');
        return;
    }
    
    if (!overlay) {
        console.error('オーバーレイ要素が見つかりません');
        return;
    }
    
    console.log('ハンバーガーメニュー要素を取得しました');
    
    // メニューを閉じる関数
    function closeMenu() {
        console.log('メニューを閉じます');
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    }
    
    // ハンバーガーメニュークリック時の処理
    hamburger.addEventListener('click', function() {
        console.log('ハンバーガーメニューがクリックされました');
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });
    
    // オーバーレイクリック時の処理
    overlay.addEventListener('click', function() {
        console.log('オーバーレイがクリックされました');
        closeMenu();
    });
    
    // ナビゲーションリンクのクリックイベント
    const navLinks = nav.querySelectorAll('a');
    console.log(`ナビゲーションリンク数: ${navLinks.length}`);
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log(`リンク[${index}]がクリックされました: ${link.getAttribute('href')}`);
            
            // メニューを閉じる
            closeMenu();
            
            // 同じページ内のハッシュリンク(#で始まるリンク)の場合
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && document.querySelector(href)) {
                console.log(`ハッシュリンク: ${href} を処理します`);
                e.preventDefault();
                
                // スクロール先の要素を取得
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    // ヘッダーの高さを考慮したスクロール位置
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    console.log(`スクロール位置: ${targetPosition}px`);
                    
                    // スムーススクロール
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                console.log('通常のリンクとして処理: ページ遷移を許可');
                // 通常のリンクの場合は、デフォルトのページ遷移を許可
                return true;
            }
        });
    });
    
    console.log('ハンバーガーメニュー初期化完了');
}

// スクロールアニメーションの初期化
function initScrollAnimation() {
    // アニメーション対象の要素
    const targets = [
        '.text-illustration-block',
        '.member',
        '.service-item'
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

// プロダクトカードのアニメーション初期化
function initProductCardAnimation() {
    const cards = document.querySelectorAll('.product-card');
    
    // カードが最初は非表示になるようにスタイルを設定
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.2}s`; // カードごとに遅延を設定
    });
    
    // IntersectionObserverの設定
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // 監視対象が画面内に入ったらアニメーション
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                observer.unobserve(card);
            }
        });
    }, options);
    
    // 各カードを監視
    cards.forEach(card => {
        observer.observe(card);
    });
}

// ヘッダースクロール時の挙動
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // スクロール量に応じてヘッダーのスタイルを変更
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '20px 0';
        }
        
        lastScrollY = currentScrollY;
    });
}

// スムーススクロール
function initSmoothScroll() {
    // ヘッダーの外のセクションリンクをすべて取得（aタグのhref属性が#で始まり、topでないもの）
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
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

// SVG要素のアニメーション
function animateSVG() {
    // SVG要素のパスを取得してアニメーション
    const paths = document.querySelectorAll('.animate-svg path');
    
    paths.forEach((path, index) => {
        const length = path.getTotalLength();
        
        // CSSのスタイルをJSで設定
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
        
        // アニメーション
        setTimeout(() => {
            path.style.transition = 'stroke-dashoffset 2s ease';
            path.style.strokeDashoffset = '0';
        }, index * 100);
    });
}

// ページの読み込みが完了した時
window.addEventListener('load', () => {
    // ローディングアニメーション後にSVGアニメーションを開始
    setTimeout(() => {
        animateSVG();
    }, 2500);
});
