import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, delay } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if we should use mock API (you can control this via environment variable)
  const useMockApi = true; // Set to false to use real API

  if (!useMockApi) {
    return next(req);
  }

  // Mock API responses based on URL patterns
  const url = req.url;

  // // Health check endpoint
  if (url.includes('/health')) {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          status: 'OK',
          message: 'System is healthy and running',
        },
      }),
    ).pipe(delay(500)); // Simulate network delay
  }

  // // Login endpoint
  if (url.includes('/login') && req.method === 'POST') {
    const body = req.body as any;

    // Mock authentication logic
    if (body.username === 'admin' && body.password === 'admin') {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'C',
            errorCode: '0000',
            errorDesc: 'SUCCESS',
            displayMessage: null,
            data: {
              token: {
                accessToken:
                  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkdWkiLCJ1c2VySWQiOiJkdWkiLCJpYXQiOjE2NzkzODA4MDUsImV4cCI6MTY3OTM4MTQwNX0.rgiXt9jeWPQc3BgTO1V3C_IPY77ltuJbEVFeIp74inp4gahnavtycmPzHgCgC-lR4PW8psbOS98Ixb7xUrCZ2Q',
                expiresInMsec: 600000,
                tokenType: 'Bearer',
                refreshToken: '82c97a4a-fdc5-4739-9a54-eee8697c0811',
              },
              user: {
                name: 'user1',
                email: 'test@email.com',
                ocCode: '1001',
                dateLastLogin: null,
              },
              permission: {
                configuration_allowaccess: '1',
                configuration_properties: '7',
                systemparameter_allowaccess: '1',
                systemparameter_properties: '6',
                occode_allowaccess: '1',
                occode_properties: '5',
                administration_allowaccess: '1',
                administration_properties: '7',
              },
            },
          },
        }),
      ).pipe(delay(800));
    } else {
      return of(
        new HttpResponse({
          status: 401,
          body: {
            success: false,
            message: 'Invalid username or password',
          },
        }),
      ).pipe(delay(800));
    }
  }

  // Entity Search History
  if (url.includes('/entity/getsearchhistory')){
    const body = req.body as any;
    if(true){
      return of(
        new HttpResponse({
            status: 200,
            body: {
              status: 'C',
              errorCode: '0000',
              errorDesc: 'SUCCESS',
              displayMessage: null,
              data: [{
                "Criteria": "CompanyA - 993152",
                "searchDate": "01/01/2026 10:00",
                },{
                "Criteria": "CompanyB - 993153",
                "searchDate": "01/01/2026 11:00",
                }]
            },
          }),
      ).pipe(delay(800));
    }

  }

  // Entity Search
  if (url.includes('/entity/search')){
    const body = req.body as any;
    if(true){
      return of(
        new HttpResponse({
            status: 200,
            body: {
              status: 'C',
              errorCode: '0000',
              errorDesc: 'SUCCESS',
              displayMessage: null,
              data: {
                "items": [{
                    "EntityId": "12345",
                    "Gc22": "001400000000000000000003368409",
                    "Gc23": "0105539069501",
                    "LongName": "test long name",
                    "ShortName": "test short name",
                    "PrimaryBankingOfficer": "s123456",
                    "IndustryCode": "G466130 - Wholesale of gaseous fuels"
                },{
                    "EntityId": "12346",
                    "Gc22": "001400000000000000000003368409",
                    "Gc23": "0105539069501",
                    "LongName": "test long namedddddddddddddddd",
                    "ShortName": "test short name",
                    "PrimaryBankingOfficer": "s123456",
                    "IndustryCode": "G466130 - Wholesale of gaseous fuels"
                }],
                "paging": {
                    "currentPage": 1,
                    "totalPage": 1,
                    "totalRec": 2
                },
                "sort": [{
                    "columnName": "LongName",
                    "direction": "desc"
                }]
              },
            },
          }),
      ).pipe(delay(800));
    }
  }

  // If no mock matches, pass through to real API
  return next(req);
};
