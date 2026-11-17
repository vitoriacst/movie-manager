import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserApi } from './core/services/user-api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  userApi = inject(UserApi);

  ngOnInit() {
    this.userApi.validateToken().subscribe();
  }
}
