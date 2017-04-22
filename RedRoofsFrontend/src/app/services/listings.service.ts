import {Injectable} from '@angular/core';
import {Http, Response,Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
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

    setFavourite(body: string) {
        // let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        // let options    = new RequestOptions({ headers: headers }); // Create a request option
        // console.log(body);
        // var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite"
        // // console.log(this.renderValue)
        // return this.http.post(url, bodyString, options) // ...using post request
        //             .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
        //             .catch((error:any) => Observable.throw(error.json().error || 'Server error'));//...errors if any 
        const headers = new Headers({
        'Content-Type': "application/json"
        });

         const options = new RequestOptions({
            headers: headers
        });
        console.log(body);

        var url = "http://ec2-52-91-32-196.compute-1.amazonaws.com/favourite";
        return this.http.post(url, body, options)
            .map(res => {
            res.json();
        }).do(data => {
            // console.log('response', data);
        })
                    
                       
    }

    
}