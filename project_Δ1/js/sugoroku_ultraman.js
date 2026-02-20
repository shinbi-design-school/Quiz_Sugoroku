// ===============================
// コードすごろく
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
  },
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

