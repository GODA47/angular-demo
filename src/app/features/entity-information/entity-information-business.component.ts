import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-entity-search',
  standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './entity-information-business.component.html',
  styles: []
})
export class EntityInformationComponent {
    
    isOpen = false;
    isOpenBusiness = false;
    isOpenIndustry = false;
    editForm = new FormGroup({
        firmType: new FormControl('',Validators.required),
        riskCurrency: new FormControl(''),
        primaryStockCode: new FormControl(''),
        countryOfRisk: new FormControl('',Validators.required),
        listingDate: new FormControl(''),
        indClass: new FormControl('ISIC V4'),
        industriesArray: new FormArray([]),
    });

    removeIndustry(index: number) {
        if (index >= 0 && index < this.industriesArray.length) {
            this.industriesArray.removeAt(index);
        }
    }

    addIndustry() {
        const industryGroup = new FormGroup({
            industryCode: new FormControl('', Validators.required),
            industryPercentage: new FormControl('', [Validators.required,Validators.min(0), Validators.max(100)]),
            isPrimary: new FormControl(this.industriesArray.length === 0),
        });
        this.industriesArray.push(industryGroup);
    }

    get industriesArray(){
        return this.editForm.get('industriesArray') as FormArray;
    }
    get canSave(): boolean {
        return this.editForm.dirty && this.editForm.valid;
    }

    constructor() {
        const listingCtrl = this.editForm.get('listingDate');
        const pscCtrl = this.editForm.get('primaryStockCode');

        if (listingCtrl?.value) {
            pscCtrl?.setValidators([Validators.required]);
        } else {
            pscCtrl?.clearValidators();
        }
        pscCtrl?.updateValueAndValidity({ emitEvent: false });

        listingCtrl?.valueChanges.subscribe(value => {
            if (value) {
                pscCtrl?.setValidators([Validators.required]);
            } else {
                pscCtrl?.clearValidators();
            }
            pscCtrl?.updateValueAndValidity({ emitEvent: false });
        });
    }

//TODO - Get these from API(?)
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
  industryCodes = [
      {id:1, code:'A01 - Description for A01'},
      {id:2, code:'B02 - Description for B02'},
      {id:3, code:'VW - Tiger Catapult'},
  ];
}
