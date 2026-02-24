// ===============================
// コードすごろく
// ===============================

const masterData = [
  { type: 'start',    name: 'スタート',    icon: '' },
  { type: 'normal',   name: '日本',       icon: '🇯🇵' },
  { type: 'normal',   name: '韓国', icon: '🇰🇷' },
  { type: 'quiz',     name: 'インド', icon: '❓', quizId: 1 },
  { type: 'positive', name: 'スリランカ',      icon: '🇱🇰', effect: 2 },
  { type: 'normal',   name: '中国', icon: '🇨🇳' },
  { type: 'happening',  name: '移動中',       icon: '✈️', effect: -2 },
  { type: 'normal',   name: 'カンボジア',       icon: '🇰🇭' },
  { type: 'quiz',     name: 'タイ', icon: '❓', quizId: 2 },
  { type: 'normal',   name: 'マレーシア',       icon: '🇲🇾' },
  { type: 'positive', name: 'シンガポール',       icon: '🇸🇬', effect: 3 },
  { type: 'normal',   name: 'インドネシア',       icon: '🇮🇩' },
  { type: 'happening',  name: '移動中',    icon: '✈️', effect: -1 },
  { type: 'normal',   name: 'フィンランド',       icon: '🇫🇮' },
  { type: 'quiz',     name: 'オーストリア', icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'チェコ',     icon: '🇨🇿' },
  { type: 'positive', name: 'ポーランド',  icon: '🇵🇱', effect: 2 },
  { type: 'normal',   name: 'ルーマニア',     icon: '🇷🇴' },
  { type: 'normal',   name: '移動中',     icon: '' },
  { type: 'normal',   name: 'イギリス',     icon: '🇬🇧' },
  { type: 'normal',   name: 'オランダ',       icon: '🇳🇱' },
  { type: 'positive', name: 'ギリシア',     icon: '🇬🇷', effect: 1 },
  { type: 'normal',   name: 'スペイン',     icon: '🇪🇸' },
  { type: 'happening',  name: 'ベルギー',    icon: '🇧🇪', effect: -1 },
  { type: 'normal',   name: '移動中',       icon: '✈️' },
  { type: 'normal',   name: 'エジプト',       icon: '🇪🇬' },
  { type: 'positive', name: 'モロッコ',       icon: '🇲🇦', effect: 2 },
  { type: 'normal',   name: 'ガーナ',     icon: '🇬🇭' },
  { type: 'happening',  name: 'エチオピア',     icon: '🇪🇹', effect: -2 },
  { type: 'normal',   name: '南アフリカ',     icon: '🇿🇦' },
  { type: 'normal',   name: '移動中',       icon: '✈️' },
  { type: 'quiz',     name: 'アルゼンチン', icon: '❓', quizId: 2 },
  { type: 'normal',   name: 'ブラジル',     icon: '🇧🇷' },
  { type: 'positive', name: 'チリ',       icon: '🇨🇱', effect: 1 },
  { type: 'normal',   name: 'ペルー',       icon: '🇵🇪' },
  { type: 'happening',  name: 'コロンビア',     icon: '🇨🇴', effect: -1 },
  { type: 'normal',   name: '移動中',     icon: '✈️' },
  { type: 'normal',   name: 'ジャマイカ',     icon: '🇯🇲' },
  { type: 'quiz',     name: 'キューバ', icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'メキシコ',       icon: '🇲🇽' },
  { type: 'positive', name: 'アメリカ合衆国',     icon: '🇺🇸', effect: 2 },
  { type: 'normal',   name: 'カナダ',       icon: '🇨🇦' },
  { type: 'normal',   name: '移動中',     icon: '✈️' },
  { type: 'happening',  name: 'オーストラリア',         icon: '🇦🇺', effect: -1 },
  { type: 'normal',   name: 'ニューカレドニア',       icon: '🇳🇨' },
  { type: 'normal',   name: 'フィジー',       icon: '🇫🇯' },
  { type: 'normal', name: 'トンガ',     icon: '🇹🇴' },
  { type: 'quiz',     name: 'パプアニューギニア', icon: '❓', quizId: 1 },
  { type: 'normal',   name: 'figma',       icon: '' },
];

