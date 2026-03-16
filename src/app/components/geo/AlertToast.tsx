import svgPaths from '../../../imports/svg-rc6t4m097q';

export function AlertToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[640px] w-[calc(100%-48px)]">
      <div className="bg-[#fef3c7] flex gap-2 items-start overflow-clip p-2 rounded-[4px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)]">
        <div className="relative shrink-0 w-4 h-4 mt-px">
          <svg className="block w-full h-full" fill="none" viewBox="0 0 14.6667 12.6667">
            <path d={svgPaths.p2f345e00} fill="#F59E0B" />
          </svg>
        </div>
        <p className="flex-1 !text-[12px] !font-normal !leading-[15px] text-[#0f172a] min-w-0">
          {message}
        </p>
        <button
          onClick={onDismiss}
          className="relative shrink-0 w-4 h-4 mt-px text-[#64748b] hover:text-[#334155] transition"
        >
          <svg className="block w-full h-full" fill="none" viewBox="0 0 9.33333 9.33333">
            <path d={svgPaths.p2dc32500} fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}
