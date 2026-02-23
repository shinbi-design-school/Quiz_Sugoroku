// ranking.js - ランキングページ用スクリプト
// 将来的にAjaxでランキングデータを取得・表示する処理を追加可能

document.addEventListener('DOMContentLoaded', function () {
  // ランキングデータのアニメーション表示
  const items = document.querySelectorAll('.ranking-item');
  items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 100);
  });
});
