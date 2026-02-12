// ===============================
// 東京魅力すごろく - アドベンチャーマップ版
// ===============================

// --- 元データ（供給元） - 50マス用に拡張 ---
const masterData = [
  { type: 'start',    name: 'スタート',    icon: '' },
  { type: 'normal',   name: '&lt;a&gt;',       icon: '' },
  { type: 'normal',   name: '&lt;article&gt;', icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 1 },
  { type: 'positive', name: '&lt;aside&gt;',      icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;div&gt;',       icon: '' },
  { type: 'hapning',  name: '&lt;footer&gt;',       icon: '', effect: -2 },
  { type: 'normal',   name: '&lt;form&gt;',       icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 2 },
  { type: 'normal',   name: '&lt;header&gt;',       icon: '' },
  { type: 'positive', name: '&lt;input&gt;',       icon: '', effect: 3 },
  { type: 'normal',   name: '&lt;img&gt;',       icon: '' },
  { type: 'hapning',  name: '&lt;label&gt;',    icon: '', effect: -1 },
  { type: 'normal',   name: '&lt;li&gt;',       icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 3 },
  { type: 'normal',   name: '&lt;main&gt;',     icon: '' },
  { type: 'positive', name: '&lt;nav&gt;',  icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;ol&gt;',     icon: '' },
  { type: 'normal',   name: '&lt;option&gt;',     icon: '' },
  { type: 'normal',   name: '&lt;p&gt;',     icon: '' },
  { type: 'normal',   name: '&lt;section&gt;',       icon: '' },
  { type: 'positive', name: '&lt;select&gt;',     icon: '', effect: 1 },
  { type: 'normal',   name: '&lt;style&gt;',     icon: '' },
  { type: 'hapning',  name: '&lt;table&gt;',    icon: '', effect: -1 },
  { type: 'normal',   name: '&lt;td&gt;',       icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 1 },
  { type: 'normal',   name: '&lt;textarea&gt;',       icon: '' },
  { type: 'positive', name: '&lt;th&gt;',       icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;tr&gt;',     icon: '' },
  { type: 'hapning',  name: '&lt;ul&gt;',     icon: '', effect: -2 },
  { type: 'normal',   name: 'width',       icon: '' },
  { type: 'normal',   name: 'height',     icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 2 },
  { type: 'normal',   name: 'margin',     icon: '' },
  { type: 'positive', name: 'padding',       icon: '', effect: 1 },
  { type: 'normal',   name: 'if',       icon: '' },
  { type: 'normal',   name: 'const',     icon: '' },
  { type: 'hapning',  name: 'foreach',     icon: '', effect: -1 },
  { type: 'normal',   name: '$',     icon: '' },
  { type: 'quiz',     name: 'コードクイズ', icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'echo',       icon: '' },
  { type: 'positive', name: 'create',     icon: '', effect: 2 },
  { type: 'normal',   name: 'read',     icon: '' },
  { type: 'normal',   name: 'update',       icon: '' },
  { type: 'hapning',  name: 'delete',         icon: '☔', effect: -1 },
  { type: 'normal',   name: 'html',       icon: '' },
  { type: 'normal',   name: 'javascript',       icon: '' },
  { type: 'positive', name: 'php',     icon: '', effect: 1 },
  { type: 'normal',   name: 'figma',       icon: '' },
];

const quizData = {
  1: { question: '箇条書き(番号なし)を作るタグはどれ？', options: ['<ul>', '<ol>', '<li>', '<p>'], answer: 0, explanation: '<ul>' },
  2: { question: '.centerの文字を中央揃えにするには？', options: ['text-align: center;', 'margin: 0 auto;', 'display: block;', 'float: center;'], answer: 0, explanation: 'text-align: center; が中央揃えに使われます！' },
  3: { question: '変数を宣言するキーワードは？', options: ['var', 'let', 'const', 'static'], answer: 1, explanation: 'let が変数を宣言するキーワードです！' },
  4: { question: 'JavaScript の配列の要素数を取得するメソッドは？', options: ['length', 'size', 'count', 'total'], answer: 0, explanation: 'length プロパティで配列の要素数を取得できます！' },
  5: { question: 'phpで文字列を結合する演算子は？', options: ['.', '+', '&', '&&'], answer: 0, explanation: 'phpではドット(.)で文字列を結合します！' }
};

// --- 状態 ---
let gameState = {
  currentPosition: 0,
  turnCount: 0,
  quizCleared: [],
  isRolling: false,
  diceValue: 0,
  pendingMove: false
};

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

// --- 1. 盤面データの構築（ランダム配置） ---
const ROWS = 14; // 7行 × 2列分（隙間用）
const COLS = 14; // 7マス × 2列分（隙間用）

function buildPathAndLayout() {
    pathTiles = [];
    const allTiles = [];

    // 1. タイルリストの作成 (計50個)
    // スタートを追加 (index 0)
    allTiles.push({ type: 'start', name: '', icon: '' });
    
    // 中間マス（48個）を生成 (index 1-48)
    const rawData = masterData.filter(t => t.type !== 'start' && t.type !== 'goal');
    for (let i = 0; i < 48; i++) {
        allTiles.push(rawData[i % rawData.length] || { type: 'normal', name: `点${i+1}`, icon: '📍' });
    }
    
    // ゴールを追加 (index 49 = square-48の次)
    allTiles.push({ type: 'goal', name: '', icon: '' });

    // 2. S字配置の計算（7行、各行7マス）
    // 行ごとのマス数パターン: 7, 7, 7, 7, 7, 7, 8 (最終行にゴール含む)
    const rowPattern = [7, 7, 7, 7, 7, 7, 8]; // 合計50マス
    
    let currentIndex = 0;
    
    rowPattern.forEach((squaresInRow, rowIdx) => {
        const r = rowIdx * 2; // 行の位置
        
        for (let colIdx = 0; colIdx < squaresInRow; colIdx++) {
            if (currentIndex >= allTiles.length) break;
            
            const tile = allTiles[currentIndex];
            let c;
            
            // S字配置: 偶数行は左から右、奇数行は右から左
            if (rowIdx % 2 === 0) {
                c = colIdx * 2;
            } else {
                c = (squaresInRow - 1 - colIdx) * 2;
            }
            
            pathTiles.push({ tile, r, c });
            currentIndex++;
        }
    });

    boardDataLinear = pathTiles.map(p => p.tile);
    
    // デバッグ情報
    console.log('=== Board Layout Debug ===');
    console.log('Total tiles:', allTiles.length);
    console.log('Row pattern:', rowPattern);
    console.log('');
    console.log('Position check:');
    console.log('Index 0 (Start):', allTiles[0].name, allTiles[0].type);
    console.log('Index 48:', allTiles[48].name, allTiles[48].type);
    console.log('Index 49 (Goal):', allTiles[49].name, allTiles[49].type);
    console.log('');
    console.log('Last row (row 6) tiles:');
    for (let i = 42; i <= 49; i++) {
        console.log(`  Index ${i}:`, allTiles[i].name, allTiles[i].type);
    }
}

// --- マスの中心を通る線を描画（レスポンシブ対応） ---
function drawPathLines() {
    const svg = document.getElementById('board-lines');
    if (!svg) return;
    svg.innerHTML = '';
    
    // boardのパディングを考慮
    const boardRect = boardEl.getBoundingClientRect();
    const boardStyle = window.getComputedStyle(boardEl);
    const paddingLeft = parseFloat(boardStyle.paddingLeft);
    const paddingTop = parseFloat(boardStyle.paddingTop);

    for (let i = 0; i < pathTiles.length - 1; i++) {
        const startEl = document.getElementById(`square-${i}`);
        const endEl = document.getElementById(`square-${i + 1}`);

        if (startEl && endEl) {
            // マスの中心座標を取得（board内の相対座標）
            const startRect = startEl.getBoundingClientRect();
            const endRect = endEl.getBoundingClientRect();
            
            // board要素の左上を基準にした座標に変換
            const x1 = startRect.left - boardRect.left + startRect.width / 2;
            const y1 = startRect.top - boardRect.top + startRect.height / 2;
            const x2 = endRect.left - boardRect.left + endRect.width / 2;
            const y2 = endRect.top - boardRect.top + endRect.height / 2;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            svg.appendChild(line);
        }
    }
}

// --- 2. 盤面生成 & 線引き ---
function createBoard() {
  if (!boardEl) return;
  boardEl.innerHTML = '<svg id="board-lines" style="position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:1;"></svg>';
  boardEl.style.setProperty('--cols', COLS);

  buildPathAndLayout();

  pathTiles.forEach((entry, index) => {
    const { tile, r, c } = entry;
    const div = document.createElement('div');
    div.className = `square ${tile.type}`;
    if (tile.type === 'start' || tile.type === 'goal') {
      div.classList.add('big');
    }
    
    // グリッドでの配置は常に1x1（サイズはCSSのscaleで制御）
    div.style.gridRow = `${r + 1} / span 1`;
    div.style.gridColumn = `${c + 1} / span 1`;
    div.id = `square-${index}`;

    // 番号表示: goalは50番と表示
    const displayNumber = tile.type === 'goal' ? 50 : (index + 1);
    
    div.innerHTML = `
      <span class="square-number">${displayNumber}</span>
      <span class="square-icon">${tile.icon}</span>
      <span class="square-name">${tile.name}</span>
    `;

    if (index === 0) {
      const pin = document.createElement('div');
      pin.className = 'player-pin';
      pin.id = 'player-pin';
      pin.innerHTML = `<svg class="pin-svg" viewBox="0 0 34 45"><path d="M17 0C7.6 0 0 7.6 0 17c0 7.4 4.8 13.7 11.4 15.9L17 45l5.6-12.1C29.2 30.7 34 24.4 34 17 34 7.6 26.4 0 17 0z" fill="#FF6B6B"/><circle cx="17" cy="17" r="8" fill="white"/></svg>`;
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
    showMessage('ゴールを超えてしまいます！', 'error');
    rollBtn.disabled = false;
    return;
  }
  const tile = boardDataLinear[target];
  if (tile.type === 'quiz' && !gameState.quizCleared.includes(tile.quizId)) {
    gameState.pendingMove = target;
    showQuiz(tile.quizId);
    return;
  }
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

        if (options.triggerEvent) {
          setTimeout(() => { handleSquareEvent(target); }, 600);
        } else {
          rollBtn.disabled = false;
        }
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
    case 'positive':
      showEvent('⭐', 'ラッキー！', `${tile.name}に到着！\n${tile.effect}マス進めます！`, () => {
        const newPos = Math.min(pos + tile.effect, boardDataLinear.length - 1);
        movePlayer(newPos, { triggerEvent: false });
      });
      break;
    case 'hapning':
      showEvent('💥', 'アクシデント！', `${tile.name}！\n${Math.abs(tile.effect)}マス戻ります...`, () => {
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
        gameState.quizCleared.push(quizId);
        showEvent('🎊', '正解！', quiz.explanation, () => movePlayer(gameState.pendingMove));
      } else {
        showMessage('残念！不正解です。', 'error');
        rollBtn.disabled = false;
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
  document.getElementById('eventMessage').textContent = message;
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
  document.getElementById('goalMessage').innerText = `おめでとうございます！\n${gameState.turnCount}ターンでゴールしました！`;
  modal.classList.add('active');
}

function closeEventModal() {
  const modal = document.getElementById('eventModal');
  modal.classList.remove('active');
}

function resetGame() {
  location.reload();
}

function initGame() {
    try {
        console.log('=== Game Initialization Started ===');
        console.log('boardEl:', boardEl);
        
        createBoard();
        console.log('Board created');
        
        updateInfo();
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
