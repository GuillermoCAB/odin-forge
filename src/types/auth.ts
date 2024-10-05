export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  jwt: string | null;
  inputEmail: string | null;
}
