import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
})

export class HomeComponent  {
  authtmp :Auth;
	constructor(private auth:Auth) {
    this.authtmp = auth;
    
	}

  public ngAfterViewChecked(): void {
    console.log("Checking Auth  " + this.authtmp.authenticated())

    if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
      localStorage.setItem('lockopen',"true");
      this.authtmp.login();
    }
  } 
}