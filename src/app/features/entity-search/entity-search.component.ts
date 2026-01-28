import { Component,OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgFor } from "@angular/common";
import {FormGroup, FormControl} from '@angular/forms';
import { ReactiveFormsModule,Validators} from '@angular/forms';

@Component({
    selector: 'app-entity-search',
    template: `
        <div class="flex flex-col h-screen">
            <!-- Fixed Header -->
            <header class="overflow-x-hidden bg-purple-900 p-4 fixed top-0 left-0 right-0 z-50 flex items-center">
                <h2 class="whitespace-nowrap text-2xl font-bold text-white ml-4">Borrower Risk Rating (BRR)</h2>
                <div class="ml-auto mr-0 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:border-2 hover:border-purple-700">
                    <span class="text-yellow-400 text-lg">👤</span>
                </div>
            </header>

            <!-- Main Content Area -->
            <div class="flex pt-18 flex-1 overflow-hidden">
                <!-- Sidebar -->
                <aside class="w-64 bg-violet-900 overflow-y-auto fixed left-0 top-18 bottom-0">
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
                </aside>

                <!-- Scrollable Content Area -->
                <main class="ml-64 flex-1 overflow-y-auto flex items-start p-6">
                    <div 
                        class="bg-white rounded-lg shadow-2xl p-2 shrink-0 w-300 h-fit"
                    >
                        <div class="bg-gray-300 flex items-center mb-4">
                            <h2 class="text-purple-800 text-xl font-bold p-1">Search Criteria</h2>
                            <div class="ml-auto mr-0 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:border-2 hover:border-purple-700">
                                <span class="text-yellow-400 text-lg">🔎</span>
                            </div>
                        </div>
                        <form [formGroup]="searchForm" (ngSubmit)= "handleSearch()">
                            <div class="space-y-4 w-fit">
                                <!-- Row 1 -->
                                <div class="flex gap-30">
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Long Name:</label>
                                        <input formControlName="longName" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Short Name:</label>
                                        <input formControlName="shortName" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                </div>

                                <!-- Row 2 -->
                                <div class="flex gap-30">
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Registration Number:</label>
                                        <input formControlName="registrationNumber" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Customer Number:</label>
                                        <input formControlName="customerNumber" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                </div>

                                <!-- Row 3 -->
                                <div class="flex gap-30">
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Thai Name:</label>
                                        <input formControlName="thaiName" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Group/Connection:</label>
                                        <input formControlName="groupConnection" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                </div>

                                <!-- Row 4 -->
                                <div class="flex gap-30">
                                    <div class="flex items-center gap-2">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">ISIC:</label>
                                        <div class="relative">
                                            <input formControlName="isic" type="text" class="px-4 py-2 pr-10 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                            <span class="absolute right-3 top-2.5 text-gray-400 cursor-pointer">🔍</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 text">
                                        <label class="text-purple-800 text-xl font-bold p-1 w-48">Primary Stock Code:</label>
                                        <input formControlName="primaryStockCode" type="text" class="px-4 py-2 border-2 shadow-sm border-amber-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48" placeholder="">
                                    </div>
                                </div>
                            </div>
                            <div class="flex gap-30">
                                <button type="submit" class="w-36 mt-6 px-6 py-2 bg-purple-800 text-white font-bold hover:bg-purple-700 cursor-pointer">Search</button>    
                                <button type="reset" class="w-36 mt-6 px-6 py-2 bg-white text-purple-800 font-bold hover:bg-purple-700 cursor-pointer">Clear</button>
                            </div>
                        </form>
                        <div class="bg-gray-300 flex items-center mt-12">
                            <h2 class="text-purple-800 text-xl font-bold p-1">Search Result</h2>
                        </div>
                        <div class="bg-yellow-200 flex items-center">
                            <h2 class="text-green-400 text-xl font-bold p-1">✥</h2>
                            <h2 class="text-gold text-xl font-bold p-1">🗑️</h2>
                        </div>
                        <table class="border-collapse w-full overflow-x-hidden">
                            <thead class="bg-gold">
                                <tr>
                                    <th class="w-20"></th>
                                    <th class="text-white text-semibold text-left align-top w-50">Entity ID</th>
                                    <th class="text-white text-semibold text-left align-top w-100">Customer Number</th>
                                    <th class="text-white text-semibold text-left align-top w-60">Registration Number</th>
                                    <th class="text-white text-semibold text-left align-top w-60">Long Name</th>
                                    <th class="text-white text-semibold text-left align-top w-80">Short Name</th>
                                    <th class="text-white text-semibold text-left align-top w-60">isic</th>
                                    <th class="text-white text-semibold text-left align-top w-60">Primary Stock Code</th>
                                </tr>
                            </thead>

                            <tbody>
                                @for(row of rows; track row.id){
                                    <tr class="border-b border-gray-300">
                                        <td class="align-top pl-2"><input type="checkbox" class="w-3 h-3 cursor-pointer"></td>
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
            </div>
        </div>
    `,
    imports:[RouterLink, ReactiveFormsModule],
})

export class EntitySearchComponent {
    searchForm = new FormGroup({
        longName: new FormControl(''),
        shortName: new FormControl(''),
        registrationNumber: new FormControl(''),
        customerNumber: new FormControl(''),
        thaiName: new FormControl(''),
        groupConnection: new FormControl(''),
        isic: new FormControl(''),
        primaryStockCode: new FormControl(''),
    });
    rows: any[] = [];
    navItems = ['Dashboard', 'Search Borrower', 'Risk Assessment', 'Reports'];
    selectedItem: string = 'Dashboard';

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
        }
        console.log(newEntry);
        existing.push(newEntry);
        console.log(existing);
        localStorage.setItem('entityTable', JSON.stringify(existing));

        const new_stored = localStorage.getItem('entityTable');
        this.rows = new_stored ? JSON.parse(new_stored):[];
    }
    selectItem(item: string) {
        this.selectedItem = item;
        console.log(`Selected: ${item}`);
    }
}