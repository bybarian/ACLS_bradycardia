import { motion } from "motion/react";
import { RhythmType } from "../types";

interface ECGViewerProps {
  rhythm: RhythmType | string;
  isActive?: boolean;
}

export default function ECGViewer({ rhythm, isActive = true }: ECGViewerProps) {
  // Each segment will be exactly 200 units wide for seamless looping
  const getPath = () => {
    switch (rhythm) {
      case RhythmType.FIRST_DEGREE_AVB:
        // Regular, long PR (Segment ends at 200)
        return "M 0 50 L 20 50 C 30 40 40 40 50 50 L 100 50 L 105 10 L 110 90 L 115 50 L 140 50 C 150 40 170 40 180 50 L 200 50";
      
      case RhythmType.JUNCTIONAL:
        // No P wave, regular (Segment ends at 200)
        return "M 0 50 L 100 50 L 105 10 L 110 90 L 115 50 L 200 50";
      
      case RhythmType.MOBITZ_1:
        // PR gets longer... (Segment ends at 200)
        return "M 0 50 L 10 50 C 15 45 20 45 25 50 L 40 50 L 45 15 L 50 85 L 55 50 L 110 50 C 120 40 135 40 145 50 L 160 50 L 165 15 L 170 85 L 175 50 L 200 50";
      
      case RhythmType.AF_SVR:
        // Irregular, very slow, no P (Segment ends at 200)
        return "M 0 50 L 5 48 L 10 52 L 40 50 L 45 15 L 50 85 L 55 50 L 120 50 L 125 15 L 130 85 L 135 50 L 200 50";
      
      case RhythmType.THIRD_DEGREE_AVB:
        // Dissociated P waves and broad QRS (Based on user image)
        // Regular P waves (small bumps), separate regular broad QRS
        return "M 0 50 L 10 45 L 20 50 L 70 50 L 80 45 L 90 50 L 100 50 L 110 5 L 130 95 L 150 50 L 160 45 L 170 50 C 180 50 190 50 200 50";

      default:
        // Generic wide/slow (Segment ends at 200)
        return "M 0 50 L 80 50 L 95 10 L 115 90 L 130 50 L 200 50";
    }
  };

  const getAnimationDuration = () => {
    switch (rhythm) {
      case RhythmType.AF_SVR: return 8; // Much slower (User requested)
      case RhythmType.THIRD_DEGREE_AVB: return 7; // Slow
      case RhythmType.IVR: return 9; // Very slow
      default: return 4;
    }
  };

  const getBPM = () => {
    switch (rhythm) {
      case RhythmType.THIRD_DEGREE_AVB: return 32;
      case RhythmType.IVR: return 28;
      case RhythmType.JUNCTIONAL: return 38;
      default: return 45;
    }
  };

  const segmentWidth = 200;

  return (
    <div className="w-full h-48 bg-slate-900 rounded-none border-2 border-slate-900 overflow-hidden relative flex items-center justify-center p-4 card-shadow">
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      <div className="absolute inset-x-0 h-px bg-slate-800 top-1/2"></div>
      
      <svg viewBox="0 0 600 100" className="w-full h-32 relative z-10" preserveAspectRatio="none">
        {isActive && (
          <motion.g
            animate={{
              x: [0, -segmentWidth],
            }}
            transition={{
              duration: getAnimationDuration(),
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Render 5 segments to ensure no gap during right-to-left shift */}
            <path d={getPath()} transform="translate(0, 0)" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d={getPath()} transform={`translate(${segmentWidth}, 0)`} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d={getPath()} transform={`translate(${segmentWidth * 2}, 0)`} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d={getPath()} transform={`translate(${segmentWidth * 3}, 0)`} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <path d={getPath()} transform={`translate(${segmentWidth * 4}, 0)`} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        )}
      </svg>
      
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-900/80 px-2 py-1 border border-slate-700">
        <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Live ECG</span>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1 border border-slate-700">
        <span className="text-sm font-black text-red-500 font-mono tracking-tighter">BPM: {getBPM()}</span>
      </div>
    </div>
  );
}
