import React, { useState, useEffect } from 'react';
import { StudentProfile, QuizResult } from './types';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { StudentProfileModal } from './components/StudentProfileModal';
import { KnowledgeGuide } from './components/KnowledgeGuide';
import { FlashcardsDeck } from './components/FlashcardsDeck';
import { QuizModule } from './components/QuizModule';
import { ScenarioAnalysis } from './components/ScenarioAnalysis';
import { PrintableReport } from './components/PrintableReport';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('guide');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getIsMuted());

  // Student Profile State
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('meat_study_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      studentId: '11250301',
      studentName: '王小美',
      department: '餐旅管理系',
      classGroup: '食品科學與廚藝組'
    };
  });

  // Mastered & Bookmarked Flashcards
  const [masteredFlashcardIds, setMasteredFlashcardIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('meat_study_mastered_flashcards');
    return saved ? JSON.parse(saved) : ['fc-1', 'fc-4'];
  });

  const [bookmarkedFlashcardIds, setBookmarkedFlashcardIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('meat_study_bookmarked_flashcards');
    return saved ? JSON.parse(saved) : [];
  });

  // Completed Scenario Cases
  const [completedScenarioIds, setCompletedScenarioIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('meat_study_completed_scenarios');
    return saved ? JSON.parse(saved) : ['case-3'];
  });

  // Last Quiz Result
  const [lastQuizResult, setLastQuizResult] = useState<QuizResult | null>(() => {
    const saved = localStorage.getItem('meat_study_last_quiz_result');
    return saved ? JSON.parse(saved) : null;
  });

  // Save student profile
  const handleSaveStudent = (updated: StudentProfile) => {
    setStudent(updated);
    localStorage.setItem('meat_study_student_profile', JSON.stringify(updated));
  };

  // Toggle flashcard mastery
  const handleToggleMastered = (id: string) => {
    setMasteredFlashcardIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('meat_study_mastered_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle flashcard bookmark
  const handleToggleBookmarked = (id: string) => {
    setBookmarkedFlashcardIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('meat_study_bookmarked_flashcards', JSON.stringify(updated));
      return updated;
    });
  };

  // Mark scenario completed
  const handleCompleteScenario = (caseId: string) => {
    setCompletedScenarioIds((prev) => {
      if (!prev.includes(caseId)) {
        const updated = [...prev, caseId];
        localStorage.setItem('meat_study_completed_scenarios', JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  // Save Quiz Result
  const handleSaveQuizResult = (result: QuizResult) => {
    setLastQuizResult(result);
    localStorage.setItem('meat_study_last_quiz_result', JSON.stringify(result));
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const updatedMute = soundManager.toggleMute();
    setIsMuted(updatedMute);
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900">
      
      {/* Header with Top Bar Contract */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        student={student}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'guide' && <KnowledgeGuide />}
        
        {currentTab === 'flashcards' && (
          <FlashcardsDeck
            masteredIds={masteredFlashcardIds}
            onToggleMastered={handleToggleMastered}
            bookmarkedIds={bookmarkedFlashcardIds}
            onToggleBookmarked={handleToggleBookmarked}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizModule
            student={student}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onSaveQuizResult={handleSaveQuizResult}
            onNavigateToReport={() => setCurrentTab('report')}
            lastResult={lastQuizResult}
          />
        )}

        {currentTab === 'scenario' && (
          <ScenarioAnalysis
            completedCaseIds={completedScenarioIds}
            onCompleteCase={handleCompleteScenario}
          />
        )}

        {currentTab === 'report' && (
          <PrintableReport
            student={student}
            lastQuizResult={lastQuizResult}
            masteredFlashcardIds={masteredFlashcardIds}
            bookmarkedFlashcardIds={bookmarkedFlashcardIds}
            completedScenarioIds={completedScenarioIds}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            onNavigateToQuiz={() => setCurrentTab('quiz')}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="no-print border-t border-stone-200 bg-white/70 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">肉類科學與烹調學堂</span>
            <span aria-hidden="true">·</span>
            <span>教學教材：第3章 肉類 (CH03-1 ~ CH03-3)</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>學生學號：{student.studentId || '未設定'}</span>
            <span aria-hidden="true">·</span>
            <span>姓名：{student.studentName || '未設定'}</span>
            <span aria-hidden="true">·</span>
            <span>© 2026 數位教學輔助系統</span>
          </div>
        </div>
      </footer>

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        student={student}
        onSave={handleSaveStudent}
      />

    </div>
  );
}
