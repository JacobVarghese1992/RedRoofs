import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';

@Component({
  moduleId: module.id,
  selector: 'listings',
  template: `<ng2-smart-table [settings]="settings" [source]="entries"></ng2-smart-table>`,
  providers: [ListingsService]
})

export class ListingsComponent  {
  authtmp :Auth;
  entries :Entry[];
  settings = {
    columns: {
      listing_id: {
        title: 'ID'
      },
      address:{
        title: 'Address'
      },
      beds:{
        title: 'No. of Bedrooms'
      },
      baths:{
        title: 'No. of Bathrooms'
      },
      price:{
        title: 'Rent per Month'
      },
      safety_rating:{
        title: 'Safety Rank'
      },
      link:{
        title: 'Link'
      },
      Agent:{
        title: 'Agent'
      }
    //image: string;
    
    }
  };  
  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;
    this.listingsService.getAllListings().subscribe(entries => {
            this.entries = entries;
            console.log(entries[0]);

    })
    
  }

  public ngAfterViewChecked(): void {
    // console.log("Checking Auth  " + this.authtmp.authenticated())

    if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
      // localStorage.id_token
      localStorage.setItem('lockopen',"true");
      this.authtmp.login();
    }
  }
}
 
  interface Entry{
    listing_id: number;
    address: string;
    image: string;
    beds: number;
    baths: number;
    price: number;
    currency: string;
    safety_rating: number;
    link: string;
    Agent:string;
  }
 

