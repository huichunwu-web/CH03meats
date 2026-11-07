import React, { useState, useEffect, useMemo } from 'react';
import { Flashcard, ChapterCategory } from '../types';
import { FLASHCARDS, CATEGORIES } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  Bookmark, 
  Search,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface FlashcardsDeckProps {
  masteredIds: string[];
  onToggleMastered: (id: string) => void;
  bookmarkedIds: string[];
  onToggleBookmarked: (id: string) => void;
}

export const FlashcardsDeck: React.FC<FlashcardsDeckProps> = ({
  masteredIds,
  onToggleMastered,
  bookmarkedIds,
  onToggleBookmarked
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [filterOnlyBookmarked, setFilterOnlyBookmarked] = useState<boolean>(false);

  // Filtered flashcard list
  const filteredCards = useMemo(() => {
    return FLASHCARDS.filter((card) => {
      const matchCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.back.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.details.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchBookmark = !filterOnlyBookmarked || bookmarkedIds.includes(card.id);
      return matchCategory && matchSearch && matchBookmark;
    });
  }, [selectedCategory, searchQuery, filterOnlyBookmarked, bookmarkedIds]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, searchQuery, filterOnlyBookmarked]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleFlip = () => {
    soundManager.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    soundManager.playClick();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    soundManager.playClick();
    if (filteredCards.length > 1) {
      const randomIdx = Math.floor(Math.random() * filteredCards.length);
      setIsFlipped(false);
      setCurrentIndex(randomIdx);
    }
  };

  const handleToggleMaster = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleMastered(id);
    if (!masteredIds.includes(id)) {
      soundManager.playCorrect();
    } else {
      soundManager.playClick();
    }
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    onToggleBookmarked(id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleFlip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredCards.length, isFlipped]);

  const masteredCount = FLASHCARDS.filter(c => masteredIds.includes(c.id)).length;
  const progressPercent = Math.round((masteredCount / FLASHCARDS.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Banner & Mastery Progress */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🗂️</span>
              <h2 className="text-lg font-bold text-stone-900">第3章 肉類科學·學習字卡</h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              精選 24 組高頻核心考點卡片，點擊翻轉揭曉答案與原理解析，支持左右鍵切換與空白鍵翻轉。
            </p>
          </div>

          <div className="sm:text-right shrink-0">
            <div className="text-xs font-medium text-stone-500">
              全章節精通進度：
              <span className="font-bold text-amber-700 ml-1 font-mono text-sm">{masteredCount}</span> / {FLASHCARDS.length} 組
              <span className="ml-1 text-stone-400">({progressPercent}%)</span>
            </div>
            <div className="w-full sm:w-48 h-2 bg-stone-100 rounded-full mt-1.5 overflow-hidden border border-stone-200">
              <div 
                className="h-full bg-amber-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              全部章節 ({FLASHCARDS.length})
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search & Bookmark Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="搜尋考點關鍵字..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-stone-50"
              />
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setFilterOnlyBookmarked(!filterOnlyBookmarked);
              }}
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                filterOnlyBookmarked
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
              title="僅顯示收藏卡片"
            >
              <Bookmark className={`w-3.5 h-3.5 ${filterOnlyBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
              <span className="hidden sm:inline">收藏 ({bookmarkedIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="space-y-4">
          
          {/* Card Frame */}
          <div 
            onClick={handleFlip}
            className="cursor-pointer group relative min-h-[340px] sm:min-h-[360px] bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Card Header & Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-amber-800">{currentCard.categoryName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-stone-400">{currentCard.slideRef}</span>
              </div>

              {/* Action buttons on card */}
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => handleToggleBookmark(currentCard.id, e)}
                  title={bookmarkedIds.includes(currentCard.id) ? '取消收藏' : '收藏字卡'}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarkedIds.includes(currentCard.id)
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedIds.includes(currentCard.id) ? 'fill-amber-600' : ''}`} />
                </button>

                <button
                  onClick={(e) => handleToggleMaster(currentCard.id, e)}
                  title={masteredIds.includes(currentCard.id) ? '標記為未精通' : '標記為已精通'}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    masteredIds.includes(currentCard.id)
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${masteredIds.includes(currentCard.id) ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                  <span>{masteredIds.includes(currentCard.id) ? '已掌握' : '記住了'}</span>
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="py-6 sm:py-8 flex-1 flex flex-col justify-center">
              {!isFlipped ? (
                /* Front Side */
                <div className="space-y-4 text-center max-w-xl mx-auto">
                  {currentCard.subTitle && (
                    <span className="text-xs uppercase tracking-wider font-semibold text-amber-700">
                      {currentCard.subTitle}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                    {currentCard.front}
                  </h3>
                  <div className="pt-4 flex items-center justify-center gap-1.5 text-xs text-stone-400">
                    <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                    <span>點擊卡片查看解析與科學機制</span>
                  </div>
                </div>
              ) : (
                /* Back Side */
                <div className="space-y-4 text-left max-w-2xl mx-auto animate-in fade-in duration-200">
                  <div className="bg-amber-50/70 border border-amber-100 rounded-xl p-3.5">
                    <div className="text-xs font-semibold text-amber-900 mb-0.5">核心結論</div>
                    <div className="text-sm font-bold text-stone-900">{currentCard.back}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-stone-600">講義詳細要點：</div>
                    <ul className="space-y-1.5">
                      {currentCard.details.map((detail, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-2">
                          <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span><strong className="text-stone-800">應試重點：</strong>{currentCard.keyTakeaway}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between text-xs text-stone-400 border-t border-stone-100 pt-3">
              <span className="font-mono">
                卡片 {currentIndex + 1} / {filteredCards.length}
              </span>
              <span className="flex items-center gap-1">
                <RotateCw className="w-3 h-3" />
                {isFlipped ? '點擊翻回問題面' : '點擊翻轉看答案'}
              </span>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              上一張 (←)
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors"
                title="隨機抽卡"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>隨機</span>
              </button>

              <button
                onClick={handleFlip}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-xl shadow-xs transition-colors"
              >
                <RotateCw className="w-3.5 h-3.5" />
                翻轉 (Space)
              </button>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              下一張 (→)
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">查無符合條件的字卡</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            在「{selectedCategory === 'all' ? '全部章節' : selectedCategory}」中未找到包含關鍵字「{searchQuery}」的卡片。
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setFilterOnlyBookmarked(false);
            }}
            className="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
          >
            重設篩選條件
          </button>
        </div>
      )}

    </div>
  );
};
