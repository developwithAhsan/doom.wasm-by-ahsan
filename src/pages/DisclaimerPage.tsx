import React from 'react';
import { PageLayout, NavRoute } from './PageLayout';
import { Scale, AlertCircle, ShieldAlert, Award, FileCheck2 } from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate: (route: NavRoute) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <PageLayout
      currentRoute="disclaimer"
      onNavigate={onNavigate}
      title="Disclaimer & Trademarks"
      subtitle="Intellectual property notices, open-source licensing, and health advisories"
      badge="Official Legal Notice"
    >
      <div className="space-y-6">
        <div className="bg-[#0e141f] border border-amber-800/40 p-4 rounded-xs flex items-start gap-3.5">
          <Scale className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Non-Affiliation &amp; Trademark Attribution
            </h2>
            <p className="text-xs text-[#9bb0c9] leading-relaxed">
              DOOM is a registered trademark of id Software LLC, a ZeniMax Media company / Bethesda / Microsoft.
              This web platform is an independent, non-commercial open-source preservation and educational project.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <Award className="w-4 h-4 text-amber-400" />
            1. Shareware Distribution Legality
          </h2>
          <p>
            The default game file provided by this application is <code>DOOM1.WAD</code> (Episode 1: <em>Knee-Deep in the Dead</em>).
            In December 1993, id Software released Episode 1 under a historic shareware distribution model. The accompanying
            license explicitly granted worldwide authorization to copy, share, distribute, and upload the shareware files
            freely, provided no alterations were made and no fee was charged beyond nominal distribution media costs.
          </p>
          <p>
            Commercial registered episodes (Episode 2: <em>The Shores of Hell</em>, Episode 3: <em>Inferno</em>, and Episode 4:
            <em>Thy Flesh Consumed</em>) are <strong>not hosted or distributed</strong> by this website. Users wishing to
            play registered episodes can load their own legally purchased IWAD files using our local Custom WAD Loader.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            2. GNU General Public License (GPLv2) Engine Source
          </h2>
          <p>
            On December 23, 1997, John Carmack and id Software released the original source code of DOOM to the computing
            community under the GNU General Public License (GPLv2). This historic act of generosity enabled generations of
            computer scientists, hobbyists, and game preservationists to port and study the engine.
          </p>
          <p>
            This website compiles the open-source <code>doomgeneric</code> implementation—a cross-platform ANSI C abstraction layer—into
            WebAssembly bytecode for execution inside modern browser sandboxes.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            3. Photosensitive Seizure Warning
          </h2>
          <p>
            A very small percentage of individuals may experience epileptic seizures or blackouts when exposed to certain
            visual light patterns or flashing lights. Certain patterns or backgrounds on a computer screen or while playing
            video games may induce epileptic symptoms even in persons who have no history of prior seizures or epilepsy.
          </p>
          <p className="text-[#e2e8f0] bg-red-950/20 border border-red-800/40 p-3 rounded-xs font-mono text-xs">
            WARNING: If you experience dizziness, altered vision, eye or muscle twitches, loss of awareness, disorientation,
            or any involuntary movement while playing, IMMEDIATELY discontinue use and consult your physician before resuming play.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <AlertCircle className="w-4 h-4 text-blue-400" />
            4. DMCA &amp; Takedown Inquiries
          </h2>
          <p>
            We take intellectual property rights with the utmost seriousness. If you are a copyright owner or legal agent
            thereof and believe that any content hosted on this domain infringes upon your copyrighted materials, please send
            a written notice containing verification of ownership and the specific URL to:
          </p>
          <p className="font-mono text-xs text-blue-400 bg-[#0e141f] border border-[#202c3f] p-3">
            Email: dmca@doom-wasm.project &bull; Subject: DMCA Takedown Request
          </p>
        </section>
      </div>
    </PageLayout>
  );
};
