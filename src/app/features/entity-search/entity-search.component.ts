import { Component,OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgFor } from "@angular/common";
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
    selector: 'app-entity-search',
    template: `
        <div class="flex flex-col h-screen">
            <!-- Fixed Header -->
            
            <!-- <header class="overflow-x-hidden bg-purple-900 p-4 fixed top-0 left-0 right-0 z-50 flex items-center">
                <h2 class="whitespace-nowrap text-2xl font-bold text-white ml-4">Borrower Risk Rating (BRR)</h2>
                <div class="ml-auto mr-0 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:border-2 hover:border-purple-700">
                    <span class="text-yellow-400 text-lg">👤</span>
                </div>
            </header> -->

            <!-- Main Content Area -->
            <!-- <div class="flex pt-18 flex-1 overflow-hidden"> -->
                <!-- Sidebar -->
                <!-- <aside class="w-64 bg-violet-900 overflow-y-auto fixed left-0 top-18 bottom-0">
                    <nav class="pt-10 space-y-0">
                        @for (item of navItems; track item){
                            <div 
                                (click)="selectItem(item)"
                                class="nav-item"
                                [class.active]="selectedItem === item"
                                >
                                {{ item }}
                            </div>
                        }
                    </nav>
                </aside> -->

                <!-- Scrollable Content Area -->
                <main class="ml-0 flex-1 overflow-y-auto flex items-start p-6">
                    <div 
                        class="bg-white rounded-lg shadow-2xl p-2 shrink-0 w-300 h-fit"
                    >
                        <div class="flex items-center border-b-2 border-b-purple-800 mb-4 pb-3">
                            <h2 class="text-purple-800 text-xl font-bold pl-4">
                                Search Criteria
                            </h2>
                            <div class="relative ml-auto mr-0 flex items-center justify-center w-fit h-10 cursor-pointer"
                                    (click)="changeSearchHistoryPopupState()">
                                <span class="text-purple-800 mr-1 underline font-semibold">Search History</span>
                                <span class="text-yellow-400 text-lg">🔎</span>
                                @if(showSearchHistoryPopup){
                                    <div class="absolute top-full right-0 cursor-default border-purple-400 border-2 z-50"
                                        (click)="$event.stopPropagation()">
                                        <!-- <div class="bg-white shadow-2xl w-full max-w-120 p-4"> -->
                                            <table class="border-collapse table-auto ">
                                                <thead class="bg-gray-200">
                                                    <tr>
                                                        <th class="text-black text-semibold text-left align-top py-2 px-3 pl-7 whitespace-nowrap min-w-150 border-b border-gray-200">
                                                            Criteria (Last 15 Results)</th>
                                                        <th class="text-black text-semibold text-left align-top py-2 px-3 pr-6 whitespace-nowrap min-w-30">\
                                                            Searched On</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    @for(row of searchHistory; track row.id){
                                                        <tr class="bg-white border-b border-gray-300">
                                                            <td class = "text-black text-semibold text-left align-top py-2 px-3 pl-7">
                                                            {{getCriteriaText(row)}}</td>
                                                        <td class = "text-black text-semibold text-left align-top py-2 px-3 pr-4 whitespace-nowrap">
                                                            {{row.searchedOn}}</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        <!-- </div> -->
                                    </div>
                                }
                            </div>
                            
                        </div>
                        <form [formGroup]="searchForm" (ngSubmit)= "handleSearch()">
                            <div class="space-y-2 w-auto px-2">
                                <!-- Row 1 -->
                                <div class="flex justify-between">
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">Long Name:</label>
                                        <input formControlName="longName" type="text" class="entity-search-inputbox" placeholder="">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">Short Name:</label>
                                        <input formControlName="shortName" type="text" class="entity-search-inputbox" placeholder="">
                                    </div>
                                </div>

                                <!-- Row 2 -->
                                <div class="flex justify-between">
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">Registration Number:</label>
                                        <input formControlName="registrationNumber" type="text" class="entity-search-inputbox" placeholder="">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">Customer Number:</label>
                                        <input formControlName="customerNumber" type="text" class="entity-search-inputbox" placeholder="">
                                    </div>
                                </div>

                                <!-- Row 3 -->
                                <div class="flex justify-between">
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel ">Thai Name:</label>
                                        <input formControlName="thaiName" type="text" class="entity-search-inputbox" placeholder="" 
                                        [class.border-red-500]="searchForm.controls.thaiName.invalid"
                                        [title]="searchForm.controls.thaiName.valid ? '':'Must be at least 3 characters'">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">Group/Connection:</label>
                                        <input formControlName="groupConnection" type="text" class="entity-search-inputbox" placeholder="">
                                    </div>
                                </div>
                                @if (searchForm.controls.thaiName.invalid){
                                    <div class="flex justify-between h-2">
                                        <div class="flex items-center gap-2">
                                            <label class="entity-search-inputlabel"></label>
                                            <p class="w-80 ml-2 text-sm text-red-500">Must be at least 3 characters</p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <label class="entity-search-inputlabel"></label>
                                            <p calss="w-80"></p>
                                        </div>
                                    </div>
                                }

                                <!-- Row 4 -->
                                <div class="flex justify-between">
                                    <div class="flex items-center gap-2">
                                        <label class="entity-search-inputlabel">ISIC:</label>
                                        <div class="relative">
                                            <select formControlName="isic" class=" appearance-none hover:cursor-pointer entity-search-inputbox" placeholder="">
                                                <option value=""></option>
                                                @for (op of isicOptions; track op.code){
                                                    <option [value]="op.code">
                                                        {{op.code}} - {{op.label}}
                                                    </option>
                                                }
                                            </select>
                                            <span class="absolute right-3 top-2.5 text-gray-400 cursor-pointer">🔍</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 text">
                                        <label class="entity-search-inputlabel">Primary Stock Code:</label>
                                        <input formControlName="primaryStockCode" type="text" class="entity-search-inputbox" placeholder=""
                                            [class.border-red-500]="searchForm.controls.primaryStockCode.invalid">
                                    </div>
                                </div>
                                @if (searchForm.controls.primaryStockCode.invalid){
                                    <div class="flex justify-between h-2">
                                        <div class="flex items-center gap-2"> 
                                            <label class="entity-search-inputlabel"></label>
                                            <p class="w-80"></p>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <label class="entity-search-inputlabel"></label>
                                            <p class="w-78 ml-2 text-sm text-red-500 text-left">Cannot be longer than 20 characters</p>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div class="flex ml-4 gap-2">
                                <button 
                                    type="submit" 
                                    class=" disabled:hover:cursor-not-allowed w-36 mt-6 px-6 py-2 shadow-md bg-purple-800 text-white font-bold not-disabled:hover:bg-purple-700 border rounded-sm cursor-pointer"
                                    [disabled] = "!searchForm.valid"
                                    >Search</button>    
                                <button type="reset" class="w-36 mt-6 px-6 py-2 bg-white shadow-md text-purple-800 font-bold border rounded-sm cursor-pointer">Clear</button>
                            </div>
                        </form>
                        <div class="flex items-center border-b-2 border-b-purple-800 mb-4 pb-3 pt-6">
                            <h2 class="text-purple-800 text-xl font-bold pl-4">Search Result</h2>
                        </div>
                        <div class="bg-purple-800 flex items-center">
                            <h2 class="text-green-400 text-xl font-bold p-1 pl-3 align-middle justify-center"
                                (click)="createEntity()">
                                ✚</h2>
                            <h2 class="text-gold text-xl font-bold p-1">🗑️</h2>
                        </div>
                        <table class="border-collapse w-full table-auto">
                            <thead class="bg-purple-600">
                                <tr>
                                    <th class="w-10"></th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Entity ID</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Customer Number</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Registration Number</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Long Name</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Short Name</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">isic</th>
                                    <th class="text-white text-semibold text-left align-top py-2 ">Primary Stock Code</th>
                                </tr>
                            </thead>

                            <tbody>
                                @for(row of rows; track row.id){
                                    <tr class="border-b border-gray-300">
                                        <td class=" flex items-center justify-center p-2"><input type="checkbox" class="w-3 h-3 cursor-pointer"></td>
                                        <td>{{ row.id }}</td>
                                        <td>{{ row.customerNumber }}</td>
                                        <td>{{ row.registrationNumber }}</td>
                                        <td>{{ row.longName }}</td>
                                        <td>{{ row.shortName }}</td>
                                        <td>{{ row.isic }}</td>
                                        <td>{{ row.primaryStockCode }}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>

                    </div>
                </main>
            <!-- </div> -->
        </div>
    `,
    imports:[RouterLink, ReactiveFormsModule],
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
    
    changeSearchHistoryPopupState() {
        const stored = localStorage.getItem('entityTable');
        const records = stored ? JSON.parse(stored) : [];
        this.searchHistory = records.slice(-15).reverse();
        console.log(this.searchHistory);
        this.showSearchHistoryPopup = !this.showSearchHistoryPopup;
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

    // selectItem(item: string) {
    //     this.selectedItem = item;
    //     console.log(`Selected: ${item}`);
    // }
}