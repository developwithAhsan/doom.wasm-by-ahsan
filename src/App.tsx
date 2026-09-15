import React, { useRef, useState, useEffect } from 'react';
import { useDoomEngine } from './hooks/useDoomEngine';
import { GameLauncherCard } from './components/GameLauncherCard';
import { GameCanvas } from './components/GameCanvas';
import { ControlsModal } from './components/ControlsModal';
import { WadLoaderModal } from './components/WadLoaderModal';
import { EngineConsoleModal } from './components/EngineConsoleModal';
import { SavesModal } from './components/SavesModal';
import { InGameHud } from './components/InGameHud';
import { LoadingScreen } from './components/LoadingScreen';
import { ContentSections } from './components/ContentSections';
import { NavRoute } from './pages/PageLayout';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { SitemapPage } from './pages/SitemapPage';
import { RobotsPage } from './pages/RobotsPage';

type ViewMode = 'launcher' | 'loading' | 'playing';

function getRouteFromLocation(): NavRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '';
  const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '') || '';

  if (path === '/privacy' || hash === 'privacy') return 'privacy';
  if (path === '/terms' || hash === 'terms') return 'terms';
  if (path === '/disclaimer' || hash === 'disclaimer') return 'disclaimer';
  if (path === '/sitemap' || hash === 'sitemap') return 'sitemap';
  if (path === '/robots' || hash === 'robots') return 'robots';
  return 'home';
}

