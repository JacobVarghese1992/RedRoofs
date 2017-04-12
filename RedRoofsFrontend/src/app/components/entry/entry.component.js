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
var ng2_smart_table_1 = require("ng2-smart-table");
var fav_component_1 = require("../fav/fav.component");
// @Component({
//   template: `
//     <button (click)="showAlert()">{{ renderValue }}</button>
//   `,
// })
// export class FavViewComponent implements ViewCell, OnInit {
//   renderValue: string;
//   @Input() value: string | number;
//   constructor() { }
//   ngOnInit() {
//     this.renderValue = this.value.toString().toUpperCase();
//   }
//   showAlert() {
//     alert(this.renderValue);
//   }
// }
var EntryComponent = (function () {
    function EntryComponent(auth, listingsService) {
        var _this = this;
        this.auth = auth;
        this.listingsService = listingsService;
        this.settings = {
            actions: false,
            hideSubHeader: true,
            columns: {
                // listing_id: {
                //   title: 'ID'
                // },
                image: {
                    title: '',
                    type: 'html',
                    valuePrepareFunction: function (value) {
                        return "<img src='" + value + "' alt='Mountain View' style='width:100px !important;height:100px !important;'>";
                    }
                },
                address: {
                    title: 'Address'
                },
                beds: {
                    title: 'No. of Bedrooms',
                    valuePrepareFunction: function (value) {
                        return value + " bed(s)";
                    }
                },
                baths: {
                    title: 'No. of Bathrooms',
                    valuePrepareFunction: function (value) {
                        return value + " bath(s)";
                    }
                },
                price: {
                    title: 'Rent per Month'
                },
                safety_rating: {
                    title: 'Safety Rating',
                    type: 'html',
                    valuePrepareFunction: function (value) {
                        var starhtml = "";
                        var val = parseInt(value);
                        for (var i = 1; i <= 5; i++) {
                            if (i <= val) {
                                starhtml = starhtml + "<span class='glyphicon glyphicon-star' aria-hidden='true'></span>";
                            }
                            else {
                                starhtml = starhtml + "<span class='glyphicon glyphicon-star-empty' aria-hidden='true'></span>";
                            }
                        }
                        return starhtml;
                    }
                },
                Amenity: {
                    title: 'Amenities',
                },
                Agent: {
                    title: 'Agent',
                    type: 'html'
                },
                fav: {
                    title: 'Fav',
                    type: 'custom',
                    renderComponent: fav_component_1.FavComponent,
                }
            }
        };
        this.authtmp = auth;
        this.source = new ng2_smart_table_1.LocalDataSource();
        this.listingsService.getAllListings().subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    }
    EntryComponent.prototype.ngAfterViewChecked = function () {
        // console.log("Checking Auth  " + this.authtmp.authenticated())
        if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true")) {
            // localStorage.id_token
            localStorage.setItem('lockopen', "true");
            this.authtmp.login();
        }
    };
    EntryComponent.prototype.onUserRowSelect = function (event) {
        console.log(event);
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
    __metadata("design:paramtypes", [auth_service_1.Auth, listings_service_1.ListingsService])
], EntryComponent);
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map