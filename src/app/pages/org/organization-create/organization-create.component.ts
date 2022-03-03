import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { Router } from '@angular/router';
import { OrganizationRelationType } from '../../../../types/organization';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css']
})
export class OrganizationCreateComponent implements OnInit {

  initialized = false;

  @ViewChild('form') form: NgForm;

  constructor(private orgs: OrganizationsService, private router: Router) { }

  ngOnInit(): void {
    this.initialized = true;
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      const {name, relation} = this.form.value;

      const model = { relation, name: { lang_code: 'en', text: name}};
      this.orgs.create(model).subscribe(
        result => {},
        error => {
          alert('Something went wrong');
        },
        () => this.router.navigate(['/organizations'])
      );
    }
  }

}
