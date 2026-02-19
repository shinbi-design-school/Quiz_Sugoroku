// ===============================
// 山の雑学クイズすごろく (修正版)
// 全マスでクイズ発生、ポジティブ要素廃止
// ===============================

const masterData = [
  { type: 'start',    name: '',            icon: '' },
  { type: 'quiz',     name: '富士山',      icon: '🏔️', quizId: 1 },
  { type: 'quiz',     name: '北岳',        icon: '🏔️', quizId: 2 },
  { type: 'quiz',     name: '穂高岳',      icon: '🏔️', quizId: 3 },
  { type: 'quiz',     name: '槍ヶ岳',      icon: '🏔️', quizId: 4 },
  { type: 'quiz',     name: '立山',        icon: '🏔️', quizId: 5 },
  { type: 'happening',name: '悪天候',      icon: '⚠️', effect: -2 },
  { type: 'quiz',     name: '剱岳',        icon: '🏔️', quizId: 6 },
  { type: 'quiz',     name: '白馬岳',      icon: '🏔️', quizId: 7 },
  { type: 'quiz',     name: '鹿島槍',      icon: '🏔️', quizId: 8 },
  { type: 'quiz',     name: '五竜岳',      icon: '🏔️', quizId: 9 },
  { type: 'quiz',     name: '御嶽山',      icon: '🏔️', quizId: 10 },
  { type: 'happening',name: '落石注意',    icon: '⚠️', effect: -1 },
  { type: 'quiz',     name: '乗鞍岳',      icon: '🏔️', quizId: 11 },
  { type: 'quiz',     name: '焼岳',        icon: '🏔️', quizId: 12 },
  { type: 'quiz',     name: '常念岳',      icon: '🏔️', quizId: 1 },
  { type: 'quiz',     name: '美ヶ原',      icon: '🏔️', quizId: 2 },
  { type: 'quiz',     name: '蓼科山',      icon: '🏔️', quizId: 3 },
  { type: 'quiz',     name: '霧ヶ峰',      icon: '🏔️', quizId: 4 },
  { type: 'quiz',     name: '八ヶ岳',      icon: '🏔️', quizId: 5 },
  { type: 'quiz',     name: '甲斐駒',      icon: '🏔️', quizId: 6 },
  { type: 'quiz',     name: '仙丈岳',      icon: '🏔️', quizId: 7 },
  { type: 'quiz',     name: '鳳凰山',      icon: '🏔️', quizId: 8 },
  { type: 'happening',name: '疲労',        icon: '⚠️', effect: -1 },
  { type: 'quiz',     name: '北岳山荘',    icon: '🏔️', quizId: 9 },
  { type: 'quiz',     name: '南アルプス',  icon: '🏔️', quizId: 10 },
  { type: 'quiz',     name: '悪沢岳',      icon: '🏔️', quizId: 11 },
  { type: 'quiz',     name: '塩見岳',      icon: '🏔️', quizId: 12 },
  { type: 'quiz',     name: '間ノ岳',      icon: '🏔️', quizId: 1 },
  { type: 'happening',name: '雪崩注意',    icon: '⚠️', effect: -2 },
  { type: 'quiz',     name: '農鳥岳',      icon: '🏔️', quizId: 2 },
  { type: 'quiz',     name: '笠ヶ岳',      icon: '🏔️', quizId: 3 },
  { type: 'quiz',     name: '薬師岳',      icon: '🏔️', quizId: 4 },
  { type: 'quiz',     name: '黒部五郎',    icon: '🏔️', quizId: 5 },
  { type: 'quiz',     name: '水晶岳',      icon: '🏔️', quizId: 6 },
  { type: 'quiz',     name: '鷲羽岳',      icon: '🏔️', quizId: 7 },
  { type: 'quiz',     name: '三俣蓮華',    icon: '🏔️', quizId: 8 },
  { type: 'happening',name: '道迷い',      icon: '⚠️', effect: -1 },
  { type: 'quiz',     name: '双六岳',      icon: '🏔️', quizId: 9 },
  { type: 'quiz',     name: '蝶ヶ岳',      icon: '🏔️', quizId: 10 },
  { type: 'quiz',     name: '大天井岳',    icon: '🏔️', quizId: 11 },
  { type: 'quiz',     name: '燕岳',        icon: '🏔️', quizId: 12 },
  { type: 'quiz',     name: '大天井',      icon: '🏔️', quizId: 1 },
  { type: 'quiz',     name: '爺ヶ岳',      icon: '🏔️', quizId: 2 },
  { type: 'happening',name: '強風',        icon: '⚠️', effect: -1 },
  { type: 'quiz',     name: '蓮華岳',      icon: '🏔️', quizId: 3 },
  { type: 'quiz',     name: '赤石岳',      icon: '🏔️', quizId: 4 },
  { type: 'quiz',     name: '聖岳',        icon: '🏔️', quizId: 5 },
  { type: 'goal',     name: '頂上',        icon: '🎌' },
];

