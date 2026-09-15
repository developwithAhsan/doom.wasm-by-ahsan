import React from 'react';
import { PageLayout, NavRoute } from './PageLayout';
import { FileCode, CheckCircle2, ExternalLink, Bot, ShieldCheck, Sparkles } from 'lucide-react';

interface RobotsPageProps {
  onNavigate: (route: NavRoute) => void;
}

export const RobotsPage: React.FC<RobotsPageProps> = ({ onNavigate }) => {
  const robotsRaw = `User-agent: *
Allow: /

# Canonical Sitemap
Sitemap: https://ais-pre-kyojypevp5nnddqzgnttsh-65167605087.asia-east1.run.app/sitemap.xml`;

  return (
    <PageLayout
      currentRoute="robots"
      onNavigate={onNavigate}
      title="Robots.txt & Crawler Directives"
      subtitle="Search engine indexing instructions for Googlebot, Bingbot, and automated crawlers"
      badge="Index & Follow Enabled"
    >
      <div className="space-y-6">
        {/* Banner */}
        <div className="bg-[#0e141f] border border-emerald-800/40 p-4 rounded-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Full Crawler Access Granted
              </h2>
              <p className="text-xs text-[#7d91a9]">
                All search engines are permitted to index every public section of this website.
              </p>
            </div>
          </div>

          <a
            href="/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/70 text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Raw /robots.txt</span>
          </a>
        </div>

        {/* Code Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#7d91a9]">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Live Output of /robots.txt
            </span>
            <span className="text-[#556982]">RFC 9309 Compliant</span>
          </div>

          <div className="bg-[#0b0f17] border border-[#232e42] p-4 rounded-xs font-mono text-xs text-emerald-400 overflow-x-auto select-all">
            <pre className="whitespace-pre">{robotsRaw}</pre>
          </div>
        </div>

        {/* Explanation Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Directive Breakdown &amp; SEO Impact
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#0e141f] border border-[#202c3f] p-3.5 space-y-1">
              <span className="text-amber-400 font-bold block">User-agent: *</span>
              <p className="text-[#7d91a9] font-sans">
                Applies to all compliant web crawlers, including Googlebot, Bingbot, DuckDuckBot, and Baiduspider.
              </p>
            </div>

            <div className="bg-[#0e141f] border border-[#202c3f] p-3.5 space-y-1">
              <span className="text-emerald-400 font-bold block">Allow: /</span>
              <p className="text-[#7d91a9] font-sans">
                Authorizes crawling of all root and sub-pages, stylesheets, images, scripts, and WebAssembly packages.
              </p>
            </div>

            <div className="bg-[#0e141f] border border-[#202c3f] p-3.5 space-y-1">
              <span className="text-cyan-400 font-bold block">Sitemap: URL</span>
              <p className="text-[#7d91a9] font-sans">
                Explicitly points search crawlers to our structured XML sitemap for instantaneous indexing.
              </p>
            </div>
          </div>
        </div>

        {/* Indexing status */}
        <div className="bg-[#0e141f] border border-[#202c3f] p-4 space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Google Indexing Checklist
          </h3>
          <ul className="space-y-1.5 text-xs text-[#9bb0c9]">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero crawl-delay throttling allows real-time crawler parsing.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Canonical link header declared on all pages to avoid duplicate content flags.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Valid Schema.org VideoGame and FAQPage structured JSON-LD embedded for search snippets.</span>
            </li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};
