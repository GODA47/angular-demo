import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-entity-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entity-information.component.html',
  styles: []
})
export class EntityInformationComponent {
createIndustryRow() {
throw new Error('Method not implemented.');
}
  isOpen = false;
  isOpenBusiness: any;
  isOpenIndustry: any;
  editForm = new FormGroup({
      firmType: new FormControl('',Validators.required),
      riskCurrency: new FormControl(''),
      primaryStockCode: new FormControl(''),
      countryOfRisk: new FormControl('',Validators.required),
      listingDate: new FormControl(''),
  });
  countryOptions = [
      {code:'T0001', label:'Thailand'},
      {code:'T0002', label:'Ugandaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
  ];

  currencyOptions = [
      {code:'THB', label:'Thai Baht'},
      {code:'JPY', label:'Japanese Yen'},
  ];
  indClassOptions = [
      {code:'1', label:'ISIC V4'},
      {code:'2', label:'VWXYZ-Dragon Catapult Cannon'},
  ];
  rows = [
      {id:1, code:'A01', label:'Description for A01', percentage:20, primary:true},
      {id:2, code:'B02', label:'Description for B02', percentage:20, primary:true},
      {id:3, code:'VW', label:'Tiger Catapult', percentage:20, primary:false},
  ];
}
