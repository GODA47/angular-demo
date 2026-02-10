import {Component, signal} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})

export class LoginComponent {

  isProd = false;
  errorMessage = signal('');
  loading = signal(false);

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(
    private brrLoginService: LoginService,
    private router: Router
  ){}
  
  // updateErrorMessage(){
  //   this.errorMessage.set()
  // }

  downloadManual(){
    console.log("downloard manual");
  }

  onLoginAD(){
    console.log("login ad");
  }
  
  nonProdLogin(){
    var success = false;
    console.log("nonProdLogin");

    if (this.loginForm.invalid) {
      this.errorMessage.set('Please enter username and password');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const formValue = this.loginForm.value;

    const credentials = {
      username: formValue.username || '',
      password: formValue.password || ''
    };

    console.log('Attempting login with:', credentials);

    this.brrLoginService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        this.loading.set(false);

        // Check for new response format with status 'C' (Complete/Success)
        if (response.status === 'C' && response.errorCode === '0000') {
          console.log('Login successful!', response.data?.user);
          this.errorMessage.set('Login successful! Redirecting...');

          // Store token if needed
          if (response.data?.token?.accessToken) {
            localStorage.setItem('accessToken', response.data.token.accessToken);
            localStorage.setItem('refreshToken', response.data.token.refreshToken);
          }

          // Navigate to entity search page
          setTimeout(() => {
            this.router.navigate(['/entity/search']);
          }, 1000);

          success = false;
        }
        // Check for old response format (backward compatibility)
        else if (response.success) {
          console.log('Login successful!', response.user);
          this.errorMessage.set('Login successful! Redirecting...');
          setTimeout(() => {
            this.router.navigate(['/entity/search']);
          }, 1000);
          success = true
        }
        // Handle error response
        else {
          this.errorMessage.set(response.errorDesc || response.message || 'Login failed');
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loading.set(false);
        this.errorMessage.set('An error occurred during login');
      }
    });

    //TODO: LOG LOGIN ATTEMPT
    

  }

  ngOnInit(){

  }
}