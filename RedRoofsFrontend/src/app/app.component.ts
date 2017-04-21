import { Component } from '@angular/core';
import {Auth} from './services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent  {
	localStoragetmp: any;
  constructor(private auth:Auth) {
    this.localStoragetmp = localStorage;
		
	}
}
