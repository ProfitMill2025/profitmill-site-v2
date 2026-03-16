'use client'

import { useState, useCallback, useMemo } from 'react'

/* ── Types ── */
interface Inputs {
  adSpend: number
  cpc: number
  acv: number
  lpConversion: number
  leadToMql: number
  mqlToSql: number
  sqlToOpp: number
  oppToClose: number
}

interface SliderConfig {
  key: keyof Inputs
  label: string
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
  decimals: number
  tooltip: string
}

/* ── Presets ── */
const PRESETS: Record<string, Inputs> = {
  Conservative: { adSpend: 5000, cpc: 5, acv: 5000, lpConversion: 1, leadToMql: 30, mqlToSql: 50, sqlToOpp: 50, oppToClose: 10 },
  Moderate: { adSpend: 20000, cpc: 10, acv: 20000, lpConversion: 3, leadToMql: 50, mqlToSql: 50, sqlToOpp: 60, oppToClose: 20 },
  Aggressive: { adSpend: 50000, cpc: 20, acv: 20000, lpConversion: 5, leadToMql: 50, mqlToSql: 60, sqlToOpp: 75, oppToClose: 40 },
}

const CAMPAIGN_SLIDERS: SliderConfig[] = [
  { key: 'adSpend', label: 'Monthly Ad Spend', min: 0, max: 100000, step: 500, prefix: '$', decimals: 0, tooltip: 'Total monthly budget allocated to paid advertising across all channels.' },
  { key: 'cpc', label: 'Cost Per Click (CPC)', min: 0, max: 50, step: 0.25, prefix: '$', decimals: 2, tooltip: 'Average cost each time someone clicks your ad. Varies by industry and platform.' },
  { key: 'acv', label: 'Average Contract Value', min: 0, max: 250000, step: 1000, prefix: '$', decimals: 0, tooltip: 'Average annual revenue per closed deal, also known as Average Deal Size.' },
]

const FUNNEL_SLIDERS: SliderConfig[] = [
  { key: 'lpConversion', label: 'Landing Page → Lead', min: 0, max: 30, step: 0.5, suffix: '%', decimals: 1, tooltip: 'Percentage of ad clicks that convert into a lead (form fill, demo request, etc).' },
  { key: 'leadToMql', label: 'Lead → MQL', min: 0, max: 80, step: 1, suffix: '%', decimals: 0, tooltip: 'Percentage of leads that qualify as Marketing Qualified Leads based on fit and engagement.' },
  { key: 'mqlToSql', label: 'MQL → SQL', min: 0, max: 80, step: 1, suffix: '%', decimals: 0, tooltip: 'Percentage of MQLs accepted by Sales as Sales Qualified Leads.' },
  { key: 'sqlToOpp', label: 'SQL → Opportunity', min: 0, max: 90, step: 1, suffix: '%', decimals: 0, tooltip: 'Percentage of SQLs that enter your sales pipeline as active opportunities.' },
  { key: 'oppToClose', label: 'Opportunity → Close', min: 0, max: 60, step: 1, suffix: '%', decimals: 0, tooltip: 'Percentage of pipeline opportunities that result in a closed-won deal.' },
]

const FUNNEL_COLORS = ['#00894e', '#007a45', '#006840', '#005635', '#00442a', '#00351F']

/* ── Formatting helpers ── */
function fmtCurrency(v: number, decimals?: number): string {
  if (!isFinite(v)) return '∞'
  const d = decimals !== undefined ? decimals : (Math.abs(v) >= 1000 ? 0 : 2)
  return '$' + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
}

function fmtPct(v: number): string {
  if (!isFinite(v)) return '∞'
  return v.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%'
}

