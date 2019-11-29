import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BankResultModel } from "../models/bank-result.model";

@Injectable({
  providedIn: "root"
})
export class BankDetailService {
  constructor() {}
  public bankzDetail: BehaviorSubject<BankResultModel[]> = new BehaviorSubject<
    BankResultModel[]
  >([]);
}
