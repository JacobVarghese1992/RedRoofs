import { Component, OnInit, Input } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';


@Component({
  template: `
     <div (click)="addToFav()"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></div>
  `,
    providers: [ListingsService],
})

export class FavComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;

  constructor(private listingsService: ListingsService) { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  showAlert() {
    alert(this.renderValue.split('-')[1]);
  }

  addToFav(){
    var body = {"user":JSON.parse(localStorage.getItem("profile")).user_id, "listing":Number(this.renderValue.split('-')[1])}
    let bodyString = JSON.stringify(body); // Stringify payload
    this.listingsService.setFavourite(bodyString
        ).subscribe(houses => {
            // console.log(houses);
        })
      
  }

}

    // <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button>