function fmtNum(v: number, d?: number): string {
  if (!isFinite(v)) return '∞'
  const dec = d !== undefined ? d : 0
  return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

/* ── Calculator ── */
function calculate(v: Inputs) {
  const clicks = v.cpc > 0 ? v.adSpend / v.cpc : 0
  const leads = clicks * (v.lpConversion / 100)
  const mqls = leads * (v.leadToMql / 100)
  const sqls = mqls * (v.mqlToSql / 100)
  const opps = sqls * (v.sqlToOpp / 100)
  const deals = opps * (v.oppToClose / 100)
  const revenue = deals * v.acv
  const profit = revenue - v.adSpend
  const roi = v.adSpend > 0 ? (profit / v.adSpend) * 100 : 0
  const cac = deals > 0 ? v.adSpend / deals : Infinity
  const ltv = v.acv * 36
  const ltvCac = deals > 0 ? ltv / cac : Infinity
  const costPerLead = leads > 0 ? v.adSpend / leads : Infinity
  const costPerMql = mqls > 0 ? v.adSpend / mqls : Infinity
  const paybackMonths = deals > 0 ? cac / (v.acv / 12) : Infinity
  const clickToDeal = clicks > 0 ? (deals / clicks) * 100 : 0
  const leadToDeal = leads > 0 ? (deals / leads) * 100 : 0
  const mqlToDeal = mqls > 0 ? (deals / mqls) * 100 : 0
  return { clicks, leads, mqls, sqls, opps, deals, revenue, profit, roi, cac, ltv, ltvCac, costPerLead, costPerMql, paybackMonths, clickToDeal, leadToDeal, mqlToDeal }
}

/* ── Slider Component ── */
function Slider({ config, value, onChange }: { config: SliderConfig; value: number; onChange: (key: keyof Inputs, val: number) => void }) {
  const { key, label, min, max, step, prefix, suffix, decimals, tooltip } = config
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = parseFloat(e.target.value)
    if (isNaN(v)) return
    v = Math.min(max, Math.max(min, v))
    v = Math.round(v / step) * step
    onChange(key, parseFloat(v.toFixed(4)))
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{label}</label>
          <span className="group" style={{ position: 'relative', cursor: 'help' }}>
            <svg style={{ width: '14px', height: '14px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100" style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '8px', background: '#1f2937', color: 'white', fontSize: '12px', padding: '8px 12px', borderRadius: '8px', width: '208px', pointerEvents: 'none', transition: 'opacity 0.15s', zIndex: 50 }}>
              {tooltip}
            </span>
          </span>
        </div>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={handleNumberChange}
          style={{ width: '96px', textAlign: 'right', fontSize: '14px', fontWeight: 500, background: 'white', border: '1px solid #d1d5db', borderRadius: '8px', padding: '4px 10px', color: '#1f2937', fontVariantNumeric: 'tabular-nums', outline: 'none' }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(key, parseFloat(e.target.value))}
        style={{
          width: '100%',
          height: '6px',
          borderRadius: '9999px',
          appearance: 'none',
          WebkitAppearance: 'none',
          cursor: 'pointer',
          background: `linear-gradient(to right, #006840 0%, #006840 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{prefix || ''}{fmtNum(min, decimals)}{suffix || ''}</span>
        <span style={{ fontSize: '12px', color: '#9ca3af' }}>{prefix || ''}{fmtNum(max, decimals)}{suffix || ''}</span>
      </div>
    </div>
  )
}

/* ── Metric Card ── */
function MetricCard({ label, value, subtext, warn }: { label: string; value: string; subtext?: string; warn?: boolean }) {
  return (
    <div style={{ borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px' }}>
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#6b7280', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '20px', fontWeight: 600, color: warn ? '#ef4444' : '#111827', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      {subtext && <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{subtext}</div>}
    </div>
  )
}

/* ── Funnel Bar ── */
function FunnelBar({ label, count, costPer, maxCount, color }: { label: string; count: number; costPer: number; maxCount: number; color: string }) {
  const w = maxCount > 0 ? Math.max((count / maxCount) * 100, 2) : 2
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937', fontVariantNumeric: 'tabular-nums' }}>{fmtNum(count)}</span>
          <span style={{ fontSize: '12px', color: '#9ca3af', fontVariantNumeric: 'tabular-nums' }}>{fmtCurrency(costPer)} ea</span>
        </div>
      </div>
      <div style={{ width: '100%', borderRadius: '9999px', height: '20px', overflow: 'hidden', background: '#f3f4f6' }}>
        <div style={{ height: '100%', borderRadius: '9999px', transition: 'all 0.3s', width: `${w}%`, background: color }} />
      </div>
    </div>
  )
}

/* ── Main Calculator ── */
export default function ROICalculator() {
  const [inputs, setInputs] = useState<Inputs>(PRESETS.Moderate)
  const [activePreset, setActivePreset] = useState<string | null>('Moderate')
  const [mobileTab, setMobileTab] = useState<'inputs' | 'results'>('inputs')

  const updateInput = useCallback((key: keyof Inputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
    setActivePreset(null)
  }, [])

  const applyPreset = useCallback((name: string, preset: Inputs) => {
    setInputs(preset)
    setActivePreset(name)
  }, [])

  const results = useMemo(() => calculate(inputs), [inputs])
  const positive = results.roi >= 0

  const stages = [
    { label: 'Clicks', count: results.clicks, cost: results.clicks > 0 ? inputs.adSpend / results.clicks : Infinity },
    { label: 'Leads', count: results.leads, cost: results.costPerLead },
    { label: 'MQLs', count: results.mqls, cost: results.costPerMql },
    { label: 'SQLs', count: results.sqls, cost: results.sqls > 0 ? inputs.adSpend / results.sqls : Infinity },
    { label: 'Opportunities', count: results.opps, cost: results.opps > 0 ? inputs.adSpend / results.opps : Infinity },
    { label: 'Closed Deals', count: results.deals, cost: results.cac },
  ]

  const inputPanel = (
    <div style={{ borderRadius: '16px', border: '1px solid #e5e7eb', padding: '24px' }}>
      {/* Presets */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: '#6b7280', marginBottom: '10px' }}>Quick Presets</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.entries(PRESETS).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => applyPreset(name, preset)}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s',
                background: activePreset === name ? '#006840' : '#fff',
                color: activePreset === name ? '#fff' : '#6b7280',
                border: activePreset === name ? '1px solid #006840' : '1px solid #d1d5db',
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Settings */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: '#6b7280', marginBottom: '12px' }}>Campaign Settings</div>
        {CAMPAIGN_SLIDERS.map((s) => <Slider key={s.key} config={s} value={inputs[s.key]} onChange={updateInput} />)}
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />

      {/* Conversion Rates */}
      <div>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: '#6b7280', marginBottom: '12px' }}>Conversion Rates</div>
        {FUNNEL_SLIDERS.map((s) => <Slider key={s.key} config={s} value={inputs[s.key]} onChange={updateInput} />)}
      </div>
    </div>
  )

  const resultsPanel = (
    <>
      {/* Hero ROI Card */}
      <div style={{ borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '1px solid', background: positive ? '#f0fdf4' : '#fef2f2', borderColor: positive ? '#bbf7d0' : '#fecaca' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: positive ? '#006840' : '#dc2626', marginBottom: '4px' }}>Return on Ad Spend</div>
            <span style={{ fontSize: '48px', fontWeight: 700, color: positive ? '#006840' : '#ef4444', fontVariantNumeric: 'tabular-nums' }}>
              {results.roi > 0 ? '+' : ''}{fmtPct(results.roi)}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: 600, color: positive ? '#00351F' : '#dc2626', fontVariantNumeric: 'tabular-nums' }}>
              {positive ? '+' : '-'}{fmtCurrency(results.profit)}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: positive ? '#15803d' : '#ef4444', marginTop: '2px' }}>
              {positive ? '✓ Profitable' : '✗ Unprofitable'}{' '}
              <span style={{ color: '#9ca3af', fontWeight: 400 }}>/ month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <MetricCard label="Monthly Revenue" value={fmtCurrency(results.revenue)} />
        <MetricCard label="Customer Acq. Cost" value={fmtCurrency(results.cac)} warn={results.cac > inputs.acv} />
        <MetricCard label="LTV:CAC Ratio" value={isFinite(results.ltvCac) ? fmtNum(results.ltvCac, 1) + 'x' : '∞'} subtext={'LTV ' + fmtCurrency(results.ltv)} warn={isFinite(results.ltvCac) && results.ltvCac < 3} />
        <MetricCard label="Cost Per Lead" value={fmtCurrency(results.costPerLead)} />
        <MetricCard label="Cost Per MQL" value={fmtCurrency(results.costPerMql)} />
        <MetricCard label="Payback Period" value={isFinite(results.paybackMonths) ? fmtNum(results.paybackMonths, 1) + ' mo' : '∞'} warn={isFinite(results.paybackMonths) && results.paybackMonths > 18} />
      </div>

      {/* Funnel Efficiency */}
      <div style={{ borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: '#6b7280', marginBottom: '12px' }}>Funnel Efficiency</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>{fmtPct(results.clickToDeal)}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Click → Deal</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>{fmtPct(results.leadToDeal)}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Lead → Deal</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#111827', fontVariantNumeric: 'tabular-nums' }}>{fmtPct(results.mqlToDeal)}</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>MQL → Deal</div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div style={{ borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 500, color: '#6b7280', marginBottom: '16px' }}>Conversion Funnel</div>
        {stages.map((s, i) => (
          <FunnelBar key={s.label} label={s.label} count={s.count} costPer={s.cost} maxCount={results.clicks} color={FUNNEL_COLORS[i]} />
        ))}
      </div>
    </>
  )

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Page Header */}
      <header style={{ borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#00351F', margin: 0, lineHeight: 1.2 }}>
          Paid Ads ROI Calculator
        </h1>
        <p style={{ fontSize: '14px', color: '#9ca3af', margin: '2px 0 0' }}>
          by <span style={{ fontWeight: 500, color: '#006840' }}>Profit Mill</span>
        </p>
      </header>

      {/* Desktop Layout */}
      <div className="hidden md:flex">
        <div style={{ width: '40%', overflowY: 'auto', padding: '24px 16px 24px 24px', maxHeight: 'calc(100vh - 280px)' }}>
          {inputPanel}
        </div>
        <div style={{ width: '60%', overflowY: 'auto', padding: '24px 24px 24px 16px', maxHeight: 'calc(100vh - 280px)' }}>
          {resultsPanel}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div style={{ position: 'sticky', top: 0, zIndex: 30, background: '#ffffff', borderBottom: '1px solid #e5e7eb', display: 'flex' }}>
          {(['inputs', 'results'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              style={{
                flex: 1, padding: '12px', fontSize: '14px', fontWeight: 500, background: 'transparent', border: 'none', cursor: 'pointer',
                color: mobileTab === tab ? '#006840' : '#6b7280',
                borderBottom: mobileTab === tab ? '2px solid #006840' : '2px solid transparent',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ padding: '16px' }}>
          {mobileTab === 'inputs' ? inputPanel : resultsPanel}
        </div>
      </div>

      {/* Custom slider styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #006840;
          border: 2px solid white;
          box-shadow: 0 0 0 1px rgba(0,104,64,0.3);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #006840;
          border: 2px solid white;
          box-shadow: 0 0 0 1px rgba(0,104,64,0.3);
          cursor: pointer;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }
      `}} />
    </div>
  )
}
