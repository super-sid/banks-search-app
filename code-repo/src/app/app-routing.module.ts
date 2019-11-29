import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchComponent } from "./components/search/search.component";
import { BankDetailComponent } from "./components/bank-detail/bank-detail.component";

const routes: Routes = [
  { path: "search", component: SearchComponent },
  { path: "", redirectTo: "/search", pathMatch: "full" },
  { path: "banks/:bankId", component: BankDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