const quizData = {
  1: { question: '日本の首都はどこ？', options: ['東京', '大阪', '京都', '名古屋'], answer: 0, explanation: '日本の首都は東京です！' },
  2: { question: '韓国の首都はどこ？', options: ['大邱', '平壌', '釜山', 'ソウル'], answer: 3, explanation: '韓国の首都はソウルです！' },
  3: { question: 'インドの首都はどこ？', options: ['ニューデリー', 'ムンバイ', 'コルカタ', 'バンガロール'], answer: 0, explanation: 'インドの首都はニューデリーです！' },
  4: { question: 'スリランカの首都はどこ？', options: ['カルマパナ', 'コロンボ', 'アヌラデピラ', 'マタラ'], answer: 1, explanation: 'スリランカの首都はコロンボです！' },
  5: { question: '中国の首都はどこ？', options: ['広州', '上海', '北京', '深圳'], answer: 2, explanation: '中国の首都は北京です！' },
  6: { question: 'カンボジアの首都はどこ？', options: ['サイゴン', 'プノンペン', 'マッサム', 'バロン'], answer: 1, explanation: 'カンボジアの首都はプノンペンです！' },
  7: { question: 'タイの首都はどこ？', options: ['ナムタオ', 'チャイナ', 'バンコク', 'パッター'], answer: 2, explanation: 'タイの首都はバンコクです！' },
  8: { question: 'マレーシアの首都はどこ？', options: ['クアラルンプール', 'ジュア', 'ナゴイ', 'マカオ'], answer: 0, explanation: 'マレーシアの首都はクアラルンプールです！' },
  9: { question: 'シンガポールの首都はどこ？', options: ['シンガポール', 'ジュア', 'ナゴイ', 'マカオ'], answer: 0, explanation: 'シンガポールの首都はシンガポールです！' },
  10: { question: 'インドネシアの首都はどこ？', options: ['マニラ', 'ボゴタ', 'ジャカルタ', 'セブ'], answer: 2, explanation: 'インドネシアの首都はジャカルタです！' },
  11: { question: 'フィンランドの首都はどこ？', options: ['トゥルコ', 'ストックホルム', 'オーロラ', 'ヘルシンキ'], answer: 3, explanation: 'フィンランドの首都はヘルシンキです！' },
  12: { question: 'オーストリアの首都はどこ？', options: ['ブダペスト', 'ウィーン', 'ベルリン', 'ローマ'], answer: 1, explanation: 'オーストリアの首都はウィーンです！' },
  13: { question: 'チェコの首都はどこ？', options: ['ベルリン', 'ブダペスト', 'プラハ', 'ローマ'], answer: 2, explanation: 'チェコの首都はプラハです！' },
  14: { question: 'ポーランドの首都はどこ？', options: ['ローマ', 'ブダペスト', 'ベルリン', 'ワルシャワ'], answer: 3, explanation: 'ポーランドの首都はワルシャワです！' },
  15: { question: 'ルーマニアの首都はどこ？', options: ['ブクレシュティ', 'ソルト', 'クラジオーヴ', 'バシク'], answer: 0, explanation: 'ルーマニアの首都はブクレシュティです！' },
  16: { question: 'イギリスの首都はどこ？', options: ['エディンバラ', 'ロンドン', 'ガルウェイ', 'ベルリン'], answer: 1, explanation: 'イギリスの首都はロンドンです！' },
  18: { question: 'ギリシアの首都はどこ？', options: ['アテネ', 'サロニカ', 'パテラ', 'コルフィ'], answer: 0, explanation: 'ギリシアの首都はアテネです！' },
  19: { question: 'スペインの首都はどこ？', options: ['セビリア', 'バルセロナ', 'マドリード', 'トロア'], answer: 2, explanation: 'スペインの首都はマドリードです！' },
  20: { question: 'ベルギーの首都はどこ？', options: ['コルク', 'アンブルコルク', 'ルーヴル', 'ブリュッセル'], answer: 3, explanation: 'ベルギーの首都はブリュッセルです！' },
  21: { question: 'エジプトの首都はどこ？', options: ['アスワン', 'アレクサンドリア', 'カイロ', 'スワジランド'], answer: 2, explanation: 'エジプトの首都はカイロです！' },
  22: { question: 'モロッコの首都はどこ？', options: ['カサブランカ', 'ラバット', 'フェス', 'モハメディア'], answer: 1, explanation: 'モロッコの首都はラバットです！' },
  23: { question: 'ガーナの首都はどこ？', options: ['アックスーム', 'コントン', 'ケーラン', 'アブレ'], answer: 0, explanation: 'ガーナの首都はアックスームです！' },
  24: { question: 'エチオピアの首都はどこ？', options: ['ナイロビ', 'アスワン', 'アディスアベバ', 'モハメディア'], answer: 2, explanation: 'エチオピアの首都はアディスアベバです！' },
  25: { question: '南アフリカの首都はどこ？', options: ['ケープタウン', 'プレトリア', 'ジャバ', 'ブータン'], answer: 1, explanation: '南アフリカの首都はプレトリアです！' },
  26: { question: 'アルゼンチンの首都はどこ？', options: ['サンティアゴ', 'サンフアン', 'コルドバ', 'ブエノスアイレス'], answer: 3, explanation: 'アルゼンチンの首都はブエノスアイレスです！' },
  27: { question: 'ブラジルの首都はどこ？', options: ['リオデジャネイロ', 'サンパウロ', 'ブラジリア', 'ボア'], answer: 2, explanation: 'ブラジルの首都はブラジリアです！' },
  28: { question: 'チリの首都はどこ？', options: ['サンティアゴ', 'サンパウロ', 'リオデジャネイロ', 'ブエノスアイレス'], answer: 0, explanation: 'チリの首都はサンティアゴです！' },
  29: { question: 'ペルーの首都はどこ？', options: ['アリカ', 'リマ', 'クスコ', 'タクナ'], answer: 1, explanation: 'ペルーの首都はリマです！' }, 
  30: { question: 'コロンビアの首都はどこ？', options: ['カタレナ', 'ボゴタ', 'メデリン', 'バランカ'], answer: 1, explanation: 'コロンビアの首都はボゴタです！' },
  31: { question: 'ジャマイカの首都はどこ？', options: ['キングストン', 'サンフアン', 'ナッシュビル', 'ポートオブスペイン'], answer: 0, explanation: 'ジャマイカの首都はキングストンです！' },
  32: { question: 'キューバの首都はどこ？', options: ['サンフアン', 'ハバナ', 'カタレナ', 'リオデジャネイロ'], answer: 1, explanation: 'キューバの首都はハバナです！' },
  33: { question: 'メキシコの首都はどこ？', options: ['グアダラハラ', 'カンクン', 'メキシコシティ', 'モンテレイ'], answer: 2, explanation: 'メキシコの首都はメキシコシティです！' },
  34: { question: 'アメリカ合衆国の首都はどこ？', options: ['ワシントンD.C.', 'ニューヨーク', 'ロサンゼルス', 'シカゴ'], answer: 0, explanation: 'アメリカ合衆国の首都はワシントンD.C.です！' },
  35: { question: 'カナダの首都はどこ？', options: ['モントリオール', 'トロント', 'バンクーバー', 'オタワ'], answer: 3, explanation: 'カナダの首都はオタワです！' },
  36: { question: 'オーストラリアの首都はどこ？', options: ['メルボルン', 'シドニー', 'カンベラ', 'ブリスベン'], answer: 2, explanation: 'オーストラリアの首都はカンベラです！' },
  37: { question: 'ニューカレドニアの首都はどこ？', options: ['ヌクアルファル', 'サンフアン', 'ナッシュビル', 'ポートオブスペイン'], answer: 0, explanation: 'ニューカレドニアの首都はヌクアルファルです！' },
  38: { question: 'フィジーの首都はどこ？', options: ['ソロモン', 'ナウル', 'ノルウェー', 'フィジー'], answer: 3, explanation: 'フィジーの首都はフィジーです！' },
  39: { question: 'トンガの首都はどこ？', options: ['ヌクアルファル', 'サンフアン', 'ナッシュビル', 'ポートオブスペイン'], answer: 0, explanation: 'トンガの首都はヌクアルファルです！' },
  40: { question: 'パプアニューギニアの首都はどこ？', options: ['アバリ', 'モロボイ', 'ポートモレスビー', 'カナダ'], answer: 2, explanation: 'パプアニューギニアの首都はポートモレスビーです！' },
};

