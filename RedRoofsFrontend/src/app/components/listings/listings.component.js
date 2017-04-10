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
var ListingsComponent = (function () {
    function ListingsComponent(auth, listingsService) {
        var _this = this;
        this.auth = auth;
        this.listingsService = listingsService;
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
                }
            }
        };
        this.authtmp = auth;
        this.listingsService.getAllListings().subscribe(function (entries) {
            _this.entries = entries;
            console.log(entries[0]);
        });
    }
    ListingsComponent.prototype.ngAfterViewChecked = function () {
        // console.log("Checking Auth  " + this.authtmp.authenticated())
        if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true")) {
            // localStorage.id_token
            localStorage.setItem('lockopen', "true");
            this.authtmp.login();
        }
    };
    return ListingsComponent;
}());
ListingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'listings',
        template: "<ng2-smart-table [settings]=\"settings\" [source]=\"entries\"></ng2-smart-table>",
        providers: [listings_service_1.ListingsService]
    }),
    __metadata("design:paramtypes", [auth_service_1.Auth, listings_service_1.ListingsService])
], ListingsComponent);
exports.ListingsComponent = ListingsComponent;
//# sourceMappingURL=listings.component.js.map