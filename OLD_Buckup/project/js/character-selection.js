// ========== ハンバーガーメニュー制御 ==========
const hamburger = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuItems = document.querySelectorAll('.menu-item');

// メニューを開く
function openMenu() {
    menuOverlay.classList.add('active');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// メニューを閉じる
function closeMenu() {
    menuOverlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
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

// オーバーレイクリックで閉じる
menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        closeMenu();
    }
});

// Escキーでメニューを閉じる
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// ========== キャラクター選択 ==========
const characterBoxes = document.querySelectorAll('.character-box');
let selectedCharacter = null;

characterBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // 既存の選択を解除
        characterBoxes.forEach(b => b.classList.remove('selected'));
        
        // 新しい選択を適用
        this.classList.add('selected');
        selectedCharacter = this.getAttribute('data-character');
        
        console.log(`キャラクター ${selectedCharacter} を選択しました`);
        
        // 選択アニメーション
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // STARTボタンの有効化チェック
        checkStartButton();
    });
});

// ========== カラーピッカー制御 ==========
document.addEventListener('DOMContentLoaded', () => {
    const colorPicker = document.getElementById('playerColor');
    const colorValueDisplay = document.getElementById('colorValue');
    // IDでパスを特定するように変更
    const avatarBody = document.getElementById('avatarBody');

    if (colorPicker) {
        // カラーピッカーの値が変更された時（スライド中も含む）の処理
        colorPicker.addEventListener('input', (event) => {
            const selectedColor = event.target.value;

            // 1. カラーコードのテキスト表示を更新
            if (colorValueDisplay) {
                colorValueDisplay.textContent = selectedColor.toUpperCase();
            }

            // 2. SVGアバターの色を更新
            if (avatarBody) {
                avatarBody.setAttribute('fill', selectedColor);
            }
        });
    }
});

// ========== プレイヤー名入力 ==========
const playerNameInput = document.getElementById('playerName');

// プレイヤー名の入力を監視
playerNameInput.addEventListener('input', () => {
    checkStartButton();
});

// エンターキーで決定
playerNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        startGame();
    }
});

// ========== STARTボタン制御 ==========
const startButton = document.getElementById('startButton');

// STARTボタンの有効/無効を判定
function checkStartButton() {
    const hasName = playerNameInput.value.trim().length > 0;
    
    if (hasName) {
        startButton.disabled = false;
        startButton.style.cursor = 'pointer';
    } else {
        startButton.disabled = true;
        startButton.style.cursor = 'not-allowed';
    }
}

// STARTボタンクリック
startButton.addEventListener('click', startGame);

// ゲーム開始処理
function startGame() {
    const playerName = playerNameInput.value.trim();
    const colorPicker = document.getElementById('playerColor');
    const playerColor = colorPicker.value;
    
    if (!playerName) {
        alert('プレイヤー名を入力してください');
        playerNameInput.focus();
        return;
    }
    
    // SVGのpathデータを取得
    const avatarBody = document.getElementById('avatarBody');
    const avatarPath = avatarBody ? avatarBody.getAttribute('d') : '';
    
    // ゲーム開始の確認
    const gameData = {
        playerName: playerName,
        color: playerColor,
        avatarPath: avatarPath
    };
    
    console.log('ゲーム開始:', gameData);
    
    // localStorageにデータを保存（URLパラメータの代替/バックアップ）
    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerColor', playerColor);
    localStorage.setItem('avatarPath', avatarPath);
    
    // アニメーション効果
    startButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        startButton.style.transform = '';
        
        // URLパラメータを使用してsugoroku_origin.htmlへ遷移
        const params = new URLSearchParams({
            name: playerName,
            color: playerColor,
            path: avatarPath
        });
        
        window.location.href = `sugoroku_origin.html?${params.toString()}`;
    }, 200);
}

// ========== カラープリセット機能 ==========
const colorPresets = [
    { name: '青', color: '#00BFFF' },
    { name: '赤', color: '#FF6B6B' },
    { name: '緑', color: '#00B050' },
    { name: '黄', color: '#FFC000' },
    { name: '紫', color: '#764ba2' },
    { name: 'ピンク', color: '#FF69B4' }
];

// プリセット色ボタンを作成（オプション）
function createColorPresets() {
    const wrapper = document.querySelector('.color-picker-wrapper');
    const presetContainer = document.createElement('div');
    presetContainer.className = 'color-presets';
    presetContainer.style.cssText = `
        display: flex;
        gap: 8px;
        margin-top: 10px;
    `;
    
    colorPresets.forEach(preset => {
        const button = document.createElement('button');
        button.className = 'preset-button';
        button.style.cssText = `
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: transform 0.2s;
            background-color: ${preset.color};
        `;
        button.title = preset.name;
        
        button.addEventListener('click', () => {
            const colorPicker = document.getElementById('playerColor');
            const colorValueDisplay = document.getElementById('colorValue');
            const avatarBody = document.getElementById('avatarBody');
            
            if (colorPicker) {
                colorPicker.value = preset.color;
            }
            if (colorValueDisplay) {
                colorValueDisplay.textContent = preset.color.toUpperCase();
            }
            if (avatarBody) {
                avatarBody.setAttribute('fill', preset.color);
            }
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        presetContainer.appendChild(button);
    });
    
    wrapper.parentElement.appendChild(presetContainer);
}

// プリセット色ボタンを作成
createColorPresets();

// ========== ページロードアニメーション ==========
window.addEventListener('DOMContentLoaded', () => {
    // カードのフェードイン
    const card = document.querySelector('.character-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // キャラクターボックスの順次表示
    characterBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            box.style.transition = 'all 0.5s ease-out';
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
        }, 300 + (index * 100));
    });
    
    // プレイヤー設定エリアのフェードイン
    const settings = document.querySelector('.player-settings');
    settings.style.opacity = '0';
    settings.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        settings.style.transition = 'all 0.6s ease-out';
        settings.style.opacity = '1';
        settings.style.transform = 'translateY(0)';
    }, 800);
    
    // STARTボタンの初期状態
    checkStartButton();
});

// ========== デバッグ情報 ==========
console.log('双六ゲーム - キャラクター選択画面を読み込みました');
console.log('利用可能な機能:');
console.log('- プレイヤー名入力');
console.log('- アバターカラー選択');
console.log('- カラープリセット (6色)');
console.log('- ハンバーガーメニュー');
