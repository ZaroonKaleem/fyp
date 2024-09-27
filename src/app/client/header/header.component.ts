import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  menuVisible = false;

  constructor(private router: Router) {}


  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  logout() {
    // Implement logout logic here
    console.log('Logout clicked');
    this.router.navigate(['/login']); // Redirect to login page
  }
}  



//  isLoggedIn: boolean = false;

  // constructor(private authService: AuthService) {
  //   this.isLoggedIn = this.authService.isAuthenticated(); // Call a method to check login state
  // }

  // logout() {
  //   this.authService.logout();  // Implement this method in your auth service
  // }

  // toggleMenu() {
  //   // Logic for menu toggle
  // }