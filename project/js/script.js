// ========== ハンバーガーメニュー制御 ==========
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuItems = document.querySelectorAll('.menu-item');

// メニューを開く
function openMenu() {
    menuOverlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden'; // スクロール防止
}

// メニューを閉じる
function closeMenu() {
    menuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = ''; // スクロール復元
}

// ハンバーガーボタンクリック
hamburger.addEventListener('click', () => {
    if (menuOverlay.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// 閉じるボタンクリック
menuClose.addEventListener('click', closeMenu);

// オーバーレイ（背景）クリックで閉じる
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        closeMenu();
    }
});

// メニュー項目クリック時（ダミーリンクの処理）
menuItems.forEach(item => {
    item.addEventListener('click', (e) => { // デフォルトのリンク動作を防止
        const href = item.getAttribute('href');
        
        // ダミーアラート表示
        let message = '';
        switch(href) {
            case '#about':
                message = 'このサイトについてページへ遷移します（ダミー）';
                break;
            case '#ranking':
                message = 'スコアランキングページへ遷移します（ダミー）';
                break;
        }
    });
});
// ========== ハンバーガーメニュー制御終了 ==========

// Escキーでメニューを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// ========== ボタンインタラクション ==========
const choiceButtons = document.querySelectorAll('.choice-button');

// ボタンクリック時のアニメーション
choiceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const mode = this.getAttribute('data-mode');
        
        // --- リップル効果の作成 (既存のコード) ---
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        setTimeout(() => { ripple.remove(); }, 600);
        
        // --- 画面遷移の処理 (ここを修正) ---
        setTimeout(() => {
            // URLパラメータとしてモード（solo/multi）を渡すと、
            // 次のページで「どちらが選ばれたか」を判別できるので便利です。
            window.location.href = `select.html?mode=${mode}`;
        }, 400); // アニメーションを見せるために少し遅延させています
    });
});
    
    // マウスの動きに追従するホバー効果
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        this.style.transform = `translateY(-5px) rotateX(${-deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
    });
    
    // マウスが離れたら元に戻す
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });

// リップル効果のCSSを動的に追加
const style = document.createElement('style');
style.textContent = `
    .choice-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== ページロード時のアニメーション ==========
window.addEventListener('DOMContentLoaded', () => {
    // カードのアニメーション遅延
    const card = document.querySelector('.choice-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // ボタンの順次表示
    const buttons = document.querySelectorAll('.choice-button');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.5s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
});

// ========== ボタンホバー時の音響効果（オプション） ==========
// Web Audio APIを使用した簡易的なホバー音
let audioContext;
let isAudioEnabled = false;

// オーディオコンテキストの初期化（ユーザーインタラクション後）
document.addEventListener('click', () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isAudioEnabled = true;
    }
}, { once: true });

// ホバー音の再生（軽い「ピッ」という音）
function playHoverSound() {
    if (!isAudioEnabled || !audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// ボタンホバー時に音を鳴らす
choiceButtons.forEach(button => {
    button.addEventListener('mouseenter', playHoverSound);
});

console.log('双六ゲーム - プレイ人数選択画面を読み込みました');
console.log('ハンバーガーメニュー: 有効');
console.log('ボタンインタラクション: 有効');