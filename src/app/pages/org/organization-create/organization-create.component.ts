import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { OrganizationRelationType } from '../../../../types/organization';
import { EntityFetchParams } from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {

  initialized = false;
  entitySearchParams: EntityFetchParams;

  @ViewChild('form') form: NgForm;

  constructor(private orgs: OrganizationsService, private router: Router) { }

  ngOnInit(): void {
    this.entitySearchParams = {};
    this.initialized = true;
  }

  submitForm() {
    if (this.form.valid) {
      const {name, relation, entity} = this.form.value;

      const model = { relation, name: { lang_code: 'en', text: name}, entityId: entity};
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
    console.log(event);
  }

}
