import React, { useRef } from 'react';
import { StudentProfile, QuizResult } from '../types';
import { QUIZ_QUESTIONS, FLASHCARDS, SCENARIO_CASES } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { 
  Printer, 
  Download, 
  Award, 
  CheckCircle2, 
  XCircle, 
  User, 
  FileCheck, 
  Bookmark, 
  Calendar,
  Layers,
  FlaskConical,
  RotateCcw
} from 'lucide-react';

interface PrintableReportProps {
  student: StudentProfile;
  lastQuizResult: QuizResult | null;
  masteredFlashcardIds: string[];
  bookmarkedFlashcardIds: string[];
  completedScenarioIds: string[];
  onOpenProfile: () => void;
  onNavigateToQuiz: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  student,
  lastQuizResult,
  masteredFlashcardIds,
  bookmarkedFlashcardIds,
  completedScenarioIds,
  onOpenProfile,
  onNavigateToQuiz
}) => {
  const reportRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownloadJSON = () => {
    soundManager.playClick();
    const dataToExport = {
      course: '第3章 肉類科學與烹調',
      studentProfile: student,
      exportTimestamp: new Date().toISOString(),
      flashcardStats: {
        total: FLASHCARDS.length,
        masteredCount: masteredFlashcardIds.length,
        masteredIds: masteredFlashcardIds
      },
      scenarioStats: {
        total: SCENARIO_CASES.length,
        completedCount: completedScenarioIds.length,
        completedIds: completedScenarioIds
      },
      lastQuizResult: lastQuizResult || '尚未進行模擬測驗'
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `肉類科學學習報表_${student.studentId || '無學號'}_${student.studentName || '學生'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const score = lastQuizResult?.score ?? 0;
  const gradeLabel = score >= 90 ? '特優 (A+)' : score >= 80 ? '優等 (A)' : score >= 70 ? '良好 (B)' : score >= 60 ? '及格 (C)' : '待加強 (D)';

  const currentDateStr = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="no-print bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📄</span>
            <h2 className="text-lg font-bold text-stone-900">學習成果報告與 PDF 輸出中心</h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            整合學生學號、姓名、章節字卡精通率、模擬測驗成績單、錯題檢閱與情境案例成果，支持一鍵另存為標準 PDF 格式。
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
          >
            <User className="w-3.5 h-3.5 text-stone-600" />
            修改學號姓名
          </button>

          <button
            onClick={handleDownloadJSON}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            title="下載純文字/JSON備份檔"
          >
            <Download className="w-3.5 h-3.5 text-stone-600" />
            下載紀錄 (JSON)
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            列印 / 另存為 PDF
          </button>
        </div>
      </div>

      {/* Official Study Certificate & Report (Printable document body) */}
      <div 
        ref={reportRef}
        className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-300 shadow-md print:shadow-none print:border-none print:p-0 space-y-8"
      >
        
        {/* Certificate Academic Header */}
        <div className="text-center pb-6 border-b-2 border-stone-900 space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-mono font-semibold text-stone-700 tracking-wider">
            ACADEMIC ASSESSMENT & LEARNING DOSSIER
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight">
            《食品科學與餐飲廚藝：第3章 肉類》
          </h1>
          <h2 className="text-base sm:text-lg font-bold text-amber-900">
            數位學習成效評估與模擬測驗證書
          </h2>
          <div className="text-xs text-stone-500 flex items-center justify-center gap-3 pt-1">
            <span>發行系統：肉類科學與烹調學堂</span>
            <span aria-hidden="true">·</span>
            <span>評估日期：{currentDateStr}</span>
          </div>
        </div>

        {/* Student Profile Card in Report */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-200">
          <div>
            <div className="text-xs text-stone-500 font-medium">學生學號</div>
            <div className="text-base font-bold text-stone-900 font-mono mt-0.5">
              {student.studentId || '尚未填寫'}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">學生姓名</div>
            <div className="text-base font-bold text-stone-900 mt-0.5">
              {student.studentName || '尚未填寫'}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">就讀系所</div>
            <div className="text-base font-bold text-stone-900 mt-0.5">
              {student.department || '餐旅管理/食品營養系'}
            </div>
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">班級組別</div>
            <div className="text-base font-bold text-stone-900 mt-0.5">
              {student.classGroup || '標準課程班'}
            </div>
          </div>
        </div>

        {/* Learning Statistics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Card 1: Quiz Score */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>模擬測驗成績</span>
              <Award className="w-4 h-4 text-amber-700" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 font-mono">
                {lastQuizResult ? lastQuizResult.score : '--'}
              </span>
              <span className="text-xs text-stone-400 font-mono">/ 100 分</span>
            </div>
            <div className="text-xs font-semibold text-amber-800">
              {lastQuizResult ? `評等：${gradeLabel}` : '尚未完成測驗'}
            </div>
          </div>

          {/* Card 2: Flashcard Mastery */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>學習字卡掌握度</span>
              <Layers className="w-4 h-4 text-stone-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 font-mono">
                {masteredFlashcardIds.length}
              </span>
              <span className="text-xs text-stone-400 font-mono">/ {FLASHCARDS.length} 組</span>
            </div>
            <div className="text-xs font-medium text-stone-600">
              熟記率：{Math.round((masteredFlashcardIds.length / FLASHCARDS.length) * 100)}%
            </div>
          </div>

          {/* Card 3: Scenario Cases */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
              <span>情境實務診斷</span>
              <FlaskConical className="w-4 h-4 text-stone-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 font-mono">
                {completedScenarioIds.length}
              </span>
              <span className="text-xs text-stone-400 font-mono">/ {SCENARIO_CASES.length} 案</span>
            </div>
            <div className="text-xs font-medium text-stone-600">
              案例突破率：{Math.round((completedScenarioIds.length / SCENARIO_CASES.length) * 100)}%
            </div>
          </div>

        </div>

        {/* Detailed Quiz Breakdown & Error Log */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900">
              一、模擬測驗作答明細與原理解析
            </h3>
            {lastQuizResult && (
              <span className="text-xs font-mono text-stone-500">
                作答耗時：{Math.floor(lastQuizResult.timeSpentSeconds / 60)} 分 {lastQuizResult.timeSpentSeconds % 60} 秒
              </span>
            )}
          </div>

          {lastQuizResult ? (
            <div className="space-y-3">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const answerRec = lastQuizResult.answers.find(a => a.questionId === q.id);
                const isCorrect = answerRec?.isCorrect;
                const userOpt = answerRec?.selectedOption ?? -1;

                return (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/40 text-xs space-y-1.5 page-break-inside-avoid"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-stone-900">
                        {idx + 1}. {q.question}
                      </div>
                      <div className="shrink-0 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 正確 (+5分)
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> 錯誤 (0分)
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>學生選擇：<strong>{userOpt >= 0 ? `(${String.fromCharCode(65 + userOpt)}) ${q.options[userOpt]}` : '未作答'}</strong></span>
                      <span>標準答案：<strong className="text-emerald-800">({String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}</strong></span>
                      <span className="text-stone-400">出處：{q.slideRef}</span>
                    </div>

                    <div className="text-stone-500 bg-white p-2 rounded-lg border border-stone-100">
                      <strong>原理解析：</strong>{q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
              <p className="text-xs text-stone-500">目前尚無模擬測驗紀錄，請先前往測驗模組作答。</p>
              <button
                onClick={onNavigateToQuiz}
                className="no-print px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors shadow-xs"
              >
                前往參加模擬測驗
              </button>
            </div>
          )}
        </div>

        {/* Section Two: Scenario Case Assessment Records */}
        <div className="space-y-4 pt-4 border-t border-stone-200 page-break-inside-avoid">
          <h3 className="text-base font-bold text-stone-900">
            二、廚藝實務情境診斷實績
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {SCENARIO_CASES.map((sc, i) => {
              const isPassed = completedScenarioIds.includes(sc.id);
              return (
                <div 
                  key={sc.id}
                  className={`p-3.5 rounded-xl border ${
                    isPassed ? 'border-emerald-200 bg-emerald-50/20' : 'border-stone-200 bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-stone-900 mb-1">
                    <span>案例 {i + 1}：{sc.title}</span>
                    <span className={isPassed ? 'text-emerald-700' : 'text-stone-400'}>
                      {isPassed ? '已合格' : '未診斷'}
                    </span>
                  </div>
                  <div className="text-stone-500 line-clamp-2">
                    {sc.culinarySolution}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Three: Instructor Evaluation & Stamp Section */}
        <div className="pt-8 border-t-2 border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-8 page-break-inside-avoid">
          
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-800">任課教師評語與學習建議：</div>
            <div className="h-24 p-3 rounded-xl border border-dashed border-stone-300 bg-stone-50/50 text-xs text-stone-400">
              {score >= 80 ? (
                <span className="text-stone-700">該生在第3章肉類構造、死後生物化學與烹調嫩化技術表現卓越，理論與廚藝實務連結緊密，准予通過本單元考核。</span>
              ) : (
                <span className="text-stone-400">請指導教師於此處簽署具體改進指導建議...</span>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between items-end text-right space-y-4">
            <div className="space-y-1">
              <div className="text-xs text-stone-500">評量機構 / 課程名稱</div>
              <div className="text-xs font-bold text-stone-800">國立高雄餐旅大學 / 食品營養與廚藝科學組</div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-2 border-amber-800 text-amber-800 flex flex-col items-center justify-center font-bold text-[10px] uppercase tracking-wider rotate-[-12deg]">
                  <span>肉類學堂</span>
                  <span className="text-xs">合格檢定</span>
                  <span>VERIFIED</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-stone-500">授課教師簽章：</div>
                <div className="w-36 border-b border-stone-400 h-6"></div>
                <div className="text-[10px] text-stone-400">中華民國 {new Date().getFullYear() - 1911} 年 {new Date().getMonth() + 1} 月 {new Date().getDate()} 日</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
