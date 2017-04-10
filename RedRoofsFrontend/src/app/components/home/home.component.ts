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
	states: any;
	cities: any;

  constructor(private auth:Auth, private listingsService: ListingsService) {
    this.authtmp = auth;

    this.listingsService.getAllStates().subscribe(states => {
            // console.log(states);
            this.states = states;
            this.getStateFromDropDown(this.states[0].state);
    })
    

    this.listingsService.getAllCities().subscribe(cities => {
            // console.log(cities);
            this.cities = cities;
            this.getCityFromDropDown(this.cities[0].city);

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

  public goToListings(): void {
  
  }
  public getStateFromDropDown(state: any) {
    console.log("State Set as : " + state);
    localStorage.setItem('user_state',state);
  }

  public getCityFromDropDown(city: any) {
    console.log("City Set as : " + city);
    localStorage.setItem('user_city',city);
  }
}
