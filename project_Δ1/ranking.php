<?php
require_once __DIR__ . '/api/db.php';
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
  <title>多人数ランキング</title>
</head>
<body>
  <h1>多人数ランキング（上位50）</h1>
  <ol>
    <?php foreach($rows as $r): ?>
      <li>
        <?php echo htmlspecialchars($r['player_name'], ENT_QUOTES, 'UTF-8'); ?>
        ：<?php echo (int)$r['turn_count']; ?>ターン /
        正解<?php echo (int)$r['quiz_count']; ?> /
        アクシデント<?php echo (int)$r['happening_count']; ?> /
        score=<?php echo (int)$r['score']; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</body>
</html>