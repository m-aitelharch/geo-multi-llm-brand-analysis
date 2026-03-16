import { useNavigate, useLocation } from 'react-router';
import { imgGroup } from '@/imports/svg-e4xox';
import svgPaths from '@/imports/svg-g8lqcuv4m2';
import svgMeasurePaths from '@/imports/svg-7ho2t9hq2v';
import {
  MonitorIcon,
  NewsmodeIcon,
  ContactIcon,
  DoubleGearIcon,
  HelpIcon,
  LogoutIcon,
} from '../Icons';
import { cn } from '@/lib/utils';

function MeasureIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d={svgMeasurePaths.p23c8e300} fill="currentColor" transform="translate(3, 3.5)" />
    </svg>
  );
}

function OnclusiveLogo() {
  return (
    <div className="relative w-[44.69px] h-[44.69px] mt-[14px] ml-[14px]">
      <div
        className="absolute inset-0"
        style={{
          maskImage: `url('${imgGroup}')`,
          maskSize: '44.69px 44.69px',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url('${imgGroup}')`,
          WebkitMaskSize: '44.69px 44.69px',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        <svg className="block w-full h-full" viewBox="0 0 44.6879 44.6879" fill="none">
          <path d={svgPaths.p264f9600} fill="#00EF61" />
          <path d={svgPaths.p1c2f6e00} fill="white" />
          <g>
            <path d={svgPaths.p5d2ae00} fill="#1E1E23" />
            <path d={svgPaths.p32039200} fill="#00EF61" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LogoContainer() {
  return (
    <div className="relative shrink-0 w-[72px] h-[72px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 72 72" fill="none">
        <path d="M0 72L72 72L72 0L0 72Z" fill="black" fillOpacity="0.15" />
      </svg>
      <OnclusiveLogo />
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center w-[72px] h-[72px] shrink-0 cursor-pointer transition-colors',
        active ? 'bg-[#2a4a5f]' : 'hover:bg-white/10'
      )}
      onClick={onClick}
    >
      <div className="relative w-6 h-6">
        <Icon className={cn('w-full h-full', active ? 'text-[#00EF61]' : 'text-[#F1F9FC]')} />
      </div>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-[30px] bg-[#00EF61] rounded-r-[4px]" />
      )}
      <p
        className={cn(
          "mt-2 w-[58px] h-[15px] !text-[12px] !leading-[15px] text-center !font-normal z-[2]",
          active ? 'text-[#00EF61]' : 'text-[#F1F9FC]'
        )}
        style={{ fontFeatureSettings: "'liga' off" }}
      >
        {label}
      </p>
    </div>
  );
}

export function GeoSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname.startsWith('/report') || location.pathname === '/new';

  return (
    <div className="flex flex-col items-start justify-between h-full bg-[#2d556e] shrink-0 w-[72px]">
      <div className="flex flex-col items-center w-full">
        <LogoContainer />
        <div className="flex flex-col items-start w-full">
          <NavItem icon={MonitorIcon} label="Mention" />
          <NavItem icon={NewsmodeIcon} label="Review" />
          <NavItem icon={ContactIcon} label="Contact" />
          <NavItem icon={MeasureIcon} label="Measure" active={isHome} onClick={() => navigate('/')} />
        </div>
      </div>
      <div className="flex flex-col items-center w-full pb-5">
        <NavItem icon={DoubleGearIcon} label="Settings" />
        <NavItem icon={HelpIcon} label="Help" />
        <NavItem icon={LogoutIcon} label="Log out" />
      </div>
    </div>
  );
}