// --- 状態 ---
let gameState = {
  currentPosition: 0,
  turnCount: 0,
  quizCleared: [],
  isRolling: false,
  diceValue: 0,
  pendingMove: false,
  playerName: '',
  playerColor: '#00BFFF',
  avatarPath: '',
  happeningCount: 0,
  overshootCount: 0
};

// ========== URLパラメータからプレイヤー情報を取得 ==========
function getPlayerDataFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const color = urlParams.get('color');
  const path = urlParams.get('path');
  
  // URLパラメータがない場合はlocalStorageから取得
  if (name) {
    gameState.playerName = name;
  } else {
    gameState.playerName = localStorage.getItem('playerName') || 'プレイヤー';
  }
  
  if (color) {
    gameState.playerColor = color;
  } else {
    gameState.playerColor = localStorage.getItem('playerColor') || '#00BFFF';
  }
  
  if (path) {
    gameState.avatarPath = path;
  } else {
    gameState.avatarPath = localStorage.getItem('avatarPath') || 'M 60 140 L 40 120 L 35 120 L 45 80 A 40 40 0 1 1 75 80 L 85 120 L 80 120 Z';
  }
  
  console.log('プレイヤー情報:', {
    name: gameState.playerName,
    color: gameState.playerColor,
    path: gameState.avatarPath
  });
}

