// ===============================
// 山の雑学クイズすごろく (修正版)
// 全マスでクイズ発生、ポジティブ要素廃止
// 日本百名山を標高の低い順→高い順に配置
// 48マス目が富士山、49マス目がゴール（頂上）
// ===============================

// 日本百名山から41山を標高の低い順に配置（2マス目が燧ヶ岳、47マス目が北岳、48マス目が富士山、49マス目がゴール）
const masterData = [
  { type: 'start',    name: '',            icon: '' },
  { type: 'quiz',     name: '燧ヶ岳',      icon: '🏔️', quizId: 1 },
  { type: 'quiz',     name: '四阿山',      icon: '🏔️', quizId: 2 },
  { type: 'quiz',     name: '甲武信ヶ岳',  icon: '🏔️', quizId: 3 },
  { type: 'quiz',     name: '金峰山',      icon: '🏔️', quizId: 4 },
  { type: 'quiz',     name: '瑞牆山',      icon: '🏔️', quizId: 5 },
  { type: 'happening',name: '悪天候',      icon: '☔', effect: -2 },
  { type: 'quiz',     name: '大菩薩嶺',    icon: '🏔️', quizId: 6 },
  { type: 'quiz',     name: '雲取山',      icon: '🏔️', quizId: 7 },
  { type: 'quiz',     name: '両神山',      icon: '🏔️', quizId: 8 },
  { type: 'quiz',     name: '草津白根山',  icon: '🏔️', quizId: 9 },
  { type: 'quiz',     name: '浅間山',      icon: '🏔️', quizId: 10 },
  { type: 'happening',name: '落石注意',    icon: '⚠️', effect: -1 },
  { type: 'quiz',     name: '蓼科山',      icon: '🏔️', quizId: 11 },
  { type: 'quiz',     name: '八ヶ岳',      icon: '🏔️', quizId: 12 },
  { type: 'quiz',     name: '美ヶ原',      icon: '🏔️', quizId: 13 },
  { type: 'quiz',     name: '霧ヶ峰',      icon: '🏔️', quizId: 14 },
  { type: 'quiz',     name: '常念岳',      icon: '🏔️', quizId: 15 },
  { type: 'quiz',     name: '燕岳',        icon: '🏔️', quizId: 16 },
  { type: 'quiz',     name: '大天井岳',    icon: '🏔️', quizId: 17 },
  { type: 'quiz',     name: '鷲羽岳',      icon: '🏔️', quizId: 18 },
  { type: 'quiz',     name: '水晶岳',      icon: '🏔️', quizId: 19 },
  { type: 'quiz',     name: '薬師岳',      icon: '🏔️', quizId: 20 },
  { type: 'happening',name: '疲労',        icon: '💦', effect: -1 },
  { type: 'quiz',     name: '黒部五郎岳',  icon: '🏔️', quizId: 21 },
  { type: 'quiz',     name: '笠ヶ岳',      icon: '🏔️', quizId: 22 },
  { type: 'quiz',     name: '焼岳',        icon: '🏔️', quizId: 23 },
  { type: 'quiz',     name: '乗鞍岳',      icon: '🏔️', quizId: 24 },
  { type: 'quiz',     name: '御嶽山',      icon: '🏔️', quizId: 25 },
  { type: 'happening',name: '雪崩注意',    icon: '❄', effect: -2 },
  { type: 'quiz',     name: '白馬岳',      icon: '🏔️', quizId: 26 },
  { type: 'quiz',     name: '五竜岳',      icon: '🏔️', quizId: 27 },
  { type: 'quiz',     name: '鹿島槍ヶ岳',  icon: '🏔️', quizId: 28 },
  { type: 'quiz',     name: '剱岳',        icon: '🏔️', quizId: 29 },
  { type: 'quiz',     name: '立山',        icon: '🏔️', quizId: 30 },
  { type: 'quiz',     name: '槍ヶ岳',      icon: '🏔️', quizId: 31 },
  { type: 'happening',name: '道迷い',      icon: '🐾', effect: -1 },
  { type: 'quiz',     name: '穂高岳',      icon: '🏔️', quizId: 32 },
  { type: 'quiz',     name: '甲斐駒ヶ岳',  icon: '🏔️', quizId: 33 },
  { type: 'quiz',     name: '仙丈ヶ岳',    icon: '🏔️', quizId: 34 },
  { type: 'quiz',     name: '鳳凰山',      icon: '🏔️', quizId: 35 },
  { type: 'quiz',     name: '塩見岳',      icon: '🏔️', quizId: 36 },
  { type: 'happening',name: '強風',        icon: '🌀', effect: -1 },
  { type: 'quiz',     name: '悪沢岳',      icon: '🏔️', quizId: 37 },
  { type: 'quiz',     name: '赤石岳',      icon: '🏔️', quizId: 38 },
  { type: 'quiz',     name: '聖岳',        icon: '🏔️', quizId: 39 },
  { type: 'quiz',     name: '北岳',        icon: '🏔️', quizId: 40 },
  { type: 'quiz',     name: '富士山',      icon: '🗻', quizId: 41 },
  { type: 'goal',     name: '',        icon: '' },
];

