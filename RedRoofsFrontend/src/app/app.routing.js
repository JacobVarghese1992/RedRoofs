"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var profile_component_1 = require("./components/profile/profile.component");
var listings_component_1 = require("./components/listings/listings.component");
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'listings',
        component: listings_component_1.ListingsComponent
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map