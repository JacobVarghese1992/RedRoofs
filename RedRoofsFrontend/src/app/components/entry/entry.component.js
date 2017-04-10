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
var http_1 = require("@angular/http");
var EntryComponent = (function () {
    function EntryComponent(auth, http) {
        this.auth = auth;
        this.settings = {
            columns: {
                listing_id: {
                    title: 'ID'
                },
                address: {
                    title: 'Address'
                },
                beds: {
                    title: 'No. of Bedrooms'
                },
                baths: {
                    title: 'No. of Bathrooms'
                },
                price: {
                    title: 'Rent per Month'
                },
                safety_rating: {
                    title: 'Safety Rank'
                },
                link: {
                    title: 'Link'
                },
                Agent: {
                    title: 'Agent'
                },
                image: {
                    title: 'image'
                },
                currency: {
                    title: 'currency'
                }
            }
        };
        this.authtmp = auth;
        this.source = new ServerDataSource(http, { endPoint: 'http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/PA/PHIL' });
    }
    //constructor(private auth:Auth, private listingsService: ListingsService) {
    //  this.authtmp = auth;
    //  this.listingsService.getAllListings().subscribe(houses => {
    //          this.houses = houses;
    //          console.log(houses[0]);
    //  })
    //}
    EntryComponent.prototype.ngAfterViewChecked = function () {
        // console.log("Checking Auth  " + this.authtmp.authenticated())
        if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true")) {
            // localStorage.id_token
            localStorage.setItem('lockopen', "true");
            this.authtmp.login();
        }
    };
    return EntryComponent;
}());
EntryComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'entry',
        providers: [listings_service_1.ListingsService],
        templateUrl: 'entry.component.html',
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth, http_1.Http])
], EntryComponent);
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map