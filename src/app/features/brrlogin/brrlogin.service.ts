import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HealthResponse } from "src/app/api/models/health-response.model";

@Injectable({providedIn:'root'})
export class BrrLoginService{
    constructor(private http: HttpClient){}

    getHealth(){
        return this.http.get<HealthResponse>('http://localhost:8080/api/health');
    }
}