import { effect, Injectable, signal } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<User | null>(this.getStoredUser());

  persistUserEffect = effect(() => {
    const user = this.currentUser();
    console.log('[effect] executou, user:', user);

    if (user) {
      localStorage.setItem('auth-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth-user');
    }
  });

  private getStoredUser(): User | null {
    try {
      const storedUser = localStorage.getItem('auth-user');
      if(!storedUser) return null;
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  }
}
