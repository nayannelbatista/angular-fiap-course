export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'assistant';
}

export type SessionUser = Omit<User, 'password'>;
