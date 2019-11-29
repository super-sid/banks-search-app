import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { BankResultModel } from "../models/bank-result.model";
import { catchError, shareReplay } from "rxjs/operators";
import { Cacheable, CacheBuster } from "ngx-cacheable";

@Injectable({
  providedIn: "root"
})
export class RetreiveBankService {
  constructor(private http: HttpClient) {}
  @Cacheable()
  getBanksByCity(cityName: string): Observable<BankResultModel[]> {
    let path = "/banks";
    let api_url = "https://vast-shore-74260.herokuapp.com";
    return this.http
      .get<BankResultModel[]>(`${api_url}${path}`, {
        params: { city: cityName },
        headers: { "Content-Type": "application/json" }
      })
      .pipe(shareReplay(1));
  }
  private formatErrors(error: any) {
    return throwError(error.error);
  }
}
