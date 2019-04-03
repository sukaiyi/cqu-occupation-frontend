export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['1', '2', '3'],
    routes: [
      // collection
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './Home/Home',
      },
      {
        path: '/collection',
        name: 'collection',
        icon: 'dashboard',
        routes: [
          {
            path: '/collection/crawlState',
            name: 'crawlState',
            component: './Crawler/CrawlerList',
          },
          {
            path: '/collection/crawlAccount',
            name: 'crawlAccount',
            component: './Crawler/CrawlerAccountList',
          },
          {
            path: '/collection/crawlAccountMap',
            name: 'crawlAccountMap',
            component: './Crawler/CrawlerAccountConn',
          },
        ],
      },
      {
        path: '/data',
        name: 'data',
        icon: 'file',
        routes: [
          { path: '/', redirect: '/list' },
          {
            path: '/data/list',
            name: 'list',
            component: './DataManagement/UserInfoList',
          },
          {
            path: '/data/detail/:id',
            name: 'detail',
            hideInMenu: true,
            component: './DataManagement/UserInfoDetail',
          },
          {
            path: '/data/edit/:id',
            name: 'edit',
            hideInMenu: true,
            component: './DataManagement/UserInfoEdit',
          },
        ],
      },
      {
        path: '/report',
        name: 'report',
        icon: 'profile',
        routes: [
          { path: '/', redirect: '/page' },
          {
            path: '/report/list',
            name: 'list',
            component: './DataManagement/UserInfoList',
          },
          {
            path: '/report/page/:id',
            hideInMenu: true,
            name: 'page',
            component: './DataManagement/UserInfoReport',
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        icon: 'setting',
        routes: [
          { path: '/', redirect: '/system' },
          {
            path: '/system/users',
            name: 'users',
            component: './SystemManagement/UserList',
          },
          {
            path: '/system/auth',
            name: 'auth',
            component: './SystemManagement/AuthDescription',
          },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        hideInMenu: true,
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      //  editor
      {
        component: '404',
      },
    ],
  },
];
