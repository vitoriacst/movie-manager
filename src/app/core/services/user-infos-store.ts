import { Injectable, signal } from '@angular/core';
import { IUserInfos } from './../../features/authentication/models/user-infos';

@Injectable({
  providedIn: 'root',
})
export class UserInfoStore {
  private readonly user = signal<IUserInfos | undefined>(undefined);

  userInfos = this.user.asReadonly();

  setUserInfos(user: IUserInfos) {
    this.user.set(user);
  }
}
