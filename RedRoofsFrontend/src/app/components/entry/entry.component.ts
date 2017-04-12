import { Component, OnInit, Input } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { URLSearchParams } from "@angular/http"
import { Http } from "@angular/http"


@Component({
  selector: 'button-view',
  template: `
    <button (click)="showAlert()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;
  profile :any;
  
  @Input() value: string | number;

  constructor(private http: Http) { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  showAlert() {
    this.profile = JSON.parse(localStorage.getItem('profile'));
    let data = new URLSearchParams();
    data.append('user', this.profile.user_id);
    data.append('listing', this.renderValue.split('-')[1]);

    this.http
        .post('http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite', data)
        .subscribe(data => {
           alert('ok');
        }, error => {
           console.log(error.json());
        });
    //this.listingsService.addFavorite(,);
    console.log(this.profile.user_id);
    console.log(this.renderValue.split('-')[1])
    //alert(this.renderValue);
  }
}


@Component({
  moduleId: module.id,
  selector: 'entry',
  providers: [ListingsService],
  templateUrl: 'entry.component.html',

})

export class EntryComponent implements OnInit {
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
        title: 'Link',
        type: 'html'

      },
      Agent:{
        title: 'Agent'
      },
      image:{
        title: 'image',
        type: 'html'
      },

      fav: {
        title: 'Add!',
        type: 'custom',
        renderComponent: ButtonViewComponent
      }
    
    }
  };
  source: LocalDataSource;  
  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;
    this.source = new LocalDataSource();
    this.listingsService.getAllListings().subscribe(houses => {
        this.source.load(houses);
        console.log(houses.length);
    });
    
    
  }
  ngOnInit(){}
  public ngAfterViewChecked(): void {
    // console.log("Checking Auth  " + this.authtmp.authenticated())

    if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
      // localStorage.id_token
      localStorage.setItem('lockopen',"true");
      this.authtmp.login();
    }
  }
}
 

