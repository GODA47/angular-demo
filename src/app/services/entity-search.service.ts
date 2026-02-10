import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntitySearchRequest,EntitySearchResponse,EntitySearchHistoryResponse,EntitySearchHistoryRequest} from '../models/entity-search.model';

@Injectable({ providedIn: 'root' })
export class EntitySearchService {
  constructor(private http: HttpClient) {}
  private baseUrl = "http://localhost:8080/api";
  
  searchEntity(request: EntitySearchRequest) {
    return this.http.post<EntitySearchResponse>(this.baseUrl+'/entity/search', request, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getHistory(request: EntitySearchHistoryRequest){
    return this.http.post<EntitySearchHistoryResponse>(this.baseUrl+'/entity/getsearchhistory', request, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
