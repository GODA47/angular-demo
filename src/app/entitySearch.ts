import { Component,OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { NgClass, NgFor } from "@angular/common";

@Component({
    selector: 'app-entity-search',
    template: `
        <div class="flex flex-col h-screen">
            <!-- Fixed Header -->
            <header class="bg-purple-900 p-4 fixed top-0 left-0 right-0 z-50 flex items-center">
                <h2 class="text-2xl font-bold text-amber-300 ml-4">Borrower Risk Rating (BRR)</h2>
                <div class="ml-auto mr-8 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:border-2 hover:border-purple-700">
                    <span class="text-yellow-400 text-lg">👤</span>
                </div>
            </header>

            <!-- Main Content Area -->
            <div class="flex pt-18 flex-1 overflow-hidden">
                <!-- Sidebar -->
                <aside class="w-64 bg-violet-900 overflow-y-auto fixed left-0 top-16 bottom-0">
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
                <main class="ml-64 flex-1 overflow-y-auto">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-4">Content Area</h3>
                        <p class="text-gray-600">Your content goes here and will scroll independently of the header.</p>
                    </div>
                </main>
            </div>
        </div>
    `,
    imports:[RouterLink],
})

export class EntitySearchComponent implements OnInit {
    rows: any[] = [];
    navItems = ['Dashboard', 'Search Borrower', 'Risk Assessment', 'Reports'];
    selectedItem: string = 'Dashboard';

    selectItem(item: string) {
        this.selectedItem = item;
        console.log(`Selected: ${item}`);
    }

    ngOnInit(){
        
    }
}