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
  houses: House[];
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
  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;
    this.listingsService.getAllListings().subscribe(houses => {
            this.houses = houses;
            console.log(houses[0]);

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
 

interface House{
  listing_id: string;
  address: string;
  beds: number;
  baths: number;
  price: number;
  safety_rating: number;
  link: string;
  Agent: string;
  image: string;
  currency: string;
}