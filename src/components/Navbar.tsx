import React from 'react';
import { Download, Sparkles, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onDownload: () => void;
  onFillSample: () => void;
  onClear: () => void;
  hasData: boolean;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownload,
  onFillSample,
  onClear,
  hasData,
  activeTab,
  onSelectTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
              DocuFill Studio
            </span>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => onSelectTab('branch')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
                activeTab === 'branch' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Branch & CIF
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('personal')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
                activeTab === 'personal' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Personal Details
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('address')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
                activeTab === 'address' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Address & KYC
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('services')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
                activeTab === 'services' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Banking Services
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('nomination')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap ${
                activeTab === 'nomination' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              Nomination & Signs
            </button>
          </nav>

          {/* Zone 3: 1 primary action (with secondary action utility) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onFillSample}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors whitespace-nowrap"
              title="Populate all fields with verified sample data"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Fill Sample Data
            </button>

            {hasData && (
              <button
                type="button"
                onClick={onClear}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                title="Clear all fields"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Download Filled PDF
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
