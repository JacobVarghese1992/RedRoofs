import { Component, OnInit, Input } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { FavComponent } from '../fav/fav.component';

// @Component({
//   template: `
//     <button (click)="showAlert()">{{ renderValue }}</button>
//   `,
// })


// export class FavViewComponent implements ViewCell, OnInit {
//   renderValue: string;

//   @Input() value: string | number;

//   constructor() { }

//   ngOnInit() {
//     this.renderValue = this.value.toString().toUpperCase();
//   }

//   showAlert() {
//     alert(this.renderValue);
//   }
// }


@Component({
  moduleId: module.id,
  selector: 'entry',
  providers: [ListingsService],
  templateUrl: 'entry.component.html',

})

export class EntryComponent  {
  authtmp :Auth;
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      // listing_id: {
      //   title: 'ID'
      // },
      image:{
        title: '',
        type: 'html',
        valuePrepareFunction: (value: string) => { 
          return "<img src='" + value + "' alt='Mountain View' style='width:100px !important;height:100px !important;'>";
        }
      },
      address:{
        title: 'Address'
      },
      beds:{
        title: 'No. of Bedrooms',
        valuePrepareFunction: (value: string) => { 
          return value + " bed(s)";
        }
      },
      baths:{
        title: 'No. of Bathrooms',
        valuePrepareFunction: (value: string) => { 
          return value + " bath(s)";
        }
      },
      price:{
        title: 'Rent per Month'
      },
      safety_rating:{
        title: 'Safety Rating',
        type: 'html',
        valuePrepareFunction: (value: string) => { 
          var starhtml = "";
          var val = parseInt(value);
          for(var i = 1; i <= 5; i ++) {
            if(i<=val) {
              starhtml = starhtml + "<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
            } else {
              starhtml = starhtml + "<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
            }
            
          }
          
          return starhtml;
        }
      },
      Amenity:{
        title: 'Amenities',
      },
      Agent:{
        title: 'Agent',
        type: 'html'
      },
      fav: {
        title: 'Fav',
        type: 'custom',
        renderComponent: FavComponent,
      }
      // ,
      // currency:{
      //   title: 'currency'
      // }
    
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


  onUserRowSelect(event: any): void {
    console.log(event);
  }
}
 

