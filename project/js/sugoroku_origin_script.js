// ===============================
// コードすごろく
// ===============================

const masterData = [
  { type: 'start',    name: 'スタート',    icon: '' },
  { type: 'normal',   name: '&lt;a&gt;',       icon: '' },
  { type: 'normal',   name: '&lt;article&gt;', icon: '' },
  { type: 'quiz',     name: '&lt;aside&gt;', icon: '❓', quizId: 1 },
  { type: 'positive', name: '&lt;div&gt;',      icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;footer&gt;',       icon: '' },
  { type: 'happening',  name: '',       icon: '', effect: -2 },
  { type: 'normal',   name: '&lt;form&gt;',       icon: '' },
  { type: 'quiz',     name: '&lt;label&gt;', icon: '❓', quizId: 2 },
  { type: 'normal',   name: '&lt;header&gt;',       icon: '' },
  { type: 'positive', name: '&lt;input&gt;',       icon: '', effect: 3 },
  { type: 'normal',   name: '&lt;img&gt;',       icon: '' },
  { type: 'happening',  name: '',    icon: '', effect: -1 },
  { type: 'normal',   name: '&lt;li&gt;',       icon: '' },
  { type: 'quiz',     name: '&lt;option&gt;', icon: '❓', quizId: 3 },
  { type: 'normal',   name: '&lt;main&gt;',     icon: '' },
  { type: 'positive', name: '&lt;nav&gt;',  icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;ol&gt;',     icon: '' },
  { type: 'normal',   name: '',     icon: '' },
  { type: 'normal',   name: '&lt;p&gt;',     icon: '' },
  { type: 'normal',   name: '&lt;section&gt;',       icon: '' },
  { type: 'positive', name: '&lt;select&gt;',     icon: '', effect: 1 },
  { type: 'normal',   name: '&lt;style&gt;',     icon: '' },
  { type: 'happening',  name: '&lt;table&gt;',    icon: '', effect: -1 },
  { type: 'normal',   name: '',       icon: '' },
  { type: 'quiz',     name: '&lt;td&gt;', icon: '❓', quizId: 1 },
  { type: 'normal',   name: '&lt;textarea&gt;',       icon: '' },
  { type: 'positive', name: '&lt;th&gt;',       icon: '', effect: 2 },
  { type: 'normal',   name: '&lt;tr&gt;',     icon: '' },
  { type: 'happening',  name: '&lt;ul&gt;',     icon: '', effect: -2 },
  { type: 'normal',   name: '',       icon: '' },
  { type: 'normal',   name: 'height',     icon: '' },
  { type: 'quiz',     name: 'width', icon: '❓', quizId: 2 },
  { type: 'normal',   name: 'margin',     icon: '' },
  { type: 'positive', name: 'padding',       icon: '', effect: 1 },
  { type: 'normal',   name: 'if',       icon: '' },
  { type: 'normal',   name: '',     icon: '' },
  { type: 'happening',  name: 'foreach',     icon: '', effect: -1 },
  { type: 'normal',   name: '$',     icon: '' },
  { type: 'quiz',     name: 'const', icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'echo',       icon: '' },
  { type: 'positive', name: 'create',     icon: '', effect: 2 },
  { type: 'normal',   name: '',     icon: '' },
  { type: 'normal',   name: 'update',       icon: '' },
  { type: 'happening',  name: 'delete',         icon: '', effect: -1 },
  { type: 'normal',   name: 'html',       icon: '' },
  { type: 'normal',   name: 'javascript',       icon: '' },
  { type: 'normal', name: 'php',     icon: '' },
  { type: 'normal',   name: 'figma',       icon: '' },
];

const quizData = {
  1: { question: '箇条書き(番号なし)を作るタグはどれ？', options: ['<ul>', '<ol>', '<li>', '<p>'], answer: 0, explanation: '<ul>' },
  2: { question: '.centerの文字を中央揃えにするには？', options: ['float: center;', 'margin: 0 auto;', 'display: block;', 'text-align: center;'], answer: 3, explanation: 'text-align: center; が中央揃えに使われます！' },
  3: { question: '再代入可能な変数を宣言するキーワードは？', options: ['var', 'let', 'const', 'static'], answer: 1, explanation: 'let が再代入可能な変数を宣言するキーワードです！' },
  4: { question: 'JavaScriptの配列の要素数を取得するプロパティは？', options: ['length', 'size', 'count', 'total'], answer: 0, explanation: 'length プロパティで配列の要素数を取得できます！' },
  5: { question: 'phpで文字列を結合する演算子は？', options: ['&', '+', '.', '&&'], answer: 2, explanation: 'phpではドット(.)で文字列を結合します！' },
  6: { question: 'CSSで要素の背景色を設定するプロパティは？', options: ['color', 'background-color', 'border-color', 'text-color'], answer: 1, explanation: 'background-color が背景色を設定します！' },
  7: { question: 'HTMLで画像を表示するタグは？', options: ['<img>', '<image>', '<picture>', '<src>'], answer: 0, explanation: '<img> タグが画像を表示します！' },
  8: { question: 'JavaScriptで配列の要素を追加するメソッドは？', options: ['unshift()', 'pop()', 'shift()', 'push()'], answer: 3, explanation: 'push() メソッドで配列の末尾に要素を追加します！' },
  9: { question: 'PHPで関数を定義するキーワードは？', options: ['def', 'function', 'func', 'declare'], answer: 1, explanation: 'function キーワードで関数を定義します！' },
  10: { question: 'CSSでフォントの大きさを指定するプロパティは？', options: ['font-size', 'text-size', 'font-style', 'text-style'], answer: 0, explanation: 'font-size プロパティでフォントサイズを指定します！' },
  11: { question: 'HTMLでリンクを設定するタグは？', options: ['<href>', '<link>', '<a>', '<url>'], answer: 2, explanation: '<a> タグがリンクを設定します！' },
  12: { question: 'JavaScriptで条件分岐を行うキーワードは？', options: ['switch', 'if', 'case', 'when'], answer: 1, explanation: 'if キーワードで条件分岐を行います！' },
  13: { question: 'PHPで配列を作成する関数は？', options: ['map()', 'list()', 'set()', 'array()'], answer: 3, explanation: 'array() 関数で配列を作成します！' },
  14: { question: 'CSSで要素の外側の余白を設定するプロパティは？', options: ['margin', 'padding', 'border', 'spacing'], answer: 0, explanation: 'margin プロパティで外側の余白を設定します！' },
  15: { question: 'HTMLでフォームを作成するタグは？', options: ['<form>', '<input>', '<label>', '<button>'], answer: 0, explanation: '<form> タグがフォームを作成します！' },
  16: { question: 'JavaScriptでループ処理を行うキーワードは？', options: ['do', 'while', 'for', 'foreach'], answer: 2, explanation: 'for キーワードでループ処理を行います！' },
  17: { question: 'PHPで文字列の長さを取得する関数は？', options: ['length()', 'strlen()', 'size()', 'count()'], answer: 1, explanation: 'strlen() 関数で文字列の長さを取得します！' },
  18: { question: 'CSSで要素の内側の余白を設定するプロパティは？', options: ['margin', 'padding', 'border', 'spacing'], answer: 1, explanation: 'padding プロパティで内側の余白を設定します！' },
  19: { question: 'HTMLでテーブルの行を作成するタグは？', options: ['<table>', '<td>', '<th>', '<tr>'], answer: 3, explanation: '<tr> タグがテーブルの行を作成します！' },
  20: { question: 'JavaScriptで関数のthisを指定して呼び出すメソッドは？', options: ['run()', 'invoke()', 'apply()', 'call()'], answer: 3, explanation: 'call() メソッドで関数のthisを指定して呼び出せます！' },
  21: { question: 'PHPで連想配列を作成する関数は？', options: ['array()', 'list()', 'set()', 'map()'], answer: 0, explanation: 'array() 関数で連想配列を作成します！' },
  22: { question: 'CSSで要素の枠線を設定するプロパティは？', options: ['border', 'margin', 'padding', 'outline'], answer: 0, explanation: 'border プロパティで枠線を設定します！' },
  23: { question: 'HTMLで段落を作成するタグは？', options: ['<span>', '<div>', '<p>', '<section>'], answer: 2, explanation: '<p> タグが段落を作成します！' },
  24: { question: 'JavaScriptでオブジェクトのプロパティにアクセスする方法は？', options: ['ドット記法', 'ブラケット記法', '両方', 'どちらでもない'], answer: 2, explanation: 'ドット記法とブラケット記法の両方でアクセスできます！' },
  25: { question: 'PHPでコメントを記述する方法は？', options: ['// または /* */', '# または /* */', '<!-- -->', '-->'], answer: 0, explanation: '// または /* */ でコメントを記述します！' },
  26: { question: 'CSSで要素の表示方法を設定するプロパティは？', options: ['position', 'display', 'float', 'visibility'], answer: 1, explanation: 'display プロパティで表示方法を設定します！' },
  27: { question: 'HTMLでリストの各項目を作成するタグは？', options: ['<item>', '<ul>', '<ol>', '<li>'], answer: 3, explanation: '<li> タグがリストの各項目を作成します！' },
  28: { question: 'JavaScriptで配列の要素を削除するメソッドは？', options: ['push()', 'pop()', 'shift()', 'unshift()'], answer: 1, explanation: 'pop() メソッドで配列の末尾の要素を削除します！' },
  29: { question: 'PHPで条件分岐を行うキーワードは？', options: ['case', 'switch', 'if', 'when'], answer: 2, explanation: 'if キーワードで条件分岐を行います！' },
  30: { question: 'CSSで要素のフォントファミリーを指定するプロパティは？', options: ['font-family', 'text-family', 'font-style', 'text-style'], answer: 0, explanation: 'font-family プロパティでフォントファミリーを指定します！' }, 
  31: { question: 'HTMLでセクションを作成するタグは？', options: ['<div>', '<section>', '<span>', '<article>'], answer: 1, explanation: '<section> タグがセクションを作成します！' },
  32: { question: 'JavaScriptで文字列を結合する演算子は？', options: ['-', '+', '*', '/'], answer: 1, explanation: '+ 演算子で文字列を結合します！' },
  33: { question: 'PHPで配列の要素数を取得する関数は？', options: ['size()', 'length()', 'count()', 'total()'], answer: 2, explanation: 'count() 関数で配列の要素数を取得します！' },
  34: { question: 'CSSで要素の位置を設定するプロパティは？', options: ['top', 'display', 'float', 'position'], answer: 3, explanation: 'position プロパティで位置を設定します！' },
  35: { question: 'HTMLでフォームの入力フィールドを作成するタグは？', options: ['<input>', '<form>', '<label>', '<button>'], answer: 0, explanation: '&lt;<input>&gt; タグが入力フィールドを作成します！' },
  36: { question: 'JavaScriptでループ処理を終了するキーワードは？', options: ['stop', 'continue', 'exit', 'break'], answer: 3, explanation: 'break キーワードでループ処理を終了します！' },
  37: { question: 'PHPで文字列を大文字に変換する関数は？', options: ['strtoupper()', 'strtolower()', 'ucfirst()', 'lcfirst()'], answer: 0, explanation: 'strtoupper() 関数で文字列を大文字に変換します！' },
  38: { question: 'CSSで要素の透明度を設定するプロパティは？', options: ['opacity', 'visibility', 'display', 'filter'], answer: 0, explanation: 'opacity プロパティで透明度を設定します！' },
  39: { question: 'HTMLでテーブルの見出しセルを作成するタグは？', options: ['<td>', '<th>', '<tr>', '<table>'], answer: 1, explanation: '<th> タグが見出しセルを作成します！' },
  40: { question: 'JavaScriptで関数を定義するキーワードは？', options: ['func', 'def', 'function', 'declare'], answer: 2, explanation: 'function キーワードで関数を定義します！' },
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
  happeningCount: 0
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
                icon: '💥', 
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
    showEvent('','','ゴールを超えてしまいます！', 'error');
    rollBtn.disabled = false;
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
      showEvent('💥', 'アクシデント！', `${tile.name}\n${Math.abs(tile.effect)}マス戻ります...`, () => {
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

