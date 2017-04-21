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

    getAllRealtors() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allrealtors')
            .map(res => res.json());
    }
    getAllAmenities() {
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/allamenities')
            .map(res => res.json());
    }
     getAllCities(state: string) {
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/allcities/" + state;
        return this.http.get(url)
            .map(res => res.json());
    }
    
    getAllRSS() {
        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/rss";
        return this.http.get(url)
            .map(res => res.json());
    }

    getAllListings(user_id: string,price_range: string, beds_range: string, baths_range: string, realtors: string, amenities:string) {
        realtors = realtors.replace("[","(").replace("]",")");
        if(realtors == '()') {
            realtors = '("")';
        }
        return this.http.get('http://ec2-52-91-32-196.compute-1.amazonaws.com/listings/'+localStorage.getItem("user_state")+'/'+localStorage.getItem("user_city")+'/'+
        user_id+"/"+price_range+"/"+beds_range+"/"+baths_range+"/"+realtors+"/"+amenities)
            .map(res => res.json());
    }
}