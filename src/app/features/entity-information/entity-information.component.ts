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
}
