import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-screen',
  templateUrl: './authentication-screen.html',
  styleUrl: './authentication-screen.css',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AuthenticationScreen {}
