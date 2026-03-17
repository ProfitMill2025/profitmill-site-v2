'use client';

import React, { useState } from 'react';
import { platformData } from '../utils/data';
import type { AudienceType } from '../types';

const platformColors: Record<string, string> = {
  'Google Ads': '#4285F4',
  'LinkedIn Ads': '#0A66C2',
  'Meta (Facebook & Instagram)': '#1877F2',
  'Reddit Ads': '#FF4500',
  'X (Twitter) Ads': '#000000',
};

const platformIcons: Record<string, string> = {
  'Google Ads': 'G',
  'LinkedIn Ads': 'in',
  'Meta (Facebook & Instagram)': 'f',
  'Reddit Ads': 'r/',
  'X (Twitter) Ads': '𝕏',
};

function AudienceCard({ audience, platformColor }: { audience: AudienceType; platformColor: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4 flex items-start gap-3">
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: platformColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-sm" style={{ color: '#001109' }}>
              {audience.name}
            </h3>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <p className="text-xs mt-1 opacity-70 line-clamp-2">{audience.description}</p>

          {!expanded && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#B6FFCE', color: '#00351F' }}>
                Min: {audience.minimumSize.split(';')[0].split('(')[0].trim()}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FFF3D0', color: '#7A5800' }}>
                {audience.bestFor.split(';')[0].substring(0, 50)}{audience.bestFor.length > 50 ? '…' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 ml-4 border-t border-gray-100">
          <div className="grid gap-3 mt-3">
            {/* Data Required */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
                Data Required
              </h4>
              <ul className="space-y-0.5">
                {audience.dataRequired.map((item, i) => (
                  <li key={i} className="text-xs flex items-start gap-1.5">
                    <span style={{ color: '#006840' }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Minimum Size */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
                Minimum Audience Size
              </h4>
              <p className="text-xs">{audience.minimumSize}</p>
            </div>

            {/* Match Identifiers */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
                Match Identifiers
              </h4>
              <div className="flex flex-wrap gap-1">
                {audience.matchIdentifiers.map((id, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: '#E8F5E9', color: '#00351F', border: '1px solid #B6FFCE' }}
                  >
                    {id}
                  </span>
                ))}
              </div>
            </div>

            {/* B2B Notes */}
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#F8FFF5', border: '1px solid #B6FFCE' }}>
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
                B2B-Specific Notes
              </h4>
              <p className="text-xs leading-relaxed">{audience.b2bNotes}</p>
            </div>

            {/* Best For */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#006840' }}>
                Best For
              </h4>
              <p className="text-xs">{audience.bestFor}</p>
            </div>

            {/* Help Link */}
            {audience.helpUrl && (
              <div className="pt-1">
                <a
                  href={audience.helpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                  style={{ color: '#006840' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Official Platform Documentation →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlatformAudiences() {
  const [activePlatform, setActivePlatform] = useState(0);

  return (
    <div>
      {/* Intro */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2" style={{ color: '#001109' }}>
          Ad Platform Audience Types
        </h2>
        <p className="text-sm opacity-70">
          Every audience list type available for B2B advertisers across major paid channels — with data requirements, minimum sizes, match identifiers, and B2B-specific tips.
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {platformData.map((p, idx) => {
          const isActive = idx === activePlatform;
          const color = platformColors[p.platform] || '#006840';
          return (
            <button
              key={p.platform}
              onClick={() => setActivePlatform(idx)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all border"
              style={{
                backgroundColor: isActive ? color : '#ffffff',
                color: isActive ? '#ffffff' : '#001109',
                borderColor: isActive ? color : '#e5e7eb',
              }}
            >
              <span className="font-bold text-sm">{platformIcons[p.platform]}</span>
              {p.platform}
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#f3f4f6',
                  color: isActive ? '#ffffff' : '#6b7280',
                }}
              >
                {p.audienceTypes.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Audience Cards */}
      <div className="grid gap-3">
        {platformData[activePlatform]?.audienceTypes.map((audience, idx) => (
          <AudienceCard
            key={idx}
            audience={audience}
            platformColor={platformColors[platformData[activePlatform].platform] || '#006840'}
          />
        ))}
      </div>
    </div>
  );
}
