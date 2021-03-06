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
var router_1 = require("@angular/router");
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
    function EntryComponent(auth, listingsService, router) {
        var _this = this;
        this.auth = auth;
        this.listingsService = listingsService;
        this.router = router;
        this.pricerange = [0, 5000];
        this.bedsrange = [1, 6];
        this.bathsrange = [1, 6];
        // This gives values for the sort drop down
        this.sorts = [{ code: 'ASC', text: 'Ascending' }, { code: 'DESC', text: 'Descending' }];
        // This holds the sortings for all the fields
        this.sortorders = {};
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
                link: {
                    title: '',
                    type: 'html',
                    valuePrepareFunction: function (value) {
                        return "<a target='_blank' href='" + value + "' >Visit Site</a>";
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
                isfav: {
                    title: 'Fav',
                    type: 'custom',
                    renderComponent: fav_component_1.FavComponent,
                }
            }
        };
        this.optionsRealtorsModel = [];
        this.optionsAmenitiesModel = [];
        this.authtmp = auth;
        this.source = new ng2_smart_table_1.LocalDataSource();
        // Settings configuration
        this.dropDownSettings = {
            enableSearch: true,
            showCheckAll: true,
            showUncheckAll: true
        };
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    }
    EntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.source.onChanged().subscribe(function (changes) {
            console.log(changes);
            if (changes.action == "page") {
                _this.listingsService.getAllRealtors().subscribe(function (realtors) {
                    // console.log(realtors);
                    _this.myRealtorsOptions = realtors;
                    _this.optionsRealtorsModel = [];
                    for (var i = 0; i < realtors.length; i++) {
                        _this.optionsRealtorsModel.push(realtors[i].id);
                    }
                    _this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(_this.pricerange), JSON.stringify(_this.bedsrange), JSON.stringify(_this.bathsrange), JSON.stringify(_this.optionsRealtorsModel), JSON.stringify(_this.optionsAmenitiesModel)).subscribe(function (houses) {
                        console.log(houses[0]);
                        _this.source.load(houses);
                    });
                });
            }
        });
        this.myRealtorsOptions = [];
        this.listingsService.getAllRealtors().subscribe(function (realtors) {
            // console.log(realtors);
            _this.myRealtorsOptions = realtors;
            _this.optionsRealtorsModel = [];
            for (var i = 0; i < realtors.length; i++) {
                _this.optionsRealtorsModel.push(realtors[i].id);
            }
            _this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(_this.pricerange), JSON.stringify(_this.bedsrange), JSON.stringify(_this.bathsrange), JSON.stringify(_this.optionsRealtorsModel), JSON.stringify(_this.optionsAmenitiesModel)).subscribe(function (houses) {
                console.log(houses[0]);
                _this.source.load(houses);
            });
        });
        this.myAmenitiesOptions = [];
        this.listingsService.getAllAmenities().subscribe(function (amenities) {
            // console.log(realtors);
            _this.myAmenitiesOptions = amenities;
            _this.optionsAmenitiesModel = [];
            for (var i = 0; i < amenities.length; i++) {
                _this.optionsAmenitiesModel.push(amenities[i].id);
            }
            _this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(_this.pricerange), JSON.stringify(_this.bedsrange), JSON.stringify(_this.bathsrange), JSON.stringify(_this.optionsRealtorsModel), JSON.stringify(_this.optionsAmenitiesModel)).subscribe(function (houses) {
                console.log(houses[0]);
                _this.source.load(houses);
            });
        });
    };
    EntryComponent.prototype.onChangeRealtorsOptions = function () {
        var _this = this;
        console.log(this.optionsRealtorsModel);
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    };
    EntryComponent.prototype.onChangeAmenitiesOptions = function () {
        var _this = this;
        console.log(this.optionsAmenitiesModel);
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    };
    EntryComponent.prototype.ngAfterViewChecked = function () {
        // console.log("Checking Auth  " + this.authtmp.authenticated())
        // if ((!this.authtmp.authenticated()) && (localStorage.getItem("lockopen") != "true") ) {
        //   // localStorage.id_token
        //   localStorage.setItem('lockopen',"true");
        //   this.authtmp.login();
        // }
    };
    EntryComponent.prototype.getRatingSortFromDropDown = function (sort) {
        console.log("Sort Set as : " + sort);
    };
    EntryComponent.prototype.onUserRowSelect = function (event) {
        //console.log(event.data.link)
        //window.open(event.data.link);
    };
    EntryComponent.prototype.onPriceChange = function (event) {
        var _this = this;
        console.log(JSON.stringify(this.pricerange));
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    };
    EntryComponent.prototype.onBedsChange = function (event) {
        var _this = this;
        console.log(JSON.stringify(this.pricerange));
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
    };
    EntryComponent.prototype.onBathsChange = function (event) {
        var _this = this;
        console.log(JSON.stringify(this.pricerange));
        this.listingsService.getAllListings(JSON.parse(localStorage.getItem("profile")).user_id, JSON.stringify(this.pricerange), JSON.stringify(this.bedsrange), JSON.stringify(this.bathsrange), JSON.stringify(this.optionsRealtorsModel), JSON.stringify(this.optionsAmenitiesModel)).subscribe(function (houses) {
            console.log(houses[0]);
            _this.source.load(houses);
        });
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
    __metadata("design:paramtypes", [auth_service_1.Auth, listings_service_1.ListingsService, router_1.Router])
], EntryComponent);
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map