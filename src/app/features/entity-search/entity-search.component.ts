import { Component, signal } from '@angular/core';
import { FormGroup,FormControl,FormArray,AbstractControl,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EntitySearchRequest,EntitySearchResponse,EntitySearchHistoryRequest,EntitySearchHistoryResponse, EntitySearchResponseItems} from '../../models/entity-search.model';
import { EntitySearchService } from '../../services/entity-search.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-entity-search',
  standalone: true,
  imports: [ReactiveFormsModule, TableModule],
  templateUrl: './entity-search.component.html',
  styles: []
})
export class EntitySearchComponent {

  entities: EntitySearchResponseItems[]=[];
  entitiesArray = new FormArray<FormGroup<any>>([]);
  showSearchHistoryPopup = false;
  searchHistory: any[] = [];
  private rowCounter=0;

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
          this.entities = response.data?.items ?? [];
          console.log(this.entitiesArray);
        } else {
          const errorMessage = response.errorDesc || 'Api Error';
        }
        this.loadingTable.set(false);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loadingTable.set(false);
      }
    });
    console.log(this.entitiesArray);
  }

  onSort(event:any){
    console.log(this.entitiesArray);
    this.entitiesArray.controls.sort((a,b) =>{
        const v1 = a.get(event.field)?.value;
        const v2 = b.get(event.field)?.value;
        if(v1==null) return -1;
        if(v2==null) return 1;
        return event.order * (v1 > v2 ? 1:-1);
    });
    this.entitiesArray.updateValueAndValidity();
    // console.log(zipped);
    // this.entities = zipped.map(z=>z.row);
    // this.entitiesArray.clear();
    // for(const z of zipped){
    //   this.entitiesArray.push(z);
    // }
  }
}
