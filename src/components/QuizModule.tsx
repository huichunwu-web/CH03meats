import React, { useState, useEffect } from 'react';
import { QuizQuestion, StudentProfile, QuizResult } from '../types';
import { QUIZ_QUESTIONS, CATEGORIES } from '../data/learningData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  FileText, 
  Timer, 
  Check, 
  AlertTriangle,
  Play,
  Volume2
} from 'lucide-react';

interface QuizModuleProps {
  student: StudentProfile;
  onOpenProfile: () => void;
  onSaveQuizResult: (result: QuizResult) => void;
  onNavigateToReport: () => void;
  lastResult: QuizResult | null;
}

export const QuizModule: React.FC<QuizModuleProps> = ({
  student,
  onOpenProfile,
  onSaveQuizResult,
  onNavigateToReport,
  lastResult
}) => {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [showPracticeFeedback, setShowPracticeFeedback] = useState<boolean>(false);

  // Timer for quiz
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isStarted && !isSubmitted) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStarted, isSubmitted]);

  const questions: QuizQuestion[] = QUIZ_QUESTIONS;
  const currentQuestion = questions[currentIdx];

  const handleStart = () => {
    soundManager.playClick();
    setIsStarted(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeElapsed(0);
    setShowPracticeFeedback(false);
  };

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;

    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    setShowPracticeFeedback(true);
    const isCorrect = optionIdx === currentQuestion.correctIndex;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    setShowPracticeFeedback(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    soundManager.playClick();
    setShowPracticeFeedback(false);
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmitExam = () => {
    // Check if any unanswered
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < questions.length) {
      const confirmSubmit = window.confirm(
        `您尚有 ${questions.length - answeredCount} 題尚未作答，確定要現在交卷結算嗎？`
      );
      if (!confirmSubmit) return;
    }

    // Calculate score
    let correctCount = 0;
    const answerDetails = questions.map((q) => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect
      };
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const result: QuizResult = {
      completedAt: new Date().toLocaleString('zh-TW', { hour12: false }),
      score,
      total: questions.length,
      percentage: score,
      timeSpentSeconds: timeElapsed,
      answers: answerDetails
    };

    setIsSubmitted(true);
    onSaveQuizResult(result);

    // Audio & celebratory visual effect
    if (score >= 60) {
      soundManager.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti fallback
      }
    } else {
      soundManager.playIncorrect();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score calculations if submitted
  const correctCount = questions.filter(
    (q) => userAnswers[q.id] === q.correctIndex
  ).length;
  const finalScore = Math.round((correctCount / questions.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Quiz Header & Student Context Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📝</span>
              <h2 className="text-lg font-bold text-stone-900">第3章 肉類科學·線上模擬測驗</h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              題庫嚴選 20 道關鍵試題，即時音效反饋，考後自動生成詳細解析與錯題本。
            </p>
          </div>

          {/* Student Profile Card */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="text-xs">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <span>應試學生：{student.studentName || '未填寫'}</span>
                <span className="text-amber-800 font-mono">({student.studentId || '無學號'})</span>
              </div>
              <div className="text-stone-500 mt-0.5">
                {student.department || '未設定系所'} · {student.classGroup || '未設定班級'}
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProfile();
              }}
              className="px-2.5 py-1 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              編輯學號
            </button>
          </div>
        </div>

        {/* Start / Intro Screen */}
        {!isStarted && (
          <div className="mt-6 pt-6 border-t border-stone-100">
            <div className="border border-amber-200/80 bg-amber-50/40 rounded-2xl p-6 hover:shadow-xs transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                    即時答題音效 · 隨刷隨練
                  </span>
                  <span className="text-xs font-mono text-stone-400">20 題 / 計時與評分</span>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  考後自動結算總分並同步至 PDF 報告
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  第3章肉類科學 模擬測驗
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                  點選選項立即播放「答對/答錯」專業音效，並同步呈現講義原理解析與對應投影片章節。作答完畢後可隨時交卷結算成績、檢視錯題本，並將成績紀錄輸出為標準學習證書與 PDF 報表。
                </p>
              </div>

              <div className="pt-2 flex items-center justify-start">
                <button
                  onClick={handleStart}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  開始模擬測驗 (答題音效)
                </button>
              </div>
            </div>

            {/* Last Result Card if exists */}
            {lastResult && (
              <div className="mt-5 p-4 bg-amber-50/60 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold text-base">
                    {lastResult.score}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      上次測驗成績：{lastResult.score} 分 ({lastResult.score >= 60 ? '及格' : '需加強'})
                    </div>
                    <div className="text-xs text-stone-500">
                      完成時間：{lastResult.completedAt} · 耗時 {formatTime(lastResult.timeSpentSeconds)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={onNavigateToReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 hover:border-stone-400 rounded-lg text-xs font-medium text-stone-800 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-700" />
                  檢視PDF成績報告
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* In-Progress Exam / Practice View */}
      {isStarted && !isSubmitted && (
        <div className="space-y-4">
          
          {/* Progress & Status Bar */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-mono">
                第 {currentIdx + 1} / {questions.length} 題
              </span>
              <span className="text-xs font-medium text-stone-500 hidden sm:inline">
                {currentQuestion.categoryName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-stone-700 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200">
                <Timer className="w-3.5 h-3.5 text-amber-700" />
                <span>{formatTime(timeElapsed)}</span>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitExam}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors shadow-xs"
              >
                交卷結算
              </button>

              {/* Mode switch / restart */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsStarted(false);
                }}
                className="text-xs text-stone-400 hover:text-stone-700"
              >
                結束測驗
              </button>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold">
                <span>{currentQuestion.categoryName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-stone-400">{currentQuestion.slideRef}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                {currentIdx + 1}. {currentQuestion.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === optIdx;
                const isCorrect = optIdx === currentQuestion.correctIndex;
                const hasAnswered = userAnswers[currentQuestion.id] !== undefined;
                
                // Color formatting when answered
                let optionStyle = 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800';
                if (hasAnswered) {
                  if (isSelected && isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
                  } else if (!isSelected && isCorrect) {
                    optionStyle = 'border-emerald-300 bg-emerald-50/50 text-emerald-900';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-amber-600 bg-amber-50/70 text-amber-950 ring-1 ring-amber-600 font-semibold';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 text-sm ${optionStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant feedback box */}
            {userAnswers[currentQuestion.id] !== undefined && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-xs font-bold">
                  {userAnswers[currentQuestion.id] === currentQuestion.correctIndex ? (
                    <span className="text-emerald-700 flex items-center gap-1">
                      <Check className="w-4 h-4" /> 回答正確！
                    </span>
                  ) : (
                    <span className="text-rose-700 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> 回答錯誤，正確答案為 ({String.fromCharCode(65 + currentQuestion.correctIndex)})
                    </span>
                  )}
                  <span className="text-stone-400 font-normal">| 投影片出處：{currentQuestion.slideRef}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong className="text-stone-900 font-semibold">講義原理解析：</strong>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Question Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <button
                disabled={currentIdx === 0}
                onClick={handlePrevQuestion}
                className="px-4 py-2 text-xs font-medium rounded-lg text-stone-600 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                上一題
              </button>

              {/* Dot Indicators */}
              <div className="hidden md:flex items-center gap-1">
                {questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        soundManager.playClick();
                        setCurrentIdx(idx);
                        setShowPracticeFeedback(false);
                      }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isCurrent
                          ? 'bg-amber-700 ring-2 ring-amber-300 scale-125'
                          : isAnswered
                          ? 'bg-stone-400'
                          : 'bg-stone-200'
                      }`}
                      title={`第 ${idx + 1} 題`}
                    />
                  );
                })}
              </div>

              {currentIdx < questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-amber-700 hover:bg-amber-800 transition-colors shadow-xs"
                >
                  下一題
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="px-5 py-2 text-xs font-bold rounded-lg text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  交卷看成績
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* Submitted Exam Result Screen */}
      {isSubmitted && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Result Score Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm text-center space-y-4">
            <Award className={`w-14 h-14 mx-auto ${finalScore >= 80 ? 'text-amber-600' : finalScore >= 60 ? 'text-emerald-600' : 'text-stone-400'}`} />
            
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">測驗結算評等</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-stone-900 font-mono mt-1">
                {finalScore} <span className="text-xl font-normal text-stone-400">/ 100 分</span>
              </div>
              <div className="text-sm font-semibold mt-1">
                {finalScore >= 90 ? (
                  <span className="text-emerald-700 font-bold">🌟 極佳特優！完全掌握肉類科學精華</span>
                ) : finalScore >= 80 ? (
                  <span className="text-emerald-600 font-bold">✨ 優等成績！概念清晰完整</span>
                ) : finalScore >= 60 ? (
                  <span className="text-amber-800 font-bold">👍 測驗及格！建議針對錯題加強複習</span>
                ) : (
                  <span className="text-rose-700 font-bold">⚠️ 尚未及格，建議回顧講義後再次挑戰</span>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto pt-3 border-t border-stone-100 text-left">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div className="text-xs text-stone-500">答對題數</div>
                <div className="text-base font-bold text-stone-800 font-mono">{correctCount} / {questions.length}</div>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div className="text-xs text-stone-500">測驗耗時</div>
                <div className="text-base font-bold text-stone-800 font-mono">{formatTime(timeElapsed)}</div>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div className="text-xs text-stone-500">應試學號</div>
                <div className="text-base font-bold text-stone-800 font-mono truncate">{student.studentId || '未填寫'}</div>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                <div className="text-xs text-stone-500">學生姓名</div>
                <div className="text-base font-bold text-stone-800 truncate">{student.studentName || '未填寫'}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleStart}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                重新測驗
              </button>

              <button
                onClick={onNavigateToReport}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                匯出成績報告與PDF證書
              </button>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <span>📋 試題解析與答題檢閱</span>
              </h3>
              <span className="text-xs text-stone-500">
                共 {questions.length} 題 · 錯題 {questions.length - correctCount} 題
              </span>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-colors ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          {isCorrect ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> 正確
                            </span>
                          ) : (
                            <span className="text-rose-700 font-bold flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> 答錯
                            </span>
                          )}
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">{q.categoryName}</span>
                          <span className="text-stone-400">·</span>
                          <span className="font-mono text-stone-400">{q.slideRef}</span>
                        </div>
                        <h4 className="text-sm font-bold text-stone-900">
                          {idx + 1}. {q.question}
                        </h4>
                      </div>
                    </div>

                    {/* Choices recap */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isThisUserChoice = userChoice === optIdx;
                        const isThisCorrect = optIdx === q.correctIndex;

                        let style = 'bg-white border-stone-200 text-stone-700';
                        if (isThisCorrect) {
                          style = 'bg-emerald-100/70 border-emerald-300 text-emerald-950 font-semibold';
                        } else if (isThisUserChoice && !isThisCorrect) {
                          style = 'bg-rose-100/70 border-rose-300 text-rose-950 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-2 rounded-lg border flex items-center gap-2 ${style}`}
                          >
                            <span className="font-mono font-bold">({String.fromCharCode(65 + optIdx)})</span>
                            <span className="truncate">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    <div className="mt-3 pt-2 border-t border-stone-200/60 text-xs text-stone-600 leading-relaxed">
                      <strong className="text-stone-900">原理解析：</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
