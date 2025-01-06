import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit {

  /*
    ActivatedRoute -> It is going to be suscribe to any change in the path related
    to the route which invoke this compoenent

    switchMap -> It takes an input observable and transform  each emitted
    value into a new inner observable.
  */

  public country?: Country | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }: Params) =>
          this.countriesService.searchCountryByAlphaCode(id)),
      )
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('');
        }
        this.country = country;
      });
  }

}
