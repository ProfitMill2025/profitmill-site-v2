'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  parseFile,
  autoDetectColumns,
  transformForPlatform,
  toCSV,
  platformFormats,
  type ColumnMapping,
  type FieldType,
} from '../utils/converter';

/* ── Flat SVG field-type icons (16×16 viewBox) ── */
const FieldIcon = ({ type }: { type: string }) => {
  const cls = "w-3.5 h-3.5 flex-shrink-0";
  const s = { stroke: '#006840', strokeWidth: '1.5', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

  switch (type) {
    case 'email':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="2" y="4" width="12" height="8" rx="1.5" {...s}/><path d="M2 5l6 4 6-4" {...s}/></svg>;
    case 'phone':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="4.5" y="1.5" width="7" height="13" rx="1.5" {...s}/><line x1="6.5" y1="12" x2="9.5" y2="12" {...s}/></svg>;
    case 'firstName':
    case 'lastName':
    case 'fullName':
      return <svg viewBox="0 0 16 16" className={cls}><circle cx="8" cy="5" r="2.5" {...s}/><path d="M3 14c0-2.8 2.2-5 5-5s5 2.2 5 5" {...s}/></svg>;
    case 'companyName':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="2" y="3" width="12" height="11" rx="1" {...s}/><line x1="6" y1="3" x2="6" y2="14" {...s}/><line x1="10" y1="3" x2="10" y2="14" {...s}/><line x1="2" y1="7" x2="14" y2="7" {...s}/><line x1="2" y1="11" x2="14" y2="11" {...s}/></svg>;
    case 'companyDomain':
      return <svg viewBox="0 0 16 16" className={cls}><circle cx="8" cy="8" r="6" {...s}/><ellipse cx="8" cy="8" rx="3" ry="6" {...s}/><line x1="2" y1="8" x2="14" y2="8" {...s}/></svg>;
    case 'jobTitle':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="2" y="6" width="12" height="8" rx="1" {...s}/><path d="M5 6V4a3 3 0 016 0v2" {...s}/></svg>;
    case 'industry':
      return <svg viewBox="0 0 16 16" className={cls}><path d="M2 14V6l4-3v3l4-3v3l4-3v11H2z" {...s}/></svg>;
    case 'fullAddress':
    case 'street':
    case 'city':
    case 'state':
    case 'zip':
      return <svg viewBox="0 0 16 16" className={cls}><path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" {...s}/><circle cx="8" cy="6" r="1.5" {...s}/></svg>;
    case 'country':
      return <svg viewBox="0 0 16 16" className={cls}><circle cx="8" cy="8" r="6" {...s}/><path d="M2 8h12M8 2c-2 2-2 10 0 12M8 2c2 2 2 10 0 12" {...s}/></svg>;
    case 'linkedinUrl':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="2" y="2" width="12" height="12" rx="2" {...s}/><line x1="5.5" y1="7" x2="5.5" y2="11" {...s}/><circle cx="5.5" cy="5" r="0.5" fill="#006840" stroke="none"/><path d="M8 11V8.5c0-1 .8-1.5 1.5-1.5s1.5.5 1.5 1.5V11" {...s}/></svg>;
    case 'twitterHandle':
      return <svg viewBox="0 0 16 16" className={cls}><path d="M9.3 3h2.2l-3.5 4 4.1 5.5h-2.2l-2.5-3.3L4.6 12.5H2.4l3.7-4.3L2 3.5h2.3l2.3 3L9.3 3z" {...s}/></svg>;
    case 'dob':
      return <svg viewBox="0 0 16 16" className={cls}><rect x="2" y="4" width="12" height="10" rx="1.5" {...s}/><line x1="2" y1="7" x2="14" y2="7" {...s}/><line x1="5" y1="2" x2="5" y2="5" {...s}/><line x1="11" y1="2" x2="11" y2="5" {...s}/></svg>;
    case 'gender':
      return <svg viewBox="0 0 16 16" className={cls}><circle cx="6" cy="9" r="3" {...s}/><line x1="6" y1="12" x2="6" y2="15" {...s}/><line x1="4.5" y1="13.5" x2="7.5" y2="13.5" {...s}/><circle cx="11" cy="5" r="3" {...s}/><line x1="13" y1="1" x2="13" y2="4" {...s}/><line x1="11" y1="3" x2="13" y2="1" {...s}/></svg>;
    case 'ignore':
      return <svg viewBox="0 0 16 16" className={cls}><line x1="4" y1="8" x2="12" y2="8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/></svg>;
    default:
      return <svg viewBox="0 0 16 16" className={cls}><circle cx="8" cy="8" r="6" {...s}/></svg>;
  }
};

const fieldTypeLabels: Record<FieldType, string> = {
  email: 'Email',
  phone: 'Phone',
  firstName: 'First Name',
  lastName: 'Last Name',
  fullName: 'Full Name (to split)',
  companyName: 'Company Name',
  companyDomain: 'Company Domain/URL',
  jobTitle: 'Job Title',
  industry: 'Industry',
  fullAddress: 'Full Address (to parse)',
  street: 'Street',
  city: 'City',
  state: 'State',
  zip: 'Zip Code',
  country: 'Country',
  linkedinUrl: 'LinkedIn URL',
  twitterHandle: 'X/Twitter Handle',
  dob: 'Date of Birth',
  gender: 'Gender',
  ignore: 'Skip / Ignore',
};

const allFieldTypes: FieldType[] = Object.keys(fieldTypeLabels) as FieldType[];

/* ── Inline SVG micro-icons ── */
const CheckSvg = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
    <circle cx="8" cy="8" r="7" fill="#006840" />
    <path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);
