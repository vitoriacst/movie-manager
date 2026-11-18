import { computed, Injectable, signal } from '@angular/core';
import { IUserInfos } from './../../features/authentication/models/user-infos';

@Injectable({
  providedIn: 'root',
})
export class UserInfoStore {
  private readonly user = signal<IUserInfos | undefined>(undefined);
  private readonly USER_NAME_KEY = 'user-name';

  userInfos = this.user.asReadonly();

  userName = computed(() => {
    const hasUser = this.user();

    const userNameLocal = localStorage.getItem(this.USER_NAME_KEY);

    if (!hasUser) return userNameLocal ? userNameLocal : '';

    return this.user()?.name;
  });

  setUserInfos(user: IUserInfos) {
    this.user.set(user);

    localStorage.setItem(this.USER_NAME_KEY, user.name);
  }

  removeUser() {
    localStorage.removeItem(this.USER_NAME_KEY);
  }
}
