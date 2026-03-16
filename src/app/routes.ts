import { createBrowserRouter } from 'react-router';
import { GeoLayout } from './components/geo/GeoLayout';
import { GeoReportLayout } from './components/geo/GeoReportLayout';
import { HomePage } from './components/geo/HomePage';
import { NewReportPage } from './components/geo/NewReportPage';
import { OverviewPage } from './components/geo/OverviewPage';
import { ActionsCenterPage } from './components/geo/ActionsCenterPage';
import { CategoryViewPage } from './components/geo/CategoryViewPage';
import { SettingsPage } from './components/geo/SettingsPage';
import { RedirectHome } from './components/geo/RedirectHome';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: GeoLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'new', Component: NewReportPage },
      {
        path: 'report/:reportId',
        Component: GeoReportLayout,
        children: [
          { index: true, Component: OverviewPage },
          { path: 'actions-center', Component: ActionsCenterPage },
          { path: 'category/:categoryId', Component: CategoryViewPage },
          { path: 'manage-scope', Component: SettingsPage },
        ],
      },
      { path: '*', Component: RedirectHome },
    ],
  },
]);
