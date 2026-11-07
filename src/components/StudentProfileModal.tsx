import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { soundManager } from '../utils/audio';
import { X, Check, GraduationCap, Volume2, Sparkles } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onSave: (updated: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onSave
}) => {
  const [formData, setFormData] = useState<StudentProfile>(student);
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playCorrect();
    onSave(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 500);
  };

  const handleTestAudio = () => {
    soundManager.playCorrect();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">學生身份與學習檔案登錄</h2>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-stone-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-stone-500 leading-relaxed">
            請輸入學生學號與姓名。此資訊將自動同步於<span className="text-amber-800 font-semibold">隨堂測驗評分卷</span>、<span className="text-amber-800 font-semibold">情境案例診斷表</span>以及<span className="text-amber-800 font-semibold">PDF學習證書與成績單</span>。
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                學生學號 (Student ID) <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="例如：11250301"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                學生姓名 (Student Name) <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="例如：王小美"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  科系 / 學院
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="餐旅管理系"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  年級 / 班組
                </label>
                <input
                  type="text"
                  value={formData.classGroup}
                  onChange={(e) => setFormData({ ...formData, classGroup: e.target.value })}
                  placeholder="二技三年甲班"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Test Sound section */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">測驗答題音效測試</span>
            <button
              type="button"
              onClick={handleTestAudio}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              試聽答對音效
            </button>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-colors"
            >
              {showSavedToast ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  已儲存！
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  確認並儲存檔案
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
