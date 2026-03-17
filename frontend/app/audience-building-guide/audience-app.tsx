'use client';

import React, { useState } from 'react';
import PlatformAudiences from './components/PlatformAudiences';
import ToolsMatrix from './components/ToolsMatrix';
import AudienceConverter from './components/AudienceConverter';

const tabs = [
  {
    id: 'platforms',
    label: 'Platform Audiences',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    description: 'Audience types by ad platform',
  },
  {
    id: 'tools',
    label: 'Tools Matrix',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    description: '19 B2B audience building tools compared',
  },
  {
    id: 'converter',
    label: 'Data Converter',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    description: 'Convert raw data to platform formats',
  },
];

export default function AudienceApp() {
  const [activeTab, setActiveTab] = useState('platforms');

  return (
    <>
      <style>{`
        .pm-tooltip { position: relative; display: inline-block; cursor: help; }
        .pm-tooltip .pm-tooltip-text {
          visibility: hidden; opacity: 0;
          position: absolute; z-index: 50;
          bottom: 125%; left: 50%; transform: translateX(-50%);
          width: 280px; padding: 8px 12px;
          background: #001109; color: #fff;
          font-size: 11px; line-height: 1.4;
          border-radius: 8px;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .pm-tooltip:hover .pm-tooltip-text { visibility: visible; opacity: 1; }
      `}</style>

      <div style={{ backgroundColor: '#ffffff' }}>
        {/* Header */}
        <div className="border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex items-center gap-3 mb-1">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                style={{ backgroundColor: '#006840' }}
              >
                PM
              </div>
              <div>
                <h1
                  className="text-lg font-bold"
                  style={{ color: '#001109', fontFamily: "'Sora', sans-serif" }}
                >
                  B2B Audience Building Guide
                </h1>
                <p className="text-[11px] opacity-50">
                  Platform audience types • Tools matrix • Data conversion — by ProfitMill
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2"
                    style={{
                      borderBottomColor: isActive ? '#006840' : 'transparent',
                      backgroundColor: isActive ? '#F0FFF4' : 'transparent',
                      color: isActive ? '#006840' : '#6b7280',
                    }}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {activeTab === 'platforms' && <PlatformAudiences />}
          {activeTab === 'tools' && <ToolsMatrix />}
          {activeTab === 'converter' && <AudienceConverter />}
        </div>

        {/* Footer */}
        <div className="border-t mt-8 py-4 px-4" style={{ borderColor: '#e5e7eb' }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] opacity-40">
            <span>© {new Date().getFullYear()} ProfitMill • B2B Audience Building Guide</span>
            <span>Data last updated: March 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
