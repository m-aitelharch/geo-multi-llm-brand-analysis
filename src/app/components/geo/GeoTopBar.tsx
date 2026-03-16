import { SearchIcon } from '../Icons';
import { cn } from '@/lib/utils';

function SearchInput() {
  return (
    <div className="relative w-[600px] h-[40px] bg-white rounded-md border border-border shadow-sm flex items-center px-3 gap-2 cursor-text group focus-within:ring-1 focus-within:ring-primary transition-all">
      <SearchIcon className="w-5 h-5 text-muted-foreground shrink-0 group-focus-within:text-primary transition-colors" />
      <input
        className="flex-1 bg-transparent border-none outline-none !text-[14px] !font-medium text-foreground min-w-[120px] placeholder:text-muted-foreground"
        placeholder="Search reports, brands, categories..."
        autoComplete="off"
      />
      <div className="border border-border rounded px-1.5 py-0.5 bg-muted !text-[10px] !font-medium text-muted-foreground shrink-0 h-fit cursor-pointer hover:bg-muted-foreground/10">
        \u2318K
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center !text-[12px] !font-semibold text-primary shrink-0">
      AT
    </div>
  );
}

function Tab({
  label,
  active = false,
  hasDropdown = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className="relative flex h-full items-center justify-center gap-1 px-1 min-w-[max-content] group cursor-pointer"
      onClick={onClick}
    >
      <span
        className={cn(
          '!text-[14px] !font-medium leading-5 transition-colors',
          active
            ? 'text-foreground'
            : 'text-muted-foreground group-hover:text-foreground'
        )}
      >
        {label}
      </span>
      {hasDropdown && (
        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors">
          <path d="M10 12.5L5 7.5H15L10 12.5Z" fill="currentColor" />
        </svg>
      )}
      <div
        className={cn(
          'absolute bottom-0 left-0 h-[4px] w-full rounded-t-[4px] transition-colors',
          active ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </div>
  );
}

export function GeoTopBar() {
  return (
    <div className="flex flex-col w-full bg-card z-[100] relative">
      <div className="flex items-center justify-between px-5 h-[56px] border-b border-border shrink-0 box-border">
        <div className="w-8" />
        <SearchInput />
        <Avatar />
      </div>
      <div className="flex items-center justify-between px-5 bg-[#f1f5f9] border-b border-border h-[56px] gap-5 box-border overflow-x-auto">
        <div className="flex items-center gap-5 h-full">
          <Tab label="GEO Metrics" active={true} />
        </div>
      </div>
    </div>
  );
}