// ========== プレイヤーピンの色を更新 ==========
function updatePlayerPinColor() {
  const playerPin = document.getElementById('player-pin');
  if (playerPin) {
    // プレイヤーピンのSVGの色を変更
    const avatarBody = playerPin.querySelector('path');
    if (avatarBody) {
      avatarBody.setAttribute('fill', gameState.playerColor);
    }
  }
  
  // プレイヤー名を表示（視認性向上版）
  const playerNameElement = document.getElementById('player-name');
  const playerColorElement = document.getElementById('player-color-display');
  
  if (playerNameElement) {
    playerNameElement.textContent = gameState.playerName;
    playerNameElement.style.color = gameState.playerColor;
    playerNameElement.style.textShadow = `
      0 0 10px rgba(0, 0, 0, 0.8),
      0 0 20px rgba(0, 0, 0, 0.6),
      2px 2px 4px rgba(0, 0, 0, 0.9)
    `;
    playerNameElement.style.fontWeight = 'bold';
  }
  
  if (playerColorElement) {
    playerColorElement.style.backgroundColor = gameState.playerColor;
  }
}


// --- グローバル変数 ---
let pathTiles = [];
let boardDataLinear = [];

const boardEl = document.getElementById('board');
const dice = document.getElementById('dice');
const diceModal = document.getElementById('diceModal');
const rollBtn = document.getElementById('rollBtn');

const rotations = {
  1: "rotateX(0deg) rotateY(0deg)",
  2: "rotateX(0deg) rotateY(-90deg)",
  3: "rotateX(0deg) rotateY(180deg)",
  4: "rotateX(0deg) rotateY(90deg)",
  5: "rotateX(-90deg) rotateY(0deg)",
  6: "rotateX(90deg) rotateY(0deg)"
};

// --- 占有ヘルパ ---
function canPlace(occ, r, c, span) {
  if (r < 0 || c < 0 || r + span > ROWS || c + span > COLS) return false;
  for (let i = 0; i < span; i++) for (let j = 0; j < span; j++) {
    if (occ[r + i][c + j]) return false;
  }
  return true;
}
function place(occ, r, c, span) {
  for (let i = 0; i < span; i++) for (let j = 0; j < span; j++) {
    occ[r + i][c + j] = true;
  }
}

