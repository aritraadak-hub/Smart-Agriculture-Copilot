import React from 'react';

/**
 * PageBackground component provides a unified, high-performance background design system
 * combining Modern Agriculture + AI Technology + Clean SaaS visual aesthetics.
 * 
 * @param {Object} props
 * @param {string} props.variant - Variant type ('default', 'home', 'dashboard', 'weather', 'soil', 'crop', 'disease', 'market', 'schemes', 'auth', 'farm')
 * @param {React.ReactNode} props.children - Page content wrapped inside the background system
 */
export const PageBackground = ({ variant = 'default', children }) => {

  // Variant specific glow color configurations
  const getGlowColors = () => {
    switch (variant) {
      case 'home':
        return {
          orb1: 'from-emerald-400/20 via-green-500/15 to-transparent dark:from-emerald-600/20 dark:via-green-900/15',
          orb2: 'from-teal-400/15 via-emerald-500/10 to-transparent dark:from-teal-600/15 dark:via-emerald-900/10',
          orb3: 'from-green-300/20 via-emerald-400/10 to-transparent dark:from-emerald-800/15 dark:via-green-950/10',
        };
      case 'weather':
        return {
          orb1: 'from-sky-400/15 via-emerald-400/10 to-transparent dark:from-sky-900/20 dark:via-emerald-950/10',
          orb2: 'from-teal-400/15 via-emerald-500/10 to-transparent dark:from-teal-900/15 dark:via-emerald-950/10',
          orb3: 'from-emerald-300/15 via-sky-300/10 to-transparent dark:from-emerald-900/15 dark:via-sky-950/10',
        };
      case 'soil':
        return {
          orb1: 'from-amber-500/10 via-emerald-500/15 to-transparent dark:from-amber-950/15 dark:via-emerald-900/15',
          orb2: 'from-emerald-400/15 via-teal-500/10 to-transparent dark:from-emerald-900/15 dark:via-teal-950/10',
          orb3: 'from-green-400/15 via-amber-400/10 to-transparent dark:from-emerald-950/15 dark:via-amber-950/10',
        };
      case 'crop':
        return {
          orb1: 'from-emerald-500/20 via-green-400/15 to-transparent dark:from-emerald-600/20 dark:via-green-900/15',
          orb2: 'from-teal-400/15 via-emerald-600/10 to-transparent dark:from-teal-900/15 dark:via-emerald-950/10',
          orb3: 'from-green-400/20 via-emerald-300/10 to-transparent dark:from-green-900/20 dark:via-emerald-950/10',
        };
      case 'disease':
        return {
          orb1: 'from-emerald-300/15 via-teal-400/10 to-transparent dark:from-emerald-950/20 dark:via-teal-950/10',
          orb2: 'from-green-300/15 via-emerald-400/10 to-transparent dark:from-green-950/15 dark:via-emerald-950/10',
          orb3: 'from-teal-300/15 via-emerald-300/10 to-transparent dark:from-teal-950/15 dark:via-emerald-950/10',
        };
      case 'market':
        return {
          orb1: 'from-emerald-500/15 via-teal-500/15 to-transparent dark:from-emerald-950/20 dark:via-teal-900/15',
          orb2: 'from-cyan-400/10 via-emerald-500/10 to-transparent dark:from-cyan-950/15 dark:via-emerald-950/10',
          orb3: 'from-green-400/15 via-emerald-500/10 to-transparent dark:from-green-900/15 dark:via-emerald-950/10',
        };
      case 'schemes':
        return {
          orb1: 'from-amber-400/10 via-emerald-500/15 to-transparent dark:from-amber-950/15 dark:via-emerald-900/15',
          orb2: 'from-emerald-400/15 via-teal-400/10 to-transparent dark:from-emerald-900/15 dark:via-teal-950/10',
          orb3: 'from-green-400/15 via-emerald-300/10 to-transparent dark:from-green-900/15 dark:via-emerald-950/10',
        };
      case 'auth':
        return {
          orb1: 'from-emerald-500/25 via-green-600/15 to-transparent dark:from-emerald-600/30 dark:via-green-950/20',
          orb2: 'from-teal-400/20 via-emerald-500/15 to-transparent dark:from-teal-900/25 dark:via-emerald-950/15',
          orb3: 'from-emerald-400/20 via-green-400/15 to-transparent dark:from-emerald-800/20 dark:via-green-950/15',
        };
      case 'dashboard':
      default:
        return {
          orb1: 'from-emerald-400/18 via-green-500/12 to-transparent dark:from-emerald-950/25 dark:via-green-950/15',
          orb2: 'from-teal-400/12 via-emerald-500/10 to-transparent dark:from-teal-950/15 dark:via-emerald-950/10',
          orb3: 'from-green-300/15 via-emerald-400/10 to-transparent dark:from-emerald-900/15 dark:via-green-950/10',
        };
    }
  };

  const glowColors = getGlowColors();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f8fff9] via-[#f0fdf4] to-[#ecfdf5] dark:from-[#07120c] dark:via-[#0b1f14] dark:to-[#07150e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* BACKGROUND DECORATIVE LAYERS (POINTER EVENTS NONE) */}
      <div className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
        
        {/* Layer 1: Ambient Glowing Orbs */}
        <div
          className={`absolute -top-32 -left-32 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-radial ${glowColors.orb1} blur-3xl opacity-80 dark:opacity-60 animate-pulse-glow`}
        />
        <div
          className={`absolute top-1/3 -right-32 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-radial ${glowColors.orb2} blur-3xl opacity-70 dark:opacity-50 animate-float-slow`}
        />
        <div
          className={`absolute -bottom-32 left-1/4 w-96 md:w-[550px] h-96 md:h-[550px] rounded-full bg-radial ${glowColors.orb3} blur-3xl opacity-60 dark:opacity-40 animate-float-reverse`}
        />

        {/* Layer 2: Variant Specific SVG Pattern Overlays */}
        {(variant === 'home' || variant === 'auth' || variant === 'market') && (
          <div
            className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2310b981' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}

        {(variant === 'dashboard' || variant === 'farm' || variant === 'soil') && (
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.045]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        )}

        {(variant === 'crop' || variant === 'disease' || variant === 'schemes' || variant === 'default') && (
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 17.83V0h17.83C23.64 0 27 3.36 27 9.17s-3.36 9.17-9.17 9.17H0zm0 34.17V34.83h17.83c5.81 0 9.17 3.36 9.17 9.17S23.64 52 17.83 52H0zM34.83 0H52v17.83c0 5.81-3.36 9.17-9.17 9.17S33.66 23.64 33.66 17.83V0h1.17z' fill='%2310b981' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}
          />
        )}

        {/* Layer 3: Tech Grid overlay for AI atmosphere */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] dark:opacity-[0.07]"
        />

        {/* Layer 4: Organic Leaf Silhouette SVG Accents */}
        <svg
          className="absolute top-12 left-10 w-72 h-72 text-emerald-600/5 dark:text-emerald-400/5 animate-float-slow"
          viewBox="0 0 200 200"
          fill="currentColor"
        >
          <path d="M100,10 C150,10 190,50 190,100 C190,150 150,190 100,190 C50,190 10,150 10,100 C10,50 50,10 100,10 Z M100,30 C70,30 45,55 45,85 C45,115 70,140 100,140 C130,140 155,115 155,85 C155,55 130,30 100,30 Z" />
        </svg>

        <svg
          className="absolute bottom-20 right-12 w-96 h-96 text-emerald-500/5 dark:text-emerald-400/5 animate-float-reverse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 6V18M6 12H18" />
        </svg>

      </div>

      {/* FOREGROUND CONTENT LAYER */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
};

export default PageBackground;
