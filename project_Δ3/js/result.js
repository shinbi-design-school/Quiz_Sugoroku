// ===============================
// 結果画面スクリプト
// ===============================

// ページ読み込み時に結果を表示
window.addEventListener('DOMContentLoaded', () => {
    displayResult();
});

function displayResult() {
    // localStorageから結果データを取得
    const resultDataString = localStorage.getItem('gameResult');
    
    if (!resultDataString) {
        // データがない場合はホームに戻る
        alert('ゲーム結果が見つかりません。');
        window.location.href = '../index.html';
        return;
    }
    
    const resultData = JSON.parse(resultDataString);

    // 安全にパラメータを取得（undefined/null/NaN を 0 に変換）
    const turnCount = toSafeInt(resultData.turnCount);
    const quizCount = toSafeInt(resultData.quizCount);
    const happeningCount = toSafeInt(resultData.happeningCount);
    
    // プレイヤー名を表示
    const playerNameElement = document.getElementById('resultPlayerName');
    if (playerNameElement) {
        playerNameElement.textContent = resultData.playerName || 'プレイヤー';
        playerNameElement.style.color = resultData.playerColor || '#00BFFF';
    }
    
    // アバターを表示
    const avatarBody = document.getElementById('resultAvatarBody');
    if (avatarBody && resultData.avatarPath) {
        avatarBody.setAttribute('d', resultData.avatarPath);
        avatarBody.setAttribute('fill', resultData.playerColor || '#00BFFF');
    }
    
    // ターン数を表示
    const turnCountElement = document.getElementById('resultTurnCount');
    if (turnCountElement) {
        turnCountElement.textContent = turnCount;
    }
    
    // クイズ正解数を表示
    const quizCountElement = document.getElementById('resultQuizCount');
    if (quizCountElement) {
        quizCountElement.textContent = quizCount;
    }
    
    // アクシデント回数を表示
    const hapningCountElement = document.getElementById('resultHapningCount');
    if (hapningCountElement) {
        hapningCountElement.textContent = happeningCount;
    }

    // ランクとコメントを計算・表示（持ち点は隠しパラメータ）
    displayRankAndComment(turnCount, quizCount, happeningCount);
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
// ▼ 持ち点計算（隠しパラメータ）
//   基本持ち点: 100点
//   加点: クイズ正解数（1正解につき +1）
//   減点: 経過ターン数（そのまま減算）
//   減点: happeningマスに留まった数（1回につき -1）
//   持ち点 = 100 + quizCount - turnCount - happeningCount
// ===================================================
function calcScore(turnCount, quizCount, happeningCount) {
    return 100 + toSafeInt(quizCount) - toSafeInt(turnCount) - toSafeInt(happeningCount);
}

// ===================================================
// ▼ ランク判定（持ち点ベース）
//   S: 85点以上
//   A: 80〜84点
//   B: 70〜79点
//   C: 60〜69点
//   D: 59点以下
// ===================================================
function displayRankAndComment(turnCount, quizCount, happeningCount) {
    const rankElement = document.getElementById('resultRank');
    const commentElement = document.getElementById('resultComment');
    
    const score = calcScore(turnCount, quizCount, happeningCount);
    
    let rank = '';
    let comment = '';
    
    if (score >= 85) {
        rank = 'S';
        comment = '完璧です！素晴らしいプレイでした！🌟';
    } else if (score >= 80) {
        rank = 'A';
        comment = '優秀です！とても良いプレイでした！👏';
    } else if (score >= 70) {
        rank = 'B';
        comment = '良好です！頑張りましたね！💪';
    } else if (score >= 60) {
        rank = 'C';
        comment = 'クリアおめでとうございます！🎉';
    } else {
        rank = 'D';
        comment = 'ゴールできました！次はもっと良い結果を目指しましょう！';
    }
    
    if (rankElement) {
        rankElement.textContent = rank;
        rankElement.className = `result-rank rank-${rank}`;
    }
    
    if (commentElement) {
        commentElement.textContent = comment;
    }
}

// ===================================================
// ▼ ボタン処理
// ===================================================

// もう一度遊ぶ：直前のステージを同じプレイヤー設定で再読み込み
function playAgain() {
    const resultDataString = localStorage.getItem('gameResult');
    if (resultDataString) {
        const resultData = JSON.parse(resultDataString);
        if (resultData.stageUrl) {
            window.location.href = resultData.stageUrl;
            return;
        }
    }
    // stageUrlが無い場合はステージ選択へフォールバック
    window.location.href = 'stage_select.html';
}

// ステージ選択へ
function goToStageSelect() {
    window.location.href = 'stage_select.html';
}

// ホームに戻る
function goToHome() {
    window.location.href = '../menu.html';
}
