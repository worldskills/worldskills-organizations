import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrganizationRelationType } from 'src/types/organization';
import { OrgRelations } from '../app-config';
import { Country } from '../../types/country';
import { CountriesService } from '../../services/countries/countries.service';

@Component({
  selector: 'app-organization-search-form',
  templateUrl: './organization-search-form.component.html',
  styleUrls: ['./organization-search-form.component.css']
})
export class OrganizationSearchFormComponent implements OnInit {

  @Input() loading = false;
  @Input() name: string;
  @Input() relation: string;
  @Input() country: number;

  countries: Array<Country>;

  @Output() search: EventEmitter<OrganizationSearch> = new EventEmitter<OrganizationSearch>();

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.subject.subscribe(countries => {
      this.countries = countries.country_list;
    });
    this.countriesService.fetch({offset: 0, limit: 9999});
  }

  searchClicked() {
    this.search.emit({
      name: this.name,
      relation: this.relation,
      country: this.country,
    });
  }

  get orgRelations() {
    return OrgRelations;
  }

}

export interface OrganizationSearch {
  name: string;
  relation?: string;
  country?: number;
}


