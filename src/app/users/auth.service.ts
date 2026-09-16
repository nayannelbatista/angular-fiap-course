import { computed, effect, Injectable, signal } from '@angular/core';
import { User } from './user';
import { USERS_MOCK } from './users.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(this.getStoredUser());
  isLoading = signal(false);
  loginError = signal('');
  isAuthenticated = computed(() => this.currentUser() !== null);
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  persistUserEffect = effect(() => {
    const user = this.currentUser();
    if (user) {
      localStorage.setItem('auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth-user');
    }
  });

  private getStoredUser(): User | null {
    try {
      const storedUser = localStorage.getItem('auth-user');
      if (!storedUser) return null;
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  }

  login(email: string, password: string): void {
    this.isLoading.set(true);
    this.loginError.set('');

    const foundUser =
      USERS_MOCK.find((user) => user.email === email && user.password === password) ?? null;

    this.currentUser.set(foundUser);
    this.loginError.set(foundUser ? '' : 'Credenciais inválidas.');
    this.isLoading.set(false);
  }

  logout() {
    this.currentUser.set(null);
    this.loginError.set('');
  }
}
