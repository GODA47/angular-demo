import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoginApi {
    private readonly baseUrl ='/api';

    constructor(private http: HttpClient){}

    health() {
        console.log(`${this.baseUrl}/health`);
        return this.http.get<string>(`${this.baseUrl}/health`);
    }
}