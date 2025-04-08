// DOMコンテンツの読み込み完了時に実行
document.addEventListener('DOMContentLoaded', () => {
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
});

// ハンバーガーメニューの初期化
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    const navLinks = nav.querySelectorAll('a'); // ナビゲーション内のリンクを取得

    if (!hamburger || !nav || !overlay) {
        console.error('Hamburger menu elements not found.');
        return;
    }

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // クリックイベントが親要素に伝播しないようにする
        toggleMenu();
    });

    overlay.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // 各ナビゲーションリンクにイベントリスナーを追加
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 外部リンクや別ページへのリンクの場合はデフォルト動作
            const href = link.getAttribute('href');
            const isExternal = href.startsWith('http') || !href.startsWith('#');
            const isCurrentPageLink = href.startsWith('#') && window.location.pathname.endsWith('index.html'); // TOPページ内リンクかチェック

            if (nav.classList.contains('active')) {
                 // 同じページ内のアンカーリンクでなければ、ページ遷移前にメニューを閉じる
                 // (スムーススクロールが別途処理するため、ここでは閉じない)
                 if (!isCurrentPageLink) { 
                      toggleMenu();
                 }
            }
            
             // スムーススクロールのための処理は initSmoothScroll で行うため、ここでは何もしない
             // ただし、メニューはクリックされたら閉じる必要がある場合がある。
             // 特に別ページへのリンクの場合は、遷移前に閉じておくのが自然。
             if (isExternal || !href.startsWith('#')) {
                 // toggleMenu() はページ遷移後に実行されるので、ここでは不要かもしれないが、念のため。
                 // メニューが開いている場合のみ閉じる
                 if (nav.classList.contains('active')) {
                     toggleMenu();
                 }
             } else if (isCurrentPageLink) {
                // TOPページ内リンクの場合、スムーススクロール後に閉じるように initSmoothScroll 側で対応する
                // ここで閉じるとスクロールがおかしくなる可能性があるため、何もしない
                // ただし、スムーススクロール対象外の#リンクの場合は閉じるべきかもしれない
                // 一旦、initSmoothScrollに任せる
             }
        });
    });
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
            
            // TOPページ内リンクの場合、スムーススクロール後にメニューを閉じる
            if (targetId.startsWith('#') && window.location.pathname.endsWith('index.html')) {
                const hamburger = document.querySelector('.hamburger-menu');
                const nav = document.querySelector('header nav');
                if (nav.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    nav.classList.remove('active');
                    document.querySelector('.overlay').classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
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
