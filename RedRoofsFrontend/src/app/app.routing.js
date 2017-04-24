"use strict";
var router_1 = require("@angular/router");
var home_component_1 = require("./components/home/home.component");
var profile_component_1 = require("./components/profile/profile.component");
var entry_component_1 = require("./components/entry/entry.component");
var favoritePage_component_1 = require("./components/favoritePage/favoritePage.component");
var auth_guard_1 = require("./auth.guard");
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
        path: 'entry',
        component: entry_component_1.EntryComponent,
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'favpage',
        component: favoritePage_component_1.FavoritePageComponent,
        canActivate: [auth_guard_1.AuthGuard]
    }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map