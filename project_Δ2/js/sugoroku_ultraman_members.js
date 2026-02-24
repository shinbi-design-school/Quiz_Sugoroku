// ===============================
// コードすごろく - 多人数版
// sugoroku_origin_script.js の盤面ロジックをそのまま使用
// ===============================

const masterData = [
  { type: 'start',    name: '',            icon: '' },
  { type: 'normal',   name: 'ウルトラマン',        icon: '' },
  { type: 'normal',   name: 'セブン',  icon: '' },
  { type: 'quiz',     name: 'ジャック',    icon: '', quizId: 1 },
  { type: 'positive', name: 'エース',      icon: '', effect: 2 },
  { type: 'normal',   name: 'タロウ',   icon: '' },
  { type: 'happening',name: '',            icon: '', effect: -2 },
  { type: 'normal',   name: 'レオ',     icon: '' },
  { type: 'quiz',     name: 'ジョーニアス',    icon: '❓', quizId: 2 },
  { type: 'normal',   name: '80',   icon: '' },
  { type: 'positive', name: 'スコット',    icon: '', effect: 3 },
  { type: 'normal',   name: 'チャック',      icon: '' },
  { type: 'happening',name: '',            icon: '', effect: -1 },
  { type: 'normal',   name: 'ベス',       icon: '' },
  { type: 'quiz',     name: 'グレート',   icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'パワード',     icon: '' },
  { type: 'positive', name: 'ゼアス',      icon: '', effect: 2 },
  { type: 'normal',   name: 'ティガ',       icon: '' },
  { type: 'normal',   name: '',            icon: '' },
  { type: 'normal',   name: 'ダイナ',        icon: '' },
  { type: 'normal',   name: 'ガイア',  icon: '' },
  { type: 'positive', name: 'ナイス',   icon: '', effect: 1 },
  { type: 'normal',   name: 'ネオス',    icon: '' },
  { type: 'happening',name: 'コスモス',    icon: '', effect: -1 },
  { type: 'normal',   name: '',            icon: '' },
  { type: 'quiz',     name: 'ネクサス',       icon: '❓', quizId: 1 },
  { type: 'normal',   name: 'マックス', icon: '' },
  { type: 'positive', name: 'メビウス',       icon: '', effect: 2 },
  { type: 'normal',   name: 'ゼロ',       icon: '' },
  { type: 'happening',name: 'ギンガ',       icon: '', effect: -2 },
  { type: 'normal',   name: '',            icon: '' },
  { type: 'normal',   name: 'ビクトリー',      icon: '' },
  { type: 'quiz',     name: 'エックス',       icon: '❓', quizId: 2 },
  { type: 'normal',   name: 'オーブ',      icon: '' },
  { type: 'positive', name: 'ルーブ',     icon: '', effect: 1 },
  { type: 'normal',   name: 'タイガ',          icon: '' },
  { type: 'normal',   name: '',            icon: '' },
  { type: 'happening',name: 'Z',     icon: '', effect: -1 },
  { type: 'normal',   name: 'トリガー',           icon: '' },
  { type: 'quiz',     name: 'デッカー',       icon: '❓', quizId: 3 },
  { type: 'normal',   name: 'ブレーザー',        icon: '' },
  { type: 'positive', name: 'アーク',      icon: '', effect: 2 },
  { type: 'normal',   name: '',            icon: '' },
  { type: 'normal',   name: 'オメガ',      icon: '' },
  { type: 'happening',name: 'フーマ',      icon: '', effect: -1 },
  { type: 'normal',   name: 'タイタス',        icon: '' },
  { type: 'normal',   name: 'ゼノス',  icon: '' },
  { type: 'normal',   name: 'ブル',         icon: '' },
  { type: 'normal',   name: 'ロッソ',       icon: '' },
];