// --- 盤面データの構築（49マス固定） ---
function buildPathAndLayout() {
    pathTiles = [];
    const allTiles = [];

    // 1. スタート(1マス目)
    allTiles.push({ type: 'start', name: '', icon: '' });
    
    // 2. クイズ(40問)とハプニング(7マス)を順番に配置
    // masterDataから、スタートとゴール以外の「名前」を持つデータのみを抽出
    const masterNames = masterData.filter(t => t.type !== 'start' && t.type !== 'goal');

    let qId = 1;
    let hCount = 0;
    let mIdx = 0; // masterDataのインデックス管理用

    for (let i = 1; i <= 47; i++) {
        // masterDataから順番に名前を取得（足りなくなったら最初に戻る）
        const currentMaster = masterNames[mIdx % masterNames.length];
        
        // 6マスごとにハプニングを配置
        if (i % 6 === 0 && hCount < 7) {
            allTiles.push({ 
                type: 'happening', 
                name: currentMaster.name, // masterDataの名前を使用
                icon: '✈️', 
                effect: -2 
            });
            hCount++;
        } else if (qId <= 40) {
            allTiles.push({ 
                type: 'quiz', 
                name: currentMaster.name, // masterDataの名前を使用
                icon: '', 
                quizId: qId 
            });
            qId++;
        }
        mIdx++;
    }
    
    // 3. ゴール(49マス目)
    allTiles.push({ type: 'goal', name: '', icon: '' });

    // 4. 配置計算 (7x7 = 49マス)
    const ROWS_COUNT = 7;
    const COLS_COUNT = 7;
    let currentIndex = 0;

    for (let rIdx = 0; rIdx < ROWS_COUNT; rIdx++) {
        for (let cIdx = 0; cIdx < COLS_COUNT; cIdx++) {
            if (currentIndex >= allTiles.length) break;
            
            const tile = allTiles[currentIndex];
            let r = rIdx * 2;
            let c;
            if (rIdx % 2 === 0) {
                c = cIdx * 2;
            } else {
                c = (COLS_COUNT - 1 - cIdx) * 2;
            }
            
            pathTiles.push({ tile, r, c });
            currentIndex++;
        }
    }
    boardDataLinear = pathTiles.map(p => p.tile);
}

// --- 盤面生成 ---
function createBoard() {
  if (!boardEl) return;
  // 前の描画をクリア
  boardEl.innerHTML = '<svg id="board-lines" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;"></svg>';
  
  // --cols は 14 (7マス×2の間隔) に設定
  boardEl.style.setProperty('--cols', 14);

  buildPathAndLayout();

  pathTiles.forEach((entry, index) => {
    const { tile, r, c } = entry;
    const div = document.createElement('div');
    div.className = `square ${tile.type}`;
    if (tile.type === 'start' || tile.type === 'goal') div.classList.add('big');
    
    div.style.gridRow = `${r + 1} / span 1`;
    div.style.gridColumn = `${c + 1} / span 1`;
    div.id = `square-${index}`;

    // 番号を 1〜49 で表示
    const displayNumber = index + 1;
    
    div.innerHTML = `
      <span class="square-number">${displayNumber}</span>
      <span class="square-icon">${tile.icon}</span>
      <span class="square-name">${tile.name || ''}</span>
    `;

    // プレイヤーの初期位置（スタート）
    if (index === 0) {
      const pin = document.createElement('div');
      pin.className = 'player-pin';
      pin.id = 'player-pin';
      const pinColor = gameState.playerColor || '#00BFFF';
      pin.innerHTML = `
        <svg class="pin-svg" viewBox="0 0 120 140">
          <path d="${gameState.avatarPath}" fill="${pinColor}"/>
        </svg>`;
      div.appendChild(pin);
    }
    boardEl.appendChild(div);
  });
}

// --- 3. ゲーム進行ロジック ---
function updateInfo() {
  const posEl = document.getElementById('current-position');
  const turnEl = document.getElementById('turn-count');
  const quizEl = document.getElementById('quiz-count');
  if (posEl) posEl.textContent = (gameState.currentPosition + 1);
  if (turnEl) turnEl.textContent = gameState.turnCount;
  if (quizEl) quizEl.textContent = gameState.quizCleared.length;
}

function showMessage(text, type = 'info') {
  const area = document.getElementById('message-area');
  if (!area) return;
  area.innerHTML = `<div class="message ${type}">${text}</div>`;
  setTimeout(() => { area.innerHTML = ''; }, 3000);
}

// ダイス処理
if (rollBtn && dice && diceModal) {
  rollBtn.addEventListener('click', () => {
    if (gameState.isRolling) return;
    gameState.isRolling = true;
    rollBtn.disabled = true;
    
    diceModal.classList.add('active');
    dice.classList.add('rolling');

    setTimeout(() => {
      dice.classList.remove('rolling');
      const finalValue = Math.floor(Math.random() * 6) + 1;
      gameState.diceValue = finalValue;
      dice.style.transform = rotations[finalValue];

      setTimeout(() => {
        diceModal.classList.remove('active');
        gameState.isRolling = false;
        attemptMove(finalValue);
      }, 800);
    }, 1000);
  });
}

