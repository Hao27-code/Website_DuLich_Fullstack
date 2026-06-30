import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/client/home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/client/about/about.page').then((m) => m.AboutPage),
  },

  {
    path: 'tours',
    loadComponent: () =>
      import('./pages/client/tours/tours.page').then((m) => m.ToursPage),
  },

  {
    path: 'tours/:id',
    loadComponent: () =>
      import('./pages/client/tour-details/tour-details.page').then(
        (m) => m.TourDetailsPage,
      ),
  },

  {
    path: 'tour-details/:id',
    loadComponent: () =>
      import('./pages/client/tour-details/tour-details.page').then(
        (m) => m.TourDetailsPage,
      ),
  },

  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/client/blog/blog.page').then((m) => m.BlogPage),
  },

  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/client/blog-details/blog-details.page').then(
        (m) => m.BlogDetailsPage,
      ),
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/client/contact/contact.page').then((m) => m.ContactPage),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/client/register/register.page').then(
        (m) => m.RegisterPage,
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/client/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/client/reset-password/reset-password.page').then(
        (m) => m.ResetPasswordPage,
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/client/forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent,
          ),
      },
      {
        path: 'tours',
        loadComponent: () =>
          import('./pages/admin/tours/tours.component').then(
            (m) => m.ToursComponent,
          ),
      },
      {
        path: 'news',
        loadComponent: () =>
          import('./pages/admin/news/news.component').then(
            (m) => m.NewsComponent,
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/users/users.component').then(
            (m) => m.UsersComponent,
          ),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('./pages/admin/bookings/bookings.component').then(
            (m) => m.BookingsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/client/not-found/not-found.page').then(
        (m) => m.NotFoundPage,
      ),
  },
];
