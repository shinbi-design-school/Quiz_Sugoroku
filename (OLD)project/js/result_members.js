// ===============================
// 多人数結果画面スクリプト
// ===============================

const AVATAR_PATH = 'M 60 140 L 40 120 L 35 120 L 45 80 A 40 40 0 1 1 75 80 L 85 120 L 80 120 Z';

const RANK_MEDALS = ['🥇', '🥈', '🥉'];
const RANK_LABELS = ['1st', '2nd', '3rd'];

window.addEventListener('DOMContentLoaded', () => {
    displayRanking();
});

// ===================================================
// ▼ ランク評価（1人用と同じロジック）
// ===================================================
function calcGrade(turnCount, quizCount) {
    if (turnCount <= 15 && quizCount >= 3) return { grade: 'S', comment: '完璧です！素晴らしいプレイでした！🌟' };
    if (turnCount <= 20 && quizCount >= 2) return { grade: 'A', comment: '優秀です！とても良いプレイでした！👏' };
    if (turnCount <= 30 && quizCount >= 1) return { grade: 'B', comment: '良好です！頑張りましたね！💪' };
    if (turnCount <= 40)                   return { grade: 'C', comment: 'クリアおめでとうございます！🎉' };
    return { grade: 'D', comment: 'ゴールできました！次はもっと良い結果を！' };
}

// ===================================================
// ▼ ランキングスコア計算（順位付け用）
// ===================================================
function calcScore(r) {
    // 小さいターン数ほど高得点、クイズ正解ほど高得点
    // ゴールしていない場合はペナルティ
    const baseTurn = r.isFinished ? r.turnCount : 9999;
    return baseTurn * 100 - r.quizCount * 50 + r.happeningCount * 10;
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

    // スコアでソート
    results.sort((a, b) => calcScore(a) - calcScore(b));

    // ランクを再付与
    results.forEach((r, i) => { r.rank = i + 1; });

    const list = document.getElementById('rankingList');
    list.innerHTML = '';

    results.forEach((r, i) => {
        const { grade, comment } = calcGrade(r.turnCount, r.quizCount);
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
                    <span class="stat-item"><span class="stat-icon">🏁</span>${r.turnCount}ターン</span>
                    <span class="stat-item"><span class="stat-icon">❓</span>クイズ${r.quizCount}問正解</span>
                    <span class="stat-item"><span class="stat-icon">💥</span>アクシデント${r.happeningCount}回</span>
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
function playAgain() {
    localStorage.removeItem('membersResults');
    localStorage.removeItem('membersPlayers');
    localStorage.removeItem('membersCurrentTurn');
    window.location.href = 'members_select.html';
}

function goToHome() {
    localStorage.removeItem('membersResults');
    localStorage.removeItem('membersPlayers');
    localStorage.removeItem('membersCurrentTurn');
    window.location.href = 'index.html';
}
