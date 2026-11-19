import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IUserLoginSuccessResponse } from '../../shared/models/user-login-success-response';
import { IUserRegisterSuccessResponse } from '../../shared/models/user-register-success-response';
import { IUserTokenSuccessAuthResponse } from '../../shared/models/user-token-success-auth-reponse';
import { UserInfoStore } from './user-infos-store';
import { UserTokenStore } from './user-token-store';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _userInfoStore = inject(UserInfoStore);

  validateToken() {
    return this._httpClient.get<IUserTokenSuccessAuthResponse>(
      environment.baseUrl + '/users/validate-token',
    );
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<IUserLoginSuccessResponse>(environment.baseUrl + '/users/login', {
        email,
        password,
      })
      .pipe(
        tap(({ user: { id, name, email } }) => {
          this._userInfoStore.setUserInfos({ id, name, email });
        }),
        tap((loginResponse) => {
          console.log('Retorno do login:', loginResponse?.token);
          this._userTokenStore.saveToken(loginResponse?.token);
        }),
      );
  }
  register(name: string, email: string, password: string) {
    return this._httpClient.post<IUserRegisterSuccessResponse>(environment.baseUrl + '/users', {
      name,
      email,
      password,
    });
  }
}
