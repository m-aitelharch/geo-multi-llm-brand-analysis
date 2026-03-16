import { useState, useCallback } from 'react';
import { Outlet } from 'react-router';
import { GeoReportSidebar } from './GeoReportSidebar';
import { GeoReportHeader } from './GeoReportHeader';
import { TourGuide } from './TourGuide';
import { LLM_PROVIDER_ORDER } from '../../lib/mockData';

export function GeoReportLayout() {
  const [marketFilter, setMarketFilter] = useState('all');
  const [enabledLlms, setEnabledLlms] = useState<Set<string>>(() => new Set(LLM_PROVIDER_ORDER));

  const handleToggleLlm = useCallback((id: string) => {
    setEnabledLlms(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="flex flex-1 overflow-hidden">
      <GeoReportSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <GeoReportHeader
          marketFilter={marketFilter}
          onMarketFilterChange={setMarketFilter}
          enabledLlms={enabledLlms}
          onToggleLlm={handleToggleLlm}
        />
        <div className="flex-1 overflow-y-auto px-[20px] py-[32px]">
          <Outlet context={{ enabledLlms, onToggleLlm: handleToggleLlm, marketFilter }} />
        </div>
      </div>
      <TourGuide />
    </div>
  );
}
