import { Component, OnInit, Input , ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `
     <div (click)="addToFav('false')" *ngIf="ifTrue()"><span class="glyphicon glyphicon-heart-empty favb" aria-hidden="true"></span></div>
     <div (click)="addToFav('true')" *ngIf="ifFalse()"><span class="glyphicon glyphicon-heart favb" aria-hidden="true"></span></div>

  `,
    providers: [ListingsService],
})

export class FavComponent extends DefaultEditor implements ViewCell, OnInit {
  
  renderValue: string;
  // ngAfterViewInit() {
  //   if (this.cell.newValue !== '') {
  //   }
  // }
  
  @Input() value: string | number;

  constructor(private listingsService: ListingsService) { 
    super();
  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  
  ifTrue(){
    return Number(this.renderValue.split('-')[2])==0
  }

  ifFalse(){
    return Number(this.renderValue.split('-')[2])==1
  }
  addToFav(del: string){
    var body = {"user":JSON.parse(localStorage.getItem("profile")).user_id, "listing":Number(this.renderValue.split('-')[1]), "del": del}
    let bodyString = JSON.stringify(body); // Stringify payload
    this.listingsService.setFavourite(bodyString
        ).subscribe(houses => {
            // console.log(houses);
        })

  
      if(this.ifTrue()) {
        var newval = "FAV-";
        newval = newval + this.renderValue.split('-')[1] + "-1";
        
      }
      if(this.ifFalse()) {
        var newval = "FAV-";
        newval = newval + this.renderValue.split('-')[1] + "-0";
        
      }
      this.renderValue = newval;

    // this.renderValue = "FAV-0-1"
      

  }

}

    // <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button>