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
        turnCountElement.textContent = resultData.turnCount || 0;
    }
    
    // クイズ正解数を表示
    const quizCountElement = document.getElementById('resultQuizCount');
    if (quizCountElement) {
        quizCountElement.textContent = resultData.quizCount || 0;
    }
    
    // アクシデント回数を表示
    const hapningCountElement = document.getElementById('resultHapningCount');
    if (hapningCountElement) {
        hapningCountElement.textContent = resultData.happeningCount || 0;
    }
    
    // ランクとコメントを計算・表示
    displayRankAndComment(resultData.turnCount, resultData.quizCount);
}

function displayRankAndComment(turnCount, quizCount) {
    const rankElement = document.getElementById('resultRank');
    const commentElement = document.getElementById('resultComment');
    
    let rank = '';
    let comment = '';
    
    // ランク判定ロジック
    if (turnCount <= 15 && quizCount === 3) {
        rank = 'S';
        comment = '完璧です！素晴らしいプレイでした！🌟';
    } else if (turnCount <= 20 && quizCount >= 2) {
        rank = 'A';
        comment = '優秀です！とても良いプレイでした！👏';
    } else if (turnCount <= 30 && quizCount >= 1) {
        rank = 'B';
        comment = '良好です！頑張りましたね！💪';
    } else if (turnCount <= 40) {
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

function playAgain() {
    // 結果データをクリア
    localStorage.removeItem('gameResult');
    
    // select.htmlへ遷移
    window.location.href = 'select.html';
}

function goToHome() {
    // 結果データをクリア
    localStorage.removeItem('gameResult');
    
    // index.htmlへ遷移
    window.location.href = '../index.html';
}
