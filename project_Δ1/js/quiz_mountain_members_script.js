// ===============================
// 山の雑学クイズすごろく - 多人数版
// sugoroku_origin_script.js の盤面ロジックをそのまま使用
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

// ===================================================
// 盤面データ変数
// ===================================================
let pathTiles = [];
let boardDataLinear = [];

// ===================================================
// 多人数ステート
// ===================================================
let membersPlayers = [];
let playerOrder    = [];   // 先攻決め後の順番（playerIdxの配列）
let currentOrderIdx = 0;  // playerOrder内の何番目か

let playerStates = [];
// { currentPosition, turnCount, quizCleared:[], happeningCount, isFinished, finishedRank }

let gameState = {
  currentPosition: 0,
  turnCount: 0,
  quizCleared: [],
  isRolling: false,
  playerName: '',
  playerColor: '#00BFFF',
  avatarPath: AVATAR_PATH,
  happeningCount: 0,
};

// 'order' = 先攻決め中 / 'play' = ゲーム中 / 'done' = 終了
let phase = 'order';
let orderRolls = [];     // [{playerIdx, roll}]
let orderRollIdx = 0;    // 今何人目が先攻決めを振るか

// ===================================================
// DOM
// ===================================================
const boardEl   = document.getElementById('board');
const dice      = document.getElementById('dice');
const diceModal = document.getElementById('diceModal');
const rollBtn   = document.getElementById('rollBtn');

// ===================================================
// 初期化
// ===================================================
window.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem('membersPlayers');
  if (!stored) {
    alert('プレイヤーデータが見つかりません。');
    window.location.href = 'members_select.html';
    return;
  }
  membersPlayers = JSON.parse(stored);

  playerStates = membersPlayers.map(() => ({
    currentPosition: 0,
    turnCount: 0,
    quizCleared: [],
    happeningCount: 0,
    isFinished: false,
    finishedRank: 0,
  }));

  buildPathAndLayout();
  createBoard();
  setTimeout(drawPathLines, 400);
  window.addEventListener('resize', () => setTimeout(drawPathLines, 250));
  buildPlayersList();
  updatePinPositions(); // 初期配置のピン位置を更新

  // 先攻決めフェーズへ
  startOrderPhase();
});

// ===================================================
// 盤面データ構築（sugoroku_origin_script.js と完全同一）
// ===================================================
function buildPathAndLayout() {
  pathTiles = [];
  const allTiles = [];

  allTiles.push({ type: 'start', name: '', icon: '' });

  const masterNames = masterData.filter(t => t.type !== 'start' && t.type !== 'goal');
  let qId = 1, hCount = 0, mIdx = 0;

  for (let i = 1; i <= 47; i++) {
    const cur = masterNames[mIdx % masterNames.length];
    if (i % 6 === 0 && hCount < 7) {
      allTiles.push({ type: 'happening', name: cur.name, icon: '💥', effect: -2 });
      hCount++;
    } else if (qId <= 40) {
      allTiles.push({ type: 'quiz', name: cur.name, icon: '', quizId: qId });
      qId++;
    } else {
      allTiles.push({ type: 'normal', name: cur.name, icon: '' });
    }
    mIdx++;
  }

  allTiles.push({ type: 'goal', name: '', icon: '' });

  // 配置計算（7×7蛇行 grid14×14）
  const ROWS_C = 7, COLS_C = 7;
  let idx = 0;
  for (let rI = 0; rI < ROWS_C; rI++) {
    for (let cI = 0; cI < COLS_C; cI++) {
      if (idx >= allTiles.length) break;
      const tile = allTiles[idx];
      const r = rI * 2;
      const c = (rI % 2 === 0) ? cI * 2 : (COLS_C - 1 - cI) * 2;
      pathTiles.push({ tile, r, c });
      idx++;
    }
  }
  boardDataLinear = pathTiles.map(p => p.tile);
}

