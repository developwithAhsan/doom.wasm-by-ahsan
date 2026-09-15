import React from 'react';
import { PageLayout, NavRoute } from './PageLayout';
import { ShieldCheck, CheckCircle2, Lock, Database, EyeOff, ServerOff } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (route: NavRoute) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <PageLayout
      currentRoute="privacy"
      onNavigate={onNavigate}
      title="Privacy Policy"
      subtitle="Last revised: September 15, 2026 • Effective immediately"
      badge="Zero Telemetry Standard"
    >
      <div className="space-y-6">
        {/* Highlight Banner */}
        <div className="bg-[#0e141f] border border-emerald-800/40 p-4 rounded-xs flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              100% Client-Side Privacy Guarantee
            </h2>
            <p className="text-xs text-[#9bb0c9] leading-relaxed">
              Doom WebAssembly is engineered from the ground up to protect your privacy. We do not collect,
              record, store, share, monetize, or transmit any personal data, keystrokes, save files, or network
              telemetry to any remote server.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            1. Information We Never Collect
          </h2>
          <p>
            When you visit and interact with this website, we operate under a strict zero-knowledge architecture.
            Specifically:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#7d91a9]">
            <li>
              <strong>No Account Registration:</strong> You do not need to register, create an account, or provide
              an email address or personal credentials to play.
            </li>
            <li>
              <strong>No Telemetry or Analytics:</strong> We do not load Google Analytics, Facebook Pixel, tracking
              scripts, or third-party behavioral heatmaps.
            </li>
            <li>
              <strong>No Gameplay Surveillance:</strong> Your weapon selections, movements, framerate metrics, and
              game completions are processed solely in your computer&apos;s volatile RAM.
            </li>
            <li>
              <strong>No Hardware Fingerprinting:</strong> We do not inspect your device canvas hashes, audio
              fingerprints, or operating system serial numbers.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <Database className="w-4 h-4 text-blue-400" />
            2. Local Browser Storage &amp; Game Saves
          </h2>
          <p>
            To deliver an authentic 1993 DOOM experience with save and load state capabilities, our WebAssembly engine
            utilizes your browser&apos;s isolated <code>HTML5 LocalStorage</code> partition:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono my-2">
            <div className="bg-[#0e141f] border border-[#202c3f] p-3">
              <span className="text-white font-bold block mb-1">Save State Slots 1&ndash;6</span>
              <span className="text-[#556982]">Base64 serialized game memory states saved locally in your own browser cache. Never synced to the cloud.</span>
            </div>
            <div className="bg-[#0e141f] border border-[#202c3f] p-3">
              <span className="text-white font-bold block mb-1">Engine Configuration</span>
              <span className="text-[#556982]">Your selected FPS limit preferences (35 FPS, 60 FPS, or Unlocked) stored under key preferences.</span>
            </div>
          </div>
          <p>
            You possess 100% control over this data. You can inspect or purge all stored slots at any moment by using the
            in-game <strong>Save Manager</strong> or by clearing your browser cache.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <ServerOff className="w-4 h-4 text-amber-400" />
            3. Custom WAD File Processing
          </h2>
          <p>
            When utilizing the built-in Custom WAD Loader to load community levels or commercial expansion packs (such as
            <em>DOOM II: Hell on Earth</em> or John Romero&apos;s <em>SIGIL</em>), your files are processed entirely via
            the client-side JavaScript <code>FileReader</code> API and mounted directly into the WebAssembly heap.
          </p>
          <p className="text-amber-300/90 font-mono text-xs bg-amber-950/20 border border-amber-800/40 p-3 rounded-xs">
            Notice: Your custom WAD files never leave your computer. They are never uploaded, staged, cached, or
            transmitted across the internet to any server.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            4. Cookies &amp; Tracking Technologies
          </h2>
          <p>
            This website does not employ marketing cookies, retargeting pixels, or third-party advertising beacons.
            Essential network cookies are limited strictly to TLS session routing established by standard cloud
            infrastructure for secure HTTPS transport.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            5. GDPR, CCPA, and Global Privacy Rights
          </h2>
          <p>
            Under the European Union General Data Protection Regulation (GDPR), the California Consumer Privacy Act
            (CCPA/CPRA), and related international privacy legislation, individuals retain statutory rights to inspect,
            rectify, port, and delete personal data held by service operators.
          </p>
          <p>
            Because Doom WebAssembly maintains no user database, logs no IP addresses, and retains zero identifiable
            data, there is no personal data record in our custody to query or delete. Your data privacy is guaranteed
            mathematically by our decentralized, client-only execution model.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            6. Contact &amp; Privacy Officer
          </h2>
          <p>
            For questions or technical inquiries regarding the client-side architecture or privacy safeguards of this
            open-source project, you can contact the project maintainers via our repository or by emailing{' '}
            <code className="text-blue-400 font-mono">privacy@doom-wasm.project</code>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};
