import { Component, OnInit, Input } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ViewCell } from 'ng2-smart-table';

@Component({
  template: `
     <div (click)="showAlert()"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></div>
  `,
})

export class FavComponent implements ViewCell, OnInit {

  renderValue: string;

  @Input() value: string | number;

  constructor() { }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  showAlert() {
    alert(this.renderValue);
  }

}

    // <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button>