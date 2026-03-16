import { useNavigate, useLocation, useParams } from 'react-router';
import { Activity, Crosshair, Layers, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MOCK_CATEGORIES } from '../../lib/mockData';

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
  dot,
}: {
  icon?: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
  dot?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition !text-[13px] !font-medium text-left',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-secondary-foreground hover:bg-muted/30'
      )}
    >
      {dot ? (
        <div className="w-5 h-5 flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot }} />
        </div>
      ) : Icon ? (
        <Icon className={cn('w-[18px] h-[18px] shrink-0', active ? 'text-primary' : 'text-muted-foreground')} />
      ) : null}
      <span className="truncate">{label}</span>
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
      )}
    </button>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-4 pb-1.5">
      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      <span className="!text-[11px] !font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function GeoReportSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { reportId } = useParams();

  const basePath = `/report/${reportId}`;
  const currentPath = location.pathname;

  const isOverview = currentPath === basePath || currentPath === `${basePath}/`;
  const isActionsCenter = currentPath === `${basePath}/actions-center`;
  const activeCategoryId = currentPath.match(/\/category\/([^/]+)/)?.[1] || null;
  const isSettings = currentPath === `${basePath}/manage-scope`;

  return (
    <div className="w-[260px] shrink-0 bg-card border-r border-border flex flex-col h-full overflow-y-auto">
      <div className="px-3 py-4 space-y-0.5">
        <SidebarItem icon={Activity} label="Overview" active={isOverview} onClick={() => navigate(basePath)} />
        <SidebarItem icon={Crosshair} label="Actions Center" active={isActionsCenter} onClick={() => navigate(`${basePath}/actions-center`)} />
      </div>
      <div className="border-t border-border mx-3" />
      <div className="px-3 pb-4">
        <SectionHeader icon={Layers} label="Categories" />
        <div className="space-y-0.5">
          {MOCK_CATEGORIES.map(cat => (
            <SidebarItem
              key={cat.id}
              label={cat.name}
              dot={cat.dotHex}
              active={activeCategoryId === cat.id}
              onClick={() => navigate(`${basePath}/category/${cat.id}`)}
            />
          ))}
        </div>
      </div>
      <div className="flex-1" />
      <div className="border-t border-border mx-3" />
      <div className="px-3 py-4">
        <SidebarItem icon={SlidersHorizontal} label="Manage Scope" active={isSettings} onClick={() => navigate(`${basePath}/manage-scope`)} />
      </div>
    </div>
  );
}
