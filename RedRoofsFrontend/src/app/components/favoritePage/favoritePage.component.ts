import { Component, OnInit, Input } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { FavComponent } from '../fav/fav.component';
import { NouisliderModule } from 'ng2-nouislider';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

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
  selector: 'favoritePage',
  providers: [ListingsService],
  templateUrl: 'favoritePage.component.html',

})

export class FavoritePageComponent implements OnInit {

    optionsRealtorsModel: number[];
    myRealtorsOptions: IMultiSelectOption[];
    optionsAmenitiesModel: number[];
    myAmenitiesOptions: IMultiSelectOption[];
    
    ngOnInit() {
      this.myRealtorsOptions = []
      this.listingsService.getAllRealtors().subscribe(realtors => {
              // console.log(realtors);
              this.myRealtorsOptions = realtors;
              this.optionsRealtorsModel = [];
              for(var i = 0; i < realtors.length; i++) {
                this.optionsRealtorsModel.push(realtors[i].id)
              }
              this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
                  JSON.stringify(this.pricerange),
                  JSON.stringify(this.bedsrange),
                  JSON.stringify(this.bathsrange),
                  JSON.stringify(this.optionsRealtorsModel),
                  JSON.stringify(this.optionsAmenitiesModel)
                  ).subscribe(houses => {
                  console.log(houses[0]);
                  this.source.load(houses);
              })
      })
      this.myAmenitiesOptions = []
      this.listingsService.getAllAmenities().subscribe(amenities => {
              // console.log(realtors);
              this.myAmenitiesOptions = amenities;
              this.optionsAmenitiesModel = [];
              for(var i = 0; i < amenities.length; i++) {
                this.optionsAmenitiesModel.push(amenities[i].id)
              }
              this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
                  JSON.stringify(this.pricerange),
                  JSON.stringify(this.bedsrange),
                  JSON.stringify(this.bathsrange),
                  JSON.stringify(this.optionsRealtorsModel),
                  JSON.stringify(this.optionsAmenitiesModel)
                  ).subscribe(houses => {
                  console.log(houses[0]);
                  this.source.load(houses);
              })
      })      



    }
    onChangeRealtorsOptions() {
        console.log(this.optionsRealtorsModel);
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
          JSON.stringify(this.pricerange),
          JSON.stringify(this.bedsrange),
          JSON.stringify(this.bathsrange),
          JSON.stringify(this.optionsRealtorsModel),
          JSON.stringify(this.optionsAmenitiesModel)
        ).subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
        })
    }

    onChangeAmenitiesOptions() {
        console.log(this.optionsAmenitiesModel);
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
          JSON.stringify(this.pricerange),
          JSON.stringify(this.bedsrange),
          JSON.stringify(this.bathsrange),
          JSON.stringify(this.optionsRealtorsModel),
          JSON.stringify(this.optionsAmenitiesModel)
        ).subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
        })
    }
    
  pricerange=[0,5000];
  bedsrange=[1,6];
  bathsrange=[1,6];
  // This gives values for the sort drop down
  sorts = [ {code: 'ASC', text: 'Ascending'},{code: 'DESC', text: 'Descending'}];
  
  // This holds the sortings for all the fields
  sortorders = {};
  
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
    this.optionsRealtorsModel = [];
    this.optionsAmenitiesModel = [];
    this.authtmp = auth;
    this.source = new LocalDataSource();
    this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
      JSON.stringify(this.pricerange),
      JSON.stringify(this.bedsrange),
      JSON.stringify(this.bathsrange),
      JSON.stringify(this.optionsRealtorsModel),
      JSON.stringify(this.optionsAmenitiesModel)
    ).subscribe(houses => {
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

  public getRatingSortFromDropDown(sort:any) {
    console.log("Sort Set as : " + sort);
  }


  onUserRowSelect(event: any): void {
    console.log(event);
  }

  onPriceChange(event: any) {
    console.log(JSON.stringify(this.pricerange));
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
        JSON.stringify(this.pricerange),
        JSON.stringify(this.bedsrange),
        JSON.stringify(this.bathsrange),
        JSON.stringify(this.optionsRealtorsModel),
        JSON.stringify(this.optionsAmenitiesModel)
        ).subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
    })
  }

  onBedsChange(event: any) {
    console.log(JSON.stringify(this.pricerange));
    this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
        JSON.stringify(this.pricerange),
        JSON.stringify(this.bedsrange),
        JSON.stringify(this.bathsrange),
        JSON.stringify(this.optionsRealtorsModel),
        JSON.stringify(this.optionsAmenitiesModel)
        ).subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
    })
  }

  onBathsChange(event: any) {
    console.log(JSON.stringify(this.pricerange));
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, 
        JSON.stringify(this.pricerange),
        JSON.stringify(this.bedsrange),
        JSON.stringify(this.bathsrange),
        JSON.stringify(this.optionsRealtorsModel),
        JSON.stringify(this.optionsAmenitiesModel)
        ).subscribe(houses => {
            console.log(houses[0]);
            this.source.load(houses);
    })
  }


}
 

