import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Website, WebsiteList, OrgWebsiteRequest, OrgWebsite } from '../../../../types/website';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-organization-websites',
  templateUrl: './organization-websites.component.html',
  styleUrls: ['./organization-websites.component.css']
})
export class OrganizationWebsitesComponent implements OnInit {

  @Input() websiteList: WebsiteList;
  @Input() loading: boolean;
  @Input() canEdit = false;
  // TODO: we neeed to improve the wbesite views (starting from the API)
  @Output() save: EventEmitter<OrgWebsiteRequest> = new EventEmitter();
  @Output() update: EventEmitter<OrgWebsite> = new EventEmitter();
  @Output() delete: EventEmitter<Website> = new EventEmitter();

  editingWebsite: Website = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  editWebsite(website: Website) {
    this.editingWebsite = website;
  }

  cancelEditWebsite() {
    this.editingWebsite = null;
  }

  unbindWebsite(website: Website) {
    this.delete.emit(website);
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const {id, url, name, description} = this.editForm.value;
      const data: OrgWebsite = {
        id,
        url,
        name: { lang_code: 'en', text: name},
        description: { lang_code: 'en', text: description}
      };
      this.update.emit(data);
    }
  }

  submitForm() {
    if (this.form.valid) {
      const {url, name, description} = this.form.value;
      const data: OrgWebsiteRequest = {
        url,
        name: { lang_code: 'en', text: name},
        description: { lang_code: 'en', text: description}
      };
      this.save.emit(data);
    }
  }

}