function attemptMove(steps) {
  const target = gameState.currentPosition + steps;
  if (target >= boardDataLinear.length) {
    gameState.overshootCount++;
    if (gameState.overshootCount >= 6) {
      showEvent('','','6回オーバーしたのでゴールへ進みます！', 'info');
      gameState.overshootCount = 0;
      movePlayer(boardDataLinear.length - 1);
      return;
    }
    showEvent('','','ゴールを超えてしまいます！', 'error');
    rollBtn.disabled = false;
    return;
  }
  gameState.overshootCount = 0;
  movePlayer(target);
}

function movePlayer(target, options = { triggerEvent: true }) {
  const pin = document.getElementById('player-pin');
  const currentPos = gameState.currentPosition;
  
  // ステップバイステップのアニメーション
  if (target > currentPos) {
    // 前進する場合は1マスずつアニメーション
    let step = currentPos;
    const moveInterval = setInterval(() => {
      step++;
      const stepEl = document.getElementById(`square-${step}`);
      if (stepEl && pin) {
        stepEl.appendChild(pin);
        
        // 各ステップでスクロール
        stepEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center' 
        });
      }
      
      // 目標地点に到達したら停止
      if (step >= target) {
        clearInterval(moveInterval);
        
        gameState.currentPosition = target;
        gameState.turnCount++;
        updateInfo();

        setTimeout(() => { handleSquareEvent(target); }, 600);
      }
    }, 300); // 300msごとに1マス移動
    
  } else if (target < currentPos) {
    // 後退する場合も1マスずつアニメーション
    let step = currentPos;
    const moveInterval = setInterval(() => {
      step--;
      const stepEl = document.getElementById(`square-${step}`);
      if (stepEl && pin) {
        stepEl.appendChild(pin);
        
        // 各ステップでスクロール
        stepEl.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center' 
        });
      }
      
      // 目標地点に到達したら停止
      if (step <= target) {
        clearInterval(moveInterval);
        
        gameState.currentPosition = target;
        gameState.turnCount++;
        updateInfo();

        if (options.triggerEvent) {
          setTimeout(() => { handleSquareEvent(target); }, 600);
        } else {
          rollBtn.disabled = false;
        }
      }
    }, 300); // 300msごとに1マス移動
    
  } else {
    // 同じ位置の場合（通常発生しない）
    gameState.currentPosition = target;
    gameState.turnCount++;
    updateInfo();
    
    if (options.triggerEvent) {
      setTimeout(() => { handleSquareEvent(target); }, 600);
    } else {
      rollBtn.disabled = false;
    }
  }
}

function handleSquareEvent(pos) {
  const tile = boardDataLinear[pos];
  switch (tile.type) {
    case 'quiz':
      // すでにクリア済みのクイズでない場合のみ表示
      if (!gameState.quizCleared.includes(tile.quizId)) {
        gameState.pendingMove = pos; // 現在の場所を保持（不正解時の戻り処理などに使う場合）
        showQuiz(tile.quizId);
      } else {
        rollBtn.disabled = false;
      }
      break;
    case 'happening':
      gameState.happeningCount++; // アクシデントマスのカウントを増やす
      showEvent('✈', '忘れ物をした🥲', `${tile.name}\n${Math.abs(tile.effect)}マス戻ります...`, () => {
        const newPos = Math.max(pos + tile.effect, 0);
        movePlayer(newPos, { triggerEvent: false });
      });
      break;
    case 'goal':
      showGoal();
      break;
    default:
      rollBtn.disabled = false;
      break;
  }
}

// クイズ・モーダル関連
function showQuiz(quizId) {
  const quiz = quizData[quizId];
  const modal = document.getElementById('quizModal');
  document.getElementById('quizQuestion').textContent = quiz.question;
  const optionsDiv = document.getElementById('quizOptions');
  optionsDiv.innerHTML = '';
  quiz.options.forEach((option, idx) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.onclick = () => {
      modal.classList.remove('active');
      if (idx === quiz.answer) {
        // --- 正解時 ---
        gameState.quizCleared.push(quizId);
        updateInfo(); // 情報パネルを更新
        showEvent('🎊', '正解！', quiz.explanation, () => {
          rollBtn.disabled = false;
        });
      } else {
        // --- 不正解時 ---
        // モーダルが閉じるのを少し待ってからメッセージと移動を実行する
        setTimeout(() => {
          // メッセージエリアに表示
          showEvent('❌', '', '残念！不正解です。<br>2マス戻ります！', () => {
            const backPos = Math.max(gameState.currentPosition - 2, 0);
            movePlayer(backPos, { triggerEvent: false });
          });
        }, 300);
      }
    };
    optionsDiv.appendChild(btn);
  });
  modal.classList.add('active');
}

