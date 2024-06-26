import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Organization, OrganizationRelation, OrganizationRelationCreate } from '../../../../types/organization';
import { AlertService, AlertType, EntityFetchParams, toDate, UploadService } from '@worldskills/worldskills-angular-lib';
import { OrganizationsService } from 'src/services/organizations/organizations.service';
import { faSave, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrganizationService } from 'src/services/organization/organization.service';
import { TranslateService } from '@ngx-translate/core';
import { ImageService } from 'src/services/image/image.service';
import { Image } from 'src/types/image';
import { HttpEventType } from '@angular/common/http';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrgRelations } from '../../../../app/app-config';
import { Country } from '../../../../types/country';
import { CountriesService } from '../../../../services/countries/countries.service';

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

  selectedCountry: any;
  countries: Array<Country>;
  entitySearchParams: EntityFetchParams;
  showForm = false;
  relation: OrganizationRelation;
  relationEntityId: number;
  relationToEdit: OrganizationRelation;
  inboundRelations: OrganizationRelation[];

  faSave = faSave;
  faTrash = faTrash;
  faEdit = faEdit;

  resourceLoading = false;
  resourceProgress = 0;
  uploadFile: File;

  cacheSinceDate: NgbDateStruct;
  cacheEndDate: NgbDateStruct;

  constructor(private orgs: OrganizationsService, private orgSerice: OrganizationService, private translateService: TranslateService,
              private alertService: AlertService, private uploadService: UploadService, private imageService: ImageService,
              private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.inboundRelations = [];
    this.entitySearchParams = {
      // sort: 'name'
    };
    this.countriesService.subject.subscribe(countries => {
      this.countries = countries.country_list;
      if (this.org.country) {
        this.selectedCountry = this.org.country.id;
      }
    });
    this.countriesService.fetch({offset: 0, limit: 9999});
    this.loadInboundRelations();
  }

  loadInboundRelations() {
    this.orgSerice.getInboundRelations(this.org.id).subscribe(
      next => {
        this.inboundRelations = next;
      }
    );
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
          width: img.width,
          height: img.height,
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

  get orgRelations() {
    return OrgRelations;
  }

  createRelation() {
    const model: OrganizationRelationCreate = {
      organization: this.org.id,
      type: this.relation.type,
      entity: this.relationEntityId
    };
    if (this.cacheSinceDate) {
      model.since = toDate(`${this.cacheSinceDate.year}-${this.cacheSinceDate.month}-${this.cacheSinceDate.day}`)
    }

    if (this.cacheEndDate) {
      model.end = toDate(`${this.cacheEndDate.year}-${this.cacheEndDate.month}-${this.cacheEndDate.day}`)
    }

    this.orgs.createRelation(model).subscribe(
      next => {},
      error => {},
      () => {
        window.location.reload();
      }
    );
  }

  enableRelationEditMode(relation: OrganizationRelation) {
    this.relationToEdit = relation;
    if (this.relationToEdit) {
      if (relation.since) {
        const dt = toDate(relation.since);
        this.cacheSinceDate = {
          year: dt.getFullYear(),
          month: dt.getMonth() + 1,
          day: dt.getDate()
        }
        // this.cacheEndDate = {
        //   year: dt.getFullYear(),
        //   month: dt.getMonth() + 1,
        //   day: dt.getDate() + 1
        // }
      }
    }
  }

  editRelation() {
    const model: OrganizationRelationCreate = {
      organization: this.org.id,
      type: this.relationToEdit.type,
      entity: this.relationToEdit.entity.id
    };

    if (this.cacheSinceDate) {
      model.since = toDate(`${this.cacheSinceDate.year}-${this.cacheSinceDate.month}-${this.cacheSinceDate.day}`)
    }
    if (this.cacheEndDate) {
      model.end = toDate(`${this.cacheEndDate.year}-${this.cacheEndDate.month}-${this.cacheEndDate.day}`)
    }

    this.orgs.editRelation(this.org.id, this.relationToEdit.id, model).subscribe(
      next => {},
      error => {},
      () => {
        window.location.reload();
      }
    );
  }

  deleteRelation(relation: OrganizationRelation) {
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

  countryChange(item: any) {
    this.org.country = item;
  }

}