const WarnSvg = () => (
  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5">
    <path d="M8 1.5l6.5 12H1.5z" fill="none" stroke="#D97706" strokeWidth="1.3" strokeLinejoin="round"/>
    <line x1="8" y1="6" x2="8" y2="9" stroke="#D97706" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="8" cy="11" r="0.5" fill="#D97706"/>
  </svg>
);
const LockSvg = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
const TrashSvg = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
const ScissorsSvg = () => (
  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="#006840" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="4" r="2" /><circle cx="5" cy="12" r="2" /><line x1="12" y1="2" x2="6.5" y2="5.5" /><line x1="12" y1="14" x2="6.5" y2="10.5" />
  </svg>
);
const PinSvg = () => (
  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="#006840" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z" /><circle cx="8" cy="6" r="1.5" />
  </svg>
);
const PhoneSvg = () => (
  <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none" stroke="#006840" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4.5" y="1.5" width="7" height="13" rx="1.5" /><line x1="6.5" y1="12" x2="9.5" y2="12" />
  </svg>
);

export default function AudienceConverter() {
  const [step, setStep] = useState<'upload' | 'map' | 'export'>('upload');
  const [fileName, setFileName] = useState('');
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [rawRows, setRawRows] = useState<string[][]>([]);
  const [mappings, setMappings] = useState<ColumnMapping[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('google_customer_match');
  const [error, setError] = useState('');
  const [transformedData, setTransformedData] = useState<{ headers: string[]; rows: string[][] } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearAllData = useCallback(() => {
    setStep('upload');
    setFileName('');
    setRawHeaders([]);
    setRawRows([]);
    setMappings([]);
    setTransformedData(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleFileLoaded = useCallback((data: { headers: string[]; rows: string[][] }) => {
    setRawHeaders(data.headers);
    setRawRows(data.rows);
    const detected = autoDetectColumns(data.headers, data.rows.slice(0, 10));
    setMappings(detected);
    setError('');
    setStep('map');
  }, []);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setError('');
    parseFile(file, handleFileLoaded, setError);
  }, [handleFileLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const updateMapping = (index: number, fieldType: FieldType) => {
    setMappings((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], fieldType, confidence: 1 };
      return updated;
    });
  };

  const handleTransform = () => {
    const rowObjects = rawRows.map((row) => {
      const obj: Record<string, string> = {};
      rawHeaders.forEach((h, i) => {
        obj[h] = row[i] || '';
      });
      return obj;
    });
    const result = transformForPlatform(rowObjects, mappings, selectedPlatform);
    setTransformedData(result);
    setStep('export');
  };

  const handleDownload = () => {
    if (!transformedData) return;
    const csvContent = toCSV(transformedData.headers, transformedData.rows);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const platform = platformFormats.find((f) => f.id === selectedPlatform);
    a.href = url;
    a.download = `${platform?.id || 'audience'}_upload_ready.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-xl font-bold mb-2" style={{ color: '#001109' }}>
          Audience Data Converter
        </h2>
        <p className="text-sm opacity-70 mb-3">
          Upload raw customer data and convert it to the exact format required for each ad platform. Handles name splitting, address parsing, phone normalization, and more.
        </p>

        {/* Security Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: '#F0FFF4', border: '1px solid #006840', color: '#006840' }}
        >
          <LockSvg />
          All processing happens locally — no data leaves your browser
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-6">
        {['Upload File', 'Map Columns', 'Export'].map((label, i) => {
          const stepIndex = ['upload', 'map', 'export'].indexOf(step);
          const isActive = i === stepIndex;
          const isDone = i < stepIndex;
          return (
            <React.Fragment key={label}>
              {i > 0 && <div className="flex-1 h-0.5" style={{ backgroundColor: isDone || isActive ? '#006840' : '#e5e7eb' }} />}
              <div className="flex items-center gap-1.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: isActive ? '#006840' : isDone ? '#B6FFCE' : '#f3f4f6',
                    color: isActive ? '#ffffff' : isDone ? '#006840' : '#9ca3af',
                  }}
                >
                  {isDone ? (
                    <svg viewBox="0 0 16 16" className="w-3 h-3">
                      <path d="M4 8l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className="text-xs font-medium" style={{ color: isActive ? '#006840' : '#6b7280' }}>
                  {label}
                </span>
              </div>
            </React.Fragment>
          );
        })}
        <div className="flex-1" />
        {step !== 'upload' && (
          <button
            onClick={clearAllData}
            className="px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-100 bg-transparent inline-flex items-center gap-1"
            style={{ color: '#DC2626' }}
          >
            <TrashSvg />
            Clear All Data
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-xs font-medium flex items-center gap-2" style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
          <WarnSvg />
          {error}
        </div>
      )}

      {/* STEP 1: UPLOAD */}
      {step === 'upload' && (
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${dragOver ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-400'}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={dragOver ? { borderColor: '#006840', backgroundColor: '#F0FFF4' } : {}}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls,.tsv,.txt"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#B6FFCE' }}
            >
              <svg className="w-8 h-8" fill="none" stroke="#006840" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold" style={{ color: '#001109' }}>
                Drop your file here or click to browse
              </p>
              <p className="text-xs opacity-60 mt-1">
                Supports CSV, TSV, Excel (.xlsx, .xls) — No file size limit
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'upload' && (
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          {[
            { icon: <ScissorsSvg />, title: 'Smart Name Splitting', desc: 'Automatically splits "John Smith" into separate First Name and Last Name fields. Handles prefixes (Dr., Mr.) and suffixes (Jr., PhD).' },
            { icon: <PinSvg />, title: 'Address Parsing', desc: 'Breaks full addresses like "123 Main St, San Francisco, CA 94105" into Street, City, State, Zip, and Country.' },
            { icon: <PhoneSvg />, title: 'Phone Normalization', desc: 'Converts any phone format ((555) 123-4567, 555.123.4567) into E.164 format (+15551234567) required by ad platforms.' },
          ].map((feature) => (
            <div key={feature.title} className="p-3 rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
              <div className="mb-1.5">{feature.icon}</div>
              <h4 className="text-xs font-semibold mb-1" style={{ color: '#001109' }}>{feature.title}</h4>
              <p className="text-[10px] opacity-60">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* STEP 2: MAP COLUMNS */}
      {step === 'map' && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg viewBox="0 0 16 16" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#006840" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="12" height="12" rx="1.5" /><line x1="2" y1="6" x2="14" y2="6" /><line x1="6" y1="6" x2="6" y2="14" />
            </svg>
            <p className="text-sm font-medium" style={{ color: '#001109' }}>
              <strong>{fileName}</strong> — {rawRows.length.toLocaleString()} rows, {rawHeaders.length} columns
            </p>
          </div>

          {/* Raw data preview */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
              Raw Data Preview (first 5 rows)
            </h4>
            <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#F8FFF5' }}>
                    {rawHeaders.map((h, i) => (
                      <th key={i} className="text-[10px] font-semibold whitespace-nowrap text-left px-3 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rawRows.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="text-[10px] whitespace-nowrap max-w-[200px] truncate px-3 py-1.5">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column Mapping */}
          <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
            Column Mapping — verify and adjust
          </h4>
          <div className="grid gap-2 mb-5">
            {mappings.map((mapping, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-2.5 rounded-lg border"
                style={{
                  borderColor: mapping.fieldType === 'ignore' ? '#e5e7eb' : '#B6FFCE',
                  backgroundColor: mapping.fieldType === 'ignore' ? '#fafafa' : '#F8FFF5',
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: '#001109' }}>
                    {mapping.sourceColumn}
                  </div>
                  <div className="text-[10px] opacity-50 truncate">
                    Sample: {rawRows[0]?.[idx] || '(empty)'}
                  </div>
                </div>
                <svg className="w-4 h-4 flex-shrink-0 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="flex items-center gap-1.5 min-w-[200px]">
                  <FieldIcon type={mapping.fieldType} />
                  <select
                    className="appearance-none border border-gray-300 rounded-lg px-3 py-1.5 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
                    value={mapping.fieldType}
                    onChange={(e) => updateMapping(idx, e.target.value as FieldType)}
                  >
                    {allFieldTypes.map((ft) => (
                      <option key={ft} value={ft}>{fieldTypeLabels[ft]}</option>
                    ))}
                  </select>
                </div>
                {mapping.confidence >= 0.7 && mapping.fieldType !== 'ignore' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ backgroundColor: '#B6FFCE', color: '#006840' }}>
                    <CheckSvg />
                    auto
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Platform Selection */}
          <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
            Target Platform
          </h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
            {platformFormats.map((pf) => (
              <button
                key={pf.id}
                onClick={() => setSelectedPlatform(pf.id)}
                className="p-3 rounded-lg border text-left transition-all"
                style={{
                  borderColor: selectedPlatform === pf.id ? '#006840' : '#e5e7eb',
                  backgroundColor: selectedPlatform === pf.id ? '#F0FFF4' : '#ffffff',
                }}
              >
                <div className="text-xs font-semibold" style={{ color: '#001109' }}>{pf.name}</div>
                <div className="text-[10px] opacity-60 mt-0.5">{pf.description}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {pf.fields.filter((f) => f.required).map((f) => (
                    <span key={f.key} className="text-[9px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FFBA0A', color: '#7A5800' }}>
                      {f.label} (req)
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep('upload')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-100 bg-transparent"
            >
              ← Back
            </button>
            <button
              onClick={handleTransform}
              className="px-3 py-1.5 rounded-lg font-medium text-sm text-white"
              style={{ backgroundColor: '#006840', borderColor: '#006840' }}
            >
              Transform &amp; Preview →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EXPORT */}
      {step === 'export' && transformedData && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckSvg />
            <p className="text-sm font-medium" style={{ color: '#001109' }}>
              Transformed for <strong>{platformFormats.find((f) => f.id === selectedPlatform)?.name}</strong>
              {' — '}{transformedData.rows.length.toLocaleString()} rows ready
            </p>
          </div>

          {/* Transformed preview */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: '#006840' }}>
              Transformed Data Preview (first 10 rows)
            </h4>
            <div className="overflow-x-auto rounded-lg border" style={{ borderColor: '#e5e7eb' }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#001109' }}>
                    {transformedData.headers.map((h, i) => (
                      <th key={i} className="text-[10px] font-semibold text-white whitespace-nowrap text-left px-3 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transformedData.rows.slice(0, 10).map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#ffffff' : '#F8FFF5' }}>
                      {row.map((cell, j) => (
                        <td key={j} className="text-[10px] whitespace-nowrap max-w-[200px] truncate px-3 py-1.5">{cell || <span className="opacity-30">—</span>}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#F0FFF4', border: '1px solid #B6FFCE' }}>
              <div className="text-lg font-bold" style={{ color: '#006840' }}>{transformedData.rows.length.toLocaleString()}</div>
              <div className="text-[10px] opacity-60">Total Rows</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#F0FFF4', border: '1px solid #B6FFCE' }}>
              <div className="text-lg font-bold" style={{ color: '#006840' }}>{transformedData.headers.length}</div>
              <div className="text-[10px] opacity-60">Columns</div>
            </div>
            <div className="p-3 rounded-lg text-center" style={{ backgroundColor: '#F0FFF4', border: '1px solid #B6FFCE' }}>
              <div className="text-lg font-bold" style={{ color: '#006840' }}>
                {transformedData.rows.filter((r) => r[0] !== '').length.toLocaleString()}
              </div>
              <div className="text-[10px] opacity-60">With Primary Field</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setStep('map')}
              className="px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-100 bg-transparent"
            >
              ← Back to Mapping
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg font-medium text-sm text-white inline-flex items-center gap-1.5"
              style={{ backgroundColor: '#006840', borderColor: '#006840' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Platform-Ready CSV
            </button>
            <button
              onClick={clearAllData}
              className="px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-gray-100 bg-transparent inline-flex items-center gap-1"
              style={{ color: '#DC2626' }}
            >
              <TrashSvg />
              Clear All Data
            </button>
          </div>

          {/* Security reminder */}
          <div className="mt-4 p-2.5 rounded-lg flex items-center gap-2 text-[10px]" style={{ backgroundColor: '#F0FFF4', border: '1px solid #B6FFCE', color: '#006840' }}>
            <LockSvg />
            <span>Your data was processed entirely in your browser. Nothing was sent to any server. Closing or refreshing this page will erase all data from memory.</span>
          </div>
        </div>
      )}
    </div>
  );
}
