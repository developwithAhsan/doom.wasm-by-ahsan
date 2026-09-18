import React, { useEffect } from 'react';
import {
  Gamepad2,
  Lock,
  FileText,
  Scale,
  Map,
  FileCode,
  ArrowLeft,
  Printer,
  ChevronRight,
} from 'lucide-react';

export type NavRoute = 'home' | 'privacy' | 'terms' | 'disclaimer' | 'sitemap' | 'robots';

interface PageLayoutProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  currentRoute,
  onNavigate,
  title,
  subtitle,
  badge,
  children,
}) => {
  // Update document title and canonical tag for SEO
  useEffect(() => {
    const titles: Record<NavRoute, string> = {
      home: 'Doom WebAssembly',
      privacy: 'Privacy Policy – Doom WebAssembly',
      terms: 'Terms of Service – Doom WebAssembly',
      disclaimer: 'Legal Disclaimer & Trademarks – Doom WebAssembly',
      sitemap: 'Sitemap – Doom WebAssembly',
      robots: 'Robots.txt – Doom WebAssembly',
    };
    document.title = titles[currentRoute] || 'Doom WebAssembly';

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    const targetUrl =
      currentRoute === 'home'
        ? 'https://doombrowser.vercel.app/'
        : `https://doombrowser.vercel.app/${currentRoute}`;
    canonicalLink.href = targetUrl;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const navItems = [
    { route: 'privacy' as NavRoute, label: 'Privacy Policy', icon: Lock, path: '/privacy' },
    { route: 'terms' as NavRoute, label: 'Terms of Service', icon: FileText, path: '/terms' },
    { route: 'disclaimer' as NavRoute, label: 'Disclaimer', icon: Scale, path: '/disclaimer' },
    { route: 'sitemap' as NavRoute, label: 'Sitemap', icon: Map, path: '/sitemap' },
    { route: 'robots' as NavRoute, label: 'Robots.txt', icon: FileCode, path: '/robots' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center px-3 sm:px-6 py-6 font-sans select-text antialiased">
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl flex items-center justify-between py-4 border-b border-[#1e2a3b] mb-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 bg-red-950/70 border border-red-800/80 flex items-center justify-center rounded-xs shadow-lg group-hover:border-red-600 transition-colors p-1">
            <img
              src="/favicon.svg"
              alt="DOOM Icon"
              className="w-7 h-7 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-base font-black text-white uppercase tracking-wider font-sans block group-hover:text-red-400 transition-colors">
              Doom WebAssembly
            </span>
            <span className="text-[11px] text-[#556982] font-mono block">
              1993 Classic &bull; Pure Client-Side Engine
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-md cursor-pointer"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Play DOOM</span>
        </button>
      </header>

      {/* Sub-navigation tabs for legal & policy pages */}
      <nav
        aria-label="Legal & Policy Pages"
        className="w-full max-w-4xl bg-[#0e141f] border border-[#202c3f] flex flex-wrap text-xs font-semibold overflow-x-auto mb-6"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              type="button"
              onClick={() => onNavigate(item.route)}
              className={`flex-1 min-w-[130px] py-3 px-3 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
                isActive
                  ? 'border-red-500 text-white bg-[#141c28]'
                  : 'border-transparent text-[#7d91a9] hover:text-white hover:bg-[#111722]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-[#556982]'}`} />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Article */}
      <main className="w-full max-w-4xl bg-[#141c28] border border-[#232e42] p-6 sm:p-10 shadow-2xl space-y-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#556982]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-blue-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#9bb0c9] uppercase tracking-wider">{title}</span>
        </div>

        {/* Page Title & Meta */}
        <div className="border-b border-[#202c3f] pb-5 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[#7d91a9] font-mono">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {badge && (
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-1 rounded-xs">
                {badge}
              </span>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0e141f] hover:bg-[#1a2536] border border-[#232e42] text-[11px] font-mono text-[#7d91a9] hover:text-white transition-colors cursor-pointer rounded-xs"
              title="Print this document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Dynamic Page Body */}
        <div className="text-xs sm:text-sm leading-relaxed text-[#9bb0c9] space-y-6">
          {children}
        </div>

        {/* Action Button to return */}
        <div className="pt-6 border-t border-[#202c3f] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Game Launcher</span>
          </button>

          <span className="text-[11px] font-mono text-[#556982]">
            Effective: September 15, 2026
          </span>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="w-full max-w-4xl mt-12 pt-6 pb-12 border-t border-[#1e2a3b] text-xs font-mono text-[#7d91a9] flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-white font-bold">Doom WebAssembly (1993–2026)</div>
          <div className="text-[11px] text-[#556982]">
            id Software LLC / ZeniMax / Bethesda / Microsoft. Pure client-side Wasm runtime.
          </div>
        </div>

        <nav aria-label="Footer Nav" className="flex flex-wrap items-center gap-3 text-[11px]">
          <button
            type="button"
            onClick={() => onNavigate('privacy')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => onNavigate('terms')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => onNavigate('disclaimer')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Disclaimer
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => onNavigate('sitemap')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sitemap
          </button>
          <span>&bull;</span>
          <button
            type="button"
            onClick={() => onNavigate('robots')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Robots.txt
          </button>
        </nav>
      </footer>
    </div>
  );
};
