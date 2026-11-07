import React from 'react';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, User, BookOpen, Layers, CheckCircle2, FlaskConical, FileText } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  student: StudentProfile;
  onOpenProfile: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  student,
  onOpenProfile,
  isMuted,
  onToggleSound
}) => {
  const navItems = [
    { id: 'guide', label: '章節講義', icon: BookOpen },
    { id: 'flashcards', label: '學習字卡', icon: Layers },
    { id: 'quiz', label: '模擬測驗', icon: CheckCircle2 },
    { id: 'scenario', label: '情境分析', icon: FlaskConical },
    { id: 'report', label: 'PDF輸出', icon: FileText },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setCurrentTab(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button 
              onClick={() => handleNavClick('guide')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-700 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-amber-800 transition-colors">
                肉
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap">
                  肉類科學與烹調學堂
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-medium text-stone-500">
                  第3章全方位數位學習
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Student profile trigger & Sound effect controller */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Audio toggle */}
            <button
              onClick={onToggleSound}
              title={isMuted ? '開啟答題音效' : '靜音'}
              className={`p-2 rounded-lg border transition-colors ${
                isMuted
                  ? 'border-stone-300 text-stone-400 bg-stone-50 hover:text-stone-700'
                  : 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100'
              }`}
              aria-label={isMuted ? '開啟音效' : '靜音'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Student ID & Name Quick Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProfile();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 hover:border-stone-300 transition-colors text-xs text-stone-800"
            >
              <User className="w-3.5 h-3.5 text-amber-700" />
              <div className="text-left flex items-center gap-1.5">
                <span className="font-semibold text-stone-900">{student.studentName || '未登錄'}</span>
                <span className="text-stone-400 font-mono">({student.studentId || '無學號'})</span>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 border-t border-stone-100 gap-1 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-semibold'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
