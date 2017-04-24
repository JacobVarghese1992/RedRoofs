// app/auth.service.ts

import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  options = {
    closable: false,
    auth: {
      sso: true
    },
    theme: {
      logo: "/logo.png",
      primaryColor: "#f04b4f",
      title: "RedRoofs"
    } 
  };
  lock = new Auth0Lock('AfYbEtejX21YS51c8zZxgDDyvFJqlaVw', 'jacobv1992.auth0.com', this.options);

  constructor() {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
        if(error) {
          throw new Error(error);
        }
        // localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        // localStorage.setItem('lockopen',"true");
        
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    // console.log("Authenticcatd" + tokenNotExpired());
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('lockopen');
  }
}
