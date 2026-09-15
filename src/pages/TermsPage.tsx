import React from 'react';
import { PageLayout, NavRoute } from './PageLayout';
import { FileText, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (route: NavRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <PageLayout
      currentRoute="terms"
      onNavigate={onNavigate}
      title="Terms of Service"
      subtitle="Effective Date: September 15, 2026 • Governing Terms for Doom WebAssembly"
      badge="Open Source & Free Use"
    >
      <div className="space-y-6">
        <div className="bg-[#0e141f] border border-blue-800/40 p-4 rounded-xs flex items-start gap-3.5">
          <FileText className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Acceptance &amp; Summary of Terms
            </h2>
            <p className="text-xs text-[#9bb0c9] leading-relaxed">
              By launching, accessing, or playing Doom WebAssembly, you agree to comply with these terms.
              This platform is offered completely free of charge for non-commercial educational, research, and
              historical gaming appreciation.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            1. Authorized &amp; Permitted Use
          </h2>
          <p>
            Doom WebAssembly is provided for personal entertainment, digital preservation, and computer science
            demonstrations of modern WebAssembly and Web Audio browser capabilities. You are granted a personal,
            non-exclusive, revocable, non-transferable license to execute and play the game in your personal web browser.
          </p>
          <ul className="list-disc list-inside space-y-1 text-[#7d91a9] pl-2">
            <li>You may not charge fees or demand payment for access to this site or its WebAssembly components.</li>
            <li>You may not bundle this web app within deceptive adware wrappers or monetized iframe wrappers.</li>
            <li>You may not conduct automated denial-of-service tests or malicious resource exhaustion attacks against our hosting infrastructure.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            2. User Responsibilities for Custom WAD Files
          </h2>
          <p>
            Our web platform features a Custom WAD Loader enabling users to load external data packages (such as
            commercial IWADs or community-created PWADs) into their local browser memory table:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-[#7d91a9] pl-2">
            <li>
              <strong>Lawful Ownership:</strong> You certify and warrant that you hold legitimate commercial license or
              ownership rights to any commercial WAD file (e.g., <em>DOOM II</em>, <em>Final DOOM</em>, or
              <em>Master Levels</em>) that you choose to load into your browser.
            </li>
            <li>
              <strong>Mod Author Respect:</strong> When loading community PWAD map packs, you agree to respect the
              author licensing terms and non-commercial attribution guidelines specified by the respective creators.
            </li>
            <li>
              <strong>Prohibited Content:</strong> You agree not to attempt to inject malicious code, corrupt binaries,
              or unlawful media through the local browser file loader interface.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            3. Content &amp; Age Advisory (ESRB M 17+)
          </h2>
          <p>
            The original 1993 release of DOOM was rated <strong>M (Mature)</strong> by the Entertainment Software
            Rating Board (ESRB) for animated pixel violence, blood depictions, and dark fantasy demonic themes.
            While presented in nostalgic 16-bit retro graphics, parental guidance is advised for young players.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            4. Warranty Disclaimer (&quot;AS-IS&quot;)
          </h2>
          <p className="text-xs font-mono uppercase text-[#7d91a9]">
            THE SOFTWARE AND THIS WEB PLATFORM ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS,
            WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS,
            CONTRIBUTORS, OR HOSTING PROVIDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY ARISING FROM OR OUT
            OF THE USE OF THIS SOFTWARE.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#202c3f] pb-2">
            5. Modifications to Terms
          </h2>
          <p>
            We reserve the right to revise or update these Terms of Service at any time. The date of the most recent
            revision will always be displayed at the top of this document. Continued usage of Doom WebAssembly following
            updates indicates binding acceptance of revised terms.
          </p>
        </section>
      </div>
    </PageLayout>
  );
};
