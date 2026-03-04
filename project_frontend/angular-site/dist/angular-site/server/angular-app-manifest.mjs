
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/employee-component-view"
  },
  {
    "renderMode": 2,
    "route": "/employee-part-view"
  },
  {
    "renderMode": 2,
    "route": "/employee-build-view"
  },
  {
    "renderMode": 2,
    "route": "/employee-vendor-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-user-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-component-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-part-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-build-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-register-user-view"
  },
  {
    "renderMode": 2,
    "route": "/manager-vendor-view"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5063, hash: '78a60be92326250332cab6f0a9efe23af3f33e878589fbafae273d2962f4ad58', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1036, hash: '23c3a92432c7b42a2f654cd36a772ff3f71f8b753a6b3a1edc37d9e69ce409d2', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'home/index.html': {size: 8018, hash: '3928786ab61fa59fb4fae544b5f5eff3e1e2b3c24f0e39a53c066ea1831bcfd0', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 16208, hash: '0728a63c54a9ab19e143b24985502faeea4346f03e7bf2ccb2349fce4f750a73', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'manager-register-user-view/index.html': {size: 24845, hash: '80c728d6dc7aec7555fc3881a33947a8bc8ab37090d694711df72ded3cb752f2', text: () => import('./assets-chunks/manager-register-user-view_index_html.mjs').then(m => m.default)},
    'styles-JG7EAGFK.css': {size: 230853, hash: 'YlmivfEfBiI', text: () => import('./assets-chunks/styles-JG7EAGFK_css.mjs').then(m => m.default)}
  },
};