// クイズデータ（タタキ台：ファクトチェック未実施）
const quizData = {
  1:  { question: '日本で一番高い山は？', options: ['富士山', '北岳', '穂高岳', '槍ヶ岳'], answer: 0, explanation: '富士山は標高3776mで日本一！' },
  2:  { question: '日本で二番目に高い山は？', options: ['槍ヶ岳', '穂高岳', '北岳', '間ノ岳'], answer: 2, explanation: '北岳は標高3193mで日本第2位！' },
  3:  { question: '「日本百名山」を選定した登山家は？', options: ['深田久弥', '加藤文太郎', '槇有恒', '今西錦司'], answer: 0, explanation: '深田久弥が1964年に選定しました！' },
  4:  { question: '富士山の最高峰の名称は？', options: ['剣ヶ峰', '白山岳', '富士山峰', '浅間岳'], answer: 0, explanation: '剣ヶ峰（3776m）が最高峰です！' },
  5:  { question: '槍ヶ岳の別名は？', options: ['日本のアルプス', '日本のマッターホルン', '日本のエベレスト', '日本の岩峰'], answer: 1, explanation: 'その姿から「日本のマッターホルン」と呼ばれます！' },
  6:  { question: '立山黒部アルペンルートがある山域は？', options: ['北アルプス', '南アルプス', '中央アルプス', '八ヶ岳'], answer: 0, explanation: '北アルプス（飛騨山脈）にあります！' },
  7:  { question: '山小屋で提供される定番料理は？', options: ['カレーライス', 'ラーメン', 'おにぎり', '牛丼'], answer: 0, explanation: 'カレーライスは山小屋の定番メニュー！' },
  8:  { question: '「森林限界」とは何の限界？', options: ['木が育つ高度', '登山可能な高度', '雪が降る高度', '空気が薄くなる高度'], answer: 0, explanation: '木が育たなくなる高度の限界です！' },
  9:  { question: '剱岳が険しいことを示す別名は？', options: ['日本の難峰', '日本の岩山', '日本の断崖', '日本のピークハンター'], answer: 0, explanation: '剱岳は「日本の難峰」として知られます！' },
  10: { question: '登山用語で「ガレ場」とは？', options: ['岩がゴロゴロした場所', '雪が積もった場所', '平坦な場所', '森林地帯'], answer: 0, explanation: 'ガレ場は岩や石がゴロゴロした急斜面です！' },
  11: { question: '紅葉が美しい時期の山登りを何という？', options: ['紅葉狩り', '秋山登山', 'モミジ登山', '彩り登山'], answer: 0, explanation: '紅葉狩りは秋の風物詩です！' },
  12: { question: '日本アルプスは何県にまたがる？', options: ['長野・岐阜', '長野・岐阜・富山', '長野・山梨', '長野のみ'], answer: 1, explanation: '長野・岐阜・富山の3県にまたがります！' },
};

const AVATAR_PATH = 'M 60 140 L 40 120 L 35 120 L 45 80 A 40 40 0 1 1 75 80 L 85 120 L 80 120 Z';

const rotations = {
  1: 'rotateX(0deg) rotateY(0deg)',
  2: 'rotateX(0deg) rotateY(-90deg)',
  3: 'rotateX(0deg) rotateY(180deg)',
  4: 'rotateX(0deg) rotateY(90deg)',
  5: 'rotateX(-90deg) rotateY(0deg)',
  6: 'rotateX(90deg) rotateY(0deg)',
};

