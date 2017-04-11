import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingsService {
    constructor(private http: Http  ) {
        console.log('Post Service Initialized ...')
    }

    getAllStates() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allstates')
            .map(res => res.json());
    }

     getAllCities(state: string) {
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/allcities/" + state;
        return this.http.get(url)
            .map(res => res.json());
    }
    getAllListings() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/PA/PHIL')
            .map(res => res.json());
    }
}