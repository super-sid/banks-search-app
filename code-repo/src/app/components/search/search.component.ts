import { Component, OnInit } from "@angular/core";
import { RetreiveBankService } from "src/app/services/retreive-bank.service";
import { BankResultModel } from "src/app/models/bank-result.model";
import { NgxSpinnerService } from "ngx-spinner";
import { BankDetailService } from "src/app/services/bank-detail.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  bankDetails: BankResultModel[];
  bankDetailsClone: BankResultModel[];
  banksFound: boolean = false;
  bookMarks: string[] = JSON.parse(localStorage.getItem("bankBookmarks"));
  cities = [
    { name: "Select City", value: " " },
    { name: "Delhi", value: "DELHI" },
    { name: "Bangalore", value: "BANGALORE" },
    { name: "Mumbai", value: "MUMBAI" },
    { name: "Chennai", value: "CHENNAI" },
    { name: "Bhopal", value: "BHOPAL" }
  ];
  cityValue: string = this.cities[0].value;

  constructor(
    private searchService: RetreiveBankService,
    private spinner: NgxSpinnerService,
    private bankDetailService: BankDetailService,
    private toastr: ToastrService
  ) {
    this.bankDetailService.bankzDetail.subscribe(value => {
      this.bankDetails = value;
    });
  }

  ngOnInit() {}
  citySelectChange(event): void {
    console.log(event, this.cityValue);
    if (this.cityValue != " ") {
      this.getBanks(this.cityValue);
    }
  }

  getBanks(cityName: string) {
    this.spinner.show();
    this.searchService.getBanksByCity(cityName).subscribe(
      success => {
        console.log(success);
        this.bankDetails = success;
        this.bankDetailsClone = success;
        this.bankDetailService.bankzDetail.next(this.bankDetails);
        this.banksFound = true;
        this.spinner.hide();
        this.updateBankDetails();
      },
      error => {
        console.log(error);
        this.banksFound = false;
        this.spinner.hide();
      }
    );
  }
  searchQuery(event) {
    if (this.bankDetailsClone) {
      const ar = this.bankDetailsClone;
      let val: string = event.target.value;
      if (val === "") {
        this.bankDetails = this.bankDetailsClone;
      } else {
        this.bankDetails = [];
        for (let i of ar) {
          if (i.bank_name.includes(val.toUpperCase())) {
            this.bankDetails.push(i);
          }
        }
      }
    } else {
      this.toastr.error("Please Select City first", "No Results Found");
    }
  }
  updateBankDetails() {
    if (this.bookMarks != null) {
      for (let i of this.bankDetails) {
        if (this.bookMarks.includes(i.ifsc)) {
          i.bookMarked = true;
        } else {
          i.bookMarked = false;
        }
      }
    } else {
      for (let i of this.bankDetails) {
        i.bookMarked = false;
      }
    }

    this.bankDetailsClone = this.bankDetails;
    console.log(this.bankDetails);
  }
}
