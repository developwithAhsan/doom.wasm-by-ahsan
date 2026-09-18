import React, { useEffect, useState } from 'react';
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
  Share2,
  Check,
  Calendar,
  Clock,
  Shield,
} from 'lucide-react';

export type NavRoute = 'home' | 'privacy' | 'terms' | 'disclaimer' | 'sitemap' | 'robots';

interface PageLayoutProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  title: string;
  subtitle?: string;
  badge?: string;
  readTime?: string;
  children: React.ReactNode;
}

const PAGE_METADATA: Record<
  NavRoute,
  {
    title: string;
    description: string;
    readTime: string;
    badge: string;
    path: string;
  }
> = {
  home: {
    title: 'Doom WebAssembly - Play Original DOOM Online Free in Browser',
    description:
      'Play original DOOM online in your browser for free with no download. Experience classic DOOM 1, DOOM 2 & Ultimate DOOM with WebAssembly.',
    readTime: 'Instant Play',
    badge: 'Official WebAssembly Engine',
    path: '/',
  },
  privacy: {
    title: 'Privacy Policy | Doom WebAssembly',
    description:
      'Official zero-telemetry Privacy Policy for Doom WebAssembly. 100% client-side execution with local storage saves and no remote data tracking.',
    readTime: '4 min read',
    badge: 'Zero Telemetry Standard',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service | Doom WebAssembly',
    description:
      'Governing terms and conditions for Doom WebAssembly. Non-commercial personal entertainment, research, and custom WAD loader guidelines.',
    readTime: '4 min read',
    badge: 'Open Source & Free Use',
    path: '/terms',
  },
  disclaimer: {
    title: 'Legal Disclaimer & Trademark Notices | Doom WebAssembly',
    description:
      'Trademark attribution for id Software, ZeniMax, Bethesda, and Microsoft. Shareware distribution legality and open-source licensing notices.',
    readTime: '3 min read',
    badge: 'Official Legal Notice',
    path: '/disclaimer',
  },
  sitemap: {
    title: 'HTML & XML Sitemap Index | Doom WebAssembly',
    description:
      'Complete navigation sitemap and index of all public endpoints, historical documentation, and game engine specs for Doom WebAssembly.',
    readTime: '2 min read',
    badge: 'Search Engine Optimized',
    path: '/sitemap',
  },
  robots: {
    title: 'Robots.txt Specifications & Crawler Directives | Doom WebAssembly',
    description:
      'Crawler access rules and robots.txt specifications for Googlebot, Bingbot, and automated web indexing robots on Doom WebAssembly.',
    readTime: '1 min read',
    badge: 'Index & Follow Enabled',
    path: '/robots',
  },
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  currentRoute,
  onNavigate,
  title,
  subtitle,
  badge,
  readTime,
  children,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Update SEO Document Title, Canonical Tag, Meta Descriptions & OpenGraph
  useEffect(() => {
    const meta = PAGE_METADATA[currentRoute] || PAGE_METADATA.home;
    const pageUrl = `https://doombrowser.vercel.app${meta.path === '/' ? '' : meta.path}`;

    // 1. Title
    document.title = meta.title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = meta.description;

    // 3. Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = pageUrl;

    // 4. OpenGraph & Twitter Meta Tags
    const updateMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    updateMetaTag('property', 'og:title', meta.title);
    updateMetaTag('property', 'og:description', meta.description);
    updateMetaTag('property', 'og:url', pageUrl);
    updateMetaTag('name', 'twitter:title', meta.title);
    updateMetaTag('name', 'twitter:description', meta.description);

    // 5. Schema.org BreadcrumbList JSON-LD
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'DOOM Game Launcher',
          item: 'https://doombrowser.vercel.app/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: pageUrl,
        },
      ],
    };

    let breadcrumbScript = document.getElementById('seo-breadcrumb-jsonld') as HTMLScriptElement | null;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'seo-breadcrumb-jsonld';
      breadcrumbScript.type = 'application/ld+json';
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.text = JSON.stringify(breadcrumbJsonLd);

    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute, title]);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const navItems = [
    { route: 'privacy' as NavRoute, label: 'Privacy Policy', icon: Lock, path: '/privacy' },
    { route: 'terms' as NavRoute, label: 'Terms of Service', icon: FileText, path: '/terms' },
    { route: 'disclaimer' as NavRoute, label: 'Disclaimer & IP', icon: Scale, path: '/disclaimer' },
    { route: 'sitemap' as NavRoute, label: 'Sitemap', icon: Map, path: '/sitemap' },
    { route: 'robots' as NavRoute, label: 'Robots.txt', icon: FileCode, path: '/robots' },
  ];

  const estimatedReadTime = readTime || PAGE_METADATA[currentRoute]?.readTime || '3 min read';
  const effectiveBadge = badge || PAGE_METADATA[currentRoute]?.badge;

  return (
    <div className="min-h-screen bg-[#090d14] text-zinc-100 flex flex-col items-center px-3 sm:px-6 py-6 font-sans select-text antialiased">
      {/* Top Header Bar with Consistent 'Back to Game' Link */}
      <header
        role="banner"
        className="w-full max-w-4xl flex items-center justify-between py-4 border-b border-[#1e2a3b] mb-6 gap-4"
      >
        {/* Brand identity linking to Home */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-3 text-left group cursor-pointer"
          title="Return to DOOM WebAssembly Game Launcher"
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
        </a>

        {/* Primary Header Action: Back to Game Link */}
        <a
          href="/"
          id="header-back-to-game-btn"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 active:from-red-800 active:to-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all shadow-md hover:shadow-red-900/30 cursor-pointer border border-red-500/30 shrink-0"
          title="Return to DOOM Game Launcher and active session"
        >
          <ArrowLeft className="w-4 h-4 text-red-200" />
          <Gamepad2 className="w-4 h-4 text-white hidden sm:block" />
          <span>Back to Game</span>
        </a>
      </header>

      {/* Sub-navigation tabs for legal, policy, and technical index pages */}
      <nav
        role="navigation"
        aria-label="Policy & Document Navigation"
        className="w-full max-w-4xl bg-[#0e141f] border border-[#202c3f] flex flex-wrap text-xs font-semibold overflow-x-auto mb-6"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;
          return (
            <a
              key={item.route}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.route);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 min-w-[130px] py-3 px-3 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
                isActive
                  ? 'border-red-500 text-white bg-[#141c28]'
                  : 'border-transparent text-[#7d91a9] hover:text-white hover:bg-[#111722]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-400' : 'text-[#556982]'}`} />
              <span className="whitespace-nowrap">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Main Content Area with Clean SEO-Friendly Document Structure */}
      <main
        id="main-content"
        role="main"
        className="w-full max-w-4xl bg-[#141c28] border border-[#232e42] p-6 sm:p-10 shadow-2xl space-y-6"
      >
        {/* Semantic Breadcrumbs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c2636] pb-3 text-[11px] font-mono text-[#556982]">
          <nav aria-label="Breadcrumb">
            <ol
              itemScope
              itemType="https://schema.org/BreadcrumbList"
              className="flex items-center gap-1.5"
            >
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-1.5"
              >
                <a
                  itemProp="item"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                  className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-red-500" />
                  <span itemProp="name">Game Launcher</span>
                </a>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3 text-[#3a4c66]" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="text-[#9bb0c9] uppercase tracking-wider font-semibold"
              >
                <span itemProp="name">{title}</span>
                <meta itemProp="position" content="2" />
              </li>
            </ol>
          </nav>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer font-sans"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Game</span>
          </a>
        </div>

        {/* Semantic Article Wrapper */}
        <article itemScope itemType="https://schema.org/Article" className="space-y-6">
          {/* Article Header: Title, Description & Metadata */}
          <header className="border-b border-[#202c3f] pb-5 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <h1
                  itemProp="headline"
                  className="text-2xl sm:text-3xl font-black text-white uppercase tracking-wider"
                >
                  {title}
                </h1>
                {subtitle && (
                  <p itemProp="description" className="text-xs sm:text-sm text-[#7d91a9] font-mono leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Utility Tools: Print & Share */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0e141f] hover:bg-[#1a2536] border border-[#232e42] text-[11px] font-mono text-[#7d91a9] hover:text-white transition-colors cursor-pointer rounded-xs"
                  title="Copy direct shareable link to clipboard"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0e141f] hover:bg-[#1a2536] border border-[#232e42] text-[11px] font-mono text-[#7d91a9] hover:text-white transition-colors cursor-pointer rounded-xs"
                  title="Print this official document"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Document Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono text-[#7d91a9]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#556982]" />
                <span>Last Updated: </span>
                <time dateTime="2026-09-15" itemProp="dateModified" className="text-zinc-300">
                  September 15, 2026
                </time>
              </span>
              <span className="text-[#3a4c66]">&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#556982]" />
                <span className="text-zinc-300">{estimatedReadTime}</span>
              </span>
              {effectiveBadge && (
                <>
                  <span className="text-[#3a4c66]">&bull;</span>
                  <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-xs">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>{effectiveBadge}</span>
                  </span>
                </>
              )}
            </div>
          </header>

          {/* Dynamic Document Body */}
          <div itemProp="articleBody" className="text-xs sm:text-sm leading-relaxed text-[#9bb0c9] space-y-6 pt-1">
            {children}
          </div>

          {/* Document Footer: Return to Game Button & Site Discovery */}
          <footer className="pt-8 border-t border-[#202c3f] flex flex-wrap items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#1a2536] hover:bg-[#23334d] active:bg-[#15202f] border border-[#2e3f59] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-red-400" />
              <span>Back to Game</span>
            </a>

            <div className="flex items-center gap-4 text-[11px] font-mono text-[#556982]">
              <a
                href="/sitemap"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('sitemap');
                }}
                className="hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Browse Sitemap</span>
              </a>
              <span>&bull;</span>
              <span>Document Rev: 2026.09-WASM</span>
            </div>
          </footer>
        </article>
      </main>

      {/* Global Page Footer */}
      <footer
        role="contentinfo"
        className="w-full max-w-4xl mt-12 pt-6 pb-12 border-t border-[#1e2a3b] text-xs font-mono text-[#7d91a9] flex flex-wrap items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="text-white font-bold flex items-center gap-2">
            <span>Doom WebAssembly (1993–2026)</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-1.5 py-0.5 rounded-xs">
              Live Production
            </span>
          </div>
          <div className="text-[11px] text-[#556982]">
            Original Game &copy; id Software LLC / ZeniMax / Bethesda / Microsoft. Pure client-side Wasm runtime.
          </div>
        </div>

        <nav aria-label="Footer Nav" className="flex flex-wrap items-center gap-3 text-[11px]">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer"
          >
            Play Game
          </a>
          <span>&bull;</span>
          <a
            href="/privacy"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('privacy');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy
          </a>
          <span>&bull;</span>
          <a
            href="/terms"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('terms');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms
          </a>
          <span>&bull;</span>
          <a
            href="/disclaimer"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('disclaimer');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Disclaimer
          </a>
          <span>&bull;</span>
          <a
            href="/sitemap"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('sitemap');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Sitemap
          </a>
          <span>&bull;</span>
          <a
            href="/robots"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('robots');
            }}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Robots.txt
          </a>
        </nav>
      </footer>
    </div>
  );
};
