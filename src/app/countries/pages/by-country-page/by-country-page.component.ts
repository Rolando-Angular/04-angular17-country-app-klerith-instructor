import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(
    private countriesService: CountriesService,
  ) { }

  public ngOnInit(): void {
    this.countries = [...this.countriesService.cacheStore.byCountries.countries];
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  public searchByCountry(country: string): void {
    this.countriesService.searhCountry(country).subscribe(countries => {
      this.countries = [...countries];
    })
  }

}
