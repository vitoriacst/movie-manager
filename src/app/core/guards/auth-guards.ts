import { inject } from '@angular/core';
import { CanActivateFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UserApi } from '../services/user-api';
import { UserTokenStore } from '../services/user-token-store';

export const authGuard: CanActivateFn = (route, state): MaybeAsync<GuardResult> => {
  const userTokenStore = inject(UserTokenStore);
  const userApi = inject(UserApi);
  const router = inject(Router);
  const loginRoute = router.createUrlTree(['/auth/login']);

  const HAS_TOKEN = userTokenStore.hasToken();

  console.log(HAS_TOKEN, 'has token');
  if (!HAS_TOKEN) {
    return loginRoute;
  }

  return userApi.validateToken().pipe(
    map(() => true),
    catchError(() => {
      userTokenStore.removeToken();
      return of(loginRoute);
    }),
  );
};