let pathTiles = [];
let boardDataLinear = [];

let gameState = {
  currentPosition: 0,
  turnCount: 0,
  quizCleared: [],
  isRolling: false,
  diceValue: 0,
  pendingMove: false,
  playerName: '登山者',
  playerColor: '#00BFFF',
  avatarPath: AVATAR_PATH,
  happeningCount: 0,
};

const boardEl = document.getElementById('board');
const dice = document.getElementById('dice');
const diceModal = document.getElementById('diceModal');
const rollBtn = document.getElementById('rollBtn');

// 盤面データ構築（7x7グリッド）
function buildPathAndLayout() {
  pathTiles = [];
  boardDataLinear = masterData;

  const ROWS_C = 7, COLS_C = 7;
  for (let rI = 0; rI < ROWS_C; rI++) {
    for (let cI = 0; cI < COLS_C; cI++) {
      const idx = rI * COLS_C + cI;
      if (idx >= masterData.length) break;
      const tile = masterData[idx];
      const r = rI * 2;
      const c = (rI % 2 === 0) ? cI * 2 : (COLS_C - 1 - cI) * 2;
      pathTiles.push({ tile, r, c });
    }
  }
}

// 盤面生成
function createBoard() {
  if (!boardEl) return;
  boardEl.innerHTML = '<svg id="board-lines" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;"></svg>';

  pathTiles.forEach((entry, index) => {
    const { tile, r, c } = entry;
    const div = document.createElement('div');
    div.className = 'square ' + tile.type;
    if (tile.type === 'start' || tile.type === 'goal') div.classList.add('big');
    div.style.gridRow = (r + 1) + ' / span 1';
    div.style.gridColumn = (c + 1) + ' / span 1';
    div.id = 'square-' + index;
    div.innerHTML =
      '<span class="square-number">' + (index + 1) + '</span>' +
      '<span class="square-icon">' + tile.icon + '</span>' +
      '<span class="square-name">' + (tile.name || '') + '</span>';
    boardEl.appendChild(div);
  });

  const startSq = document.getElementById('square-0');
  const pin = document.createElement('div');
  pin.className = 'player-pin';
  pin.id = 'player-pin';
  pin.innerHTML = '<svg class="pin-svg" viewBox="0 0 120 140"><path d="' + gameState.avatarPath + '" fill="' + gameState.playerColor + '"/><circle cx="50" cy="45" r="12" fill="white" opacity="0.3"/></svg>';
  if (startSq) startSq.appendChild(pin);
}

// パスライン描画
function drawPathLines() {
  const svg = document.getElementById('board-lines');
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
    line.setAttribute('x1', ra.left + ra.width / 2 - br.left);
    line.setAttribute('y1', ra.top + ra.height / 2 - br.top);
    line.setAttribute('x2', rb.left + rb.width / 2 - br.left);
    line.setAttribute('y2', rb.top + rb.height / 2 - br.top);
    svg.appendChild(line);
  }
}

// 情報パネル更新
function updateInfo() {
  var posEl = document.getElementById('current-position');
  var turnEl = document.getElementById('turn-count');
  var quizEl = document.getElementById('quiz-count');
  if (posEl) posEl.textContent = gameState.currentPosition + 1;
  if (turnEl) turnEl.textContent = gameState.turnCount;
  if (quizEl) quizEl.textContent = gameState.quizCleared.length;
}

// ダイスアニメーション
function rollDiceAnimation(callback) {
  if (!dice || !diceModal) { callback(Math.floor(Math.random() * 6) + 1); return; }
  diceModal.classList.add('active');
  dice.classList.add('rolling');
  setTimeout(function() {
    dice.classList.remove('rolling');
    var val = Math.floor(Math.random() * 6) + 1;
    dice.style.transform = rotations[val];
    setTimeout(function() {
      diceModal.classList.remove('active');
      callback(val);
    }, 800);
  }, 1000);
}

if (rollBtn) {
  rollBtn.addEventListener('click', function() {
    if (gameState.isRolling) return;
    gameState.isRolling = true;
    rollDiceAnimation(function(val) {
      gameState.isRolling = false;
      attemptMove(val);
    });
  });
}

