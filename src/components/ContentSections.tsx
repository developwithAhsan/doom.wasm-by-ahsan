import React, { useState } from 'react';
import {
  Shield,
  Cpu,
  HardDrive,
  Keyboard,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
} from 'lucide-react';

interface ContentSectionsProps {
  onOpenControls: () => void;
  onOpenWadLoader: () => void;
  onOpenSaveManager: () => void;
}

export const ContentSections: React.FC<ContentSectionsProps> = ({
  onOpenControls,
  onOpenWadLoader,
  onOpenSaveManager,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: 'What is Doom WebAssembly and how does it run in the browser?',
      a: 'Doom WebAssembly is an authentic, pure client-side port of id Software\'s original 1993 first-person shooter DOOM. Instead of using heavy cloud streaming or third-party emulator plugins, this port compiles the original C source code into a compact WebAssembly (WASM) binary using doomgeneric. The WebAssembly runtime executes at near-native CPU speeds directly inside your web browser sandbox, utilizing HTML5 Canvas for real-time raster rendering and the Web Audio API for sound effects and music synthesis.',
    },
    {
      q: 'Is playing DOOM in the web browser legal and free?',
      a: 'Yes, 100% legal and free. This application distributes the official shareware release of Episode 1: Knee-Deep in the Dead (DOOM1.WAD). On December 10, 1993, id Software released this nine-level episode under a shareware distribution license, allowing global, non-commercial copying and sharing. Furthermore, John Carmack released the original DOOM source code under the GNU General Public License (GPLv2) in 1997, enabling open-source research and modern ports.',
    },
    {
      q: 'Can I load my own commercial DOOM II, Final DOOM, or community PWAD mods?',
      a: 'Absolutely! Our built-in Custom WAD Loader allows you to drag-and-drop or select any valid .wad file from your device. Whether you own commercial IWADs (like DOOM2.WAD, TNT.WAD, or PLUTONIA.WAD) or community PWAD map packs (such as John Romero\'s SIGIL, Scythe, or Alien Vendetta), the engine mounts your file into the WebAssembly virtual memory table and boots your custom levels instantly without uploading anything to a remote server.',
    },
    {
      q: 'How do game saves work and will my progress be saved if I close the tab?',
      a: 'Your game saves are automatically serialized and safely stored inside your browser\'s local HTML5 LocalStorage partition. The application provides 6 independent save slots that persist indefinitely across browser restarts and page refreshes. You can also review, inspect, and manage your stored game slots anytime via the built-in Save Manager.',
    },
    {
      q: 'Does this Doom WebAssembly port collect or track any user data?',
      a: 'No. We adhere to a strict zero-telemetry policy. There are no tracking pixels, analytics cookies, remote database logs, or user registration requirements. All gameplay, inputs, save states, and custom WAD uploads execute strictly on your device inside your browser sandbox.',
    },
    {
      q: 'What are the default keyboard and mouse controls for DOOM?',
      a: 'Movement is handled via WASD or Arrow Keys. Fire your weapon using Ctrl or Left Mouse Click. Interact with doors, switches, and secret walls using the Spacebar. Cycle through your 7 weapons using numbers 1 through 7. Hold Shift to speed-run, and press Escape to open or close the in-game options menu.',
    },
    {
      q: 'Does Doom WebAssembly run on mobile phones, tablets, and Chromebooks?',
      a: 'Yes. The engine is fully responsive and compatible across desktop PCs, Macs, Linux workstations, Chromebooks, iPhones, iPads, and Android smartphones. Any modern browser that supports standard WebAssembly and Web Audio API will run the game smoothly.',
    },
    {
      q: 'How does framerate target switching work (35 FPS vs 60 FPS vs Unlocked)?',
      a: 'The original 1993 DOOM engine was mathematically hardcoded to run its game logic loop at exactly 35 ticks per second (35 Hz). Our WebAssembly port allows you to switch between authentic 35 FPS locking, smooth 60 FPS sync, or an Unlocked mode that utilizes your monitor\'s native requestAnimationFrame refresh rate (up to 144Hz/240Hz). You can toggle this limit directly from the launcher card or the in-game HUD.',
    },
  ];

  return (
    <div className="w-full max-w-4xl mt-12 space-y-10 text-[#7d91a9] text-sm">
      {/* ========================================================================= */}
      {/* SECTION: LONG HUMANIZED SEO BLOG / ABOUT DOOM (1993) */}
      {/* ========================================================================= */}
      <article
        id="about"
        className="bg-[#141c28] border border-[#232e42] p-6 sm:p-8 space-y-6 shadow-2xl"
      >
        <header className="border-b border-[#202c3f] pb-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-blue-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Retrospective &bull; Game Engine History &bull; WebAssembly Port</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider font-sans">
            The Legend of DOOM: How John Carmack &amp; id Software Revolutionized Gaming
          </h2>
          <p className="text-xs text-[#556982] font-mono mt-1">
            Published for digital preservation &bull; 10-minute deep dive into 1993 graphics engineering &amp; Wasm porting
          </p>
        </header>

        {/* Blog Chapter 1 */}
        <div className="space-y-3 leading-relaxed text-[#9bb0c9]">
          <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            1. The Midnight Revolution of December 10, 1993
          </h3>
          <p>
            In late 1993, a tiny band of rogue coders, artists, and sound designers working out of Mesquite, Texas,
            released a game that would not merely dominate the fledgling personal computer industry—it would permanently
            alter the trajectory of digital entertainment. Led by lead programmer <strong>John Carmack</strong>, game
            designer <strong>John Romero</strong>, artist <strong>Adrian Carmack</strong>, and designer <strong>Tom Hall</strong>,
            id Software unleashed <em>DOOM</em> upon the world.
          </p>
          <p>
            When the shareware episode, <em>Knee-Deep in the Dead</em>, was uploaded to the University of Wisconsin&apos;s
            FTP servers at midnight on December 10, the sheer volume of simultaneous incoming connections crashed campus
            networks across North America. Within weeks, network administrators at Intel, Lotus, and Microsoft were forced
            to write custom scripts to purge multi-player &quot;deathmatch&quot; packets that were overwhelming corporate
            local area networks.
          </p>
        </div>

        {/* Blog Chapter 2 */}
        <div className="space-y-3 leading-relaxed text-[#9bb0c9]">
          <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            2. The Mathematical Miracle: Binary Space Partitioning (BSP)
          </h3>
          <p>
            Before DOOM, 3D computer graphics were either excruciatingly sluggish wireframes or primitive raycasters like
            <em>Wolfenstein 3D</em>, where every room had to be a uniform grid with 90-degree orthogonal walls and identical
            ceiling heights. John Carmack recognized that running a true 3D game on a 33-MHz Intel 486 processor with only
            4 megabytes of RAM required an entirely new mathematical paradigm.
          </p>
          <p>
            His solution was <strong>Binary Space Partitioning (BSP)</strong>. By mathematically pre-computing the entire 2D map
            structure into a specialized binary tree during map compilation, the rendering engine could eliminate the costly
            hidden-surface removal problem. During runtime, the engine traversed the BSP tree from the player&apos;s camera position
            in linear time $O(N)$, guaranteeing that walls, floors, and ceilings were drawn front-to-back without ever rendering a
            single occluded pixel twice.
          </p>
          <p>
            This breakthrough unlocked architectural complexity previously thought impossible on personal computers: non-orthogonal
            walls at any angle, towering outdoor courtyards, flickering strobe lights, crushing ceilings, dynamic elevators, and
            sinister toxic slime hazards.
          </p>
        </div>

        {/* Blog Chapter 3 */}
        <div className="space-y-3 leading-relaxed text-[#9bb0c9]">
          <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            3. WebAssembly (WASM): Breathing New Life Into Classic C
          </h3>
          <p>
            For decades, playing DOOM required installing MS-DOS emulators like DOSBox, downloading heavy native binaries, or
            installing bloated browser plugins. Today, this web port leverages <strong>WebAssembly (Wasm)</strong> and the
            open-source <code>doomgeneric</code> interface to run the original C engine natively in your browser sandbox.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 font-mono text-xs">
            <div className="bg-[#0e141f] border border-[#232e42] p-3 rounded-xs">
              <span className="text-white font-bold block mb-1">Instant Bytecode Compilation</span>
              <span className="text-[#556982]">Original 1993 C code compiled down to compact, memory-safe WebAssembly bytecodes executed by modern V8/SpiderMonkey engines.</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-3 rounded-xs">
              <span className="text-white font-bold block mb-1">Direct Canvas Rasterization</span>
              <span className="text-[#556982]">Software rendering directly blits 320&times;200 and 640&times;400 pixel buffers into an HTML5 Canvas at up to 144Hz.</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-3 rounded-xs">
              <span className="text-white font-bold block mb-1">Web Audio API Synthesis</span>
              <span className="text-[#556982]">Real-time frequency modulation and sound clip mixing without external codecs, faithfully reproducing classic sound effects.</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-3 rounded-xs">
              <span className="text-white font-bold block mb-1">Local HTML5 Storage Persistence</span>
              <span className="text-[#556982]">Pure client-side persistence for 6 save game slots directly in your browser&apos;s isolated LocalStorage database.</span>
            </div>
          </div>
          <p>
            The result is an experience that boots in under 2 seconds, consumes less than 65 megabytes of RAM, and runs with zero
            latency across Windows, macOS, Linux, ChromeOS, iOS, and Android.
          </p>
        </div>

        {/* Blog Chapter 4 */}
        <div className="space-y-3 leading-relaxed text-[#9bb0c9]">
          <h3 className="text-base font-bold text-white uppercase tracking-wide flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-400" />
            4. The Bestiary, The Arsenal &amp; The Legacy
          </h3>
          <p>
            As the nameless Space Marine (&quot;Doomguy&quot;) stationed on Phobos, you are the sole survivor of an experimental
            interdimensional teleportation gate failure that connected the Union Aerospace Corporation (UAC) facilities directly
            with the depths of Hell.
          </p>
          <p>
            Arm yourself with the iconic pump-action <strong>Shotgun</strong>, the rapid-fire <strong>Chaingun</strong>, the
            devastating <strong>Rocket Launcher</strong>, and the mythical <strong>BFG 9000</strong> to battle through hordes of
            flesh-eating <strong>Zombiemen</strong>, fire-hurling <strong>Imps</strong>, relentless <strong>Pinky Demons</strong>,
            and the formidable twin <strong>Barons of Hell</strong> guarding the anomaly gate on E1M8.
          </p>
          <p>
            More than thirty years after its debut, DOOM remains one of the most influential cultural and technical milestones in
            human history. The enduring internet question—<em>&quot;Can it run DOOM?&quot;</em>—has been answered across smart
            thermostats, microwave ovens, ATMs, and digital cameras. Now, with WebAssembly, the answer is: <strong>Any screen, any browser, anywhere.</strong>
          </p>
        </div>
      </article>

      {/* ========================================================================= */}
      {/* SECTION: CONTROLS & SPECIFICATIONS OVERVIEW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#141c28] border border-[#232e42] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-red-400" />
              Keyboard &amp; Mouse Controls
            </h3>
            <button
              onClick={onOpenControls}
              className="text-xs text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider underline cursor-pointer"
            >
              Interactive Guide &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-[#9bb0c9] block font-bold">WASD / ARROWS</span>
              <span className="text-[#556982]">Move &amp; Turn</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-red-400 block font-bold">CTRL / LEFT CLICK</span>
              <span className="text-[#556982]">Fire Weapon</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-amber-400 block font-bold">SPACEBAR</span>
              <span className="text-[#556982]">Open / Use Switch</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-blue-400 block font-bold">1 &ndash; 7 KEYS</span>
              <span className="text-[#556982]">Weapon Selection</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-[#9bb0c9] block font-bold">SHIFT KEY</span>
              <span className="text-[#556982]">Hold to Speed Run</span>
            </div>
            <div className="bg-[#0e141f] border border-[#232e42] p-2.5">
              <span className="text-[#9bb0c9] block font-bold">ESCAPE</span>
              <span className="text-[#556982]">Toggle Menu / Pause</span>
            </div>
          </div>
        </div>

        {/* Sidebar Quick Cards */}
        <div className="space-y-4">
          <div className="bg-[#141c28] border border-[#232e42] p-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              Runtime Specifications
            </h4>
            <dl className="text-xs font-mono space-y-1.5 pt-1">
              <div className="flex justify-between border-b border-[#202c3f] pb-1">
                <dt className="text-[#556982]">Port Engine</dt>
                <dd className="text-zinc-200">doomgeneric 3.0 Wasm</dd>
              </div>
              <div className="flex justify-between border-b border-[#202c3f] pb-1">
                <dt className="text-[#556982]">Resolution</dt>
                <dd className="text-zinc-200">640 &times; 400 Pixel Buffer</dd>
              </div>
              <div className="flex justify-between border-b border-[#202c3f] pb-1">
                <dt className="text-[#556982]">Default IWAD</dt>
                <dd className="text-zinc-200">DOOM1.WAD (Shareware)</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#556982]">Telemetry</dt>
                <dd className="text-emerald-400 font-bold">Zero Tracking</dd>
              </div>
            </dl>
          </div>

          <div className="bg-[#141c28] border border-[#232e42] p-4 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-1">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
              Saves &amp; Custom WADs
            </h4>
            <p className="text-xs text-[#7d91a9] leading-relaxed">
              Up to 6 persistent slots saved to local storage, plus full support for custom DOOM maps.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenSaveManager}
                className="py-2 bg-[#1a2536] hover:bg-[#233147] text-white text-[11px] font-bold uppercase tracking-wider border border-[#2b3a52] transition-colors cursor-pointer text-center"
              >
                Saves
              </button>
              <button
                type="button"
                onClick={onOpenWadLoader}
                className="py-2 bg-[#1a2536] hover:bg-[#233147] text-blue-400 hover:text-blue-300 text-[11px] font-bold uppercase tracking-wider border border-[#2b3a52] transition-colors cursor-pointer text-center"
              >
                Load WAD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: SEO FAQS ACCORDION */}
      {/* ========================================================================= */}
      <section
        id="faq"
        className="bg-[#141c28] border border-[#232e42] p-6 sm:p-8 space-y-6 shadow-2xl"
      >
        <div className="border-b border-[#202c3f] pb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-400" />
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs text-[#556982] mt-0.5">
              Comprehensive answers regarding browser performance, legality, saves, and custom WADs
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-xs">
            Schema.org FAQPage Validated
          </span>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#0e141f] border border-[#232e42] transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 text-sm font-bold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs">Q{idx + 1}.</span>
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#556982] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#556982] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#9bb0c9] leading-relaxed border-t border-[#1a2333]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
