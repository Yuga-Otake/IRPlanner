# 📈 IRプランナー学習アプリ

CIRP・CIRP-S（日本IRプランナーズ協会認定）合格を目指すための学習Webアプリです。

🔗 **公開URL**: https://yuga-otake.github.io/IRPlanner/

---

## 機能

| 機能 | 説明 |
|------|------|
| 📚 学習コンテンツ | CIRP 4科目 + CIRP-S 7科目の全11科目を詳細に解説 |
| ✏️ クイズ（165問） | 4択形式・解説付き・合格判定（70点以上） |
| 📊 進捗管理 | 科目別合格状況・スコア履歴を追跡 |
| 📋 IRプラン作成 | 実践的なIR年間計画を作成・管理 |

---

## 試験概要

### CIRP（基礎）
- **4科目**: 資本市場 / 企業分析 / 情報開示とIR活動 / 総合問題
- **合格基準**: 各科目100点満点で70点以上
- **実施**: 年4回

### CIRP-S（上級）
- **7科目**: 買収リスクと敵対的買収防衛 / 企業分析と銘柄選択 / 企業価値と株式価値の算定 / 資本市場の国際化と企業ディスクロージャー / 情報開示制度とインサイダー取引規制 / コンプライアンス / コーポレートガバナンス
- **合格基準**: 各科目70点以上
- **実施**: 年2回（2日間）

---

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで http://localhost:5173 を開く。

## ビルド & デプロイ

```bash
# ビルドのみ
npm run build

# GitHub Pagesへデプロイ（手動）
npm run deploy
```

### 自動デプロイ
`main`ブランチへのpushで GitHub Actions が自動ビルド・デプロイします。

---

## 技術スタック

- **フレームワーク**: React 18 + Vite
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **ルーティング**: React Router v6（HashRouter）
- **データ永続化**: localStorage
- **デプロイ**: GitHub Pages

---

## プロジェクト構成

```
src/
├── components/       # UIコンポーネント
│   ├── layout/       # Header, Footer, Layout
│   ├── ui/           # Button, Card, Badge, ProgressBar, Modal
│   ├── lessons/      # 学習コンテンツ関連
│   ├── quiz/         # クイズ関連
│   └── irplan/       # IRプラン作成関連
├── pages/            # ページコンポーネント
├── data/
│   ├── lessons/      # 学習コンテンツデータ（CIRP/CIRP-S）
│   └── quizzes/      # クイズ問題データ
├── hooks/            # カスタムフック
├── types/            # TypeScript型定義
└── utils/            # ユーティリティ
```

---

## 参考リンク

- [日本IRプランナーズ協会](https://www.irpa.or.jp/)
- [東京証券取引所](https://www.jpx.co.jp/)
- [金融庁](https://www.fsa.go.jp/)