// クイズデータ（41問：各quizマスに対応）- 選択肢はランダム順、answerは正解のインデックス
const quizData = {
  1:  { question: '燧ヶ岳（ひうちがたけ）は何県の最高峰？', options: ['群馬県', '福島県', '新潟県', '栃木県'], answer: 1, explanation: '燧ヶ岳は標高2356mで福島県最高峰です！' },
  2:  { question: '四阿山（あずまやさん）がある県は？', options: ['新潟県・富山県', '岐阜県・愛知県', '長野県・群馬県', '山梨県・静岡県'], answer: 2, explanation: '四阿山は長野県と群馬県の県境にあります！' },
  3:  { question: '甲武信ヶ岳の名前の由来は？', options: ['武田信玄', '甲斐・武蔵・信濃の境', '武士の信念', '甲冑を信じる'], answer: 1, explanation: '甲斐（山梨）・武蔵（埼玉）・信濃（長野）の境にあります！' },
  4:  { question: '金峰山の山頂にある巨岩の名前は？', options: ['三丈岩', '天狗岩', '五丈岩', '大岩'], answer: 2, explanation: '山頂には高さ約15mの五丈岩がそびえています！' },
  5:  { question: '瑞牆山（みずがきやま）の特徴は？', options: ['湿地帯', '花崗岩の岩峰', '火山', '草原'], answer: 1, explanation: '花崗岩の巨岩が立ち並ぶ独特の山容です！' },
  6:  { question: '大菩薩嶺で有名な文学作品は？', options: ['雪国', '大菩薩峠', '伊豆の踊子', '山の音'], answer: 1, explanation: '中里介山の長編小説「大菩薩峠」の舞台です！' },
  7:  { question: '雲取山は東京都の最高峰ですが、標高は約何m？', options: ['約1500m', '約2500m', '約1000m', '約2017m'], answer: 3, explanation: '雲取山は標高2017mで東京都最高峰です！' },
  8:  { question: '両神山の名前の由来とされる神様は？', options: ['天照大神・月読命', 'イザナギ・イザナミ', '素戔嗚尊・大国主命', '大山祇命・木花咲耶姫'], answer: 1, explanation: '両神とはイザナギ・イザナミの二神とされます！' },
  9:  { question: '草津白根山の湯釜の特徴は？', options: ['滝がある', '氷河がある', 'エメラルドグリーンの火口湖', '温泉が湧く'], answer: 2, explanation: '世界有数の酸性度を誇るエメラルドグリーンの火口湖です！' },
  10: { question: '浅間山は何火山に分類される？', options: ['死火山', '活火山', '休火山', '泥火山'], answer: 1, explanation: '浅間山は現在も活発な活火山です！' },
  11: { question: '蓼科山の別名は？', options: ['諏訪富士', '越後富士', '信濃富士', '甲斐富士'], answer: 0, explanation: '美しい円錐形から「諏訪富士」と呼ばれます！' },
  12: { question: '八ヶ岳の最高峰は？', options: ['横岳', '天狗岳', '赤岳', '硫黄岳'], answer: 2, explanation: '八ヶ岳の最高峰は赤岳（2899m）です！' },
  13: { question: '美ヶ原高原にある有名な塔は？', options: ['高原の塔', '美しの塔', '霧の塔', '天空の塔'], answer: 1, explanation: '美ヶ原のシンボル「美しの塔」があります！' },
  14: { question: '霧ヶ峰で有名な花は？', options: ['チングルマ', 'ハクサンイチゲ', 'ニッコウキスゲ', 'コマクサ'], answer: 2, explanation: '初夏にはニッコウキスゲの大群落が見られます！' },
  15: { question: '常念岳からよく見える有名な山は？', options: ['白馬岳', '槍ヶ岳', '剱岳', '富士山'], answer: 1, explanation: '常念岳から槍ヶ岳の絶景が望めます！' },
  16: { question: '燕岳の山頂付近に見られる奇岩は何と呼ばれる？', options: ['イルカ岩・メガネ岩', 'ライオン岩・象岩', '犬岩・猫岩', 'カエル岩・亀岩'], answer: 0, explanation: '花崗岩の風化でできたイルカ岩やメガネ岩が有名です！' },
  17: { question: '大天井岳は何山脈に属する？', options: ['中央アルプス', '北アルプス', '南アルプス', '八ヶ岳連峰'], answer: 1, explanation: '大天井岳は北アルプスの常念山脈に属します！' },
  18: { question: '鷲羽岳の名前の由来は？', options: ['鷲羽という人物', '鷲の羽のような岩', '鷲が羽を広げた形', '鷲が住んでいた'], answer: 2, explanation: '山の形が鷲が羽を広げたように見えることから！' },
  19: { question: '水晶岳の別名は？', options: ['金岳', '黒岳', '銀岳', '白岳'], answer: 1, explanation: '水晶岳は黒っぽい岩肌から「黒岳」とも呼ばれます！' },
  20: { question: '薬師岳にある特別天然記念物は？', options: ['氷河', '薬師岳の圏谷群', '原生林', '高山植物群落'], answer: 1, explanation: '薬師岳の圏谷群（カール）は特別天然記念物です！' },
  21: { question: '黒部五郎岳の「五郎」の由来は？', options: ['人名', '大きな岩（ゴーロ）', '語呂合わせ', '五郎丸'], answer: 1, explanation: '大きな岩がゴロゴロしている（ゴーロ）が由来です！' },
  22: { question: '笠ヶ岳の山小屋「笠ヶ岳山荘」の特徴は？', options: ['最大収容人数', '温泉がある', '北アルプス最古級の山小屋', '最も標高が高い'], answer: 2, explanation: '笠ヶ岳山荘は北アルプス最古級の歴史ある山小屋です！' },
  23: { question: '焼岳は上高地の入口にありますが、何に分類される？', options: ['休火山', '楯状火山', '活火山', '死火山'], answer: 2, explanation: '焼岳は北アルプス唯一の活火山です！' },
  24: { question: '乗鞍岳にバスで行ける最高地点は？', options: ['乗鞍高原', '畳平', '三本滝', '位ヶ原'], answer: 1, explanation: '畳平（2702m）は日本一高いバス停があります！' },
  25: { question: '御嶽山の2014年の噴火は何月に発生？', options: ['11月', '5月', '9月', '7月'], answer: 2, explanation: '2014年9月27日に噴火し、多くの犠牲者が出ました。' },
  26: { question: '白馬岳の「白馬」の読み方は？', options: ['はくば', 'しろうま', 'びゃくば', 'しらうま'], answer: 1, explanation: '正式には「しろうまだけ」と読みます！' },
  27: { question: '五竜岳の名前の由来は？', options: ['5つの龍', '御菱（ごりょう）の雪形', '五郎という人物', '語呂合わせ'], answer: 1, explanation: '春に現れる「御菱」の雪形が由来とされます！' },
  28: { question: '鹿島槍ヶ岳の特徴的な山容は？', options: ['台形', '双耳峰', 'ドーム型', '三角錐'], answer: 1, explanation: '南峰と北峰からなる双耳峰が特徴です！' },
  29: { question: '剱岳に初登頂したのは？', options: ['僧侶', '陸軍測量隊', '猟師', '登山家'], answer: 1, explanation: '1907年に陸軍参謀本部陸地測量部が初登頂しました！' },
  30: { question: '立山の「地獄谷」で見られる現象は？', options: ['氷河', '噴気・硫黄', '温泉', '滝'], answer: 1, explanation: '火山ガスが噴出し、硫黄の結晶が見られます！' },
  31: { question: '槍ヶ岳の標高は？', options: ['3200m', '3100m', '3180m', '3190m'], answer: 2, explanation: '槍ヶ岳の標高は3180mで日本第5位です！' },
  32: { question: '穂高岳の最高峰は？', options: ['西穂高岳', '北穂高岳', '奥穂高岳', '前穂高岳'], answer: 2, explanation: '奥穂高岳（3190m）が穂高連峰の最高峰です！' },
  33: { question: '甲斐駒ヶ岳の山頂の特徴は？', options: ['緑の岩', '赤い岩', '白い花崗岩', '黒い岩'], answer: 2, explanation: '山頂は白い花崗岩で覆われ、神々しい姿です！' },
  34: { question: '仙丈ヶ岳の別名は？', options: ['南アルプスの王', '南アルプスの女王', '南アルプスの姫', '南アルプスの貴公子'], answer: 1, explanation: 'たおやかな山容から「南アルプスの女王」と呼ばれます！' },
  35: { question: '鳳凰三山に含まれないのは？', options: ['薬師ヶ岳', '甲斐駒ヶ岳', '地蔵ヶ岳', '観音ヶ岳'], answer: 1, explanation: '鳳凰三山は地蔵・観音・薬師の3峰です！' },
  36: { question: '塩見岳から見える特徴的な景色は？', options: ['太平洋', '富士山と南アルプスの大展望', '琵琶湖', '日本海'], answer: 1, explanation: '塩見岳からは富士山と南アルプスの絶景が望めます！' },
  37: { question: '悪沢岳の別名は？', options: ['荒川南岳', '荒川北岳', '荒川東岳', '荒川西岳'], answer: 2, explanation: '悪沢岳は荒川三山の最高峰で荒川東岳とも呼ばれます！' },
  38: { question: '赤石岳の名前の由来は？', options: ['夕日で赤く見える', '赤い岩石（輝緑凝灰岩）', '赤石という人物', '赤い植物'], answer: 1, explanation: '山腹に見られる赤い岩石（ラジオラリア）が由来です！' },
  39: { question: '聖岳は何アルプスの最南端の3000m峰？', options: ['中央アルプス', '八ヶ岳', '南アルプス', '北アルプス'], answer: 2, explanation: '聖岳（3013m）は南アルプス最南端の3000m峰です！' },
  40: { question: '北岳は日本で何番目に高い山？', options: ['1位', '3位', '2位', '4位'], answer: 2, explanation: '北岳は標高3193mで日本第2位の高峰です！' },
  41: { question: '富士山の標高は正確に何m？', options: ['3775m', '3777m', '3776m', '3776.12m'], answer: 2, explanation: '富士山の標高は3776.12m（剣ヶ峰）で日本最高峰！' },
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

// ========== URLパラメータからプレイヤー情報を取得 ==========
function getPlayerDataFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');
  const color = urlParams.get('color');
  const path = urlParams.get('path');

  if (name) {
    gameState.playerName = name;
  } else {
    gameState.playerName = localStorage.getItem('playerName') || '登山者';
  }

  if (color) {
    gameState.playerColor = color;
  } else {
    gameState.playerColor = localStorage.getItem('playerColor') || '#00BFFF';
  }

  if (path) {
    gameState.avatarPath = path;
  } else {
    gameState.avatarPath = localStorage.getItem('avatarPath') || AVATAR_PATH;
  }

  console.log('プレイヤー情報:', {
    name: gameState.playerName,
    color: gameState.playerColor,
    path: gameState.avatarPath
  });
}

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
  movePlayer(target, { triggerEvent: true, countTurn: true });
}

