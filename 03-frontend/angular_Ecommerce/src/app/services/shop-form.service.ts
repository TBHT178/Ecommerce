import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.shopApiUrl + "/countries";
  private statesUrl = environment.shopApiUrl + "/states";

  constructor(private httpClient: HttpClient) { }

  getCountries():Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(map(response => response._embedded.countries));
  }

  getState(theCountryCode: string) : Observable<State[]>{
    //search url
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseState>(searchStateUrl).pipe(map(response => response._embedded.states));
  }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for(let theMonth = startMonth; theMonth<= 12; theMonth++){
      data.push(theMonth);
    }

    // "of" operator from rxjs, wrap an object as am Observable
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    // "of" operator from rxjs, wrap an object as am Observable
    return of(data);
  }
}

// Unwrap the JSON from Spring Data REST _embedded entry
interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseState{
  _embedded:{
    states: State[];
  }
}