import React, { useRef } from 'react';
import { Upload, FileText, CheckCircle2, RotateCcw } from 'lucide-react';

interface CustomPdfUploaderProps {
  currentPdfName: string;
  isCustomPdf: boolean;
  onCustomPdfLoaded: (bytes: Uint8Array, fileName: string) => void;
  onResetToDefaultSbi: () => void;
}

export const CustomPdfUploader: React.FC<CustomPdfUploaderProps> = ({
  currentPdfName,
  isCustomPdf,
  onCustomPdfLoaded,
  onResetToDefaultSbi,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      onCustomPdfLoaded(new Uint8Array(buffer), file.name);
    } catch (err) {
      console.error('Error loading custom PDF:', err);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              Active Form: {currentPdfName}
            </span>
            {isCustomPdf ? (
              <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                Custom Upload
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                SBI Account Opening (Part I & II)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500">
            {isCustomPdf
              ? 'Using uploaded custom PDF template'
              : 'Official SBI Resident Individual CIF & Account Opening Document (7 Pages)'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload New PDF
        </button>

        {isCustomPdf && (
          <button
            type="button"
            onClick={onResetToDefaultSbi}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Switch to SBI Default
          </button>
        )}
      </div>
    </div>
  );
};
