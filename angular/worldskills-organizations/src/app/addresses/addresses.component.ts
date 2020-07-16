import {Component, OnInit} from '@angular/core';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {MemberService} from '../../services/member/member.service';
import {Member} from '../../types/member';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent extends WsComponent implements OnInit {

  member: Member;
  loading = false;

  constructor(
    private memberService: MemberService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => (this.member = member)),
      combineLatest([
        this.memberService.loading,
      ]).pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
  }

  get initialized() {
    return !!this.member;
  }

}