const quizData = {
  1: { 
    question: '初代ウルトラマンのデザインで、当初は存在したが最終的に削除された要素はどれ？',
    options: ['カラータイマーがない胸部ライン', '背中のウルトラサイン', '肩のプロテクター', '鼻の穴の造形'],
    answer: 3,
    explanation: '<ul><li>初期デザイン画には鼻の穴が描かれていたが、最終的に削除された。</li></ul>',
  },

  2: { 
    question: 'ウルトラセブンの“アイスラッガー”の名称は、当初どのように呼ばれていた？',
    options: ['ヘッドギアカッター', 'ウルトラブーメラン', 'セブンカッター', 'ブーメランカッター'],
    answer: 2,
    explanation: '<ul><li>企画書段階では“セブンカッター”と呼ばれていた。</li></ul>'
  },

  3: { 
    question: 'ウルトラマンジャックの正式名称が“帰ってきたウルトラマン”から変更された理由は？',
    options: ['脚本家の意向', 'ファン投票', '海外展開で混乱を避けるため', '玩具展開の都合'],
    answer: 2,
    explanation: '<ul><li>海外で初代と区別する必要があり“ジャック”の名が付けられた。</li></ul>'
  },

  4: { 
    question: 'ウルトラマンAの“超獣”という名称の由来は？',
    options: ['怪獣を超える存在', '超能力を持つ獣', '超次元から来た獣', '超自然的な獣'],
    answer: 0,
    explanation: '<ul><li>“怪獣を超える存在”として“超獣”と名付けられた。</li></ul>'
  },

  5: { 
    question: 'ウルトラマンタロウの額の角は何をモチーフにしている？',
    options: ['龍の角', '鹿の角', '雷の形', '兜飾り'],
    answer: 3,
    explanation: '<ul><li>兜飾りをモチーフにしている。</li></ul>'
  },

  6: { 
    question: 'ウルトラマンレオの故郷・L77星が滅んだ原因は？',
    options: ['マグマ星人の侵略', 'ババルウ星人の攻撃', 'ギラス兄弟の破壊活動', 'ブラックスターの衝突'],
    answer: 0,
    explanation: '<ul><li>マグマ星人の侵略により滅ぼされた。</li></ul>'
  },

  7: { 
    question: 'ウルトラマン80で、矢的猛が教師として勤務していた学校の科目は？',
    options: ['国語', '体育', '理科', '数学'],
    answer: 2,
    explanation: '<ul><li>矢的猛は中学校の理科教師として勤務していた。</li></ul>'
  },

  8: { 
    question: 'ウルトラマンティガの“マルチタイプ”の色配置は何を意識している？',
    options: ['初代ウルトラマンのオマージュ', '三位一体の象徴', '光と影の対比', '古代文明の紋様'],
    answer: 0,
    explanation: '<ul><li>初代ウルトラマンの赤・銀を意識したデザイン。</li></ul>'
  },

  9: { 
    question: 'ウルトラマンダイナの“フラッシュタイプ”の特徴として正しいものは？',
    options: ['最もスピードが高い', '最も防御力が高い', '最もパワーが高い', '最も技の種類が多い'],
    answer: 0,
    explanation: '<ul><li>フラッシュタイプはスピードに優れる。</li></ul>'
  },

  10: { 
    question: 'ウルトラマンガイアの“根源的破滅招来体”の目的は？',
    options: ['地球文明の観察', '生命の否定', '地球の浄化', '宇宙の均衡維持'],
    answer: 1,
    explanation: '<ul><li>“生命の否定”が目的であり、ガイアと対立する。</li></ul>'
  },

  11: { 
    question: 'ウルトラマンコスモスの“ムサシ”の名字は？',
    options: ['星野', '風見', '日向', '春野'],
    answer: 3,
    explanation: '<ul><li>主人公は春野ムサシ。</li></ul>'
  },

  12: { 
    question: 'ウルトラマンネクサスの“アンノウンハンド”とは何を指す？',
    options: ['特殊能力', '敵の総称', '謎の組織', '光を授ける存在'],
    answer: 3,
    explanation: '<ul><li>光を授ける存在として“アンノウンハンド”と呼ばれる。</li></ul>'
  },

  13: { 
    question: 'ウルトラマンメビウスで、メビウスが地球に派遣された理由は？',
    options: ['ウルトラ兄弟の推薦', '地球防衛の任務', '修行のため', '地球の観察'],
    answer: 1,
    explanation: '<ul><li>地球防衛の任務と修行を兼ねて派遣された。</li></ul>'
  },

  14: { 
    question: 'ウルトラマンゼロの師匠は誰？',
    options: ['ウルトラマンレオ', 'ウルトラマンジャック', 'ゾフィー', 'ウルトラマンキング'],
    answer: 0,
    explanation: '<ul><li>ゼロはレオに鍛えられた。</li></ul>'
  },

  15: { 
    question: 'ウルトラマンギンガの“ギンガスパーク”は何をする道具？',
    options: ['怪獣に変身', '怪獣を召喚', '怪獣を浄化', '怪獣を封印'],
    answer: 0,
    explanation: '<ul><li>ギンガスパークで怪獣に変身できる。</li></ul>'
  },

  16: { 
    question: 'ウルトラマンXの“エクスデバイザー”の主な役割は？',
    options: ['通信機能', '変身アイテム', '武器強化', '怪獣解析'],
    answer: 1,
    explanation: '<ul><li>エクスデバイザーは変身アイテム。</li></ul>'
  },

  17: { 
    question: 'ウルトラマンオーブの“スペシウムゼペリオン”は何の力を融合した形態？',
    options: ['ティガ＋ダイナ', 'ジャック＋エース', '初代＋ティガ', '初代＋ゼロ'],
    answer: 2,
    explanation: '<ul><li>初代ウルトラマンとティガの力を融合した形態。</li></ul>'
  },

  18: { 
    question: 'ウルトラマンジードの“リク”のフルネームは？',
    options: ['朝倉リク', '星野リク', '伊賀栗リク', '溝リク'],
    answer: 0,
    explanation: '<ul><li>主人公は朝倉リク。</li></ul>'
  },

  19: { 
    question: 'ウルトラマンZの師匠は誰？',
    options: ['ウルトラマンキング', 'ウルトラマンゼロ', 'ウルトラマンタロウ', 'ウルトラマンレオ'],
    answer: 1,
    explanation: '<ul><li>Zはゼロの弟子として修行している。</li></ul>'
  },

  20: { 
    question: 'ウルトラマンブレーザーの主人公・ヒルマゲントの所属部隊は？',
    options: ['EYES', 'XIG', 'SKaRD', 'GUTS-SELECT'],
    answer: 2,
    explanation: '<ul><li>ヒルマゲントはSKaRDに所属している。</li></ul>'
  },

  21: { 
    question: 'バルタン星人の名前の由来は？',
    options: ['“バルタン”という音の響き', '“バルタン”という昆虫の名前', 'バルタン星から来た', '“バルタン”というSF用語'],
    answer: 0,
    explanation: '<ul><li>語感の良さから“バルタン”と名付けられた。</li></ul>'
  },

  22: { 
    question: 'ゼットンのスーツアクターは誰？',
    options: ['中島春雄', '黒部進', '古谷敏', '荒垣輝雄'],
    answer: 0,
    explanation: '<ul><li>中島春雄がゼットンを演じた。</li></ul>'
  },

  23: { 
    question: 'キングジョーの名前の由来は？',
    options: ['ジョーという技術者の名前', 'キングのように強い', '“ジョイント”の略', '“上等”から'],
    answer: 3,
    explanation: '<ul><li>“上等（ジョートー）”から“ジョー”になったと言われる。</li></ul>'
  },

  24: { 
    question: 'エレキングの尻尾の特徴は？',
    options: ['毒を持つ', '電気を発する', '伸縮する', '切り離して攻撃できる'],
    answer: 1,
    explanation: '<ul><li>尻尾から電気を発する能力がある。</li></ul>'
  },

  25: { 
    question: 'ゴモラが初代ウルトラマンで初めて登場した場所は？',
    options: ['富士山', '東京タワー', '名古屋城', '大阪城'],
    answer: 3,
    explanation: '<ul><li>大阪城で暴れた。</li></ul>'
  },

  26: { 
    question: 'レッドキングの別名は？',
    options: ['怪力怪獣', '暴君怪獣', '凶暴怪獣', '破壊怪獣'],
    answer: 1,
    explanation: '<ul><li>レッドキングは“暴君怪獣”と呼ばれる。</li></ul>'
  },

  27: { 
    question: 'ジャミラの出身は？',
    options: ['火星', '木星', '金星', '地球'],
    answer: 3,
    explanation: '<ul><li>ジャミラは地球人が変異した存在。</li></ul>'
  },

  28: { 
    question: 'ガッツ星人が得意とする能力は？',
    options: ['透明化', '巨大化', '催眠', '分身'],
    answer: 2,
    explanation: '<ul><li>ガッツ星人は催眠能力を持つ。</li></ul>'
  },

  29: { 
    question: 'メトロン星人が登場した回の舞台はどこ？',
    options: ['地下基地', '商店街', '団地', '学校'],
    answer: 2,
    explanation: '<ul><li>団地の一室での対話シーンが有名。</li></ul>'
  },

  30: { 
    question: 'ケムール人の走り方の特徴は？',
    options: ['ジャンプしながら走る', '前傾姿勢で高速移動', '腕を大きく振らない', '後ろ向きで走る'],
    answer: 1,
    explanation: '<ul><li>前傾姿勢で高速移動する独特の走り方。</li></ul>'
  },

  31: { 
    question: 'ダダの“タイプA・B・C”の違いは？',
    options: ['顔の模様', '声', '身長', '能力'],
    answer: 0,
    explanation: '<ul><li>顔の模様が異なる3タイプが存在する。</li></ul>'
  },

  32: { 
    question: 'ピグモンとガラモンの関係は？',
    options: ['無関係', '同じスーツの改造', '同じ星の出身', '兄弟設定'],
    answer: 1,
    explanation: '<ul><li>ガラモンのスーツを改造してピグモンが作られた。</li></ul>'
  },

  33: { 
    question: 'ウルトラマンの変身音の元になった音は？',
    options: ['金属音', '水滴音', 'ギターの音', '電子音'],
    answer: 1,
    explanation: '<ul><li>水滴音を加工して作られた。</li></ul>'
  },

  34: { 
    question: '科特隊の正式名称は？',
    options: ['科学特殊部隊', '科学特捜隊', '科学特別隊', '科学特務隊'],
    answer: 1,
    explanation: '<ul><li>正式名称は“科学特捜隊”。</li></ul>'
  },

  35: { 
    question: 'ウルトラ警備隊の隊長は誰？',
    options: ['フルハシ', 'ソガ', 'キリヤマ', 'アマギ'],
    answer: 2,
    explanation: '<ul><li>隊長はキリヤマ隊長。</li></ul>'
  },

  36: { 
    question: 'MATの正式名称は？',
    options: ['Monster Action Team', 'Monster Attack Team', 'Monster Anti Terror', 'Monster Assault Team'],
    answer: 1,
    explanation: '<ul><li>Monster Attack Team の略。</li></ul>'
  },

  37: { 
    question: 'TACの隊長は誰？',
    options: ['竜隊長', '岸田隊長', '南原隊長', '北斗隊長'],
    answer: 0,
    explanation: '<ul><li>TACの隊長は竜隊長。</li></ul>'
  },

  38: { 
    question: 'ウルトラマンタロウの人間体・東光太郎の職業は？',
    options: ['漁師', '消防士', '自衛官', 'バイクレーサー'],
    answer: 3,
    explanation: '<ul><li>東光太郎はバイクレーサーだった。</li></ul>'
  },

  39: { 
    question: 'ウルトラマンAの北斗と南は、どのように変身する？',
    options: ['単独変身', '合体変身', '道具を使用', '精神同調'],
    answer: 1,
    explanation: '<ul><li>北斗と南の合体変身でAになる。</li></ul>'
  },

  40: { 
    question: 'ウルトラマンレオの弟・アストラの特徴は？',
    options: ['胸に傷がある', '声が出ない', '片腕が義手', '角が折れている'],
    answer: 0,
    explanation: '<ul><li>アストラは胸に鎖のような傷がある。</li></ul>'
  },

  41: { 
    question: 'ウルトラマンゼアスの弱点は？',
    options: ['水', '油汚れ', '騒音', '暗闇'],
    answer: 1,
    explanation: '<ul><li>ゼアスは油汚れが弱点。</li></ul>'
  },

  42: { 
    question: 'ウルトラマンボーイが初登場した作品は？',
    options: ['ウルトラマンメビウス', '大怪獣バトル', 'ウルトラ銀河伝説', 'ウルトラゼロファイト'],
    answer: 1,
    explanation: '<ul><li>ボーイは大怪獣バトルで初登場。</li></ul>',
  }
  
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
    window.location.href = 'result_members.html?stage=3';
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
  window.location.href = 'result_members.html?stage=3';
}

window.goToResult  = goToResult;
window.showResult  = goToResult;
