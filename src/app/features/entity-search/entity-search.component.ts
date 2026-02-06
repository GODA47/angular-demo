import { Component } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
  selector: 'app-entity-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entity-search.component.html',
  styles: []
})
export class EntitySearchComponent {
  
  //TODO: Implement Create Entity
  createEntity() {
    throw new Error('Method not implemented.');
  }
  //TODO: Create Search History
  createSearchHistory() {
      throw new Error('Method not implemented.');
  }

  getCriteriaText(row: any) {
      return [
          row.longName ? `LN: ${row.longName}` : '',
          row.shortName ? `SN: ${row.shortName}` : '',
          row.registrationNumber ? `RN: ${row.registrationNumber}` : '',
          row.customerNumber? `CN: ${row.customerNumber}` : '',
          row.thaiName ? `TN: ${row.thaiName}` : '',
          row.groupConnection ? `GC: ${row.groupConnection}` : '',
          row.isic ? `ISIC: ${row.isic}` : '',
          row.primaryStockCode ? `PSC: ${row.primaryStockCode}` : '',
      ].filter(Boolean).join(', ');
  }

  showSearchHistoryPopup = false;
  searchHistory: any[] = [];

  openSearchHistoryPopup() {
      const stored = localStorage.getItem('entityTable');
      const records = stored ? JSON.parse(stored) : [];
      this.searchHistory = records.slice(-15).reverse();
      console.log(this.searchHistory);
      this.showSearchHistoryPopup = !this.showSearchHistoryPopup;
  }
  
  closePopup() {
    this.showSearchHistoryPopup = false;
  }

  //TODO: ISIC options from API
  isicOptions = [
      {code:'T0001', label:'test01'},
      {code:'T0002', label:'test02'},
  ];

  searchForm = new FormGroup({
      longName: new FormControl(''),
      shortName: new FormControl(''),
      registrationNumber: new FormControl(''),
      customerNumber: new FormControl(''),
      thaiName: new FormControl('',Validators.minLength(3)),
      groupConnection: new FormControl(''),
      isic: new FormControl(''),
      primaryStockCode: new FormControl('',Validators.maxLength(20)),
  });
  rows: any[] = [];
  navItems = ['Dashboard', 'Search Borrower', 'Risk Assessment', 'Reports'];
  selectedItem: string = 'Dashboard';

  //TODO: Implement API Search
  handleSearch() {
      console.log("handleSearch");
      const formValue = this.searchForm.value;
      console.log(formValue);
      
      const stored = localStorage.getItem('entityTable');
      const existing = stored ? JSON.parse(stored) : [];

      const newEntry = {
          id: Number(existing.length)+1,
          longName: formValue.longName,
          shortName: formValue.shortName,
          registrationNumber: formValue.registrationNumber,
          customerNumber: formValue.customerNumber,
          thaiName: formValue.thaiName,
          groupConnection: formValue.groupConnection,
          isic: formValue.isic,
          primaryStockCode: formValue.primaryStockCode,
          searchedOn: new Date().toISOString()
      }
      
      // console.log(newEntry);
      existing.push(newEntry);
      // console.log(existing);
      localStorage.setItem('entityTable', JSON.stringify(existing));

      const new_stored = localStorage.getItem('entityTable');
      
      //TODO: Call API to search entities with payload
      const payload = {
          data:[{
              CustomerNumber:formValue.customerNumber,
              RegistrationNumber:formValue.registrationNumber,
              LongName:formValue.longName,
              ShortName:formValue.shortName,
              ThaiName:formValue.thaiName,
              GroupConnection:formValue.groupConnection,
              IndustryCode:formValue.isic,
              PrimaryStockCode:formValue.primaryStockCode
          }],
          sort:[{
              column:"name",
              direction:"desc"
          }],
          paging:[{
              currentpage:"1",
              rowLimit:"500",
              totalRec:"1000"
          }]
      };
      console.log(payload);
      //TODO: Update rows to show search result
      this.rows = new_stored ? JSON.parse(new_stored):[];
  }
}
