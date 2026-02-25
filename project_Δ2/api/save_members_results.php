<?php
require_once __DIR__ . '/db.php';
$pdo = db();

// JSON入力を受け取る
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['results'])) {
    echo json_encode(['ok' => false, 'error' => 'データが正しくありません']);
    exit;
}

$sessionId = $data['sessionId'] ?? 'unknown';
$stageNo   = isset($data['stageNo']) ? (int)$data['stageNo'] : 1; // ステージ番号
$results   = $data['results']; // 各プレイヤーの配列

try {
    // プリペアドステートメントの準備
    $sql = "INSERT INTO results (
                session_id, 
                player_name, 
                player_color, 
                turn_count, 
                quiz_count, 
                happening_count, 
                stage_no, 
                mode, 
                created_at
            ) VALUES (
                :session_id, 
                :player_name, 
                :player_color, 
                :turn_count, 
                :quiz_count, 
                :happening_count, 
                :stage_no, 
                'multi', 
                NOW()
            )";
    
    $stmt = $pdo->prepare($sql);

    // トランザクション開始（全員分を確実に保存するため）
    $pdo->beginTransaction();

    foreach ($results as $r) {
        $stmt->execute([
            ':session_id'      => $sessionId,
            ':player_name'     => $r['playerName'],
            ':player_color'    => $r['playerColor'] ?? '#999999',
            ':turn_count'      => (int)$r['turn_count'],
            ':quiz_count'      => (int)$r['quiz_count'],
            ':happening_count' => (int)$r['happening_count'],
            ':stage_no'        => $stageNo
        ]);
    }

    $pdo->commit();
    echo json_encode(['ok' => true]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}