import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  constructor(
    private countriesService: CountriesService,
  ) { }

  public searchByCapital(term: string): void {
    console.log('Desde ByCapitalPage');
    console.log({ term });
  }

}
