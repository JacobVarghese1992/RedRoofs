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
})

export class FavComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;

  constructor(private http: Http) { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  showAlert() {
    alert(this.renderValue.split('-')[1]);
  }

  addToFav(){
    var body = {"user":JSON.parse(localStorage.getItem("profile")).user_id, "listing":Number(this.renderValue.split('-')[1])}
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers }); // Create a request option
    console.log(bodyString);
    var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite"
    // console.log(this.renderValue)
    return this.http.post(url, bodyString, options) // ...using post request
                    .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));//...errors if any
     console.log("Response " + res);  
  }

}

    // <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button>