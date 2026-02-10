import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './comm-popup.component.html',
  styles: [],
})
export class CommPopupComponent {
  closeCommPopup() {
    this.showCommPopup=false;
  }
  showCommPopup = true;
  commMessage = 'System will undergo maintenance from bla bla bla pm to bla bla bla pm. Sorry for any inconvenience.';
}
