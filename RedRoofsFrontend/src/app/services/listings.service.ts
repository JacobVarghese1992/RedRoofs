import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { URLSearchParams } from "@angular/http"

@Injectable()
export class ListingsService {
    constructor(private http: Http  ) {
        console.log('Post Service Initialized ...')
    }

    getAllStates() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allstates')
            .map(res => res.json());
    }

     getAllCities() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allcities')
            .map(res => res.json());
    }
    getAllListings() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/PA/PHIL')
            .map(res => res.json());
    }
    //addFavorite(x:string, id:string) {
    //    let data = new URLSearchParams();
    //    data.append('user',id);
    //    data.append('listing', x);

    //    this.http
    //    .post('http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite', data)
    //    .subscribe(data => {
    //        alert('ok');
    //    }, error => {
    //        console.log(error.json());
    //    });
    //}
}