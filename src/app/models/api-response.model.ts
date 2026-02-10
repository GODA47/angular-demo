export interface ApiResponse<T>{
    status: string;
    errorCode: string;
    errorDesc: string;
    displayMessage?: string | null;
    data: T | null;
}