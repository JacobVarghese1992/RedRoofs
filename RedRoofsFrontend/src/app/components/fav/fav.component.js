"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var listings_service_1 = require("../../services/listings.service");
var ng2_smart_table_1 = require("ng2-smart-table");
var FavComponent = (function (_super) {
    __extends(FavComponent, _super);
    function FavComponent(listingsService) {
        var _this = _super.call(this) || this;
        _this.listingsService = listingsService;
        return _this;
    }
    FavComponent.prototype.ngOnInit = function () {
        this.renderValue = this.value.toString().toUpperCase();
    };
    FavComponent.prototype.ifTrue = function () {
        return Number(this.renderValue.split('-')[2]) == 0;
    };
    FavComponent.prototype.ifFalse = function () {
        return Number(this.renderValue.split('-')[2]) == 1;
    };
    FavComponent.prototype.addToFav = function (del) {
        var body = { "user": JSON.parse(localStorage.getItem("profile")).user_id, "listing": Number(this.renderValue.split('-')[1]), "del": del };
        var bodyString = JSON.stringify(body); // Stringify payload
        this.listingsService.setFavourite(bodyString).subscribe(function (houses) {
            // console.log(houses);
        });
        if (this.ifTrue()) {
            var newval = "FAV-";
            newval = newval + this.renderValue.split('-')[1] + "-1";
        }
        if (this.ifFalse()) {
            var newval = "FAV-";
            newval = newval + this.renderValue.split('-')[1] + "-0";
        }
        this.renderValue = newval;
        // this.renderValue = "FAV-0-1"
    };
    return FavComponent;
}(ng2_smart_table_1.DefaultEditor));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FavComponent.prototype, "value", void 0);
FavComponent = __decorate([
    core_1.Component({
        template: "\n     <div (click)=\"addToFav('false')\" *ngIf=\"ifTrue()\"><span class=\"glyphicon glyphicon-heart-empty\" aria-hidden=\"true\"></span></div>\n     <div (click)=\"addToFav('true')\" *ngIf=\"ifFalse()\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span></div>\n\n  ",
        providers: [listings_service_1.ListingsService],
    }),
    __metadata("design:paramtypes", [listings_service_1.ListingsService])
], FavComponent);
exports.FavComponent = FavComponent;
// <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button> 
//# sourceMappingURL=fav.component.js.map