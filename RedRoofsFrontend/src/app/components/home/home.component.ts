import { Component } from '@angular/core';
import {Auth} from '../../services/auth.service';
import{ListingsService} from '../../services/listings.service';
@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [ListingsService]
})

export class HomeComponent  {
  authtmp :Auth;
	states = [
    { value: 'PA', display: 'Pennsylvania' },
    { value: 'NY', display: 'New York' }
  ];

	cities = [
    { value: 'PA', display: 'Pennsylvania' },
    { value: 'NY', display: 'New York' }
  ];

  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;

    this.listingsService.getAllStates().subscribe(states => {
            console.log(states);
        })
    
	}

  public ngAfterViewChecked(): void {
    // console.log("Checking Auth  " + this.authtmp.authenticated())

    if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
      localStorage.setItem('lockopen',"true");
      this.authtmp.login();
    }
  }

  public goToListings() {
        // console.log(f);
  } 
}
