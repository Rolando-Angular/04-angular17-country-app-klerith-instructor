import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  /*
    catchError -> It's used to handle errors in the observable stream created
    of -> It creates an observable
    map -> It's used to trasnform the data emitted by an observable.
   */

  constructor(
    private http: HttpClient,
  ) { }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map((countries: Country[]) => countries.length ? countries[0] : null),
        catchError(error => of(null)),
      );
  }

  public searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`
    return this.getCountriesRequest(url);
  }

  public searhCountry(country: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesRequest(url);
  }

  public searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError((error) => of([])),
        delay(2000),
      );
  }

}