// 移動処理
function attemptMove(steps) {
  var target = gameState.currentPosition + steps;
  if (target >= boardDataLinear.length) {
    showEvent('⚠️', '', 'ゴールを超えてしまいます！<br>もう少し！', function() {
      gameState.turnCount++;
      updateInfo();
    });
    return;
  }
  movePlayer(target);
}

function movePlayer(target) {
  var cur = gameState.currentPosition;
  var pin = document.getElementById('player-pin');
  var step = target > cur ? 1 : (target < cur ? -1 : 0);

  if (step === 0) {
    gameState.turnCount++;
    updateInfo();
    handleSquareEvent(target);
    return;
  }

  function animate(from) {
    var next = from + step;
    var sq = document.getElementById('square-' + next);
    if (sq && pin) {
      sq.appendChild(pin);
      sq.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    if (next === target) {
      gameState.currentPosition = target;
      gameState.turnCount++;
      updateInfo();
      setTimeout(function() {
        handleSquareEvent(target);
      }, 600);
    } else {
      setTimeout(function() { animate(next); }, 300);
    }
  }
  animate(cur);
}

// マスイベント処理
function handleSquareEvent(pos) {
  var tile = boardDataLinear[pos];
  if (!tile) return;

  switch (tile.type) {
    case 'quiz':
      if (!gameState.quizCleared.includes(tile.quizId)) {
        showQuiz(tile.quizId);
      } else {
        showEvent('✅', 'クリア済み', 'このクイズはもう解いています！', function() {});
      }
      break;
    case 'happening':
      gameState.happeningCount++;
      showEvent('⚠️', 'アクシデント！', tile.name + '<br>' + Math.abs(tile.effect) + 'マス戻ります...', function() {
        var newPos = Math.max(pos + tile.effect, 0);
        movePlayer(newPos);
      });
      break;
    case 'goal':
      handleGoal();
      break;
    default:
      break;
  }
}

// クイズ表示
function showQuiz(quizId) {
  var quiz = quizData[quizId];
  if (!quiz) return;
  var modal = document.getElementById('quizModal');
  var qEl = document.getElementById('quizQuestion');
  var optsDiv = document.getElementById('quizOptions');
  qEl.textContent = quiz.question;
  optsDiv.innerHTML = '';
  quiz.options.forEach(function(opt, idx) {
    var btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = function() {
      modal.classList.remove('active');
      if (idx === quiz.answer) {
        gameState.quizCleared.push(quizId);
        updateInfo();
        showEvent('🎊', '正解！', quiz.explanation, function() {});
      } else {
        setTimeout(function() {
          showEvent('❌', '', '残念！不正解です。<br>2マス戻ります！', function() {
            var back = Math.max(gameState.currentPosition - 2, 0);
            movePlayer(back);
          });
        }, 300);
      }
    };
    optsDiv.appendChild(btn);
  });
  modal.classList.add('active');
}

// イベントモーダル
function showEvent(icon, title, message, callback) {
  var modal = document.getElementById('eventModal');
  document.getElementById('eventIcon').textContent = icon;
  document.getElementById('eventTitle').textContent = title;
  document.getElementById('eventMessage').innerHTML = message;
  modal.classList.add('active');
  function handler() {
    modal.classList.remove('active');
    modal.removeEventListener('click', handler);
    if (callback) callback();
  }
  modal.addEventListener('click', handler);
}

window.closeEventModal = function() {
  document.getElementById('eventModal').classList.remove('active');
};

// ゴール処理
function handleGoal() {
  var goalModal = document.getElementById('goalModal');
  var goalMsg = document.getElementById('goalMessage');
  goalMsg.textContent = gameState.turnCount + 'ターンで頂上到達！\nクイズ' + gameState.quizCleared.length + '問正解！';
  goalModal.classList.add('active');
}

window.showResult = function() {
  alert('頂上到達おめでとう！\n' + gameState.turnCount + 'ターン\nクイズ正解数: ' + gameState.quizCleared.length);
  location.reload();
};

window.resetGame = function() {
  location.reload();
};

// 初期化
window.addEventListener('DOMContentLoaded', function() {
  buildPathAndLayout();
  createBoard();
  setTimeout(drawPathLines, 400);
  window.addEventListener('resize', function() { setTimeout(drawPathLines, 250); });
  updateInfo();
});
