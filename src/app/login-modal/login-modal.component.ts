import { Component, Renderer2, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements AfterViewInit {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isRegistering = false;
  isResettingPassword = false;

  constructor(private afAuth: AngularFireAuth, private renderer: Renderer2) {}

  // Lifecycle hook: Executed after the view is initialized
  ngAfterViewInit() {
    this.showModal(); // Show modal with animation after rendering
  }

  // Login Functionality
  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.successMessage = 'Login successful!';
      this.closeModal(); // Close modal after successful login
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // Registration Functionality
  async register() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.successMessage = 'Registration successful!';
      this.isRegistering = false; // Switch back to login mode
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // Password Reset Functionality
  async resetPassword() {
    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.successMessage = 'Password reset email sent!';
      this.isResettingPassword = false; // Switch back to login mode
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // Modal Control Functions
  showModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'block');
      this.renderer.addClass(modal, 'show'); // Add animation class
    } else {
      console.error('Modal element not found!');
    }
  }

  closeModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
      this.renderer.setStyle(modal, 'display', 'none');
      this.renderer.removeClass(modal, 'show');
    }
  }

  toggleMode(mode: string) {
    if (mode === 'register') {
      this.isRegistering = true;
      this.isResettingPassword = false;
    } else if (mode === 'reset') {
      this.isResettingPassword = true;
      this.isRegistering = false;
    } else {
      this.isRegistering = false;
      this.isResettingPassword = false;
    }
    this.errorMessage = ''; // Clear error messages when switching modes
  }
}
