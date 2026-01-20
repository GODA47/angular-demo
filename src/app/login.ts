import {Component} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { noSpacesValidator } from './validateInput';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login"> 
      <p>Demo Login Page</p>
      <form [formGroup]="profileForm" (ngSubmit)= "handleSubmit()">
        <div class="input-rows">
          <label for="username">Username: </label>
            <input id="username" type="text" formControlName="username" />
        </div> 
        <div class="input-rows">
          <label for="password">Password: </label>
          <input id="password" type="password" formControlName="password" />
        </div>
        <div class="submit-button">
          <button type="submit" 
                  [disabled]="!profileForm.valid" 
                  [title]="profileForm.valid ? '' : 'LOOOLLLLLL'">
            Submit
          </button>
        </div>
      </form>
      <button type="button" routerLink="/table">View Table</button>
    </div>
    <p>{{profileForm.value.username}}</p>
  `,
  imports: [ReactiveFormsModule,RouterLink],
})
export class Login {
  profileForm = new FormGroup({
    // username: new FormControl('',[Validators.required,Validators.email]),
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,noSpacesValidator()]),
  })
  constructor(private router: Router){}

  loading = false;
  handleSubmit(){
    console.log("handleSubmit");
    this.loading = true;
    if(this.profileForm.invalid){
      return;
    }

    const formValue = this.profileForm.value;
    const stored = localStorage.getItem('loginTable');
    const existing = stored ? JSON.parse(stored) : [];

    const newEntry = {
      id: Number(existing.length)+1,
      username: formValue.username,
      password: formValue.password,
      createdAt: new Date().toISOString()
    }
    console.log(newEntry);
    existing.push(newEntry);
    console.log(existing);
    localStorage.setItem('loginTable', JSON.stringify(existing));

    // this.router.navigate(['/table']);
    // alert(this.profileForm.value.username + '|' + this.profileForm.value.password);
  }
}
