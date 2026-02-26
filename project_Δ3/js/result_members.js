// ===============================
// 多人数結果画面スクリプト
// ===============================

const AVATAR_PATH = 'M 60 140 L 40 120 L 35 120 L 45 80 A 40 40 0 1 1 75 80 L 85 120 L 80 120 Z';

const RANK_MEDALS = ['🥇', '🥈', '🥉'];
const RANK_LABELS = ['1st', '2nd', '3rd'];

// ランクの優先順位マップ（S が最高）
const GRADE_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 };

window.addEventListener('DOMContentLoaded', () => {
    displayRanking();
});


function getStageNo() {
  const n = Number(new URLSearchParams(location.search).get('stage'));
  return Number.isFinite(n) ? n : null;
}

// ===================================================
// ▼ undefined/null/NaN を安全に整数化
// ===================================================
function toSafeInt(val) {
    if (val === undefined || val === null || val === '') return 0;
    const n = Number(val);
    return Number.isFinite(n) ? Math.floor(n) : 0;
}

// ===================================================
// ▼ 持ち点計算（隠しパラメータ — 画面には表示しない）
//   基本持ち点: 100点
//   加点: クイズ正解数（1正解につき +1）
//   減点: 経過ターン数（そのまま減算）
//   減点: happeningマスに留まった数（1回につき -1）
//   持ち点 = 100 + quizCount - turnCount - happeningCount
// ===================================================
function calcPoints(turnCount, quizCount, happeningCount) {
    return 100 + toSafeInt(quizCount) - toSafeInt(turnCount) - toSafeInt(happeningCount);
}

// ===================================================
// ▼ ランク評価（持ち点ベース）
//   S: 85点以上
//   A: 80〜84点
//   B: 70〜79点
//   C: 60〜69点
//   D: 59点以下
// ===================================================
function calcGrade(turnCount, quizCount, happeningCount) {
    const pts = calcPoints(turnCount, quizCount, happeningCount);
    if (pts >= 85) return { grade: 'S', comment: '完璧です！素晴らしいプレイでした！🌟', points: pts };
    if (pts >= 80) return { grade: 'A', comment: '優秀です！とても良いプレイでした！👏', points: pts };
    if (pts >= 70) return { grade: 'B', comment: '良好です！頑張りましたね！💪', points: pts };
    if (pts >= 60) return { grade: 'C', comment: 'クリアおめでとうございます！🎉', points: pts };
    return { grade: 'D', comment: 'ゴールできました！次はもっと良い結果を！', points: pts };
}

// ===================================================
// ▼ ランキングスコア計算（順位付け用）
//   順位付け: S > A > B > C > D
//   同ランク内は持ち点が高い方が上位
//   ゴールしていない場合はペナルティ
// ===================================================
function calcSortKey(r) {
    if (!r.isFinished) {
        // 未ゴールは最下位扱い
        return { gradeIdx: 999, points: -9999 };
    }
    const tc = r.turnCount      !== undefined ? r.turnCount      : r.turn_count;
    const qc = r.quizCount      !== undefined ? r.quizCount      : r.quiz_count;
    const hc = r.happeningCount !== undefined ? r.happeningCount : r.happening_count;
    const { grade, points } = calcGrade(tc, qc, hc);
    const gradeIdx = GRADE_ORDER[grade] !== undefined ? GRADE_ORDER[grade] : 999;
    return { gradeIdx, points };
}

