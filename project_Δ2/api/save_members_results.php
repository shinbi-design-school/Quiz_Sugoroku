<?php
// api/save_members_results.php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!$payload || !isset($payload['results']) || !is_array($payload['results'])) {
  echo json_encode(['ok' => false, 'error' => 'invalid payload']);
  exit;
}

$sessionId = substr(($payload['sessionId'] ?? ''), 0, 36);
$playersCount = (int)($payload['playersCount'] ?? count($payload['results']));
$results = $payload['results'];

try {
  $pdo = db();
  $pdo->beginTransaction();

  $stmt = $pdo->prepare("
    INSERT INTO results
      (created_at, session_id, mode, players_count,
       player_name, player_color, avatar_path,
       turn_count, quiz_count, happening_count,
       is_finished, finished_rank)
    VALUES
      (NOW(), :session_id, 'multi', :players_count,
       :name, :color, :path,
       :turn, :quiz, :hap,
       :is_finished, :finished_rank)
  ");

  foreach ($results as $r) {
    $name = mb_substr(trim($r['playerName'] ?? 'unknown'), 0, 50);
    $color = $r['playerColor'] ?? null;
    $path  = $r['avatarPath'] ?? null;

    $turn = (int)($r['turnCount'] ?? 0);
    $quiz = (int)($r['quizCount'] ?? 0);
    $hap  = (int)($r['happeningCount'] ?? 0);

    $isFinished = !empty($r['isFinished']) ? 1 : 0;
    $finishedRank = isset($r['finishedRank']) ? (int)$r['finishedRank'] : null;

    $stmt->execute([
      ':session_id' => $sessionId ?: null,
      ':players_count' => $playersCount,
      ':name' => $name,
      ':color' => $color,
      ':path' => $path,
      ':turn' => $turn,
      ':quiz' => $quiz,
      ':hap' => $hap,
      ':is_finished' => $isFinished,
      ':finished_rank' => $finishedRank
    ]);
  }

  $pdo->commit();
  echo json_encode(['ok' => true]);
} catch (Exception $e) {
  if (isset($pdo) && $pdo->inTransaction()) $pdo->rollBack();
  echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}