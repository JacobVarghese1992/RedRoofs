"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var angular2_jwt_1 = require("angular2-jwt");
var forms_1 = require("@angular/forms");
var home_component_1 = require("./components/home/home.component");
var http_1 = require("@angular/http");
var entry_component_1 = require("./components/entry/entry.component");
var fav_component_1 = require("./components/fav/fav.component");
var profile_component_1 = require("./components/profile/profile.component");
var auth_service_1 = require("./services/auth.service");
var ng2_smart_table_1 = require("ng2-smart-table");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, app_routing_1.routing, forms_1.FormsModule, http_1.HttpModule, ng2_smart_table_1.Ng2SmartTableModule],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, entry_component_1.EntryComponent, profile_component_1.ProfileComponent, fav_component_1.FavComponent],
        entryComponents: [fav_component_1.FavComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [
            app_routing_1.appRoutingProviders,
            angular2_jwt_1.AUTH_PROVIDERS,
            auth_service_1.Auth
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map