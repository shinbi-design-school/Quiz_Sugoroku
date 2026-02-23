<?php
require_once __DIR__ . '/../api/db.php';
$pdo = db();

// 多人数(multi)のみ。クライアントのcalcScoreと同じ式で並べる
$sql = "
  SELECT
  campaign_id,
  player_name,
  player_color,
  SUM(turn_count) AS total_turns
FROM results
WHERE mode='multi'
GROUP BY campaign_id, player_name, player_color
HAVING COUNT(DISTINCT stage_no) = 4
ORDER BY total_turns ASC;
";
$rows = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
?>
<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>多人数ランキング - 焚火ヴィジランテ</title>
  <link rel="icon" type="image/png" href="../images/pechi.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Honk:MORF,SHLN@14,35.7&family=Kiwi+Maru&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="../css/reset.css" />
  <link rel="stylesheet" href="../css/op_background_move.css" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/ranking.css" />
</head>
<body>
  <canvas id="fiber"></canvas>
  <!-- ヘッダー -->
  <header class="header">
    <div class="header-content">
      <div class="header-left">
        <span class="header-title">
          <a href="../index.html">
            <img class="header-img" src="../images/takibi_logo.png" alt="" />
          </a>
        </span>
      </div>
      <button class="hamburger" id="hamburger" aria-label="メニュー">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>

  <!-- ハンバーガーメニュー（オーバーレイ） -->
  <nav class="menu-overlay" id="menuOverlay">
    <div class="menu-content">
      <button class="menu-close" id="menuClose" aria-label="閉じる">
        &times;
      </button>
      <ul class="menu-list">
        <li><a href="../index.html" class="menu-item">ホーム</a></li>
        <li><a href="site_howtouse.html" class="menu-item">遊び方</a></li>
        <li><a href="team.html" class="menu-item">作成者</a></li>
        <li><a href="documents.html" class="menu-item">資料</a></li>
      </ul>
    </div>
  </nav>

  <!-- メインコンテンツ -->
  <main class="main-container">
    <div class="ranking-container">
      <h1 class="ranking-title">🏆 多人数ランキング 🏆</h1>
      <?php if (empty($rows)): ?>
        <p class="ranking-empty">まだランキングデータがありません。</p>
      <?php else: ?>
        <ol class="ranking-list">
          <?php foreach($rows as $i => $r): ?>
            <li class="ranking-item <?php echo ($i < 3) ? 'rank-' . ($i + 1) : ''; ?>">
              <span class="ranking-position"><?php echo $i + 1; ?></span>
              <span class="ranking-player-name">
                <?php echo htmlspecialchars($r['player_name'], ENT_QUOTES, 'UTF-8'); ?>
              </span>
              <span class="ranking-score">
                <?php echo (int)$r['total_turns']; ?>ターン
              </span>
            </li>
          <?php endforeach; ?>
        </ol>
      <?php endif; ?>

      <div class="button-container" style="text-align: center; margin: 40px 0">
        <button class="choice-button" onclick="location.href = '../index.html'">
          ホームへ戻る
        </button>
      </div>
    </div>
  </main>

  <script src="../js/script.js"></script>
  <script src="../js/op_background_move.js"></script>
  <script src="../js/ranking.js"></script>
</body>
</html>
