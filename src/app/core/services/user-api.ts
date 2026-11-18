import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { IUserLoginSuccessResponse } from '../../shared/models/user-login-success-response';
import { IUserRegisterSuccessResponse } from '../../shared/models/user-register-success-response';
import { IUserTokenSuccessAuthResponse } from '../../shared/models/user-token-success-auth-reponse';
import { UserTokenStore } from './user-token-store';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly _httpClient = inject(HttpClient);

  private readonly API_URL = 'http://localhost:3000';

  private readonly _userTokenStore = inject(UserTokenStore);

  validateToken() {
    return this._httpClient.get<IUserTokenSuccessAuthResponse>(
      `${this.API_URL}/users/validate-token`,
    );
  }

  login(email: string, password: string) {
    return this._httpClient
      .post<IUserLoginSuccessResponse>(`${this.API_URL}/users/login`, {
        email,
        password,
      })
      .pipe(
        tap((loginResponse) => {
          this._userTokenStore.saveToken(loginResponse?.token);
        }),
      );
  }

  register(name: string, email: string, password: string) {
    return this._httpClient.post<IUserRegisterSuccessResponse>(`${this.API_URL}/users`, {
      name,
      email,
      password,
    });
  }
}
