import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Organization, OrganiationRelation, OrganizationRelationCreate } from '../../../../types/organization';
import { AlertService, AlertType, EntityFetchParams, toDate, UploadService } from '@worldskills/worldskills-angular-lib';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrganizationService } from 'src/services/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageService } from 'src/services/image/image.service';
import { Image } from 'src/types/image';
import { HttpEventType } from '@angular/common/http';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  @ViewChild('logoInput') input: ElementRef<HTMLInputElement>;

  entitySearchParams: EntityFetchParams;
  showForm = false;
  relation: OrganiationRelation;
  relationEntityId: number;
  relationToEdit: OrganiationRelation;

  faSave = faSave;
  faTrash = faTrash;
  faEdit = faEdit;

  resourceLoading = false;
  resourceProgress = 0;
  uploadFile: File;

  cacheDate: NgbDateStruct;

  constructor(private orgs: OrganizationsService, private orgSerice: OrganizationService, private translateService: TranslateService,
              private alertService: AlertService, private uploadService: UploadService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.entitySearchParams = {
      // sort: 'name'
    };
  }

  saveClick() {
    if (this.uploadFile) {
      // tslint:disable-next-line:variable-name
      this.upload((img) => {
        this.org.logo = {
          id: null,
          image_id: img.id,
          thumbnail:img.thumbnail,
          thumbnail_hash: img.thumbnail_hash,
        }
        this.save.emit(this.org);
      });
    } else {
      this.save.emit(this.org);
    }
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
    if (this.cacheDate) {
      model.since = toDate(`${this.cacheDate.year}-${this.cacheDate.month}-${this.cacheDate.day}`)
    }

    this.orgs.createRelation(model).subscribe(
      next => {},
      error => {},
      () => {
        window.location.reload();
      }
    );
  }

  enableRelationEditMode(relation: OrganiationRelation) {
    this.relationToEdit = relation;
    if (this.relationToEdit) {
      if (relation.since) {
        const dt = toDate(relation.since);
        this.cacheDate = {
          year: dt.getFullYear(),
          month: dt.getMonth() + 1,
          day: dt.getDate()
        }
      }
    }
  }

  editRelation() {
    console.log(this.relationToEdit);
    const model: OrganizationRelationCreate = {
      organization: this.org.id,
      type: this.relationToEdit.type,
      entity: this.relationEntityId
    };
    if (this.cacheDate) {
      model.since = toDate(`${this.cacheDate.year}-${this.cacheDate.month}-${this.cacheDate.day}`)
    }
    this.orgs.editRelation(this.org.id, this.relationToEdit.id, model).subscribe(
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

  deleteLogo() {
    const orgId = this.org.id;
    this.orgs
    this.orgSerice.deleteFlag(orgId).subscribe(() => {
      this.translateService.get('Removed member logo').subscribe(t => {
        this.alertService.setAlert('member-logo-removed', AlertType.success, null, t, true);
      });
      this.org.logo = null;
    });
  }

  unsetLogo() {
    this.uploadFile = null;
    this.input.nativeElement.value = null;
  }

  setFileFromInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      this.uploadFile = input.files.item(0);
    } else {
      this.uploadFile = null;
    }
  }

  upload(onComplete: (image: Image) => void) {
    this.resourceLoading = true;
    this.resourceProgress = 0;
    const request = this.imageService.httpRequest(this.uploadFile);
    this.uploadFile = null;
    this.uploadService.listen<Image>(
      request,
      ({loaded, total, type}) => {
        if (type === HttpEventType.UploadProgress) {
          this.resourceProgress = loaded / total;
        }
      },
      image => {
        this.resourceLoading = false;
        onComplete(image.body);
      });
  }

  onDateChange(date) {
    this.relation.since = toDate(date);
  }

}
