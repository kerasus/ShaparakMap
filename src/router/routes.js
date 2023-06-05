const routes = [
  {
    path: '',
    layoutConfig: {
      layoutView: 'hHh Lpr fff',
      layoutHeader: true,
      layoutHeaderType: 'main',
      layoutHeaderVisible: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftSideBarType: 'main',
      layoutLeftDrawerVisible: true,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
      layoutRightDrawer: false,
      layoutFooter: false,
      showHamburgerBtn: false,
      layoutFooterVisible: false,
      layoutHeaderCustomClass: '',
      layoutBreadcrumbsElements: [],
      layoutBreadcrumbs: {
        separator: 'home'
      },
      layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
      layoutPageContainerCustomClass: 'main-layout-container'
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Public',
        component: () => import('layouts/bareLayout.vue'),
        children: [
          {
            path: '',
            name: 'Public.Home',
            component: () => import('src/pages/Public/Home.vue')
          },
          {
            path: '/map',
            name: 'Public.map',
            component: () => import('src/pages/map.vue')
          }
        ]
      }
    ]
  },
  // are u mr Esmaeili ? '' : dont touch this route

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component:
      () => import('pages/Error404.vue')
  }
]
export default routes
