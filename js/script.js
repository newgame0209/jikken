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
            // リンクのhref属性を取得
            const href = link.getAttribute('href');
            
            // 外部リンクかどうかチェック
            const isExternal = href.startsWith('http') || (!href.includes('#') && href.includes('.html'));
            
            // 現在のページのパス名を取得
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            // 同じページ内のアンカーリンクかチェック
            // 例: href="#about" または href="index.html#about" で現在index.htmlにいる場合
            const isCurrentPageAnchor = 
                (href.startsWith('#')) || 
                (href.split('#')[0] === currentPage) ||
                (currentPage.includes(href.split('#')[0]) && href.includes('#'));
            
            // メニューが開いている場合は閉じる
            if (nav.classList.contains('active')) {
                toggleMenu();
                
                // 同じページ内のアンカーリンクの場合は、スムーススクロールを自前で実装
                if (isCurrentPageAnchor && href.includes('#')) {
                    e.preventDefault(); // デフォルトのリンク動作をキャンセル
                    
                    // ターゲット要素のIDを取得
                    const targetId = href.includes('#') ? href.split('#')[1] : href.substring(1);
                    
                    // ターゲット要素が存在する場合は、存在チェック
                    if (targetId) {
                        const targetElement = document.getElementById(targetId);
                        
                        // ターゲット要素が存在する場合はスクロール
                        if (targetElement) {
                            // ヘッダーの高さを取得
                            const headerHeight = document.querySelector('header').offsetHeight;
                            
                            // ターゲット要素の位置を計算
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                            
                            // スムーススクロール
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
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
            
            if (targetId && targetId !== '#') {
                // #以降の部分を取得
                const idPart = targetId.substring(1);
                const targetElement = document.getElementById(idPart);
                
                if (!targetElement) return;
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // TOPページ内リンクの場合、スムーススクロール後にメニューを閉じる
                if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    const hamburger = document.querySelector('.hamburger-menu');
                    const nav = document.querySelector('header nav');
                    if (nav.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                        document.querySelector('.overlay').classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });
    
    // index.html#services のようなページ間リンクにも対応
    document.querySelectorAll('a[href*=".html#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const pageAndAnchor = href.split('#');
            
            // 現在のページのパス名が含まれている場合（同じページへのリンク）
            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';
            
            // 同じページ内のリンクなら、スムーススクロール
            if (pageAndAnchor[0] === currentPage || currentPath.endsWith(pageAndAnchor[0])) {
                e.preventDefault();
                
                const targetId = pageAndAnchor[1];
                const targetElement = document.getElementById(targetId);
                
                if (!targetElement) return;
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // メニューが開いている場合は閉じる
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
