import { lazy } from 'react';

// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = lazy(() => import('views/dashboard/Default'));

// utilities routing
// const UtilsTypography = lazy(() => import('views/utilities/Typography'));
// const UtilsColor = lazy(() => import('views/utilities/Color'));
// const UtilsShadow = lazy(() => import('views/utilities/Shadow'));
// const UtilsMaterialIcons = lazy(() => import('views/utilities/MaterialIcons'));
// const UtilsTablerIcons = lazy(() => import('views/utilities/TablerIcons'));


// sample page routing
// const SamplePage = lazy(() => import('views/sample-page'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
       
    ]
};

export default MainRoutes;