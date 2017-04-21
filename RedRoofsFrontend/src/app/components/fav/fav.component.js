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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var FavComponent = (function () {
    function FavComponent(http) {
        this.http = http;
    }
    FavComponent.prototype.ngOnInit = function () {
        this.renderValue = this.value.toString().toUpperCase();
    };
    FavComponent.prototype.showAlert = function () {
        alert(this.renderValue.split('-')[1]);
    };
    FavComponent.prototype.addToFav = function () {
        var body = { "user": JSON.parse(localStorage.getItem("profile")).user_id, "listing": Number(this.renderValue.split('-')[1]) };
        var bodyString = JSON.stringify(body); // Stringify payload
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        console.log(bodyString);
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite";
        // console.log(this.renderValue)
        return this.http.post(url, bodyString, options) // ...using post request
            .map(function (res) { return res.json(); }) // ...and calling .json() on the response to return data
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); }); //...errors if any
        console.log("Response " + res);
    };
    return FavComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FavComponent.prototype, "value", void 0);
FavComponent = __decorate([
    core_1.Component({
        template: "\n     <div (click)=\"addToFav()\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span></div>\n  ",
    }),
    __metadata("design:paramtypes", [http_1.Http])
], FavComponent);
exports.FavComponent = FavComponent;
// <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button> 
//# sourceMappingURL=fav.component.js.map