// movePlayer: options.triggerEvent=false, options.countTurn=false でペナルティ移動時はターン/イベントをスキップ
function movePlayer(target, options) {
  options = options || { triggerEvent: true, countTurn: true };
  var cur = gameState.currentPosition;
  var pin = document.getElementById('player-pin');
  var step = target > cur ? 1 : (target < cur ? -1 : 0);

  if (step === 0) {
    if (options.countTurn) {
      gameState.turnCount++;
    }
    updateInfo();
    if (options.triggerEvent) {
      handleSquareEvent(target);
    }
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
      if (options.countTurn) {
        gameState.turnCount++;
      }
      updateInfo();
      setTimeout(function() {
        if (options.triggerEvent) {
          handleSquareEvent(target);
        }
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
        // ペナルティ移動: ターンカウントせず、イベントも発生させない
        movePlayer(newPos, { triggerEvent: false, countTurn: false });
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
            // 不正解ペナルティ: ターンカウントせず、イベントも発生させない
            movePlayer(back, { triggerEvent: false, countTurn: false });
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
};

window.resetGame = function() {
  location.reload();
};

// 初期化
window.addEventListener('DOMContentLoaded', function() {
  getPlayerDataFromURL();
  buildPathAndLayout();
  createBoard();
  setTimeout(drawPathLines, 400);
  window.addEventListener('resize', function() { setTimeout(drawPathLines, 250); });
  updateInfo();
});
