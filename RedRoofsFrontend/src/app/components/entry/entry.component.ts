import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  moduleId: module.id,
  selector: 'entry',
  providers: [ListingsService],
  templateUrl: 'entry.component.html',

})

export class EntryComponent  {
  authtmp :Auth;
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
      },
      image:{
        title: 'image'
      },
      currency:{
        title: 'currency'
      }
    
    }
  };
  source: LocalDataSource;  
  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;
    this.source = new LocalDataSource();
    this.listingsService.getAllListings().subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
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
 