// ===================================================
// 盤面DOM生成
// ===================================================
function createBoard() {
  if (!boardEl) return;
  boardEl.innerHTML = '<svg id="board-lines" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;"></svg>';
  boardEl.style.setProperty('--cols', 14);

  pathTiles.forEach((entry, index) => {
    const { tile, r, c } = entry;
    const div = document.createElement('div');
    div.className = 'square ' + tile.type;
    if (tile.type === 'start' || tile.type === 'goal') div.classList.add('big');
    div.style.gridRow    = (r + 1) + ' / span 1';
    div.style.gridColumn = (c + 1) + ' / span 1';
    div.id = 'square-' + index;
    div.innerHTML =
      '<span class="square-number">' + (index + 1) + '</span>' +
      '<span class="square-icon">' + tile.icon + '</span>' +
      '<span class="square-name">' + (tile.name || '') + '</span>';
    boardEl.appendChild(div);
  });

  // 全プレイヤーのピンをスタートに配置
  const startSq = document.getElementById('square-0');
  const totalPlayers = membersPlayers.length;
  
  // プレイヤー数に応じた配置位置を定義
  const positionMaps = {
    2: ['left', 'right'],
    3: ['left', 'center', 'right'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
  };
  
  const positions = positionMaps[totalPlayers] || [];
  
  membersPlayers.forEach((p, i) => {
    const pin = document.createElement('div');
    pin.className = 'player-pin';
    pin.id = 'player-pin-' + i;
    pin.setAttribute('data-total', totalPlayers); // 総プレイヤー数
    pin.setAttribute('data-position', positions[i] || 'center'); // 配置位置
    pin.innerHTML =
      '<svg class="pin-svg" viewBox="0 0 120 140">' +
      '<path d="' + (p.avatarPath || AVATAR_PATH) + '" fill="' + p.color + '"/>' +
      '<circle cx="50" cy="45" r="12" fill="white" opacity="0.3"/></svg>';
    if (startSq) startSq.appendChild(pin);
  });
}

// ===================================================
// パスライン描画
// ===================================================
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

// ===================================================
// プレイヤーリスト（左バッジ）
// ===================================================
function buildPlayersList() {
  const list = document.getElementById('playersList');
  if (!list) return;
  list.innerHTML = '';
  membersPlayers.forEach((p, i) => {
    const badge = document.createElement('div');
    badge.className = 'player-status-badge';
    badge.id = 'badge-' + i;
    badge.innerHTML =
      '<div class="badge-pin" style="background:' + p.color + ';"></div>' +
      '<span>' + p.name + '</span>' +
      '<span class="badge-pos" id="badge-pos-' + i + '">pos: 1</span>';
    list.appendChild(badge);
  });
}

function updatePlayersList() {
  const activeIdx = playerOrder[currentOrderIdx];
  membersPlayers.forEach((_, i) => {
    const badge = document.getElementById('badge-' + i);
    const posEl = document.getElementById('badge-pos-' + i);
    if (!badge || !posEl) return;
    badge.classList.toggle('current',  i === activeIdx && !playerStates[i].isFinished);
    badge.classList.toggle('finished', playerStates[i].isFinished);
    if (playerStates[i].isFinished) {
      posEl.innerHTML = '<span class="badge-goal">🏆 ' + playerStates[i].finishedRank + '位</span>';
    } else {
      posEl.textContent = 'pos: ' + (playerStates[i].currentPosition + 1);
    }
  });
}

// ===================================================
// フェーズ1: 先攻決めダイス
// ===================================================
function startOrderPhase() {
  phase = 'order';
  orderRolls   = [];
  orderRollIdx = 0;
  rollBtn.disabled = true;
  
  // 順番決めポップアップを表示
  showOrderStartPopup();
}

// 順番決めポップアップを表示
function showOrderStartPopup() {
  const popup = document.getElementById('orderStartPopup');
  if (!popup) return;
  
  popup.classList.add('show');
  
  const btnStart = document.getElementById('btnOrderStart');
  if (btnStart) {
    btnStart.onclick = function() {
      popup.classList.remove('show');
      // ポップアップが閉じるアニメーションを待ってから次へ
      setTimeout(function() {
        showTurnOverlay(0, true);
      }, 300);
    };
  }
}

function showTurnOverlay(pIdx, isOrder) {
  const p = membersPlayers[pIdx];
  var titleEl = document.getElementById('ovTitle');
  var nameEl  = document.getElementById('ovName');
  var subEl   = document.getElementById('ovSubText');
  var btnEl   = document.getElementById('btnTurnStart');
  nameEl.textContent = p.name;
  nameEl.style.color = p.color;
  document.getElementById('ovAvatarBody').setAttribute('fill', p.color);
  if (isOrder) {
    if (titleEl) titleEl.textContent = '先攻決めサイコロ';
    subEl.textContent = 'が先攻を決めるサイコロを振ります！';
    if (btnEl) btnEl.textContent = 'サイコロを振る！';
  } else {
    const s = playerStates[pIdx];
    if (titleEl) titleEl.textContent = 'つぎのプレイヤー';
    subEl.textContent = 'の番です！（ターン ' + (s.turnCount + 1) + '）';
    if (btnEl) btnEl.textContent = 'スタート！';
  }
  document.getElementById('turnOverlay').classList.add('show');
}

document.getElementById('btnTurnStart').addEventListener('click', () => {
  document.getElementById('turnOverlay').classList.remove('show');
  if (phase === 'order') {
    rollForOrder(orderRollIdx);
  } else {
    activatePlayer(playerOrder[currentOrderIdx]);
  }
});

function rollForOrder(idx) {
  const p = membersPlayers[idx];
  rollDiceAnimation(function(val) {
    orderRolls.push({ playerIdx: idx, roll: val });
    showEvent('🎲', p.name + 'の出目', val + ' が出ました！', function() {
      orderRollIdx++;
      if (orderRollIdx < membersPlayers.length) {
        showTurnOverlay(orderRollIdx, true);
      } else {
        decideOrder();
      }
    });
  });
}

function decideOrder() {
  // 出目の大きい順にソート（同点はランダム）
  orderRolls.sort(function(a, b) {
    if (b.roll !== a.roll) return b.roll - a.roll;
    return Math.random() - 0.5;
  });
  playerOrder = orderRolls.map(function(r) { return r.playerIdx; });

  const lines = orderRolls.map(function(r, i) {
    return (i + 1) + '番手: ' + membersPlayers[r.playerIdx].name + '（' + r.roll + '）';
  });

  showEvent('🎉', '順番決定！', lines.join('<br>'), function() {
    phase = 'play';
    currentOrderIdx = 0;
    showTurnOverlay(playerOrder[0], false);
  });
}

// ===================================================
// フェーズ2: 通常プレイ
// ===================================================
function activatePlayer(idx) {
  const p = membersPlayers[idx];
  const s = playerStates[idx];

  gameState.currentPosition = s.currentPosition;
  gameState.turnCount       = s.turnCount;
  gameState.quizCleared     = s.quizCleared.slice();
  gameState.happeningCount  = s.happeningCount;
  gameState.isRolling       = false;
  gameState.playerName      = p.name;
  gameState.playerColor     = p.color;
  gameState.avatarPath      = p.avatarPath || AVATAR_PATH;

  document.getElementById('bannerName').textContent = p.name;
  document.getElementById('bannerName').style.color  = p.color;
  document.getElementById('bannerAvatarBody').setAttribute('fill', p.color);
  document.getElementById('bannerTurnInfo').textContent = '（ターン ' + (s.turnCount + 1) + '）';

  updateInfo();
  rollBtn.disabled = false;
  updatePlayersList();
}

function saveCurrentPlayerState() {
  const idx = playerOrder[currentOrderIdx];
  playerStates[idx].currentPosition = gameState.currentPosition;
  playerStates[idx].turnCount       = gameState.turnCount;
  playerStates[idx].quizCleared     = gameState.quizCleared.slice();
  playerStates[idx].happeningCount  = gameState.happeningCount;
}

// 1ターン制ローテーション：次のプレイヤーへ
function goNextPlayer() {
  if (playerStates.every(function(s) { return s.isFinished; })) {
    goToResult();
    return;
  }
  const total = playerOrder.length;
  var checked = 0;
  do {
    currentOrderIdx = (currentOrderIdx + 1) % total;
    checked++;
  } while (playerStates[playerOrder[currentOrderIdx]].isFinished && checked <= total);

  showTurnOverlay(playerOrder[currentOrderIdx], false);
}

// ターンを終えて次プレイヤーへ
function endTurnAndRotate() {
  saveCurrentPlayerState();
  if (playerStates.every(function(s) { return s.isFinished; })) {
    goToResult();
    return;
  }
  goNextPlayer();
}

// ===================================================
// 情報パネル更新
// ===================================================
function updateInfo() {
  var posEl  = document.getElementById('current-position');
  var turnEl = document.getElementById('turn-count');
  var quizEl = document.getElementById('quiz-count');
  if (posEl)  posEl.textContent  = gameState.currentPosition + 1;
  if (turnEl) turnEl.textContent = gameState.turnCount;
  if (quizEl) quizEl.textContent = gameState.quizCleared.length;
  var bannerTurn = document.getElementById('bannerTurnInfo');
  if (bannerTurn) bannerTurn.textContent = '（ターン ' + (gameState.turnCount + 1) + '）';
}

// ===================================================
// ダイスアニメーション（共通）
// ===================================================
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
    if (phase !== 'play' || gameState.isRolling || rollBtn.disabled) return;
    gameState.isRolling = true;
    rollBtn.disabled = true;
    rollDiceAnimation(function(val) {
      gameState.isRolling = false;
      attemptMove(val);
    });
  });
}