export const App: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);

  const {
    status,
    errorMessage,
    stats,
    logs,
    customWad,
    fpsLimit,
    setFpsLimit,
    loadingProgress,
    loadingStage,
    currentFile,
    isInitialized,
    startEngine,
    togglePause,
    restartEngine,
    loadCustomWad,
  } = useDoomEngine(canvasRef);

  const [currentRoute, setCurrentRoute] = useState<NavRoute>(getRouteFromLocation);
  const [viewMode, setViewMode] = useState<ViewMode>('launcher');
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isWadLoaderOpen, setIsWadLoaderOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isSavesOpen, setIsSavesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Listen to browser forward/back buttons and hash changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route: NavRoute) => {
    setCurrentRoute(route);
    const targetPath = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOrResumeGame = async () => {
    if (isInitialized) {
      if (status === 'paused') {
        togglePause();
      }
      setViewMode('playing');
      setTimeout(() => {
        canvasRef.current?.focus();
      }, 150);
      return;
    }

    // Launch loading sequence
    setViewMode('loading');
    await startEngine();

    // After engine start completes
    setViewMode('playing');
    setTimeout(() => {
      canvasRef.current?.focus();
    }, 200);
  };

  const handleExitToMenu = () => {
    if (status === 'running') {
      togglePause();
    }
    setViewMode('launcher');
  };

  const handleCycleFpsLimit = () => {
    setFpsLimit((prev) => {
      if (prev === 0) return 60;
      if (prev === 60) return 35;
      return 0;
    });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mainContainerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // ============================================================================
  // SEPARATE DEDICATED PAGES (Privacy, Terms, Disclaimer, Sitemap, Robots)
  // Not shown on Home page, accessible via their own routes and links!
  // ============================================================================
  if (currentRoute === 'privacy') {
    return <PrivacyPage onNavigate={navigateTo} />;
  }
  if (currentRoute === 'terms') {
    return <TermsPage onNavigate={navigateTo} />;
  }
  if (currentRoute === 'disclaimer') {
    return <DisclaimerPage onNavigate={navigateTo} />;
  }
  if (currentRoute === 'sitemap') {
    return <SitemapPage onNavigate={navigateTo} />;
  }
  if (currentRoute === 'robots') {
    return <RobotsPage onNavigate={navigateTo} />;
  }

  // ============================================================================
  // HOME / GAMEPLAY VIEW
  // ============================================================================
  return (
    <div
      ref={mainContainerRef}
      id="doom-page-root"
      className="min-h-screen bg-[#0e131b] text-zinc-100 flex flex-col items-center justify-start selection:bg-blue-600 selection:text-white"
    >
      {/* 1. LOADING SCREEN OVERLAY (Shown when user clicks Start / Install) */}
      {viewMode === 'loading' && (
        <LoadingScreen
          progress={loadingProgress}
          stageLabel={loadingStage}
          currentFile={currentFile}
        />
      )}

      {/* 2. LAUNCHER VIEW (Shown initially — Game Canvas is completely hidden, NOT showing in behind!) */}
      {viewMode === 'launcher' && (
        <div
          id="doom-launcher-view"
          className="w-full flex flex-col items-center px-3 sm:px-6 py-8"
        >
          {/* Header Display Title matching screenshot typography */}
          <header className="w-full flex flex-col items-center justify-center pt-2 pb-6">
            <h1
              id="app-main-title"
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-wider text-white uppercase text-center font-sans drop-shadow-sm select-none"
            >
              DOOM
            </h1>
          </header>

          {/* Launcher Card matching screenshot layout */}
          <div className="w-full flex justify-center mb-4">
            <GameLauncherCard
              status={status}
              fpsLimit={fpsLimit}
              onChangeFpsLimit={setFpsLimit}
              onStartOrResumeGame={handleStartOrResumeGame}
              onOpenSaveManager={() => setIsSavesOpen(true)}
              onToggleFullscreen={handleToggleFullscreen}
              isFullscreen={isFullscreen}
            />
          </div>

          {/* Content sections below card (About Story Blog, Controls, Specs, FAQ) */}
          <ContentSections
            onOpenControls={() => setIsControlsOpen(true)}
            onOpenWadLoader={() => setIsWadLoaderOpen(true)}
            onOpenSaveManager={() => setIsSavesOpen(true)}
          />

          {/* Professional Clean Footer with Dedicated Separate Links */}
          <footer
            id="site-footer"
            className="w-full max-w-4xl mt-14 pt-8 pb-12 border-t border-[#1e2a3b] text-xs font-mono text-[#7d91a9] space-y-4 select-text"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="text-white font-bold tracking-wide">DOOM WebAssembly Edition (1993–2026)</div>
                <p className="text-[11px] text-[#556982]">
                  Original Game &copy; id Software LLC / ZeniMax / Bethesda / Microsoft. Pure client-side Wasm runtime.
                </p>
              </div>

              {/* Navigation to Separate Pages with their own links */}
              <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('privacy');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <span className="text-[#33445c]">&bull;</span>
                <a
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('terms');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <span className="text-[#33445c]">&bull;</span>
                <a
                  href="/disclaimer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('disclaimer');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
                <span className="text-[#33445c]">&bull;</span>
                <a
                  href="/sitemap"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('sitemap');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Sitemap
                </a>
                <span className="text-[#33445c]">&bull;</span>
                <a
                  href="/robots"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('robots');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Robots.txt
                </a>
              </nav>
            </div>

            <div className="pt-2 border-t border-[#162130] flex flex-wrap items-center justify-between text-[11px] text-[#485970]">
              <span>Zero tracking cookies &bull; GDPR &amp; CCPA compliant &bull; Instant browser play</span>
              <span>Compiled via Emscripten &amp; doomgeneric</span>
            </div>
          </footer>
        </div>
      )}

      {/* 3. PLAYING VIEW & HIDDEN CANVAS DOM MOUNT
          Notice: The canvas MUST be mounted in the DOM so canvasRef.current exists during loading,
          but when viewMode !== 'playing', it has className="hidden", so it NEVER shows in behind!
      */}
      <div
        id="doom-game-container"
        className={
          viewMode === 'playing'
            ? 'w-full max-w-5xl flex flex-col items-center px-2 sm:px-4 py-4 min-h-screen justify-center'
            : 'hidden'
        }
      >
        {/* In-Game Top Bar: ONLY Fullscreen and FPS buttons */}
        <InGameHud
          fps={stats.fps}
          fpsLimit={fpsLimit}
          isFullscreen={isFullscreen}
          onExitToMenu={handleExitToMenu}
          onToggleFullscreen={handleToggleFullscreen}
          onCycleFpsLimit={handleCycleFpsLimit}
        />

        {/* The Game Canvas */}
        <GameCanvas
          canvasRef={canvasRef}
          status={status}
          errorMessage={errorMessage}
          onRestart={restartEngine}
          onTogglePause={togglePause}
        />
      </div>

      {/* Global Modals (Accessible from both launcher and game view) */}
      <ControlsModal isOpen={isControlsOpen} onClose={() => setIsControlsOpen(false)} />
      <WadLoaderModal
        isOpen={isWadLoaderOpen}
        onClose={() => setIsWadLoaderOpen(false)}
        customWad={customWad}
        onLoadWad={loadCustomWad}
      />
      <EngineConsoleModal isOpen={isConsoleOpen} onClose={() => setIsConsoleOpen(false)} logs={logs} />
      <SavesModal isOpen={isSavesOpen} onClose={() => setIsSavesOpen(false)} />
    </div>
  );
};

export default App;
