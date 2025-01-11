import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheStore } from '../interfaces/cache-store.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  /*
    catchError -> It's used to handle errors in the observable stream created
    of -> It creates an observable
    map -> It's used to trasnform the data emitted by an observable.
    delay -> Delays the emission of items from the source Observable by a given timeout or until a given Date.
   */

  constructor(
    private http: HttpClient,
  ) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore') ?? '');
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map((countries: Country[]) => countries.length ? countries[0] : null),
        catchError((error) => of(null)),
      );
  }

  public searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: capital, countries: [...countries] }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  public searhCountry(country: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term: country, countries: [...countries] }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: region, countries: [...countries] }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError((error) => of([])),
        // delay(2000),
      );
  }

}
