<?php
require_once __DIR__ . '/../api/db.php';
$pdo = db();

/* =========================
   表示モード取得
========================= */
$view  = $_GET['view'] ?? 'total'; // total / stage
$stage = isset($_GET['stage']) ? (int)$_GET['stage'] : 1;

$medals = ['🥇','🥈','🥉'];

/* =========================
   ステージ別ランキング
========================= */
if ($view === 'stage') {
  $sql = "
    SELECT
      player_name,
      player_color,
      turn_count,
      created_at
    FROM results
    WHERE mode = 'multi'
      AND stage_no = :stage
    ORDER BY turn_count ASC, created_at ASC
    LIMIT 50
  ";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([':stage' => $stage]);
  $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

/* =========================
   合計ランキング（選択式）
   各ステージの最小ターンを合計
========================= */
} else {
  $sql = "
    SELECT
      player_name,
      player_color,
      SUM(best_turn) AS total_turns,
      COUNT(stage_no) AS cleared_stages
    FROM (
      SELECT
        player_name,
        player_color,
        stage_no,
        MIN(turn_count) AS best_turn
      FROM results
      WHERE mode = 'multi'
      GROUP BY player_name, player_color, stage_no
    ) t
    GROUP BY player_name, player_color
    ORDER BY cleared_stages DESC, total_turns ASC
    LIMIT 50
  ";
  $rows = $pdo->query($sql)->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>ランキング</title>
<style>
body{
  font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
  background:#f6f7fb;
  margin:0;
  padding:24px;
}
.wrap{max-width:900px;margin:0 auto}
h1{text-align:center;margin-bottom:16px}

/* ナビ */
.nav{
  display:flex;
  gap:8px;
  justify-content:center;
  flex-wrap:wrap;
  margin-bottom:20px;
}
.nav a{
  padding:8px 14px;
  border-radius:20px;
  text-decoration:none;
  font-weight:700;
  background:#e0e3ff;
  color:#333;
}
.nav a.active{
  background:#4f6cff;
  color:#fff;
}

/* カード */
.card{
  background:#fff;
  border-radius:14px;
  padding:14px 16px;
  margin:10px 0;
  display:flex;
  align-items:center;
  gap:16px;
  box-shadow:0 6px 18px rgba(0,0,0,.06);
}
.rank{
  width:50px;
  text-align:center;
  font-size:20px;
  font-weight:900;
}
.name{
  font-size:18px;
  font-weight:800;
}
.dot{
  display:inline-block;
  width:12px;
  height:12px;
  border-radius:50%;
  margin-right:8px;
}
.score{
  margin-left:auto;
  font-size:22px;
  font-weight:900;
}
.sub{
  font-size:12px;
  opacity:.7;
}
.top1{border:2px solid #f5c542}
.top2{border:2px solid #c0c0c0}
.top3{border:2px solid #cd7f32}
</style>
</head>

<body>
<div class="wrap">

<h1>
<?php if ($view === 'stage'): ?>
  ステージ<?= $stage ?> ランキング
<?php else: ?>
  合計ランキング（ベスト記録）
<?php endif; ?>
</h1>

<!-- ナビ -->
<div class="nav">
  <a href="ranking.php?view=total" class="<?= $view==='total'?'active':'' ?>">🏆 合計</a>
  <a href="ranking.php?view=stage&stage=1" class="<?= ($view==='stage' && $stage===1)?'active':'' ?>">S1</a>
  <a href="ranking.php?view=stage&stage=2" class="<?= ($view==='stage' && $stage===2)?'active':'' ?>">S2</a>
  <a href="ranking.php?view=stage&stage=3" class="<?= ($view==='stage' && $stage===3)?'active':'' ?>">S3</a>
  <a href="ranking.php?view=stage&stage=4" class="<?= ($view==='stage' && $stage===4)?'active':'' ?>">S4</a>
</div>

<?php if (!$rows): ?>
  <p style="text-align:center;">データがありません。</p>
<?php endif; ?>

<?php foreach ($rows as $i => $r):
  $rank = $i + 1;
  $cls = ($rank===1?'top1':($rank===2?'top2':($rank===3?'top3':'')));
?>
  <div class="card <?= $cls ?>">
    <div class="rank"><?= $rank<=3 ? $medals[$rank-1] : $rank ?></div>
    <div>
      <div class="name">
        <span class="dot" style="background:<?= htmlspecialchars($r['player_color'] ?? '#999') ?>"></span>
        <?= htmlspecialchars($r['player_name']) ?>
      </div>
      <div class="sub">
        <?php if ($view === 'total'): ?>
          クリア数：<?= (int)$r['cleared_stages'] ?> / 4
        <?php else: ?>
          <?= htmlspecialchars($r['created_at']) ?>
        <?php endif; ?>
      </div>
    </div>
    <div class="score">
      <?php if ($view === 'stage'): ?>
        <?= (int)$r['turn_count'] ?> ターン
      <?php else: ?>
        <?= (int)$r['total_turns'] ?> ターン
      <?php endif; ?>
    </div>
  </div>
<?php endforeach; ?>

</div>
</body>
</html>