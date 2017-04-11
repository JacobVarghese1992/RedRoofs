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
require("rxjs/add/operator/map");
var http_2 = require("@angular/http");
var ListingsService = (function () {
    function ListingsService(http) {
        this.http = http;
        console.log('Post Service Initialized ...');
    }
    ListingsService.prototype.getAllStates = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allstates')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllCities = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allcities')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllListings = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/PA/PHIL')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.addFavorite = function (x, id) {
        //profile = JSON.parse(localStorage.getItem('profile'));
        var data = new http_2.URLSearchParams();
        data.append('user', id);
        data.append('listing', x);
        this.http
            .post('http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite', data)
            .subscribe(function (data) {
            alert('ok');
        }, function (error) {
            console.log(error.json());
        });
    };
    return ListingsService;
}());
ListingsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ListingsService);
exports.ListingsService = ListingsService;
//# sourceMappingURL=listings.service.js.map