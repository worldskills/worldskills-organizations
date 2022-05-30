import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Organization, OrganiationRelation, OrganizationRelationCreate } from '../../../../types/organization';
import { EntityFetchParams } from '@worldskills/worldskills-angular-lib';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';

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

  entitySearchParams: EntityFetchParams;
  showForm = false;
  relation: OrganiationRelation;
  relationEntityId: number;

  faSave = faSave;

  constructor(private orgs: OrganizationsService) { }

  ngOnInit(): void {
    this.entitySearchParams = {
      // sort: 'name'
    };
  }

  saveClick() {
    this.save.emit(this.org);
  }

  prepInsert() {
    this.showForm = true;
    this.relation = {
      id: null,
      type: null,
      entity: {
        id: null,
        name: {
          lang_code: 'en',
          text: null
        }
      }
    };
  }

  hideForm() {
    this.showForm = false;
  }
  onEntityChange(event: number) {
    this.relationEntityId = event;
  }

  createRelation() {
    const model: OrganizationRelationCreate = {
      organization: this.org.id,
      type: this.relation.type,
      entity: this.relationEntityId
    };
    this.orgs.createRelation(model).subscribe(
      next => {},
      error => {},
      () => {
        window.location.reload();
      }
    );
  }

  deleteRelation(relation: OrganiationRelation) {
    this.orgs.deleteRelation(this.org.id, relation.id).subscribe(
      next => {},
      error => {},
      () => {
        window.location.reload();
      }
    );
  }


}
