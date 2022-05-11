const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Home'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/Dashboard')
      },
      {
        path: '/hello',
        name: 'hello',
        component: () => import('@/components/HelloWorld')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import('@/components/Tables')
      },
      {
        path: '/forms',
        name: 'forms',
        component: () => import('@/components/Login')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/Login')
  }
]
export default routes
