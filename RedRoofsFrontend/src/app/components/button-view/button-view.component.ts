import { ViewCell } from 'ng2-smart-table';
import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'button-view',
  template: `
    <button (click)="showAlert()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
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


