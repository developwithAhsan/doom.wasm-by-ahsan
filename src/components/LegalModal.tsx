import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle, FileText, Lock, Scale, CheckCircle2 } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  initialDoc?: LegalDocType;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialDoc = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);

  // Sync tab if initialDoc changes when opening
  React.useEffect(() => {
    if (isOpen && initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [isOpen, initialDoc]);

  if (!isOpen) return null;

  return (
    <div
      id="doom-legal-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="doom-legal-modal-card"
        className="relative w-full max-w-3xl bg-[#141c28] border border-[#232e42] shadow-2xl overflow-hidden my-auto text-[#9bb0c9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0e141f] border-b border-[#202c3f]">
          <div className="flex items-center gap-2.5">
            {activeTab === 'privacy' && <Lock className="w-5 h-5 text-emerald-400" />}
            {activeTab === 'terms' && <FileText className="w-5 h-5 text-blue-400" />}
            {activeTab === 'disclaimer' && <AlertCircle className="w-5 h-5 text-amber-400" />}
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                {activeTab === 'privacy' && 'Privacy Policy'}
                {activeTab === 'terms' && 'Terms of Service'}
                {activeTab === 'disclaimer' && 'Legal Disclaimer & Trademark Notice'}
              </h2>
              <p className="text-[11px] text-[#556982] font-mono">
                Last Updated &amp; Effective: September 15, 2026
              </p>
            </div>
          </div>
          <button
            id="close-legal-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#556982] hover:text-white hover:bg-[#1a2536] rounded-xs transition-colors cursor-pointer"
            aria-label="Close legal modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#202c3f] bg-[#111722] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`flex-1 py-2.5 px-4 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'privacy'
                ? 'border-emerald-500 text-white bg-[#16202e]'
                : 'border-transparent text-[#7d91a9] hover:text-white hover:bg-[#141c28]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`flex-1 py-2.5 px-4 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'terms'
                ? 'border-blue-500 text-white bg-[#16202e]'
                : 'border-transparent text-[#7d91a9] hover:text-white hover:bg-[#141c28]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms of Service</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`flex-1 py-2.5 px-4 text-center transition-colors border-b-2 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'disclaimer'
                ? 'border-amber-500 text-white bg-[#16202e]'
                : 'border-transparent text-[#7d91a9] hover:text-white hover:bg-[#141c28]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Disclaimer</span>
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-6 text-xs leading-relaxed font-sans select-text">
          {/* ==================== PRIVACY POLICY ==================== */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="bg-[#0e141f] border border-[#202c3f] p-3.5 rounded-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Summary: 100% Client-Side Privacy</h4>
                  <p className="text-[#7d91a9] text-[11px] mt-0.5">
                    This website does not collect, sell, store, or transmit your personal data. All game execution,
                    WebAssembly processing, and save game persistence happen entirely inside your web browser sandbox.
                  </p>
                </div>
              </div>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">1. Information We Do Not Collect</h3>
                <p>
                  We operate under a strict privacy-first architecture. When you visit this website and play Doom WebAssembly:
                </p>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#7d91a9] pl-2">
                  <li>We do <strong>not</strong> require user registration, email addresses, or login accounts.</li>
                  <li>We do <strong>not</strong> track your IP address, geolocation, or hardware serial identifiers.</li>
                  <li>We do <strong>not</strong> log your keystrokes, game inputs, play session durations, or gameplay scores on any remote server.</li>
                  <li>We do <strong>not</strong> employ third-party advertising trackers, cross-site beacons, or pixel monitoring scripts.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">2. Local Storage and Client-Side Data</h3>
                <p>
                  To provide game save and load features, this application uses standard HTML5 <code>LocalStorage</code> and in-memory WebAssembly heap buffers:
                </p>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#7d91a9] pl-2">
                  <li>Save game files (Slots 1–6) are encoded as base64 strings and stored strictly within your local browser partition.</li>
                  <li>Configuration preferences (such as framerate limit targets) are stored locally in your browser.</li>
                  <li>You can completely wipe all stored game data at any time via your browser settings or using the in-app Save Manager.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">3. Custom WAD File Processing</h3>
                <p>
                  When you utilize the Custom WAD Loader feature to play your own DOOM levels or modifications, your chosen file is read into your browser&apos;s local memory using the client-side JavaScript <code>FileReader</code> API. Your files are never transmitted to, inspected by, or uploaded to any external server.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">4. Cookies and Tracking Technologies</h3>
                <p>
                  Doom WebAssembly does not set HTTP tracking cookies or persistent advertising identifiers. Essential runtime cookies may only be utilized by the hosting infrastructure (such as Cloud Run or reverse-proxy routing layers) strictly for TLS handshake security and packet delivery.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">5. GDPR and CCPA / CPRA Compliance</h3>
                <p>
                  Because we collect zero personal data, there is no personal data profile to access, rectify, port, or delete from our servers under the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA). All user-created game data resides exclusively under your direct physical and cryptographic custody on your personal computing device.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">6. Contact Information</h3>
                <p>
                  If you have any questions or privacy inquiries regarding this open-source WebAssembly implementation, please contact the maintainers via the GitHub project repository or email us at <code>privacy@doom-wasm.project</code>.
                </p>
              </section>
            </div>
          )}

          {/* ==================== TERMS OF SERVICE ==================== */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">1. Agreement to Terms</h3>
                <p>
                  By accessing, browsing, or playing on this website (&quot;Doom WebAssembly&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">2. Permitted Use &amp; Non-Commercial Educational Purpose</h3>
                <p>
                  Doom WebAssembly is provided free of charge strictly for personal entertainment, historical preservation, retro gaming research, and educational demonstration of modern WebAssembly and Web Audio browser capabilities. You agree not to exploit this website for commercial resale, deceptive framing, or illicit distribution.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">3. User Responsibilities for Custom WAD Files</h3>
                <p>
                  The website includes a Custom WAD Loader enabling users to load external game data packages into their browser:
                </p>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-[#7d91a9] pl-2">
                  <li>You warrant that you hold legitimate ownership or license rights to any commercial WAD file (such as DOOM II: Hell on Earth, Final DOOM, or Master Levels) that you upload into your browser.</li>
                  <li>You must respect the licensing agreements and terms established by original content creators and community modders.</li>
                  <li>You agree not to load or distribute malicious scripts, harmful payloads, or unlawful materials through the file loader.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">4. Content and Age Advisory</h3>
                <p>
                  DOOM (1993) contains classic 16-bit retro fantasy violence, animated demon depictions, and sci-fi weaponry originally rated &quot;M&quot; (Mature) by the ESRB. Parental discretion is advised for young audiences.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">5. Disclaimer of Warranties &amp; Limitation of Liability</h3>
                <p>
                  The website and software are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind, whether express or implied. Under no circumstances shall the operators, contributors, or hosting providers be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use this software.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">6. Modifications to Service</h3>
                <p>
                  We reserve the right to modify, suspend, or update these terms and the website features at any time without prior notice. Continued use of the site constitutes your acceptance of any revisions.
                </p>
              </section>
            </div>
          )}

          {/* ==================== DISCLAIMER ==================== */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4">
              <div className="bg-[#0e141f] border border-[#202c3f] p-3.5 rounded-xs flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Trademark &amp; Intellectual Property Notice</h4>
                  <p className="text-[#7d91a9] text-[11px] mt-0.5">
                    DOOM is a registered trademark of id Software LLC, a ZeniMax Media company / Bethesda / Microsoft.
                    This web application is an independent, non-commercial open-source preservation effort.
                  </p>
                </div>
              </div>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">1. Shareware Distribution Legality</h3>
                <p>
                  The default game asset provided by this application is <code>DOOM1.WAD</code> (Episode 1: <em>Knee-Deep in the Dead</em>). In December 1993, id Software released this episode under a shareware distribution license, granting worldwide permission to freely copy, share, upload, and distribute the shareware version for non-commercial evaluation. Commercial episodes (Episodes 2, 3, and 4) are not hosted by this website.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">2. Open-Source Engine Licensing</h3>
                <p>
                  In December 1997, John Carmack and id Software released the source code of DOOM to the public under the GNU General Public License (GPLv2). This web application utilizes <code>doomgeneric</code>, a portable ANSI C port of DOOM designed to interface with modern platform environments including WebAssembly (Wasm).
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">3. Non-Affiliation Statement</h3>
                <p>
                  This project is not affiliated with, endorsed by, sponsored by, or associated with id Software, ZeniMax Media, Bethesda Softworks, or Microsoft Corporation. All trademarks, registered logos, game assets, and character concepts belong to their respective copyright holders.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">4. Health, Photosensitivity &amp; Epilepsy Warning</h3>
                <p>
                  A small percentage of individuals may experience epileptic seizures or lightheadedness when exposed to certain flashing lights, strobing visual patterns, or rapid 3D camera rotations. If you experience dizziness, altered vision, eye or muscle twitches, or involuntary movements while playing DOOM, immediately discontinue gameplay and consult a medical professional.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-1.5 uppercase tracking-wider">5. DMCA &amp; Content Takedown Procedure</h3>
                <p>
                  If you are a copyright owner or legal representative and believe that any material on this site infringes upon your rights, please submit a formal notification with identification of the copyrighted work to <code>dmca@doom-wasm.project</code>. We promptly review and resolve all valid intellectual property inquiries.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0e141f] border-t border-[#202c3f] text-xs">
          <span className="text-[#556982] font-mono text-[11px]">
            Doom WebAssembly &bull; Free &amp; Open Source
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1a2536] hover:bg-[#233147] text-white font-bold text-xs uppercase tracking-wider border border-[#2b3a52] rounded-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
