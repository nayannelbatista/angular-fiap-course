import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  readonly authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  submit(): void {
    this.authService.login(this.email().trim(), this.password().trim());
  }

  redirectEffect = effect(() => {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  });
}
