import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Organization } from '../../../../types/organization';
import { GenericUtil } from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.css']
})
export class OrganizationInfoComponent implements OnInit {

  @Input() loading: boolean;
  @Input() org: Organization;
  @Input() canEdit = false;

  @Output() save: EventEmitter<Organization> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  saveClick() {
    this.save.emit(this.org);
  }

}
