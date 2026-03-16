import { Outlet, useLocation } from 'react-router';
import { GeoSidebar } from './GeoSidebar';
import { GeoTopBar } from './GeoTopBar';
import { GeoBreadcrumb } from './GeoBreadcrumb';

export function GeoLayout() {
  const location = useLocation();
  const isReport = location.pathname.startsWith('/report/');
  const isNewAnalysis = location.pathname === '/new';

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <GeoSidebar />
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <GeoTopBar />
        <GeoBreadcrumb />
        {isReport ? (
          <div className="flex-1 bg-background overflow-hidden flex min-h-0">
            <Outlet />
          </div>
        ) : isNewAnalysis ? (
          <div className="flex-1 bg-background overflow-hidden flex min-h-0">
            <Outlet />
          </div>
        ) : (
          <div className="flex-1 bg-background overflow-y-auto px-[20px] py-[32px]">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
}
