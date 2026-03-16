import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  MOCK_REPORTS, MOCK_CATEGORIES, LLM_PROVIDERS, LLM_PROVIDER_ORDER, countryCodeToFlag,
} from '../../lib/mockData';
import { LlmIcon } from './LlmIcons';

function getMarketFlag(code: string): string {
  const parts = code.split('-');
  const suffix = parts.length > 1 ? parts[1].toUpperCase() : parts[0].toUpperCase();
  return countryCodeToFlag(suffix);
}

function MarketDropdown({
  markets, selected, onChange,
}: {
  markets: { code: string; country: string }[];
  selected: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const label = selected === 'all'
    ? 'All Markets'
    : markets.find(m => m.code === selected)?.country || selected;

  if (markets.length < 2) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-1.5 border border-border rounded-md bg-card text-secondary-foreground hover:bg-muted/30 transition !text-[12px] !font-medium"
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
        {label}
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-52 bg-card border border-border rounded-md shadow-lg overflow-hidden right-0">
          <button
            onClick={() => { onChange('all'); setOpen(false); }}
            className={`w-full text-left px-3 py-2 !text-[12px] !font-medium transition ${
              selected === 'all' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/30'
            }`}
          >
            All Markets
          </button>
          <div className="border-t border-border" />
          {markets.map(m => (
            <button
              key={m.code}
              onClick={() => { onChange(m.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2 !text-[12px] !font-medium transition flex items-center gap-2 ${
                selected === m.code ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/30'
              }`}
            >
              <span className="!text-[14px]">{getMarketFlag(m.code)}</span>
              {m.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LlmToggleBar({
  enabledLlms,
  onToggle,
}: {
  enabledLlms: Set<string>;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {LLM_PROVIDER_ORDER.map(llmId => {
        const provider = LLM_PROVIDERS[llmId];
        if (!provider) return null;
        const active = enabledLlms.has(llmId);
        return (
          <button
            key={llmId}
            onClick={() => onToggle(llmId)}
            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md !text-[11px] !font-medium border transition ${
              active
                ? 'border-transparent'
                : 'border-border bg-card text-muted-foreground opacity-40'
            }`}
            style={active ? { backgroundColor: provider.bgColor, color: provider.color } : undefined}
            title={active ? `Hide ${provider.shortName}` : `Show ${provider.shortName}`}
          >
            <LlmIcon llmId={llmId} size={14} />
            {provider.shortName}
          </button>
        );
      })}
    </div>
  );
}

export function GeoReportHeader({
  marketFilter, onMarketFilterChange, enabledLlms, onToggleLlm,
}: {
  marketFilter: string;
  onMarketFilterChange: (code: string) => void;
  enabledLlms: Set<string>;
  onToggleLlm: (id: string) => void;
}) {
  const report = MOCK_REPORTS[0];
  const numCategories = MOCK_CATEGORIES.length;

  const allMarkets = (() => {
    const seen = new Map<string, { code: string; country: string }>();
    MOCK_CATEGORIES.forEach(c => c.markets.forEach(m => {
      if (!seen.has(m.code)) seen.set(m.code, m);
    }));
    return Array.from(seen.values());
  })();

  return (
    <div className="sticky top-0 z-20 bg-card border-b border-border px-5 py-3" data-tour="report-header">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="!text-[14px] !font-bold text-primary">{report.entity.charAt(0)}</span>
          </div>
          <div className="min-w-0">
            <h2 className="!text-[16px] !font-bold text-foreground truncate">{report.entity}</h2>
            <p className="!text-[11px] !font-normal text-muted-foreground">
              {numCategories} categories across {allMarkets.length} markets
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <MarketDropdown markets={allMarkets} selected={marketFilter} onChange={onMarketFilterChange} />
          <LlmToggleBar enabledLlms={enabledLlms} onToggle={onToggleLlm} />
          <div className="flex items-center gap-1 text-muted-foreground">
            <button className="p-1 rounded hover:bg-muted/30 transition"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <span className="!text-[11px] !font-normal text-muted-foreground whitespace-nowrap">Mar 1, 2026</span>
            <button className="p-1 rounded hover:bg-muted/30 transition"><ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