function showEvent(icon, title, message, callback) {
  const modal = document.getElementById('eventModal');
  document.getElementById('eventIcon').textContent = icon;
  document.getElementById('eventTitle').textContent = title;
  document.getElementById('eventMessage').innerHTML = message; // HTMLを解釈するためinnerHTMLに変更
  modal.classList.add('active');
  
  const closeHandler = () => {
    modal.classList.remove('active');
    modal.removeEventListener('click', closeHandler);
    callback ? callback() : (rollBtn.disabled = false);
  };
  modal.addEventListener('click', closeHandler);
}

function showGoal() {
  const modal = document.getElementById('goalModal');
  document.getElementById('goalMessage').innerText = `${gameState.playerName}さん、おめでとうございます！\n${gameState.turnCount}ターンでゴールしました！`;
  modal.classList.add('active');
}

function showResult() {
  // 結果データをlocalStorageに保存
  const resultData = {
    playerName: gameState.playerName,
    playerColor: gameState.playerColor,
    avatarPath: gameState.avatarPath,
    turnCount: gameState.turnCount,
    quizCount: gameState.quizCleared.length,
    happeningCount: gameState.happeningCount
  };
  
  localStorage.setItem('gameResult', JSON.stringify(resultData));
  
  // result.htmlへ遷移
  window.location.href = 'result.html';
}

function closeEventModal() {
  const modal = document.getElementById('eventModal');
  modal.classList.remove('active');
}

function resetGame() {
  location.reload();
}

// --- パスライン描画 ---
function drawPathLines() {
  const svg   = document.getElementById('board-lines');
  const board = document.getElementById('board');
  if (!svg || !board) return;
  svg.innerHTML = '';
  const br = board.getBoundingClientRect();
  for (let i = 0; i < pathTiles.length - 1; i++) {
    const a = document.getElementById('square-' + i);
    const b = document.getElementById('square-' + (i + 1));
    if (!a || !b) continue;
    const ra = a.getBoundingClientRect();
    const rb = b.getBoundingClientRect();
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', ra.left + ra.width  / 2 - br.left);
    line.setAttribute('y1', ra.top  + ra.height / 2 - br.top);
    line.setAttribute('x2', rb.left + rb.width  / 2 - br.left);
    line.setAttribute('y2', rb.top  + rb.height / 2 - br.top);
    svg.appendChild(line);
  }
}

function initGame() {
    try {
        console.log('=== Game Initialization Started ===');
        console.log('boardEl:', boardEl);
// プレイヤー情報を取得
        getPlayerDataFromURL();
        
        createBoard();
        console.log('Board created');
        
        // プレイヤーピンの色を更新
        updatePlayerPinColor();
        console.log('Player pin color updated');updateInfo();
        console.log('Info updated');
        
        // 画面サイズ決定後に線を引く
        setTimeout(() => {
            try {
                drawPathLines();
                console.log('Lines drawn');
            } catch (err) {
                console.error('Error drawing lines:', err);
            }
        }, 400); 

        // 画面サイズが変更されたら線を引き直す（レスポンシブ対応）
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                drawPathLines();
            }, 250);
        });
        
        console.log('=== Game Initialization Complete ===');
    } catch (error) {
        console.error('=== Game Initialization FAILED ===');
        console.error('Error:', error);
        console.error('Stack:', error.stack);
        
        // Display error to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'position:fixed; top:20px; left:50%; transform:translateX(-50%); background:#ff0000; color:white; padding:20px; border-radius:10px; z-index:9999; max-width:80%; text-align:center;';
        errorDiv.innerHTML = `<h3>エラーが発生しました</h3><p>${error.message}</p><p style="font-size:12px;">ブラウザのコンソールを確認してください</p>`;
        document.body.appendChild(errorDiv);
    }
}

window.onload = initGame;
window.resetGame = resetGame;
window.showResult = showResult;