// ===================================================
// ▼ 結果表示
// ===================================================
function displayRanking() {
    const raw = localStorage.getItem('membersResults');
    if (!raw) {
        alert('結果データが見つかりません。');
        window.location.href = 'index.html';
        return;
    }

    let results = JSON.parse(raw);

    // 順位ソート: ランク優先（S>A>B>C>D）、同ランクなら持ち点降順
    results.sort((a, b) => {
        const ka = calcSortKey(a);
        const kb = calcSortKey(b);
        if (ka.gradeIdx !== kb.gradeIdx) return ka.gradeIdx - kb.gradeIdx;
        return kb.points - ka.points; // 持ち点が高い方が上位
    });
    sendMembersResultsToServer(results);

    // ランクを再付与
    results.forEach((r, i) => { r.rank = i + 1; });

    const list = document.getElementById('rankingList');
    list.innerHTML = '';

    results.forEach((r, i) => {
        // camelCase / snake_case 両方に対応（互換性確保）
        const tc = toSafeInt(r.turnCount      !== undefined ? r.turnCount      : r.turn_count);
        const qc = toSafeInt(r.quizCount      !== undefined ? r.quizCount      : r.quiz_count);
        const hc = toSafeInt(r.happeningCount !== undefined ? r.happeningCount : r.happening_count);
        const { grade, comment } = calcGrade(tc, qc, hc);
        const rankClass = i < 3 ? `rank-${i + 1}` : 'rank-other';
        const badge     = i < 3 ? RANK_MEDALS[i] : `${i + 1}位`;
        const delayMs   = i * 120;

        const card = document.createElement('div');
        card.className = `rank-card ${rankClass}`;
        card.style.animationDelay = `${delayMs}ms`;

        // 1位クラウン演出
        const crownHTML = i === 0 ? '<span class="crown">👑</span>' : '';

        card.innerHTML = `
            ${crownHTML}
            <div class="rank-badge">${badge}</div>
            <div class="rank-avatar">
                <svg width="56" height="62" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg">
                    <path d="${r.avatarPath || AVATAR_PATH}" fill="${r.playerColor || '#00BFFF'}"/>
                    <circle cx="50" cy="45" r="12" fill="white" opacity="0.3"/>
                </svg>
            </div>
            <div class="rank-info">
                <div class="rank-name" style="color:${r.playerColor || '#222'}">${escapeHtml(r.playerName)}</div>
                <div class="rank-stats">
                    <span class="stat-item"><span class="stat-icon">🏁</span>${tc}ターン</span>
                    <span class="stat-item"><span class="stat-icon">❓</span>クイズ${qc}問正解</span>
                    <span class="stat-item"><span class="stat-icon">💥</span>アクシデント${hc}回</span>
                </div>
                <div style="font-size:0.82rem;color:#777;margin-top:5px;">${comment}</div>
            </div>
            <div class="rank-score">
                <span class="score-grade grade-${grade}">${grade}</span>
                <span class="score-label">評価</span>
            </div>
        `;

        list.appendChild(card);
    });

    // 1位プレイヤー名をタイトルに表示
    if (results.length > 0) {
        document.getElementById('rankingTitle').textContent =
            `🏆 ${escapeHtml(results[0].playerName)} さんが1位！ 🏆`;
    }
}

// XSS対策
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ===================================================
// ▼ ボタン処理
// ===================================================

// もう一度遊ぶ：直前のステージを同じプレイヤー設定で再読み込み
function playAgain() {
    const stageUrl = localStorage.getItem('membersStageUrl');
    if (stageUrl) {
        window.location.href = stageUrl;
        return;
    }
    // フォールバック: ステージ番号からURLを推定
    const stage = getStageNo();
    const playMode = localStorage.getItem('playMode') || 'multi';
    const stageMap = {
        1: 'sugoroku_members_play.html',
        2: 'quiz_mountain_members.html',
        3: 'sugoroku_ultraman_member.html',
        4: 'world_members.html',
    };
    if (stage && stageMap[stage]) {
        window.location.href = stageMap[stage];
    } else {
        window.location.href = 'stage_select.html';
    }
}

// ステージ選択へ
function goToStageSelect() {
    window.location.href = 'stage_select.html';
}

// ホームに戻る
function goToHome() {
    localStorage.removeItem('membersResults');
    localStorage.removeItem('membersPlayers');
    localStorage.removeItem('membersCurrentTurn');
    window.location.href = '../menu.html';
}

// ===================================================
// ▼ DB保存（多人数結果をPHPへ送信）
// ===================================================
function sendMembersResultsToServer(results) {
  // 1. 重複送信チェック
  let sessionId = localStorage.getItem('multiSessionId');
  if (!sessionId) {
    sessionId = (crypto?.randomUUID?.() ?? String(Date.now()));
    localStorage.setItem('multiSessionId', sessionId);
  }

  // 2. ステージ番号取得
  const urlParams = new URLSearchParams(location.search);
  const stage = urlParams.get('stage');

  // 3. 送信データ作成
  const payload = {
    sessionId: localStorage.getItem('multiSessionId') || ('stage-' + Date.now()),
    playersCount: results.length,
    stageNo: stage ? parseInt(stage, 10) : 1,
    results: results
  };

  // 4. fetch実行
  const sentKey = 'membersResultsSent:' + sessionId;
  fetch('../api/save_members_results.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(res => {
    if (res.ok || res.status === 'success') {
      localStorage.setItem(sentKey, '1');
      console.log('保存成功');
    }
  })
  .catch(err => console.error('通信エラー:', err));
}

// 結果発表（ランキング）へ
document.getElementById('btnRanking')?.addEventListener('click', () => {
  const stage = new URLSearchParams(location.search).get('stage');
  if (stage) {
    location.href = `ranking.php?view=stage&stage=${stage}`;
  } else {
    location.href = 'ranking.php?view=total';
  }
});

// 次のステージ選択へ
document.getElementById('btnNextStage')?.addEventListener('click', () => {
  location.href = 'stage_select.html';
});
