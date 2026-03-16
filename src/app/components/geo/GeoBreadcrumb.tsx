import { useLocation, useParams, Link } from 'react-router';
import { MOCK_REPORTS, MOCK_CATEGORIES } from '../../lib/mockData';

function ChevronSeparator() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path
          d="M8.56667 8L5.5 4.93333L6.43333 4L10.4333 8L6.43333 12L5.5 11.0667L8.56667 8Z"
          fill="#6A7282"
          transform="translate(0, 0)"
        />
      </svg>
    </div>
  );
}

export function GeoBreadcrumb() {
  const location = useLocation();
  const { reportId, categoryId } = useParams();

  const isReport = location.pathname.startsWith('/report');
  const isNew = location.pathname === '/new';

  if (!isReport && !isNew) return null;

  const report = isReport ? MOCK_REPORTS.find(r => r.id === reportId) : null;
  const reportLabel = report?.entity || 'Report';

  const isActionsCenter = location.pathname.includes('/actions-center');
  const category = categoryId ? MOCK_CATEGORIES.find(c => c.id === categoryId) : null;

  const crumbs: { label: string; to?: string }[] = [
    { label: 'Reports', to: '/' },
  ];

  if (isNew) {
    crumbs.push({ label: 'New Analysis' });
  } else if (isReport && reportId) {
    crumbs.push({ label: reportLabel, to: `/report/${reportId}` });
    if (isActionsCenter) {
      crumbs.push({ label: 'Actions Center' });
    } else if (category) {
      crumbs.push({ label: category.name });
    }
  }

  return (
    <div className="bg-white flex gap-[4px] items-center px-[20px] py-[12px] relative w-full shrink-0 border-b border-[#d1d5dc]">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-[4px]">
            {i > 0 && <ChevronSeparator />}
            {crumb.to && !isLast ? (
              <Link
                to={crumb.to}
                className="!text-[12px] !font-normal text-[#6a7282] hover:text-[#101828] transition-colors no-underline cursor-pointer"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="!text-[12px] !font-normal text-[#101828]">
                {crumb.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