// ===================================================
// 移動処理
// ===================================================
function attemptMove(steps) {
  var target = gameState.currentPosition + steps;
  if (target >= boardDataLinear.length) {
    showEvent('⚠️', '', 'ゴールを超えてしまいます！<br>もう少し！', function() {
      gameState.turnCount++;
      endTurnAndRotate();
    });
    return;
  }
  movePlayer(target, { triggerEvent: true, countTurn: true });
}


// ===================================================
// ピン位置更新：各squareごとのピン数をカウントして配置を調整
// ===================================================
function updatePinPositions() {
  // 全squareをスキャンして、各squareに何個のピンがあるかカウント
  const squares = document.querySelectorAll('.square');
  
  squares.forEach(function(square) {
    const pinsInSquare = square.querySelectorAll('.player-pin');
    const pinCount = pinsInSquare.length;
    
    if (pinCount === 0) return;
    
    // 各squareごとにピンの配置を更新
    const positionMaps = {
      1: ['center'],
      2: ['left', 'right'],
      3: ['left', 'center', 'right'],
      4: ['top-left', 'top-right', 'bottom-left', 'bottom-right']
    };
    
    const positions = positionMaps[pinCount] || ['center'];
    
    pinsInSquare.forEach(function(pin, index) {
      pin.setAttribute('data-total', pinCount);
      pin.setAttribute('data-position', positions[index] || 'center');
    });
  });
}

