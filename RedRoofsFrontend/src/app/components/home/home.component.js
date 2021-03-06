"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var auth_service_1 = require("../../services/auth.service");
var listings_service_1 = require("../../services/listings.service");
var router_1 = require("@angular/router");
var HomeComponent = (function () {
    function HomeComponent(auth, listingsService, router) {
        var _this = this;
        this.auth = auth;
        this.listingsService = listingsService;
        this.router = router;
        this.authtmp = auth;
        // if(!auth.authenticated()) {
        //   this.authtmp.login();
        // }
        this.listingsService.getAllStates().subscribe(function (states) {
            // console.log(states);
            _this.states = states;
            _this.getStateFromDropDown(_this.states[0].state);
        });
        this.listingsService.getAllRSS().subscribe(function (rss) {
            // console.log(states);
            _this.rss = rss;
            // this.getStateFromDropDown(this.states[0].state);
        });
        this.localStoragetmp = localStorage;
        // this.listingsService.getAllCities().subscribe(cities => {
        //         // console.log(cities);
        //         this.cities = cities;
        //         this.getCityFromDropDown(this.cities[0].city);
        // })
    }
    HomeComponent.prototype.ngAfterContentInit = function () {
        // console.log("Checking Auth  " + this.authtmp.authenticated())
        // if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
        //   // localStorage.id_token
        //   localStorage.setItem('lockopen',"true");
        //   this.authtmp.login();
        // }
        // if(!localStorage.getItem('profile')) {
        //   this.authtmp.login();
        // }
    };
    // public goToListings() {
    //       // console.log(f);
    // } 
    HomeComponent.prototype.getStateFromDropDown = function (state) {
        var _this = this;
        console.log("State Set as : " + state);
        localStorage.setItem('user_state', state);
        this.listingsService.getAllCities(state).subscribe(function (cities) {
            // console.log(cities);
            _this.cities = cities;
            _this.getCityFromDropDown(_this.cities[0].city);
        });
    };
    HomeComponent.prototype.getCityFromDropDown = function (city) {
        console.log("City Set as : " + city);
        localStorage.setItem('user_city', city);
    };
    HomeComponent.prototype.goToListings = function () {
        this.router.navigate(['/entry']);
    };
    HomeComponent.prototype.goToFavourites = function () {
        this.router.navigate(['/favpage']);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'home',
        templateUrl: 'home.component.html',
        providers: [listings_service_1.ListingsService]
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth, listings_service_1.ListingsService, router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map