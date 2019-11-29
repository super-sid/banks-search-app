import { Component, OnInit, Input } from "@angular/core";
import { BankResultModel } from "src/app/models/bank-result.model";

@Component({
  selector: "app-search-result",
  templateUrl: "./search-result.component.html",
  styleUrls: ["./search-result.component.css"]
})
export class SearchResultComponent implements OnInit {
  @Input() result: BankResultModel[];
  p: number = 1;
  paginateValues: number[] = [10, 25, 50, 100];
  pageResults: number = this.paginateValues[0];
  bookmarks: string[] = JSON.parse(localStorage.getItem("bankBookmarks"));
  constructor() {}

  ngOnInit() {
    console.log(this.result);
  }
  paginateSelectChange(event): void {
    console.log(event, this.pageResults);
  }
  checkBookmark() {}
  addBookmark(event, bankName) {
    for (let i of this.result) {
      if (i.ifsc === bankName.ifsc) {
        if (event) {
          i.bookMarked = true;
        } else {
          i.bookMarked = false;
        }
      }
    }
    if (event == true) {
      if (this.bookmarks != null) {
        console.log(bankName.ifsc, event);
        this.bookmarks.push(bankName.ifsc);
        console.log(this.bookmarks);
        localStorage.setItem("bankBookmarks", JSON.stringify(this.bookmarks));
      } else {
        this.bookmarks = [];
        this.bookmarks.push(bankName.ifsc);
        console.log(this.bookmarks);
        localStorage.setItem("bankBookmarks", JSON.stringify(this.bookmarks));
      }
    } else {
      console.log(bankName.ifsc, event);
      for (let index = 0; index < this.bookmarks.length; index++) {
        if (this.bookmarks[index] == bankName.ifsc) {
          this.bookmarks.splice(index);
          localStorage.setItem("bankBookmarks", JSON.stringify(this.bookmarks));
        }
      }
      console.log(this.bookmarks);
    }
  }
}
