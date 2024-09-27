// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isAuthenticated = false;
//   private isAdmin = false;

//   constructor(private router: Router) {}

//   // Simulate a simple login mechanism
//   login(username: string, password: string): boolean {
//     // Replace the below hardcoded logic with actual authentication
//     if (username === 'zaroonklm@gmail.com' && password === '123') {
//       this.isAuthenticated = true;
//       this.isAdmin = true;
//       return true;
//     } else {
//       this.isAuthenticated = false;
//       this.isAdmin = false;
//       return false;
//     }
//   }

//   logout(): void {
//     this.isAuthenticated = false;
//     this.isAdmin = false;
//     this.router.navigate(['/login']);
//   }

//   getIsAuthenticated(): boolean {
//     return this.isAuthenticated;
//   }

//   getIsAdmin(): boolean {
//     return this.isAdmin;
//   }
// }





// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getIsAuthenticated() {
    throw new Error('Method not implemented.');
  }
  getIsAdmin() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/auth/authenticate';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ isAdmin: boolean }>(this.apiUrl, { username, password });
  }
}
