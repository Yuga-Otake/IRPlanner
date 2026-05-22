import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'ホーム', icon: '🏠', exact: true },
  { to: '/learn', label: '学ぶ', icon: '📚' },
  { to: '/quiz', label: 'クイズ', icon: '✏️' },
  { to: '/irplan', label: 'IRプラン', icon: '📋' },
  { to: '/progress', label: '進捗', icon: '📊' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-900 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">📈</span>
            <span className="hidden sm:block">IRプランナー学習</span>
            <span className="sm:hidden">IRプランナー</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  [
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="メニュー"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-indigo-800 bg-indigo-900">
          <nav className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-indigo-200 hover:bg-white/10 hover:text-white',
                  ].join(' ')
                }
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* CIRP exam badge bar */}
      <div className="bg-indigo-800/60 border-t border-indigo-700/50">
        <div className="max-w-6xl mx-auto px-4 py-1 flex items-center gap-4 text-xs text-indigo-300">
          <span>🎯 CIRP・CIRP-S 合格対策</span>
          <span className="hidden sm:block">｜ 合格基準: 各科目70点以上</span>
          <span className="hidden sm:block">｜ 日本IRプランナーズ協会認定</span>
        </div>
      </div>
    </header>
  );
}
