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
var FavComponent = (function () {
    function FavComponent() {
    }
    FavComponent.prototype.ngOnInit = function () {
        this.renderValue = this.value.toString().toUpperCase();
    };
    FavComponent.prototype.showAlert = function () {
        alert(this.renderValue);
    };
    return FavComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FavComponent.prototype, "value", void 0);
FavComponent = __decorate([
    core_1.Component({
        template: "\n     <div (click)=\"showAlert()\"><span class=\"glyphicon glyphicon-heart\" aria-hidden=\"true\"></span></div>\n  ",
    }),
    __metadata("design:paramtypes", [])
], FavComponent);
exports.FavComponent = FavComponent;
// <button (click)="showAlert()"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>{{ renderValue }}</button> 
//# sourceMappingURL=fav.component.js.map