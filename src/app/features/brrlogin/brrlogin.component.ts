import {Component, inject, signal} from '@angular/core';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { BrrLoginService } from './brrlogin.service';

@Component({
  selector: 'brr-login',
  template: `
  @if(showCommPopup){
    <div class="fixed min-h-screen min-w-screen bg-black/50">
      <div class="fixed inset-0 flex justify-center h-fit">
        <div class="bg-white shadow-xl w-full max-w-md p-4"
          (click)="$event.stopPropagation()">
          <h2 class="text-centertext-xl mb-4 text-center">📢 Announcement 📢</h2>
          <p class="text-gray-600 text-justify mb-6 text-sm">
            {{commMessage}}
          </p>
          <div class="flex items-center justify-center">
            <button class="h-7 w-16 mx-auto px-3 py-1 rounded-md border-gray-300 text-sm shadow-lg bg-gray-200 hover:cursor-pointer"
              (click)="closePopup()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  }
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 w-full">
      <div class="flex items-center justify-center mt-15">
        <div class="max-w-3xl bg-white/50 rounded-2xl shadow-lg p-15 pb-2">
          <div class="mx-auto w-64 flex rounded-2xl shadow-lg overflow-hidden h-16">
            <div class="w-1/2 bg-scb-purple flex items-center justify-center">
              <img
                src="/assets/images/SCB_Logo.png"
                alt="Example"
                class=" max-h-3/4 max-w-full object-contain"
              />
            </div>
            <div class="w-1/2 bg-gray-100 flex items-center justify-center">
              <p class="font-bold text-lg">BRRFC</p>
            </div>
          </div>
          <p class="mt-2 text-center font-semibold">Borrower Risk Rating</p>
          <p class="mt-10 mb-4 text-center font-semibold">Sign in with your Organization Account</p>      
          
          <form [formGroup]="loginForm" (ngSubmit)="handleSubmit()">
            @if(!isProd){
              <div class="flex">
                <input 
                  id="username" 
                  type="text" 
                  formControlName="username" 
                  placeholder="Username"
                  class="w-64 mb-2 mx-auto border p-0.5 rounded-sm bg-white"/>
              </div>
              <div class="flex">
                <input 
                  id="password" 
                  type="password" 
                  formControlName="password" 
                  placeholder="Password"
                  class="w-64 mb-2 mx-auto border p-0.5 rounded-sm bg-white"/>
              </div>
              <button
                type="submit" 
                class="w-64 text-lg rounded-lg bg-scb-purple text-white block mx-auto mt-4 px-2 py-1.5 font-bold hover:cursor-pointer">
                Login
              </button>
            }
            </form>
            <button
              class="w-64 text-lg rounded-lg bg-scb-purple text-white block mx-auto mt-4 px-2 py-1.5  font-bold hover:cursor-pointer"
              (click)="onLoginAD()">
              Login AD
            </button>
            @if(errorMessage()|| errorMessage().trim()===''){
              <p class="mt-4 font-bold text-red-500 text-center">
                {{errorMessage()}}
              </p>
            }
          <p class="underline mt-15 font-extrabold text-center text-gray-600 hover:cursor-pointer" (click)="downloadManual()">ดาวน์โหลดคู่มือการใช้งาน BRRFC (Manual)</p>
        </div>
      </div>
    </main>
    <footer class=" mx-auto bg-white/55 shadow-lg mt-15 p-5 text-sm text-gray-600">
      <p class="underline">ข้อกำหนดเกี่ยวกับการเข้าถึงและใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคาร</p>
      <p class="indent-4 text-justify">ในการเข้าถึงและใช้งานระบบ BRRFC ของธนาคารไทยพาณิชย์ จำกัด (มหาชน) (“ธนาคาร”) ท่านรับทราบว่า ระบบดังกล่าวเป็นระบบคอมพิวเตอร์และเครือข่ายของธนาคาร และท่านตกลงจะเข้าถึงและใช้งานระบบดังกล่าวเพื่อการปฏิบัติงานตามหน้าที่ที่ได้รับมอบหมาย และตามนโยบายของธนาคารเท่านั้น  นอกจากนี้  ท่านตกลงให้ธนาคารมีสิทธิตรวจสอบการเข้าถึงและใช้งานระบบคอมพิวเตอร์และเครือข่ายใดๆ ของธนาคารของท่าน เพื่อควบคุมดูแล ตรวจสอบ และป้องกันการเข้าถึงและใช้งานที่ไม่สอดคล้องกับนโยบายของธนาคารข้อกำหนดนี้   หรือกฎหมายและกฎเกณฑ์ที่เกี่ยวข้อง   การที่ท่านเข้าถึงหรือใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคารโดยไม่ปฏิบัติตามนโยบายของธนาคาร  ข้อกำหนดนี้หรือกฎหมายและกฎเกณฑ์ที่เกี่ยวข้อง อาจทำให้ธนาคารได้รับความเสียหาย รวมถึงอาจส่งผลให้ท่านได้รับโทษตามระเบียบของธนาคาร (เช่น  การตักเตือน  การไล่ออก)  และท่านอาจต้องชดใช้ค่าเสียหาย และ/หรือถูกดำเนินคดีทางกฎหมายด้วย หากท่านมีข้อสงสัยเกี่ยวกับการเข้าถึงหรือการใช้งานระบบคอมพิวเตอร์และเครือข่ายของธนาคาร หรือข้อกำหนดนี้ กรุณาติดต่อ IT Help Desk ผ่านช่องทาง Tel : 025442244, E-mail : helpdesk@email.scb.co.th</p>
      <p class="mt-3 underline">Terms in relation to the access to and the use of Bank's computer systems and networks</p>
      <p class="indent-4 text-justify">In relation to the access to and the use of the Bank’s computer systems and networks By accessing and using the BRRFC system of The Siam Commercial Bank  Public  Company Limited  (the “Bank”), you   acknowledge that the system is the  Bank’s  computer system and network, and you agree to access and use the system to perform your assigned  duties and in accordance  with the Bank’s  policies only. In addition,you agree that the Bank shall  have the  right to investigate your access to and your use of any Bank’s computer systems and networks in order to control, monitor, and prevent the access and the use which are not in compliance with the Bank’s policies, these terms or the applicable laws and regulations. Failure to access or use the Bank’s computer systems and networks in compliance with the Bank’s policies, these terms or the applicable laws and regulations may cause damage  to the Bank,  and may  also result in a disciplinary actions pursuant to the Bank’s regulations (such as warning, termination of employment), compensation for damages, and/or legal proceedings being undertaken  against  you. If  you  have further  inquiries  about  the  access  to  or the use of the Bank’s computer systems and networks or these terms, please contact IT Help Desk through the Tel : 025442244, E-mail : helpdesk@email.scb.co.th</p>
      </footer>
  </div>
  `,
  imports: [ReactiveFormsModule,RouterLink],
})
export class BRRLoginComponent {

