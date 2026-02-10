import { Component, signal } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntitySearchRequest,EntitySearchResponse,EntitySearchHistoryRequest,EntitySearchHistoryResponse} from '../../models/entity-search.model';
import { EntitySearchService } from '../../services/entity-search.service';

@Component({
  selector: 'app-entity-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './entity-search.component.html',
  styles: []
})
export class EntitySearchComponent {
  closeCommPopup() {
    this.showCommPopup=false;
  }
  loadingHistory = signal(false);
  loadingTable = signal(false);
  success = false;
  
  showCommPopup = true;
  commMessage = 'System will undergo maintenance from bla bla bla pm to bla bla bla pm. Sorry for any inconvenience.';


  constructor(
    private entitySearchService: EntitySearchService,
    private router: Router
  ){}
  
  //TODO: Implement Create Entity
  createEntity() {
    throw new Error('Method not implemented.');
  }

  showSearchHistoryPopup = false;
  searchHistory: any[] = [];

  openSearchHistoryPopup() {
    this.loadingHistory.set(true);
    const payload: EntitySearchHistoryRequest = {
      data: {
          userId: this.getUserId()
      }
    };
    this.entitySearchService.getHistory(payload).subscribe({
      next: (response: EntitySearchHistoryResponse) => {
        console.log('Entity Search response:', response);

        // Check for new response format with status 'C' (Complete/Success)
        if (response.status === 'C' && response.errorCode === '0000') {
          this.searchHistory = response.data ?? [];
          console.log(this.searchHistory);
        }
        else {
          const errorMessage = response.errorDesc || 'Api Error';
        }
        this.loadingHistory.set(false);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loadingHistory.set(false);
      }
    });
    this.showSearchHistoryPopup = !this.showSearchHistoryPopup;
  }

  closePopup() {
    this.showSearchHistoryPopup = false;
  }
  //TODO - Implement getUserId
  getUserId(): string {
    return ("MOCKY");
    // throw new Error('Method not implemented.');
  }

  //TODO - Get ISIC options from API
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

  handleSearch() {
    console.log("handleSearch");
    this.loadingTable.set(true);
    const formValue = this.searchForm.value;
    console.log(formValue);

    const payload: EntitySearchRequest = {
        data: [{
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
        paging:{
            currentPage:1,
            rowLimit:500,
            totalRec:1000
        }
    };
    this.entitySearchService.searchEntity(payload).subscribe({
      next: (response: EntitySearchResponse) => {
        console.log('Entity Search response:', response);

        // Check for new response format with status 'C' (Complete/Success)
        if (response.status === 'C' && response.errorCode === '0000') {
          this.rows = response.data?.items ?? [];
        }
        else {
          const errorMessage = response.errorDesc || 'Api Error';
        }
        this.loadingTable.set(false);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loadingTable.set(false);
      }
    });
  }
}
