import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {routing, appRoutingProviders} from './app.routing';
import { AppComponent }  from './app.component';
import {AUTH_PROVIDERS} from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import {HomeComponent} from './components/home/home.component';
import { HttpModule } from '@angular/http';
import {EntryComponent} from './components/entry/entry.component';
import {ProfileComponent} from './components/profile/profile.component';
import {Auth} from './services/auth.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {ButtonViewComponent} from './components/entry/entry.component';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule, Ng2SmartTableModule ],
  entryComponents: [ ButtonViewComponent, ],
  declarations: [ AppComponent, HomeComponent,EntryComponent, ProfileComponent, ButtonViewComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
  	appRoutingProviders,
  	AUTH_PROVIDERS,
  	Auth
  ]
})
export class AppModule { }