function movePlayer(target, options) {
  options = options || { triggerEvent: true, countTurn: true };
  var cur     = gameState.currentPosition;
  var pinIdx  = playerOrder[currentOrderIdx];
  var pin     = document.getElementById('player-pin-' + pinIdx);
  var step    = target > cur ? 1 : (target < cur ? -1 : 0);

  if (step === 0) {
    if (options.countTurn) gameState.turnCount++;
    updateInfo();
    updatePinPositions(); // 同じ位置でも配置を更新
    if (options.triggerEvent) {
      handleSquareEvent(target);
    } else if (options.afterMove) {
      options.afterMove();
    }
    return;
  }

  function animate(from) {
    var next = from + step;
    var sq   = document.getElementById('square-' + next);
    if (sq && pin) {
      sq.appendChild(pin);
      updatePinPositions(); // 1マス移動するたびに配置を更新
      sq.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
    if (next === target) {
      gameState.currentPosition = target;
      if (options.countTurn) gameState.turnCount++;
      updateInfo();
      updatePinPositions(); // 最終位置でも更新
      setTimeout(function() {
        if (options.triggerEvent) {
          handleSquareEvent(target);
        } else if (options.afterMove) {
          options.afterMove();
        }
      }, 600);
    } else {
      setTimeout(function() { animate(next); }, 300);
    }
  }
  updatePinPositions(); // アニメーション開始前に初期配置を更新
  animate(cur);
}

// ===================================================
// マスイベント処理
// ===================================================
function handleSquareEvent(pos) {
  var tile = boardDataLinear[pos];
  if (!tile) { endTurnAndRotate(); return; }

  switch (tile.type) {
    case 'quiz':
      if (!gameState.quizCleared.includes(tile.quizId)) {
        showQuiz(tile.quizId);
      } else {
        showEvent('✅', 'クリア済み', 'このクイズはもう解いています！', endTurnAndRotate);
      }
      break;
    case 'positive':
      showEvent('⭐', 'ラッキー！', tile.name + ' ' + Math.abs(tile.effect) + 'マス進みます！', function() {
        var newPos = Math.min(pos + tile.effect, boardDataLinear.length - 1);
        movePlayer(newPos, { triggerEvent: false, countTurn: false, afterMove: endTurnAndRotate });
      });
      break;
    case 'happening':
      gameState.happeningCount++;
      showEvent('💥', 'アクシデント！', tile.name + '<br>' + Math.abs(tile.effect) + 'マス戻ります...', function() {
        var newPos = Math.max(pos + tile.effect, 0);
        movePlayer(newPos, { triggerEvent: false, countTurn: false, afterMove: endTurnAndRotate });
      });
      break;
    case 'goal':
      handleGoal();
      break;
    default:
      endTurnAndRotate();
  }
}

// ===================================================
// クイズ
// ===================================================
function showQuiz(quizId) {
  var quiz    = quizData[quizId];
  if (!quiz) { endTurnAndRotate(); return; }
  var modal   = document.getElementById('quizModal');
  var qEl     = document.getElementById('quizQuestion');
  var optsDiv = document.getElementById('quizOptions');
  qEl.textContent = quiz.question;
  optsDiv.innerHTML = '';
  quiz.options.forEach(function(opt, idx) {
    var btn = document.createElement('div');
    btn.className   = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = function() {
      modal.classList.remove('active');
      if (idx === quiz.answer) {
        gameState.quizCleared.push(quizId);
        updateInfo();
        showEvent('🎊', '正解！', quiz.explanation, endTurnAndRotate);
      } else {
        setTimeout(function() {
          showEvent('❌', '', '残念！不正解です。<br>2マス戻ります！', function() {
            var back = Math.max(gameState.currentPosition - 2, 0);
            movePlayer(back, { triggerEvent: false, countTurn: false, afterMove: endTurnAndRotate });
          });
        }, 300);
      }
    };
    optsDiv.appendChild(btn);
  });
  modal.classList.add('active');
}

// ===================================================
// イベントモーダル
// ===================================================
function showEvent(icon, title, message, callback) {
  var modal = document.getElementById('eventModal');
  document.getElementById('eventIcon').textContent  = icon;
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

// ===================================================
// ゴール処理
// ===================================================
function handleGoal() {
  saveCurrentPlayerState();
  var idx  = playerOrder[currentOrderIdx];
  playerStates[idx].isFinished = true;
  var rank = playerStates.filter(function(s) { return s.isFinished; }).length;
  playerStates[idx].finishedRank = rank;
  updatePlayersList();

  var allDone     = playerStates.every(function(s) { return s.isFinished; });
  var goalModal   = document.getElementById('goalModal');
  var goalMsg     = document.getElementById('goalMessage');
  var btnAfter    = document.getElementById('btnAfterGoal');

  goalMsg.textContent = gameState.playerName + 'さん ゴール！\n' +
    gameState.turnCount + 'ターン / クイズ' + gameState.quizCleared.length + '問正解';

  if (allDone) {
    btnAfter.textContent = '結果を見る';
    btnAfter.onclick = goToResult;
  } else {
    btnAfter.textContent = '次のプレイヤーへ';
    btnAfter.onclick = function() {
      goalModal.classList.remove('active');
      goNextPlayer();
    };
  }
  goalModal.classList.add('active');
}

window.afterPlayerGoal = function() {
  document.getElementById('goalModal').classList.remove('active');
  goNextPlayer();
};

// ===================================================
// 結果画面へ
// ===================================================
function goToResult() {
  saveCurrentPlayerState();
  var rankCounter = playerStates.filter(function(s) { return s.isFinished; }).length;
  var results = membersPlayers.map(function(p, i) {
    var s = playerStates[i];
    if (!s.isFinished) { rankCounter++; s.finishedRank = rankCounter; }
    return {
      playerName:    p.name,
      playerColor:   p.color,
      avatarPath:    p.avatarPath || AVATAR_PATH,
      turnCount:     s.turnCount,
      quizCount:     s.quizCleared.length,
      happeningCount:s.happeningCount,
      isFinished:    s.isFinished,
      finishedRank:  s.finishedRank,
    };
  });
  localStorage.setItem('membersResults', JSON.stringify(results));
  window.location.href = 'result_members.html';
}

window.goToResult  = goToResult;
window.showResult  = goToResult;