  isProd = false;
  errorMessage = signal('');
  showCommPopup = false;
  commMessage = 'System will undergo maintenance from bla bla bla pm to bla bla bla pm. Sorry for any inconvenience.';

  loading = signal(false);

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  })
  constructor(
    private router: Router,
    private brrLoginService: BrrLoginService){}
  
  // updateErrorMessage(){
  //   this.errorMessage.set()
  // }
  downloadManual(){
    console.log("downloard manual");
  }
  onLoginAD(){
    console.log("login ad");
    this.brrLoginService.getHealth().subscribe(response => {
      console.log(response);
      this.errorMessage.set(response.message);
    });
  }
  handleSubmit(){
    console.log("handleSubmit");
    this.openPopup();
    // this.loading.set(true);

    // const formValue = this.profileForm.value;
    // const stored = localStorage.getItem('loginTable');
    // const existing = stored ? JSON.parse(stored) : [];

    // const newEntry = {
    //   id: Number(existing.length)+1,
    //   username: formValue.username,
    //   password: formValue.password,
    //   createdAt: new Date().toISOString()
    // }
    // console.log(newEntry);
    // existing.push(newEntry);
    // console.log(existing);
    // localStorage.setItem('loginTable', JSON.stringify(existing));

    // this.router.navigate(['/table']);
    // alert(this.profileForm.value.username + '|' + this.profileForm.value.password);
  }
  openPopup(){
    this.showCommPopup = true;
  }
  closePopup(){
    this.showCommPopup = false;
  }

  ngOnInit(){

  }
}