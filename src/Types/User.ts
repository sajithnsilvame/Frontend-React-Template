
export interface User {
    username: string;
    role: 'user' | 'admin' | 'super-admin';
}