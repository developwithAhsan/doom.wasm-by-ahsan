import React from 'react';
import { PageLayout, NavRoute } from './PageLayout';
import { Map, ExternalLink, Globe, FileCode, Shield, HelpCircle, Gamepad2, FileText, Sliders } from 'lucide-react';

interface SitemapPageProps {
  onNavigate: (route: NavRoute) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  const pages = [
    {
      title: 'Doom WebAssembly Home & Game Launcher',
      url: '/',
      route: 'home' as NavRoute,
      icon: Gamepad2,
      changefreq: 'Weekly',
      priority: '1.0',
      description: 'The primary play hub featuring the instant WebAssembly engine, framerate controls, custom WAD loader, and save manager.',
    },
    {
      title: 'The Legend of DOOM (History & Architecture Article)',
      url: '/#about',
      route: 'home' as NavRoute,
      icon: Shield,
      changefreq: 'Monthly',
      priority: '0.8',
      description: "Comprehensive historical and technical blog exploring John Carmack's BSP algorithm, 2.5D math, and WebAssembly compilation.",
    },
    {
      title: 'DOOM Controls, Keybindings & Gamepad Guide',
      url: '/#controls',
      route: 'home' as NavRoute,
      icon: Sliders,
      changefreq: 'Monthly',
      priority: '0.8',
      description: 'Complete keyboard, mouse, and game controller mappings with strafe, fire, speed-run, and weapon switcher bindings.',
    },
    {
      title: 'SEO Frequently Asked Questions (FAQ)',
      url: '/#faq',
      route: 'home' as NavRoute,
      icon: HelpCircle,
      changefreq: 'Monthly',
      priority: '0.8',
      description: 'Verified answers regarding shareware legality, commercial PWAD loading, LocalStorage saves, and browser performance.',
    },
    {
      title: 'Privacy Policy',
      url: '/privacy',
      route: 'privacy' as NavRoute,
      icon: Shield,
      changefreq: 'Monthly',
      priority: '0.8',
      description: 'Official zero-telemetry policy detailing client-only memory execution, absence of tracking cookies, and GDPR/CCPA alignment.',
    },
    {
      title: 'Terms of Service',
      url: '/terms',
      route: 'terms' as NavRoute,
      icon: FileText,
      changefreq: 'Monthly',
      priority: '0.8',
      description: 'Acceptable use criteria, non-commercial education guidelines, user-loaded WAD ownership criteria, and warranty limitations.',
    },
    {
      title: 'Legal Disclaimer & Trademarks',
      url: '/disclaimer',
      route: 'disclaimer' as NavRoute,
      icon: Globe,
      changefreq: 'Monthly',
      priority: '0.8',
      description: 'Trademark notices for id Software / ZeniMax / Bethesda / Microsoft, 1993 shareware authorization, and seizure advisories.',
    },
    {
      title: 'HTML & XML Sitemap Index',
      url: '/sitemap',
      route: 'sitemap' as NavRoute,
      icon: Map,
      changefreq: 'Weekly',
      priority: '0.7',
      description: 'Directory of all accessible endpoints for automated crawlers and human visitors.',
    },
    {
      title: 'Robots.txt Directives',
      url: '/robots',
      route: 'robots' as NavRoute,
      icon: FileCode,
      changefreq: 'Yearly',
      priority: '0.5',
      description: 'Crawler directives allowing complete crawling access for Googlebot, Bingbot, and search engines.',
    },
    {
      title: 'Raw /sitemap.xml Feed',
      url: '/sitemap.xml',
      isExternal: true,
      icon: FileCode,
      changefreq: 'Weekly',
      priority: '0.6',
      description: 'Standard XML sitemap schema file configured for Google Search Console and Bing Webmaster Tools.',
    },
    {
      title: 'Raw /robots.txt Feed',
      url: '/robots.txt',
      isExternal: true,
      icon: FileCode,
      changefreq: 'Yearly',
      priority: '0.5',
      description: 'Plaintext robots crawler instructions adhering to RFC 9309 standards.',
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof pages[0]) => {
    if (item.isExternal) {
      return; // Standard link to raw file
    }
    e.preventDefault();
    if (item.url.startsWith('/#')) {
      const hash = item.url.replace('/#', '');
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    if (item.route) {
      onNavigate(item.route);
    }
  };

  return (
    <PageLayout
      currentRoute="sitemap"
      onNavigate={onNavigate}
      title="Sitemap Directory"
      subtitle="Index of all pages, documents, and technical endpoints for search crawlers & users"
      badge="Search Engine Optimized"
      readTime="2 min read"
    >
      <div className="space-y-6">
        {/* Quick Links Banner */}
        <div className="bg-[#0e141f] border border-[#202c3f] p-4 rounded-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9bb0c9]">
            <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Machine-readable XML Sitemap is live at:</span>
            <code className="text-white bg-[#141c28] px-2 py-0.5 border border-[#2b3a52]">/sitemap.xml</code>
          </div>

          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-700/70 text-cyan-300 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open sitemap.xml</span>
          </a>
        </div>

        {/* Sitemap Table / Cards */}
        <div className="grid grid-cols-1 gap-3">
          {pages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0e141f] border border-[#202c3f] hover:border-[#30415a] p-4 rounded-xs transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-red-400 shrink-0" />
                    <a
                      href={item.url}
                      onClick={(e) => handleLinkClick(e, item)}
                      className="text-sm font-bold text-white hover:text-red-400 transition-colors cursor-pointer text-left uppercase tracking-wide flex items-center gap-1"
                    >
                      <span>{item.title}</span>
                      {item.isExternal && <ExternalLink className="w-3 h-3 text-[#556982]" />}
                    </a>
                  </div>
                  <p className="text-xs text-[#7d91a9] pl-6">{item.description}</p>
                </div>

                <div className="flex items-center gap-3 pl-6 sm:pl-0 font-mono text-[11px] shrink-0">
                  <span className="text-[#556982] bg-[#141c28] px-2 py-1 border border-[#1e2a3b]">
                    Priority: {item.priority}
                  </span>
                  <a
                    href={item.url}
                    onClick={(e) => handleLinkClick(e, item)}
                    className="text-blue-400 hover:text-blue-300 font-bold cursor-pointer transition-colors"
                  >
                    View &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};
