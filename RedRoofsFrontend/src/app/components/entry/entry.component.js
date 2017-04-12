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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var ButtonViewComponent = (function () {
    function ButtonViewComponent(http) {
        this.http = http;
    }
    ButtonViewComponent.prototype.ngOnInit = function () {
        this.renderValue = this.value.toString().toUpperCase();
    };
    ButtonViewComponent.prototype.showAlert = function () {
        this.profile = JSON.parse(localStorage.getItem('profile'));
        var data = new http_1.URLSearchParams();
        data.append('user', this.profile.user_id);
        data.append('listing', this.renderValue.split('-')[1]);
        this.http
            .post('http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite', data)
            .subscribe(function (data) {
            alert('ok');
        }, function (error) {
            console.log(error.json());
        });
        //this.listingsService.addFavorite(,);
        console.log(this.profile.user_id);
        console.log(this.renderValue.split('-')[1]);
        //alert(this.renderValue);
    };
    return ButtonViewComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ButtonViewComponent.prototype, "value", void 0);
ButtonViewComponent = __decorate([
    core_1.Component({
        selector: 'button-view',
        template: "\n    <button (click)=\"showAlert()\">{{ renderValue }}</button>\n  ",
    }),
    __metadata("design:paramtypes", [http_2.Http])
], ButtonViewComponent);
exports.ButtonViewComponent = ButtonViewComponent;
var EntryComponent = (function () {
    function EntryComponent(auth, listingsService) {
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
                    title: 'Link',
                    type: 'html'
                },
                Agent: {
                    title: 'Agent'
                },
                image: {
                    title: 'image',
                    type: 'html'
                },
                fav: {
                    title: 'Add!',
                    type: 'custom',
                    renderComponent: ButtonViewComponent
                }
            }
        };
        this.authtmp = auth;
        this.source = new ng2_smart_table_1.LocalDataSource();
        this.listingsService.getAllListings().subscribe(function (houses) {
            _this.source.load(houses);
            console.log(houses.length);
        });
    }
    EntryComponent.prototype.ngOnInit = function () { };
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
    __metadata("design:paramtypes", [auth_service_1.Auth, listings_service_1.ListingsService])
], EntryComponent);
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map