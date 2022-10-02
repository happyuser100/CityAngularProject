import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CityItem } from '../models/city-item';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseURL: string = environment.baseURL;
  constructor(private httpClient: HttpClient) { }

  getCitiesAll() {
    return this.httpClient.get<CityItem[]>(`${this.baseURL}/City/GetCitiesAll`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError = (error: any) => {
    let errorMessage = '';
    let errorMessageSnack = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error.error !== "undefined") {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\n Error:${error.error}`;
        errorMessageSnack = `Error:${error.error}`;
        console.log("errorMessage", errorMessage);
      }
      else
        console.log("undefined");
    }
    return throwError(error);
  }
}
