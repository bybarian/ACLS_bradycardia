/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Activity, ArrowRight, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight, RotateCcw, BrainCircuit, Stethoscope } from 'lucide-react';
import { LESSONS } from './data/lessons';
import { RhythmType } from './types';
import ECGViewer from './components/ECGViewer';

type ViewState = 'intro' | 'lesson' | 'treatment' | 'summary';

export default function App() {
  const [view, setView] = useState<ViewState>('intro');
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [inQuiz, setInQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<RhythmType | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentLesson = LESSONS[currentLessonIndex];
  const currentQuiz = currentLesson.quizzes[currentQuizIndex];

  const handleNext = () => {
    if (view === 'intro') {
      setView('lesson');
    } else if (view === 'lesson') {
      if (currentLessonIndex < LESSONS.length - 1) {
        setCurrentLessonIndex(prev => prev + 1);
        setInQuiz(false);
      } else {
        setView('treatment');
      }
    } else if (view === 'treatment') {
      setView('summary');
    }
  };

  const startQuiz = () => {
    setInQuiz(true);
    setCurrentQuizIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleQuizAnswer = (answer: RhythmType) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuiz.rhythm) {
      setQuizScore(prev => prev + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (currentQuizIndex < currentLesson.quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setInQuiz(false);
      // Automatically go to next lesson or treatment
      handleNext();
    }
  };

  return (
    <div className="min-h-screen geometric-grid text-slate-900 font-sans selection:bg-red-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-900 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 flex items-center justify-center text-white border-2 border-slate-900">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-tight">ACLS Bradycardia</h1>
              <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Interactive Learning</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Progress</span>
              <div className="flex gap-1 mt-1">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className={`h-2 w-8 border border-slate-900 transition-colors ${
                    (view === 'lesson' && i <= currentLessonIndex) || (view === 'treatment' && i >= 3) || (view === 'summary' && i >= 3)
                      ? 'bg-red-500' : 'bg-slate-200'
                  }`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-widest border border-slate-900">Advanced Life Support</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                  掌握心搏過緩的<br />
                  <span className="text-red-500 decoration-4 underline-offset-8">判讀與處置</span>
                </h2>
                <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                  這是一個專為醫療專業人員設計的互動式講義。透過波形特徵分類，讓您在緊急情況下能迅速做出正確的臨床決策。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Activity, title: "波形辨識", desc: "掌握 PR 間期與 QRS 寬度的關鍵變化。" },
                  { icon: BrainCircuit, title: "邏輯分類", desc: "從規則性與寬度快速縮小鑑別診斷。" },
                  { icon: Stethoscope, title: "即時處置", desc: "學習穩定與不穩定病人的用藥指引。" }
                ].map((item, idx) => (
                  <div key={idx} className="p-8 bg-white border-2 border-slate-900 card-shadow">
                    <item.icon className="w-10 h-10 text-red-500 mb-6" />
                    <h3 className="font-black text-slate-900 mb-2 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleNext}
                className="group flex items-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 font-bold transition-all hover:gap-5 border-2 border-slate-900 card-shadow"
              >
                開始課程
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}

          {view === 'lesson' && !inQuiz && (
            <motion.div 
              key={`lesson-${currentLessonIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
                <div>
                  <div className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Section 0{currentLessonIndex + 1}</div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight">{currentLesson.title}</h2>
                  <p className="text-slate-500 font-medium">{currentLesson.subtitle}</p>
                </div>
                <div className="flex gap-3">
                  <div className="px-4 py-2 bg-white border-2 border-slate-900 text-xs font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                    <Activity className="w-4 h-4 text-red-500" />
                    QRS: {currentLesson.characteristic.width}
                  </div>
                  <div className="px-4 py-2 bg-white border-2 border-slate-900 text-xs font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                    <RotateCcw className="w-4 h-4 text-red-500" />
                    律動: {currentLesson.characteristic.regularity}
                  </div>
                </div>
              </div>

              <ECGViewer rhythm={currentLesson.rhythms[0]} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="font-black text-slate-900 flex items-center gap-3 text-xl uppercase tracking-tight">
                    <div className="w-2 h-8 bg-slate-900"></div>
                    教學要點
                  </h3>
                  <ul className="space-y-4">
                    {currentLesson.teachingPoints.map((point, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 leading-relaxed font-medium">
                        <div className="w-6 h-6 rounded-none bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5 border border-slate-900">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-8 border-2 border-slate-900 card-shadow border-l-8 border-l-red-500 self-start">
                  <h3 className="font-black text-slate-900 mb-4 flex items-center gap-3 uppercase tracking-tight">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    常見病因
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium italic">
                    包括電解質異常（如高血鉀）、藥物影響（毛地黃、Beta-blockers）、心肌梗塞或運動員迷走神經張力過高。
                  </p>
                </div>
              </div>

              <div className="pt-10 border-t-2 border-slate-900 flex justify-between items-center">
                <button 
                  onClick={() => currentLessonIndex > 0 ? setCurrentLessonIndex(i => i - 1) : setView('intro')}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-black px-4 py-2 transition-colors uppercase tracking-widest text-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                  上一步
                </button>
                <button 
                  onClick={startQuiz}
                  className="flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white px-10 py-4 font-black transition-all border-2 border-slate-900 card-shadow uppercase tracking-widest text-sm"
                >
                  即時練習
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {view === 'lesson' && inQuiz && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              <div className="flex items-end justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <div className="text-red-500 font-bold tracking-widest text-sm uppercase mb-1">Interactive Quiz</div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">學員練習：波形辨識</h2>
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest pb-1">
                  Step {currentQuizIndex + 1} / {currentLesson.quizzes.length}
                </div>
              </div>

              <div className="p-10 bg-white border-2 border-slate-900 card-shadow relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-50 opacity-10 rounded-full"></div>
                
                {/* Embedded Monitor for Quiz */}
                <div className="mb-8">
                  <ECGViewer rhythm={currentQuiz.rhythm} />
                </div>

                <div className="flex items-start gap-6 mb-10">
                  <div className="w-14 h-14 bg-slate-900 flex items-center justify-center text-white shrink-0 border-2 border-slate-900 shadow-[4px_4px_0px_#ef4444]">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Clinical Scenario</h3>
                    <p className="text-slate-800 text-xl leading-relaxed font-bold">{currentQuiz.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from(new Set([
                    currentQuiz.rhythm,
                    ...currentLesson.rhythms,
                    RhythmType.THIRD_DEGREE_AVB,
                    RhythmType.JUNCTIONAL,
                    RhythmType.AF_SVR,
                    RhythmType.MOBITZ_2
                  ])).slice(0, 4).sort().map((rhythm, i) => (
                    <button
                      key={i}
                      disabled={showFeedback}
                      onClick={() => handleQuizAnswer(rhythm)}
                      className={`p-5 text-left font-black border-2 transition-all flex justify-between items-center ${
                        selectedAnswer === rhythm
                          ? rhythm === currentQuiz.rhythm
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-red-50 border-red-500 text-red-800 scale-[0.98]'
                          : 'bg-white border-slate-900 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{rhythm}</span>
                      {selectedAnswer === rhythm && (
                        rhythm === currentQuiz.rhythm 
                          ? <CheckCircle2 className="w-5 h-5 shrink-0" />
                          : <AlertCircle className="w-5 h-5 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-10 p-8 border-2 flex gap-6 ${
                      selectedAnswer === currentQuiz.rhythm 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900' 
                        : 'bg-amber-50 border-amber-500 text-amber-900'
                    }`}
                  >
                    <div className="shrink-0 pt-1">
                      <div className={`w-10 h-10 border-2 flex items-center justify-center ${
                        selectedAnswer === currentQuiz.rhythm ? 'bg-emerald-500 border-slate-900' : 'bg-amber-500 border-slate-900'
                      }`}>
                        {selectedAnswer === currentQuiz.rhythm 
                          ? <CheckCircle2 className="w-6 h-6 text-white" />
                          : <AlertCircle className="w-6 h-6 text-white" />
                        }
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black uppercase tracking-widest text-sm mb-2">
                        {selectedAnswer === currentQuiz.rhythm ? 'Correct Answer' : 'Clinical Hint'}
                      </h4>
                      <p className="text-lg font-medium leading-relaxed">
                        {selectedAnswer === currentQuiz.rhythm ? currentQuiz.explanation : currentQuiz.hint}
                      </p>
                      
                      <button 
                        onClick={nextQuizQuestion}
                        className="mt-6 px-10 py-3 bg-slate-900 text-white font-black text-sm flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest border-2 border-slate-900"
                      >
                        {currentQuizIndex < currentLesson.quizzes.length - 1 ? 'Next Question' : 'Complete Section'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {view === 'treatment' && (
            <motion.div 
              key="treatment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12 py-6"
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-emerald-500 text-white border-4 border-slate-900 flex items-center justify-center mx-auto mb-8 shadow-[8px_8px_0px_#cbd5e1]">
                  <Stethoscope className="w-12 h-12" />
                </div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">臨床處置流程</h2>
                <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">
                  當辨識出關鍵波形後，處置的核心在於區分「穩定」與「不穩定」。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-white border-2 border-slate-900 card-shadow space-y-6">
                  <div className="flex items-center gap-4 border-b-4 border-red-500 pb-4">
                    <div className="w-12 h-12 bg-red-500 border-2 border-slate-900 flex items-center justify-center text-white font-black text-2xl shrink-0">!</div>
                    <h3 className="font-black text-slate-900 text-2xl uppercase tracking-tight">不穩定 (Unstable)</h3>
                  </div>
                  <p className="text-sm text-red-600 font-bold tracking-tight uppercase px-3 py-1 bg-red-50 border border-red-200 inline-block">診斷：昏倒、胸痛、喘、休克、血壓低</p>
                  <ul className="space-y-6 pt-4">
                    {[
                      { num: "01", title: "Atropine", desc: "首劑 1.0 mg，每 3-5 分鐘一次，上限 3.0 mg" },
                      { num: "02", title: "TCP 節律器", desc: "若藥物無效，立即啟動經皮心臟節律器" },
                      { num: "03", title: "Vasoactive Drugs", desc: "Dopamine / Epinephrine 持續輸注" }
                    ].map((step, i) => (
                      <li key={i} className="flex gap-6 items-start group">
                        <span className="text-slate-300 font-black text-3xl group-hover:text-red-500 transition-colors shrink-0">{step.num}</span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-lg mb-1">{step.title}</div>
                          <div className="text-sm text-slate-500 font-medium leading-normal">{step.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-10 bg-white border-2 border-slate-900 card-shadow space-y-6">
                  <div className="flex items-center gap-4 border-b-4 border-emerald-500 pb-4">
                    <div className="w-12 h-12 bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-white shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-black text-slate-900 text-2xl uppercase tracking-tight">穩定 (Stable)</h3>
                  </div>
                  <p className="text-sm text-emerald-600 font-bold tracking-tight uppercase px-3 py-1 bg-emerald-50 border border-emerald-200 inline-block">無上述嚴重生命徵象危險</p>
                  <ul className="space-y-8 pt-4">
                    <li className="flex gap-6 items-start">
                      <div className="w-8 h-8 shrink-0 bg-slate-900 flex items-center justify-center text-white font-black text-xs">A</div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-lg mb-1">臨床觀察與監測</div>
                        <div className="text-sm text-slate-500 font-medium leading-relaxed">持續監控 Heart Rate, SpO2 與血壓，保持氣道通暢與給氧。</div>
                      </div>
                    </li>
                    <li className="flex gap-6 items-start">
                      <div className="w-8 h-8 shrink-0 bg-slate-900 flex items-center justify-center text-white font-black text-xs">B</div>
                      <div>
                        <div className="font-extrabold text-slate-900 text-lg mb-1">尋找原發因 (Etiology)</div>
                        <div className="text-sm text-slate-500 font-medium leading-relaxed">檢查電解質、是否有急性心肌梗塞，或評估相關藥物毒性。</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <button 
                onClick={handleNext}
                className="group flex items-center gap-3 bg-slate-900 text-white px-12 py-5 font-black transition-all mx-auto border-2 border-slate-900 card-shadow uppercase tracking-widest text-sm hover:scale-[1.02]"
              >
                完成學習模組
                <CheckCircle2 className="w-6 h-6 border-2 border-white rounded-none" />
              </button>
            </motion.div>
          )}

          {view === 'summary' && (
            <motion.div 
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24 space-y-10"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-500 blur-[100px] opacity-10"></div>
                <div className="relative w-32 h-32 bg-white border-4 border-slate-900 card-shadow flex items-center justify-center text-red-500 mx-auto">
                  <Heart className="w-16 h-16 fill-current" />
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-red-500 font-black tracking-widest uppercase text-sm">Course Completed</div>
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter">恭喜完成課程！</h2>
                <p className="text-slate-500 text-xl max-w-lg mx-auto font-medium leading-relaxed">
                  您已經掌握了心搏過緩的分類、鑑別診斷與臨床處置原則。請記住「慢、窄/寬、規則/不規則」的判讀口訣。
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 pt-6">
                <button 
                  onClick={() => {
                    setView('intro');
                    setCurrentLessonIndex(0);
                  }}
                  className="bg-slate-900 text-white px-12 py-5 font-black text-sm flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest border-2 border-slate-900 card-shadow"
                >
                  <RotateCcw className="w-5 h-5" />
                  重新複習課程
                </button>
                <div className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] border-t border-slate-200 pt-6">
                  Interactive Medical Education System v1.0.4
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="h-12 bg-slate-900 text-white flex items-center px-6 justify-between text-[10px] font-black uppercase tracking-[0.2em]">
        <div className="flex gap-8">
          <span className="hidden md:inline">Module: ACLS Bradycardia</span>
          <span>AHA Guidelines 2026</span>
        </div>
        <div>
          © 2026 Emergency Medical Training Unit
        </div>
      </footer>
    </div>
  );
}
