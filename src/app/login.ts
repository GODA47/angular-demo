import {Component} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="login"> 
      <p>Demo Login Page</p>
      <form [formGroup]="profileForm" {ngSubmit}= "handleSubmit()">
        <div class="input-rows">
          <label for="username">Username: </label>
            <input id="username" type="text" formControlName="username" />
        </div> 
        <div class="input-rows">
          <label for="password">Password: </label>
          <input id="password" type="password" formControlName="password" />
        </div>
      </form>
      <div class="submit-button">
        <button type="submit" [disabled]="!profileForm.valid" [title]="profileForm.valid ? '' : 'LOOOLLLLLL'">
          Submit
        </button>
      </div>
    </div>
    <p>{{profileForm.value.username}}</p>
  `,
  imports: [ReactiveFormsModule],
})
export class Login {
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  })
  loading = false;
  handleSubmit(){
    this.loading = true;
    alert(this.profileForm.value.username + '|' + this.profileForm.value.password);
  }
}
