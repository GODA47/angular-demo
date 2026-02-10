import { ApiResponse } from "./api-response.model";

export type EntitySearchResponse = ApiResponse<EntitySearchResponseData>;
export type EntitySearchHistoryResponse = ApiResponse<EntitySearchHistoryResponseData[]>;
export interface EntitySearchResponseData{
    items?: EntitySearchResponseItems[];
    sort?: EntitySearchResponseSorting[];
    paging?: {
        currentPage?:number | null;
        totalPage?:number | null;
        totalRec?:number | null
    };
}

export interface EntitySearchResponseItems{
    EntityId?:string | null ;
    Gc22?:string | null;
    Gc23?:string | null;
    LongName?:string | null;
    ShortName?:string | null;
    PrimaryBankingOfficer?:string | null;
    IndustryCode?:string | null;
}

export interface EntitySearchResponseSorting{
    columnName?:string | null;
    direction?:string | null;
}

export interface EntitySearchRequest {
    data: EntitySearchRequestData[];
    sort: EntitySearchRequestSorting[];
    paging: {
        currentPage?: number | null;
        rowLimit?: number | null;
        totalRec?: number | null;
    }
}

export interface EntitySearchRequestData{
    CustomerNumber?: string | null;
    RegistrationNumber?: string | null;
    LongName?: string | null;
    ShortName?: string | null;
    ThaiName?: string | null;
    GroupConnection?: string | null;
    IndustryCode?: string | null;
    PrimaryStockCode?: string | null;
}

export interface EntitySearchRequestSorting {
    column?:string | null;
    direction?:string | null;
}

export interface EntitySearchHistoryRequest{
    data: {userId:string};
}

export interface EntitySearchHistoryResponseData{
    criteria:string;
    searchDate:string;
}