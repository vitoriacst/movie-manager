import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoStore } from '../../services/user-infos-store';
import { UserTokenStore } from '../../services/user-token-store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly _userTokeStore = inject(UserTokenStore);

  readonly _userInfoStore = inject(UserInfoStore);

  private _router = inject(Router);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._userTokeStore.removeToken();
    this._router.navigate(['auth/login']);
  }
}
