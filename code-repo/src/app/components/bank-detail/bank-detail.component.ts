import { Component, OnInit } from "@angular/core";
import { BankResultModel } from "src/app/models/bank-result.model";
import { ActivatedRoute } from "@angular/router";
import { BankDetailService } from "src/app/services/bank-detail.service";

@Component({
  selector: "app-bank-detail",
  templateUrl: "./bank-detail.component.html",
  styleUrls: ["./bank-detail.component.css"]
})
export class BankDetailComponent implements OnInit {
  banksDetail: BankResultModel[];
  bankDetail: BankResultModel;

  constructor(
    private route: ActivatedRoute,
    private bankService: BankDetailService
  ) {
    this.bankService.bankzDetail.subscribe(value => {
      this.banksDetail = value;
    });
  }

  ngOnInit() {
    const bankIFSC = this.route.snapshot.paramMap.get("bankId");
    this.getBankDetail(bankIFSC);
  }
  getBankDetail(bankIfsc: string) {
    for (let i of this.banksDetail) {
      if (i.ifsc == bankIfsc) {
        this.bankDetail = i;
      }
    }
  }
}
