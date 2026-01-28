import { Component,OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-login-table',
    template: `
        <div class = "flex flex-col justify-center items-center">
            @if (rows.length){
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        @for(row of rows; track row.id){
                            <tr>
                                <td>{{ row.id }}</td>
                                <td>{{ row.username }}</td>
                                <td>{{ row.password }}</td>
                                <td>{{ row.createdAt }}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            }
            <button type="button" routerLink="/login">Back to Login</button>
        </div>
    `,
    imports:[RouterLink],
})

export class TablePageComponent implements OnInit {
    rows: any[] = [];
    ngOnInit(){
        const stored = localStorage.getItem('loginTable');
        this.rows = stored ? JSON.parse(stored):[];
    }
}