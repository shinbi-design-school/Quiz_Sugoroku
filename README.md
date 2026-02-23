# 🎲 コードの帆を上げろ QUIZ ― クイズすごろくゲーム

> **チーム名：焚火ヴィジランテ**

コードや雑学の知識を駆使して、スタートからゴールを目指すクイズ×すごろくゲームです。  
ひとりでも、みんなでも遊べます。

---

## 目次

- [概要](#概要)
- [デモ画面フロー](#デモ画面フロー)
- [機能一覧](#機能一覧)
- [ディレクトリ構成](#ディレクトリ構成)
- [ファイル詳細](#ファイル詳細)
- [動作環境・前提条件](#動作環境前提条件)
- [セットアップ手順](#セットアップ手順)
- [データベース](#データベース)
- [遊び方](#遊び方)
- [使用技術](#使用技術)
- [AI ツールの利用について](#ai-ツールの利用について)
- [作成者](#作成者)
- [ライセンス](#ライセンス)

---

## 概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | コードの帆を上げろ QUIZ（クイズすごろくゲーム） |
| チーム名 | 焚火ヴィジランテ |
| プレイ人数 | 1人 ／ 2〜4人 |
| ステージ数 | 4ステージ |
| 対応ブラウザ | Google Chrome（推奨）／ Edge ／ Firefox ／ Safari |

---

## デモ画面フロー

```
op.html（タイトル）
  └─ index.html（ひとり or みんな 選択）
       ├─ select.html（キャラクター選択 / ひとり）
       │    └─ stage_select.html（ステージ選択）
       │         ├─ sugoroku_origin.html … ステージ1：コードすごろく
       │         ├─ quiz_mountain.html   … ステージ2：山の雑学クイズ
       │         ├─ sugoroku_ultlaman.html … ステージ3：ウルトラマンクイズ
       │         └─ world_origin.html    … ステージ4：せかいの首都クイズ
       │              └─ result.html（個人結果画面）
       │
       └─ members_select.html（プレイヤー設定 / みんな）
            └─ stage_select.html（ステージ選択）
                 ├─ sugoroku_members_play.html … ステージ1
                 ├─ quiz_mountain_members.html … ステージ2
                 ├─ sugoroku_ultraman_member.html … ステージ3
                 └─ world_members.html         … ステージ4
                      └─ result_members.html（みんなの結果画面）
```

その他ページ：`site_howtouse.html`（遊び方）・`team.html`（作成者紹介）・`documents.html`（資料置き場）・`ranking.php`（ランキング）

---

## 機能一覧

- **ひとりであそぶ**：1人用モード。名前・アバター色を選んで4ステージから好きなステージをプレイ
- **みんなであそぶ**：2〜4人のマルチプレイモード。ターン制で順番にサイコロを振って進行
- **クイズマス**：止まるとクイズが出題。正解でそのまま進行、不正解で2マス戻る
- **アクシデントマス**：止まると数マス戻される
- **結果画面**：クリアターン数・クイズ正解数・アクシデント回数・総合評価（S/A/B/C/D）を表示
- **DB 保存**：みんなであそぶモードの結果を MySQL に保存
- **ランキング**：保存された結果を元にランキング表示（`ranking.php`）
- **ハンバーガーメニュー**：各画面共通のナビゲーション
- **背景アニメーション**：Canvas を使用した光ファイバー風背景エフェクト
- **サイコロ演出**：CSS 3D Transform によるサイコロ回転アニメーション
- **資料置き場**：要件定義書等のプロジェクト資料へのリンクページ

---

## ディレクトリ構成

```
project_Δ2/
├── index.html                  … エントリーポイント（プレイ人数選択）
├── op.html                     … オープニング画面（タイトル）
│
├── pages/                      … 各サブページ
│   ├── select.html             … キャラクター選択（ひとり）
│   ├── members_select.html     … プレイヤー設定（みんな）
│   ├── stage_select.html       … ステージ選択
│   ├── sugoroku_origin.html    … ステージ1：コードすごろく（ひとり）
│   ├── sugoroku_members_play.html … ステージ1（みんな）
│   ├── quiz_mountain.html      … ステージ2：山の雑学クイズ（ひとり）
│   ├── quiz_mountain_members.html … ステージ2（みんな）
│   ├── sugoroku_ultlaman.html  … ステージ3：ウルトラマンクイズ（ひとり）
│   ├── sugoroku_ultraman_member.html … ステージ3（みんな）
│   ├── world_origin.html       … ステージ4：せかいの首都クイズ（ひとり）
│   ├── world_members.html      … ステージ4（みんな）
│   ├── result.html             … 結果画面（ひとり）
│   ├── result_members.html     … 結果画面（みんな）
│   ├── site_howtouse.html      … 遊び方ページ
│   ├── team.html               … 作成者紹介ページ
│   ├── documents.html          … 資料置き場ページ
│   └── ranking.php             … ランキングページ（PHP）
│
├── css/                        … スタイルシート
│   ├── reset.css               … リセットCSS
│   ├── style.css               … 共通スタイル
│   ├── op_style.css            … オープニング画面用
│   ├── op_background_move.css  … オープニング背景アニメーション用
│   ├── background_move.css     … ゲーム画面背景アニメーション用
│   ├── character-selection.css  … キャラクター選択画面用
│   ├── sugoroku_origin_style.css … ステージ1用
│   ├── sugoroku_member_origin_style.css … ステージ1（みんな）用
│   ├── quiz_mountain_style.css  … ステージ2用
│   ├── quiz_mountain_multi_style.css … ステージ2（みんな）用
│   ├── mountain_bg.css          … 山ステージ背景用
│   ├── world_origin_style.css   … ステージ4用
│   ├── result.css               … 結果画面用
│   ├── team.css                 … 作成者紹介ページ用
│   └── ranking.css              … ランキングページ用
│
├── js/                          … JavaScript
│   ├── script.js                … 共通スクリプト（ハンバーガーメニュー等）
│   ├── op_script.js             … オープニング画面スクリプト
│   ├── op_background_move.js    … オープニング背景アニメーション
│   ├── background_move.js       … ゲーム画面背景アニメーション
│   ├── mountain_bg.js           … 山ステージ背景アニメーション
│   ├── character-selection.js   … キャラクター選択ロジック
│   ├── sugoroku_origin_script.js … ステージ1ゲームロジック（ひとり）
│   ├── sugoroku_members_script.js … ステージ1ゲームロジック（みんな）
│   ├── quiz_mountain_script.js  … ステージ2ゲームロジック（ひとり）
│   ├── quiz_mountain_members_script.js … ステージ2ゲームロジック（みんな）
│   ├── sugoroku_ultraman.js     … ステージ3ゲームロジック（ひとり）
│   ├── sugoroku_ultraman_members.js … ステージ3ゲームロジック（みんな）
│   ├── world_origin_script.js   … ステージ4ゲームロジック（ひとり）
│   ├── world_members.js         … ステージ4ゲームロジック（みんな）
│   ├── result.js                … 結果画面ロジック（ひとり）
│   ├── result_members.js        … 結果画面ロジック（みんな）
│   └── ranking.js               … ランキングページスクリプト
│
├── api/                         … バックエンド API
│   ├── db.php                   … DB 接続設定
│   └── save_members_results.php … みんなモードの結果保存 API
│
├── images/                      … 画像アセット
│   ├── takibi_logo.png          … チームロゴ（ヘッダー表示）
│   ├── pechi.png                … ファビコン
│   ├── blue_sky.png             … 背景画像
│   ├── square_start.png         … すごろくスタート画像
│   ├── suquare_goal.png         … すごろくゴール画像
│   ├── quiz_mountain_start.png  … 山クイズスタート画像
│   ├── quiz_mountain_goal.png   … 山クイズゴール画像
│   ├── MicrosoftTeams-image.png … その他画像
│   ├── daichaso 1.png           … メンバーアイコン
│   ├── niwata.png               … メンバーアイコン
│   ├── pechi.png                … メンバーアイコン
│   └── yokoyama.png             … メンバーアイコン
│
└── docs/                        … プロジェクト資料
    └── README.md                … 資料フォルダ説明
    （requirements.pdf 等を配置予定）
```

---

## ファイル詳細

### HTML / PHP

| ファイル | 階層 | 概要 |
|----------|------|------|
| `op.html` | ルート | タイトル画面。「ゲームを始める」ボタンで index.html へ |
| `index.html` | ルート | 「ひとりであそぶ」「みんなであそぶ」の選択画面 |
| `select.html` | pages/ | ひとり用キャラクター選択（名前・色・アバター） |
| `members_select.html` | pages/ | みんな用プレイヤー設定（人数選択 → 各プレイヤー設定） |
| `stage_select.html` | pages/ | 4つのステージから選択する画面 |
| `sugoroku_origin.html` | pages/ | ステージ1：コードすごろく（HTML/CSS/JS 等のクイズ） |
| `quiz_mountain.html` | pages/ | ステージ2：山の雑学クイズ（日本百名山を登る） |
| `sugoroku_ultlaman.html` | pages/ | ステージ3：ウルトラマンクイズ |
| `world_origin.html` | pages/ | ステージ4：世界の首都クイズ |
| `sugoroku_members_play.html` | pages/ | ステージ1 みんな版 |
| `quiz_mountain_members.html` | pages/ | ステージ2 みんな版 |
| `sugoroku_ultraman_member.html` | pages/ | ステージ3 みんな版 |
| `world_members.html` | pages/ | ステージ4 みんな版 |
| `result.html` | pages/ | ひとり用結果画面（ターン数・正解数・評価表示） |
| `result_members.html` | pages/ | みんな用結果画面（順位付きランキング表示） |
| `site_howtouse.html` | pages/ | 遊び方の説明ページ |
| `team.html` | pages/ | 作成者紹介ページ |
| `documents.html` | pages/ | 要件定義書等のプロジェクト資料へのリンクページ |
| `ranking.php` | pages/ | DB から取得したスコアでランキングを表示 |

### CSS

| ファイル | 概要 |
|----------|------|
| `reset.css` | ブラウザデフォルトスタイルのリセット |
| `style.css` | サイト共通スタイル（ヘッダー・メニュー・ボタン等） |
| `op_style.css` | オープニング画面のスタイル |
| `op_background_move.css` | オープニング画面の Canvas 背景用 |
| `background_move.css` | ゲーム画面の Canvas 背景用 |
| `character-selection.css` | キャラクター選択画面のスタイル |
| `sugoroku_origin_style.css` | ステージ1（すごろく盤面）のスタイル |
| `sugoroku_member_origin_style.css` | ステージ1 みんな版のスタイル |
| `quiz_mountain_style.css` | ステージ2（山登り盤面）のスタイル |
| `quiz_mountain_multi_style.css` | ステージ2 みんな版のスタイル |
| `mountain_bg.css` | 山ステージの背景グラデーション |
| `world_origin_style.css` | ステージ4（世界地図盤面）のスタイル |
| `result.css` | 結果画面のスタイル |
| `team.css` | 作成者紹介ページのスタイル |
| `ranking.css` | ランキングページのスタイル |

### JavaScript

| ファイル | 概要 |
|----------|------|
| `script.js` | 共通処理（ハンバーガーメニュー制御・ボタンインタラクション） |
| `op_script.js` | オープニング画面のメニュー制御・画面遷移 |
| `op_background_move.js` | 光ファイバー風 Canvas 背景アニメーション（オープニング系） |
| `background_move.js` | 光ファイバー風 Canvas 背景アニメーション（ゲーム系） |
| `mountain_bg.js` | 山ステージ専用の Canvas 背景アニメーション |
| `character-selection.js` | キャラクター選択ロジック（名前入力・色選択・URL パラメータ渡し） |
| `sugoroku_origin_script.js` | ステージ1 ゲームロジック（盤面生成・サイコロ・クイズ・ゴール判定） |
| `sugoroku_members_script.js` | ステージ1 みんな版ゲームロジック |
| `quiz_mountain_script.js` | ステージ2 ゲームロジック（山登り形式・49 マス） |
| `quiz_mountain_members_script.js` | ステージ2 みんな版ゲームロジック |
| `sugoroku_ultraman.js` | ステージ3 ゲームロジック |
| `sugoroku_ultraman_members.js` | ステージ3 みんな版ゲームロジック |
| `world_origin_script.js` | ステージ4 ゲームロジック |
| `world_members.js` | ステージ4 みんな版ゲームロジック |
| `result.js` | ひとり用結果表示（localStorage から取得・評価算出） |
| `result_members.js` | みんな用結果表示・DB 保存（fetch API で `save_members_results.php` へ POST） |
| `ranking.js` | ランキングページのアニメーション処理 |

### API（PHP）

| ファイル | 概要 |
|----------|------|
| `api/db.php` | MySQL 接続関数（PDO） |
| `api/save_members_results.php` | みんなモードの結果を `results` テーブルに INSERT |

---

## 動作環境・前提条件

- **Web サーバー**：Apache（XAMPP 推奨）
- **PHP**：7.4 以上
- **MySQL / MariaDB**：5.7 以上
- **ブラウザ**：Google Chrome（推奨）、Edge、Firefox、Safari
- **追加ライブラリ**：不要（vanilla JS / CSS のみ）

---

## セットアップ手順

### 1. XAMPP のインストール・起動

Apache と MySQL を起動してください。

### 2. プロジェクトの配置

```bash
# XAMPP の htdocs にプロジェクトを配置
cp -r project_Δ2/ /path/to/xampp/htdocs/quiz_sugoroku
```

### 3. データベースの作成

phpMyAdmin または MySQL CLI で以下を実行：

```sql
CREATE DATABASE IF NOT EXISTS sugoroku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE sugoroku;

CREATE TABLE IF NOT EXISTS results (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    created_at      DATETIME NOT NULL,
    session_id      VARCHAR(36),
    mode            VARCHAR(10) NOT NULL DEFAULT 'multi',
    players_count   INT NOT NULL,
    player_name     VARCHAR(50) NOT NULL,
    player_color    VARCHAR(20),
    avatar_path     TEXT,
    turn_count      INT NOT NULL DEFAULT 0,
    quiz_count      INT NOT NULL DEFAULT 0,
    happening_count INT NOT NULL DEFAULT 0,
    is_finished     TINYINT(1) NOT NULL DEFAULT 0,
    finished_rank   INT
);
```

### 4. DB 接続情報の確認

`api/db.php` の接続設定を環境に合わせて変更：

```php
$dsn  = "mysql:host=localhost;dbname=sugoroku;charset=utf8mb4";
$user = "root";   // 環境に合わせて変更
$pass = "";        // 環境に合わせて変更
```

### 5. ブラウザでアクセス

```
http://localhost/quiz_sugoroku/op.html
```

---

## データベース

### results テーブル

| カラム | 型 | 説明 |
|--------|----|------|
| id | INT (PK) | 自動採番 |
| created_at | DATETIME | 登録日時 |
| session_id | VARCHAR(36) | セッション識別子 |
| mode | VARCHAR(10) | ゲームモード（`multi`） |
| players_count | INT | プレイヤー人数 |
| player_name | VARCHAR(50) | プレイヤー名 |
| player_color | VARCHAR(20) | アバターカラー |
| avatar_path | TEXT | アバター SVG パス |
| turn_count | INT | クリアターン数 |
| quiz_count | INT | クイズ正解数 |
| happening_count | INT | アクシデント回数 |
| is_finished | TINYINT(1) | ゴール到達フラグ |
| finished_rank | INT | ゴール順位 |

---

## 遊び方

1. **プレイ人数を選択** … 「ひとりであそぶ」or「みんなであそぶ」
2. **キャラクター設定** … 名前を入力し、アバターの色を選択
3. **ステージを選択** … 4つのステージから遊びたいものを選択
4. **サイコロを振る** … ボタンをクリックしてサイコロを振り、出た目の数だけ進む
5. **クイズに挑戦** … クイズマスに止まったら4択問題に回答（正解→進行 / 不正解→2マス戻る）
6. **ゴールを目指す** … 最後のマスに到達でクリア！
7. **結果を確認** … クリアターン数・正解数・アクシデント回数から S〜D の総合評価

### ステージ一覧

| # | ステージ名 | クイズ内容 |
|---|-----------|-----------|
| 1 | コードすごろく | HTML / CSS / JavaScript / PHP のプログラミング問題 |
| 2 | 山の雑学クイズ | 日本百名山の標高・由来・地理に関する問題 |
| 3 | ウルトラマンクイズ | ウルトラマンシリーズに関する問題 |
| 4 | せかいの首都クイズ | 世界各国の首都に関する問題 |

---

## 使用技術

| カテゴリ | 技術 |
|----------|------|
| フロントエンド | HTML5 / CSS3 / JavaScript（ES6+） |
| バックエンド | PHP 7.4+ |
| データベース | MySQL / MariaDB |
| Web サーバー | Apache（XAMPP） |
| フォント | Google Fonts（Kiwi Maru / Honk） |
| アニメーション | Canvas API / CSS 3D Transform / CSS Keyframes |
| データ受け渡し | localStorage / URL パラメータ / Fetch API（JSON） |

---

## AI ツールの利用について

> **本プロジェクトの全ファイル（HTML / CSS / JavaScript / PHP）において、以下の AI ツールを利用しています。**

| AI ツール | 用途 |
|-----------|------|
| **Microsoft Copilot 365** | コード補完・コード生成・デバッグ支援 |
| **Claude**（Anthropic） | 設計相談・コード生成・コードレビュー・リファクタリング・デバッグ |
| **ChatGPT**（OpenAI） | 設計相談・コード生成・デバッグ支援 |

コードの生成・修正・レビュー・デバッグの各工程で上記 AI ツールを活用し、開発効率の向上を図りました。最終的なコードの確認・統合・動作検証はチームメンバーが手動で行っています。

---

## 作成者

**チーム：焚火ヴィジランテ**

| 名前 | 役割 |
|------|------|
| だいちゃそ | リーダー / 要件定義 / フロントエンド / デバッグ |
| ニワタ | サブリーダー / デザイナー / バックエンド |
| makizo | デザイナー（画像制作） |
| よこP | プログラマー / フロントエンド |

---

## ライセンス

このプロジェクトは学習目的で作成されたものです。  
ライセンスについてはチームメンバーにお問い合わせください。
