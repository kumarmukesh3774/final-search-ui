import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {
  public results:any=[];
  public products:any=[];
  name:String;
  searchInput:string="";

  val = new Subject<string>();
  flag :boolean;
  searchTerm$ = new Subject<string>();

  constructor(private searchService: SearchService) {
    //searching the keyword in redis database
    if(this.searchTerm$){
    this.searchService.search(this.searchTerm$)
      .subscribe(res => {
        this.results = res;
        if(res!="default")
        {
          this.flag=true;
       }
        else{
          this.flag=false;
        }
      });
    }
    
}
//searching the products in backend
onclick(result) {
  this.searchInput=result;
  this.searchService.searchProducts(result)
  .subscribe(res => {
    this.products = res;
  });
  this.flag=false;
}
onclickByForm() {
  this.searchService.searchProducts(this.searchInput)
  .subscribe(res => {
    this.products = res;
  });
  this.flag=false;
}
}