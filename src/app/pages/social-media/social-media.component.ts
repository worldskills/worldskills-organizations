import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, RxjsUtil, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {SocialNetwork, SocialNetworkRequest} from '../../../types/socialNetwork';
import {NgForm} from '@angular/forms';
import {SocialNetworkType} from '../../../types/socialNetworkType';
import {SocialNetworkTypesService} from '../../../services/social-network-types/social-network-types.service';
import {SocialNetworksService} from '../../../services/social-networks/social-networks.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent extends WsComponent implements OnInit {

  member: Member;
  socialNetworkTypes: Array<SocialNetworkType>;
  loading = false;
  editingSocialNetwork: SocialNetwork = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private memberService: MemberService,
    private socialNetworkTypesService: SocialNetworkTypesService,
    private socialNetworksService: SocialNetworksService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => (this.member = member)),
      this.socialNetworkTypesService.subject.subscribe(socialNetworkTypes => (this.socialNetworkTypes = socialNetworkTypes.socialNetworks)),
      RxjsUtil.loaderSubscriber(
        this.memberService,
        this.socialNetworkTypesService,
        this.socialNetworksService,
      ).subscribe(loading => (this.loading = loading)),
    );
    this.socialNetworkTypesService.fetch();
  }

  get initialized() {
    return !!this.member && !!this.socialNetworkTypes;
  }

  editSocialNetwork(socialNetwork: SocialNetwork) {
    this.editingSocialNetwork = socialNetwork;
  }

  cancelEditSocialNetwork() {
    this.editingSocialNetwork = null;
  }

  unbindSocialNetwork(socialNetwork: SocialNetwork) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to remove the socialNetwork').subscribe(t => {
      if (confirm(t)) {
        this.socialNetworksService.unbind(memberId, socialNetwork.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Remove social network').subscribe(t2 => {
              this.alertService.setAlert('removed-social-network', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const memberId = this.member.id;
      const {social_network, social_network_identifier} = this.editForm.value;
      const data: SocialNetworkRequest = {
        social_network,
        social_network_identifier,
      };
      this.socialNetworksService.update(memberId, this.editingSocialNetwork.id, data)
        .subscribe(() => {
          this.editingSocialNetwork = null;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated social network').subscribe(t => {
            this.alertService.setAlert('updated-social-network', AlertType.success, null, t, true);
          });
        });
    }
  }

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
      const {social_network, social_network_identifier} = this.form.value;
      const data: SocialNetworkRequest = {
        social_network,
        social_network_identifier,
      };
      this.socialNetworksService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Add social network').subscribe(t => {
            this.alertService.setAlert('added-social-network', AlertType.success, null, t, true);
          });
        });
    }
  }

  getLink(id: number, identifier: string) {
    switch (id) {
      case 1:
        return 'https://www.facebook.com/' + identifier;
      case 3:
        return 'https://twitter.com/' + identifier;
      case 4:
        return 'https://www.linkedin.com/' + identifier;
      case 5:
        return 'https://vine.co/' + identifier;
      case 6:
        return 'http://instagram.com/' + identifier;
      case 7:
        return 'https://www.flickr.com/photos/' + identifier;
      case 8:
        return 'https://www.youtube.com/' + identifier;
      default:
        return 'unknown (' + identifier + ')';
    }
  }

  getLinkFromForm(form: any) {
    if (form && form.value && form.value.social_network) {
      const identifier = form && form.value && form.value.social_network_identifier ? form.value.social_network_identifier : '';
      return this.getLink(parseInt(form.value.social_network), identifier);
    } else {
      return '';
    }
  }

}
