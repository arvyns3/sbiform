import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { SbiFormData, InkColor } from './types/formTypes';
import { SAMPLE_SBI_FORM_DATA, EMPTY_FORM_DATA } from './data/sampleData';
import { applySbiOverlay } from './utils/sbiOverlay';
import { Navbar } from './components/Navbar';
import { PdfViewer } from './components/PdfViewer';
import { CustomPdfUploader } from './components/CustomPdfUploader';
import { BranchSection } from './components/FormSections/BranchSection';
import { PersonalSection } from './components/FormSections/PersonalSection';
import { AddressSection } from './components/FormSections/AddressSection';
import { ServicesSection } from './components/FormSections/ServicesSection';
import { NominationSection } from './components/FormSections/NominationSection';
import { PhotoUploader } from './components/PhotoUploader';
import { SignaturePad } from './components/SignaturePad';
import {
  Building2,
  User,
  MapPin,
  Layers,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Info,
  Download,
  Check,
} from 'lucide-react';

const DEFAULT_PDF_PATH = '/assets/aistudio/sbi_account_opening_31b5c984.pdf';

export default function App() {
  const [formData, setFormData] = useState<SbiFormData>(SAMPLE_SBI_FORM_DATA);
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [inkColor, setInkColor] = useState<InkColor>('blue');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(7);

  // PDF bytes state
  const [pdfTemplateBytes, setPdfTemplateBytes] = useState<Uint8Array | null>(null);
  const [currentPdfName, setCurrentPdfName] = useState<string>('sbi_account_opening.pdf');
  const [isCustomPdf, setIsCustomPdf] = useState<boolean>(false);

  // Generated PDF blob URL
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load default SBI PDF template on mount
  useEffect(() => {
    async function loadDefaultPdf() {
      try {
        const response = await fetch(DEFAULT_PDF_PATH);
        if (!response.ok) {
          throw new Error(`Failed to fetch default PDF: ${response.statusText}`);
        }
        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);
        setPdfTemplateBytes(bytes);
        setCurrentPdfName('sbi_account_opening.pdf');
        setIsCustomPdf(false);
      } catch (err) {
        console.error('Error loading default PDF:', err);
      }
    }
    loadDefaultPdf();
  }, []);

  // Generate / overlay filled PDF
  const generateFilledPdf = useCallback(
    async (currentData: SbiFormData, color: InkColor) => {
      if (!pdfTemplateBytes) return;

      setIsGenerating(true);
      try {
        const pdfDoc = await PDFDocument.load(pdfTemplateBytes);
        setTotalPages(pdfDoc.getPageCount());

        // Apply our precise coordinates & data
        await applySbiOverlay(pdfDoc, currentData, color);

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        setPdfBlobUrl((prevUrl) => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl);
          }
          return url;
        });
      } catch (err) {
        console.error('Error generating PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    },
    [pdfTemplateBytes]
  );

  // Debounced auto-generation on form change
  useEffect(() => {
    if (!pdfTemplateBytes) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      generateFilledPdf(formData, inkColor);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData, inkColor, pdfTemplateBytes, generateFilledPdf]);

  const handleFieldChange = <K extends keyof SbiFormData>(key: K, value: SbiFormData[K]) => {
    setFormData((prev) => {
      const next = { ...prev, [key]: value };

      // When sameAsCurrentAddress is toggled ON, mirror current address into correspondence address
      if (key === 'sameAsCurrentAddress' && value === true) {
        next.corrAddressLine1 = prev.addressLine1;
        next.corrAddressLine2 = prev.addressLine2;
        next.corrCityVillage = prev.cityVillage;
        next.corrDistrict = prev.district;
        next.corrState = prev.state;
        next.corrPincode = prev.pincode;
        next.corrCountry = prev.country || 'INDIA';
        next.corrAddressType = prev.addressType;
      } else if (prev.sameAsCurrentAddress) {
        // While sameAsCurrentAddress is active, keep correspondence address continuously synced
        if (key === 'addressLine1') next.corrAddressLine1 = value as string;
        else if (key === 'addressLine2') next.corrAddressLine2 = value as string;
        else if (key === 'cityVillage') next.corrCityVillage = value as string;
        else if (key === 'district') next.corrDistrict = value as string;
        else if (key === 'state') next.corrState = value as string;
        else if (key === 'pincode') next.corrPincode = value as string;
        else if (key === 'country') next.corrCountry = value as string;
        else if (key === 'addressType') next.corrAddressType = value as any;
      }

      return next;
    });
  };

  const handleFillSample = () => {
    setFormData(SAMPLE_SBI_FORM_DATA);
    setStatusMessage('Sample data loaded! All fields and boxes populated.');
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleClearForm = () => {
    if (window.confirm('Clear all fields in the form?')) {
      setFormData(EMPTY_FORM_DATA);
      setStatusMessage('Form cleared.');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleRemoveSignature = () => {
    setFormData((prev) => ({
      ...prev,
      signatureDataUrl: '',
    }));
    setStatusMessage('Inserted signature removed. Signature boxes are now left blank.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDownload = () => {
    if (!pdfBlobUrl) return;
    const namePart = formData.firstName ? `${formData.firstName}_${formData.lastName}` : 'Application';
    const datePart = formData.applicationDate || 'Form';
    const filename = `SBI_Account_Opening_${namePart}_${datePart}.pdf`.replace(/\s+/g, '_');

    const link = document.createElement('a');
    link.href = pdfBlobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setStatusMessage(`Downloaded ${filename} successfully!`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleCustomPdfLoaded = (bytes: Uint8Array, fileName: string) => {
    setPdfTemplateBytes(bytes);
    setCurrentPdfName(fileName);
    setIsCustomPdf(true);
    setStatusMessage(`Loaded custom PDF: ${fileName}`);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleResetToDefaultSbi = async () => {
    try {
      const response = await fetch(DEFAULT_PDF_PATH);
      const buffer = await response.arrayBuffer();
      setPdfTemplateBytes(new Uint8Array(buffer));
      setCurrentPdfName('sbi_account_opening.pdf');
      setIsCustomPdf(false);
      setStatusMessage('Switched back to official SBI form template');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Field stats
  const filledFieldsCount = Object.values(formData).filter((v) => {
    if (typeof v === 'string') return v.trim().length > 0;
    if (typeof v === 'boolean') return true;
    return false;
  }).length;

  const tabs = [
    { id: 'branch', label: '1. Branch & CIF', icon: Building2, page: 1 },
    { id: 'personal', label: '2. Personal Info', icon: User, page: 1 },
    { id: 'address', label: '3. Address & KYC', icon: MapPin, page: 2 },
    { id: 'media', label: '4. Photo & Signature', icon: Camera, page: 2 },
    { id: 'services', label: '5. Banking Services', icon: Layers, page: 3 },
    { id: 'nomination', label: '6. Nomination & Signs', icon: ShieldCheck, page: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">
      {/* Top Header */}
      <Navbar
        onDownload={handleDownload}
        onFillSample={handleFillSample}
        onClear={handleClearForm}
        hasData={Boolean(formData.firstName)}
        activeTab={activeTab}
        onSelectTab={(tabId) => {
          setActiveTab(tabId);
          const t = tabs.find((x) => x.id === tabId);
          if (t) setCurrentPage(t.page);
        }}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Banner with status and stats */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3 border border-slate-200 rounded-xl shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div>
              <h1 className="text-sm font-bold text-slate-900">
                SBI Account Opening Document Engine
              </h1>
              <p className="text-xs text-slate-500">
                Precision letter-box grid filling, vector tick marks, and photo/signature overlay.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{filledFieldsCount} Fields Mapped</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span>{totalPages} Pages</span>
            </div>
            <span className="text-slate-300">|</span>
            {formData.signatureDataUrl ? (
              <button
                type="button"
                onClick={handleRemoveSignature}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
                title="Remove digital signature from document"
              >
                Remove Inserted Sign
              </button>
            ) : (
              <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                Signature: Blank (Physical)
              </span>
            )}
          </div>
        </div>

        {/* Custom PDF switch bar */}
        <CustomPdfUploader
          currentPdfName={currentPdfName}
          isCustomPdf={isCustomPdf}
          onCustomPdfLoaded={handleCustomPdfLoaded}
          onResetToDefaultSbi={handleResetToDefaultSbi}
        />

        {/* Status Toast */}
        {statusMessage && (
          <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-medium animate-fadeIn">
            <Info className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Workspace 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form Controls (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-5">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-1.5 border-b border-slate-200 pb-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentPage(tab.page);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content */}
            <div className="space-y-4">
              {activeTab === 'branch' && (
                <BranchSection formData={formData} onChange={handleFieldChange} />
              )}

              {activeTab === 'personal' && (
                <PersonalSection formData={formData} onChange={handleFieldChange} />
              )}

              {activeTab === 'address' && (
                <AddressSection formData={formData} onChange={handleFieldChange} />
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  <PhotoUploader
                    photoDataUrl={formData.photoDataUrl}
                    onPhotoChange={(url) => handleFieldChange('photoDataUrl', url)}
                  />
                  <div className="border-t border-slate-200 pt-4">
                    <SignaturePad
                      signatureDataUrl={formData.signatureDataUrl}
                      onSignatureChange={(url) => handleFieldChange('signatureDataUrl', url)}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <ServicesSection formData={formData} onChange={handleFieldChange} />
              )}

              {activeTab === 'nomination' && (
                <NominationSection formData={formData} onChange={handleFieldChange} />
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleFillSample}
                className="text-xs text-indigo-700 hover:text-indigo-900 font-semibold"
              >
                Reset to Sample Values
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                Download Filled PDF
              </button>
            </div>
          </div>

          {/* Right Column: High-Precision PDF Viewer (7 cols on lg) */}
          <div className="lg:col-span-7 h-[840px] sticky top-20">
            <PdfViewer
              pdfBlobUrl={pdfBlobUrl}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              onDownload={handleDownload}
              onRefresh={() => generateFilledPdf(formData, inkColor)}
              isGenerating={isGenerating}
              inkColor={inkColor}
              onInkColorChange={(c) => setInkColor(c)}
              fileName={
                formData.firstName
                  ? `SBI_Account_Opening_${formData.firstName}_${formData.lastName}.pdf`
                  : currentPdfName
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
