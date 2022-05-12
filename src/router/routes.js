const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard')
      },
      {
        path: '/hello',
        name: 'hello',
        component: () => import('@/views/HelloWorld')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import('@/views/Tables')
      },
      {
        path: '/forms',
        name: 'forms',
        component: () => import('@/views/Login')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Login')
  }
]
export default routes
