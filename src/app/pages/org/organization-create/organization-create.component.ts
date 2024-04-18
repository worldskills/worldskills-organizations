import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { OrganizationCreate, OrganizationRelationType } from '../../../../types/organization';
import { EntityFetchParams, GenericUtil } from '@worldskills/worldskills-angular-lib';
import { OrgRelations } from '../../../../app/app-config';
import { Country } from '../../../../types/country';
import { CountriesService } from '../../../../services/countries/countries.service';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {

  selectedCountry: any;
  countries: Array<Country>;
  initialized = false;
  entitySearchParams: EntityFetchParams;

  @ViewChild('form') form: NgForm;

  constructor(private orgs: OrganizationsService, private router: Router, private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.entitySearchParams = {};
    this.countriesService.subject.subscribe(countries => {
      this.countries = countries.country_list;
    });
    this.countriesService.fetch({offset: 0, limit: 9999});
    this.initialized = true;
  }

  submitForm() {
    if (this.form.valid) {
      const {name, description, relation, entity, country} = this.form.value;
      const model: OrganizationCreate = {
        relation,
        name: { lang_code: 'en', text: name},
        description: { lang_code: 'en', text: description },
        entityId: entity,
        countryId: country,
      };

      console.log(model);

      this.orgs.create(model).subscribe(
        result => {},
        error => {
          alert('Something went wrong');
        },
        () => this.router.navigate(['/organizations'])
      );
    }
  }

  onEntityChange(event: number) {
  }

  get orgRelations() {
    return OrgRelations;
  }

}
