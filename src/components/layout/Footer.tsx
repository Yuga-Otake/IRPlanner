export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>📈</span> IRプランナー学習
            </h3>
            <p className="text-sm">
              CIRP・CIRP-S（日本IRプランナーズ協会）合格を目指す学習アプリです。
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">試験概要</h3>
            <ul className="text-sm space-y-1">
              <li>CIRP（基礎）: 4科目 各70点以上</li>
              <li>CIRP-S（上級）: 7科目 各70点以上</li>
              <li>年4回（CIRP）/ 年2回（CIRP-S）</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">コンテンツ</h3>
            <ul className="text-sm space-y-1">
              <li>📚 11科目の学習コンテンツ</li>
              <li>✏️ 165問の練習問題</li>
              <li>📋 IRプラン作成ツール</li>
              <li>📊 進捗トラッキング</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
          <p>
            本アプリは学習支援を目的としています。試験の最新情報は{' '}
            <a
              href="https://www.irpa.or.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline"
            >
              日本IRプランナーズ協会公式サイト
            </a>{' '}
            でご確認ください。
          </p>
        </div>
      </div>
    </footer>
  );
}
