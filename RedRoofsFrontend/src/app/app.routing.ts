import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EntryComponent} from './components/entry/entry.component';
import {FavoritePageComponent} from './components/favoritePage/favoritePage.component';
import {AuthGuard} from './auth.guard';

const appRoutes: Routes=[
	{
		path:'',
		component:HomeComponent
	},
	{
		path:'profile',
		component:ProfileComponent
	},
	{
		path:'entry',
		component:EntryComponent,
		canActivate: [AuthGuard]
	},
	{
		path:'favpage',
		component:FavoritePageComponent,
		canActivate: [AuthGuard]
	}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);