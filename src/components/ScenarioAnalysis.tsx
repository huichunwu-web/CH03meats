import React, { useState } from 'react';
import { ScenarioCase } from '../types';
import { SCENARIO_CASES } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { 
  FlaskConical, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronRight, 
  Sparkles, 
  RotateCcw,
  ChefHat,
  Lightbulb,
  Check
} from 'lucide-react';

interface ScenarioAnalysisProps {
  completedCaseIds: string[];
  onCompleteCase: (caseId: string) => void;
}

export const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({
  completedCaseIds,
  onCompleteCase
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(SCENARIO_CASES[0].id);
  // Track step choices: caseId -> stepIndex -> optionId
  const [stepChoices, setStepChoices] = useState<{ [caseId: string]: { [stepIdx: number]: string } }>({});
  // Track if all steps answered
  const currentCase = SCENARIO_CASES.find((c) => c.id === selectedCaseId) || SCENARIO_CASES[0];

  const currentChoices = stepChoices[currentCase.id] || {};

  const handleSelectOption = (stepIdx: number, optionId: string, isCorrect: boolean) => {
    soundManager.playClick();
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    const updatedCaseChoices = {
      ...currentChoices,
      [stepIdx]: optionId
    };

    setStepChoices((prev) => ({
      ...prev,
      [currentCase.id]: updatedCaseChoices
    }));

    // Check if all steps in this case are answered correctly
    const allStepsDone = currentCase.steps.every((step, sIdx) => {
      const chosenId = updatedCaseChoices[sIdx];
      const correctOpt = step.options.find((o) => o.isCorrect);
      return chosenId === correctOpt?.id;
    });

    if (allStepsDone && !completedCaseIds.includes(currentCase.id)) {
      onCompleteCase(currentCase.id);
      soundManager.playFanfare();
    }
  };

  const handleResetCase = () => {
    soundManager.playClick();
    setStepChoices((prev) => ({
      ...prev,
      [currentCase.id]: {}
    }));
  };

  const isCaseCompleted = completedCaseIds.includes(currentCase.id);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔬</span>
              <h2 className="text-lg font-bold text-stone-900">第3章 肉類科學·廚藝實務情境診斷</h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              將肉類生理構造、死後生物化學與烹飪物理學原理，應用於餐飲現場疑難雜症的推理與診斷。
            </p>
          </div>

          <div className="text-xs text-stone-600 sm:text-right shrink-0">
            已突破案例：
            <span className="font-bold text-amber-700 font-mono text-sm ml-1">{completedCaseIds.length}</span> / {SCENARIO_CASES.length} 個
            <div className="flex items-center gap-1 mt-1 justify-end">
              {SCENARIO_CASES.map((c) => (
                <div
                  key={c.id}
                  className={`w-2.5 h-2.5 rounded-full ${
                    completedCaseIds.includes(c.id) ? 'bg-emerald-600' : 'bg-stone-200'
                  }`}
                  title={c.title}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Case Selector Tabs */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {SCENARIO_CASES.map((c, idx) => {
            const isSelected = c.id === currentCase.id;
            const isDone = completedCaseIds.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCaseId(c.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>案例 {idx + 1}</span>
                {isDone && <Check className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-emerald-600'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Details Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* Case Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
              <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">{currentCase.difficulty}難度</span>
              <span>{currentCase.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-stone-400">{currentCase.slideRef}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              {currentCase.title}
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              關鍵科學核心：{currentCase.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isCaseCompleted && (
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                診斷已通關
              </div>
            )}
            <button
              onClick={handleResetCase}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="重設本案例答案"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Situation & Background */}
        <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <ChefHat className="w-4 h-4 text-amber-700" />
            <span>現場情境實錄</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {currentCase.background}
          </p>

          <div className="pt-2 border-t border-amber-100/60">
            <div className="text-xs font-semibold text-amber-900 mb-1.5">主要徵狀：</div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentCase.symptoms.map((sym, i) => (
                <li key={i} className="text-xs bg-white/80 p-2 rounded-lg border border-amber-200/50 text-stone-700 flex items-start gap-1.5">
                  <span className="text-amber-700 font-bold shrink-0">!</span>
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Step-by-Step Diagnostic Tree */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-700" />
            <h4 className="text-sm font-bold text-stone-900">科學推理診斷步驟</h4>
          </div>

          <div className="space-y-4">
            {currentCase.steps.map((step, stepIdx) => {
              const chosenOptionId = currentChoices[stepIdx];
              const isAnswered = chosenOptionId !== undefined;

              return (
                <div
                  key={stepIdx}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800">
                      {step.stepTitle}
                    </span>
                    {isAnswered && (
                      <span className="text-xs text-stone-400">
                        {step.options.find(o => o.id === chosenOptionId)?.isCorrect ? '✅ 診斷正確' : '❌ 診斷有誤'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-stone-800">
                    {step.prompt}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {step.options.map((opt) => {
                      const isChosen = chosenOptionId === opt.id;
                      
                      let btnStyle = 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800';
                      if (isChosen && opt.isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-semibold';
                      } else if (isChosen && !opt.isCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                      } else if (isAnswered && opt.isCorrect) {
                        btnStyle = 'border-emerald-300 bg-emerald-50/40 text-emerald-900';
                      }

                      return (
                        <div key={opt.id} className="space-y-1.5">
                          <button
                            onClick={() => handleSelectOption(stepIdx, opt.id, opt.isCorrect)}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                          >
                            <span className="leading-relaxed">{opt.text}</span>
                            {isChosen && opt.isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            {isChosen && !opt.isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                            )}
                          </button>

                          {/* Analysis feedback if selected */}
                          {isChosen && (
                            <div className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                              opt.isCorrect ? 'bg-emerald-100/60 text-emerald-900 border border-emerald-200' : 'bg-rose-100/60 text-rose-900 border border-rose-200'
                            }`}>
                              <strong>反饋分析：</strong>{opt.analysis}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Master Solution & Scientific Mechanism (Unlocked if completed or partially done) */}
        <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold text-amber-300">肉類科學底層機制解密</h4>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {currentCase.scientificMechanism}
          </p>

          <div className="pt-3 border-t border-stone-800">
            <div className="text-xs font-bold text-amber-400 mb-1">主廚實務解決方針：</div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-mono">
              {currentCase.culinarySolution}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
