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
var ListingsService = (function () {
    function ListingsService(http) {
        this.http = http;
        console.log('Post Service Initialized ...');
    }
    ListingsService.prototype.getAllStates = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allstates')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllRealtors = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allrealtors')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllAmenities = function () {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allamenities')
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllCities = function (state) {
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/allcities/" + state;
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllRSS = function () {
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/rss";
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ListingsService.prototype.getAllListings = function (user_id, price_range, beds_range, baths_range, realtors, amenities) {
        realtors = realtors.replace("[", "(").replace("]", ")");
        if (realtors == '()') {
            realtors = '("")';
        }
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/' + localStorage.getItem("user_state") + '/' + localStorage.getItem("user_city") + '/' +
            user_id + "/" + price_range + "/" + beds_range + "/" + baths_range + "/" + realtors + "/" + amenities)
            .map(function (res) { return res.json(); });
    };
    return ListingsService;
}());
ListingsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ListingsService);
exports.ListingsService = ListingsService;
//# sourceMappingURL=listings.service.js.map