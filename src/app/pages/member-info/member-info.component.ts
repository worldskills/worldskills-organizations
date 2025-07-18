import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, NgAuthService, UploadService} from '@worldskills/worldskills-angular-lib';
import {Member, MemberRequest} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ImageService} from '../../../services/image/image.service';
import {HttpEventType} from '@angular/common/http';
import {Image} from '../../../types/image';
import { PermissionHelper } from '../../helpers/permission-helper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {

  member: Member;
  loading = false;
  @ViewChild('form') form: NgForm;
  @ViewChild('flagInput') input: ElementRef<HTMLInputElement>;

  resourceLoading = false;
  resourceProgress = 0;
  uploadFile: File;
  canEdit = false;
  canDelete = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: NgAuthService,
    private memberService: MemberService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private uploadService: UploadService,
    private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(({memberId}) => {
      this.memberService.getById(memberId, true).subscribe(member => {
        this.member = member;
        this.calculateCanEdit(member);
        this.canDelete = PermissionHelper.isAdmin(this.auth.currentUser.value);
      });
      this.memberService.loading.subscribe(loading => (this.loading = loading));
    });
  }

  calculateCanEdit(member: Member)
  {
    let canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
    if (!canEdit) {
      member.member_of.forEach(parent => {
        if (!canEdit) {
          canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, parent.ws_entity.id);
        }
      });
    }

    this.canEdit = canEdit;
  }

  get initialized() {
    return !!this.member;
  }

  submitForm() {
    if (this.form.valid) {
      const {code, name, name_1058} = this.form.value;
      const data: MemberRequest = {
        code,
        name,
        name_1058: {
          lang_code: 'en',
          text: name_1058,
        },
      };

      const memberId = this.member.id;
      const complete = () => {
        this.translateService.get('Member data saved').subscribe(t => {
          this.alertService.setAlert('member-saved', AlertType.success, null, t, true);
        });
        this.memberService.fetch(memberId);
      };

      if (this.uploadFile) {
        // tslint:disable-next-line:variable-name
        this.upload(({id: image_id, thumbnail_hash, width, height}) => {
          data.flag = {
            image_id,
            thumbnail_hash,
            width,
            height,
          };
          this.memberService.update(memberId, data).subscribe(complete);
        });
      } else {
        this.memberService.update(memberId, data).subscribe(complete);
      }
    }
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

  deleteFlag() {
    const memberId = this.member.id;
    this.memberService.deleteFlag(memberId).subscribe(() => {
      this.translateService.get('Removed member flag').subscribe(t => {
        this.alertService.setAlert('member-flag-removed', AlertType.success, null, t, true);
      });
      this.memberService.fetch(memberId);
    });
  }

  unsetFlag() {
    this.uploadFile = null;
    this.input.nativeElement.value = null;
  }

  deleteMember() {
    const memberName = this.member.name.text;
    this.alertService.remove('member-deleted');
    this.memberService.delete(this.member.id).subscribe(
      next => this.alertService.setAlert('member-deleted', AlertType.success, null, `Member ${memberName} Deleted`, true),
      error => {
        this.alertService.setAlert('member-deleted', AlertType.error, null, `Unable to delete ${memberName}.`, true)
      },
      () => {
        this.router.navigate(['/members']);
      }
    )
  }
}
