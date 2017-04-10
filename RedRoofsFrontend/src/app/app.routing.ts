import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ListingsComponent} from './components/listings/listings.component';

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
		path:'listings',
		component:ListingsComponent
	}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);