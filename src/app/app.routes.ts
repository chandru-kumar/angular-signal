import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'first-signal',
    loadComponent: () => import('./components/first-signal/first-signal.component').then(m => m.FirstSignalComponent)
  },
  {
    path: 'read-only-signal',
    loadComponent: () => import('./components/read-only-signal/read-only-signal.component').then(m => m.ReadOnlySignalComponent)
  },
  {
    path: 'object-array-signal',
    loadComponent: () => import('./components/object-array-signal/object-array-signal.component').then(m => m.ObjectArraySignalComponent)
  },
  {
    path: 'computed-signal',
    loadComponent: () => import('./components/computed-signal/computed-signal.component').then(m => m.ComputedSignalComponent)
  },
  {
    path: 'signal-effect',
    loadComponent: () => import('./components/signal-effect/signal-effect.component').then(m => m.SignalEffectComponent)
  },
  {
    path: 'read-async',
    loadComponent: () => import('./components/read-operation-with-async-await-promise/read-operation-with-async-await-promise.component').then(m => m.ReadOperationWithAsyncAwaitPromiseComponent)
  },
  {
    path: 'input-signal',
    loadComponent: () => import('./components/input-signal/input-signal-parent.component').then(m => m.InputSignalParentComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'first-signal'
  }
];
