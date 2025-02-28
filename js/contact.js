document.addEventListener('DOMContentLoaded', function() {
    // FAQアコーディオンの動作
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // 現在開いている項目を閉じる（同時に1つだけ開く場合）
            const currentActive = document.querySelector('.faq-item.active');
            if (currentActive && currentActive !== item) {
                currentActive.classList.remove('active');
            }
            
            // クリックした項目の開閉状態を切り替える
            item.classList.toggle('active');
        });
    });

    // フォームのバリデーション
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 簡易的なバリデーション
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // メールアドレスの簡易バリデーション
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // ここに実際の送信処理を実装
                // 現在はアラートだけ表示
                alert('お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。');
                contactForm.reset();
            } else {
                alert('必須項目を入力してください。');
            }
        });
    }
}); 