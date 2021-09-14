import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../../types/member';

@Component({
  selector: 'app-organization-members',
  templateUrl: './organization-members.component.html',
  styleUrls: ['./organization-members.component.css']
})
export class OrganizationMembersComponent implements OnInit {

  @Input() members: Member[];
  @Input() loading: boolean;
  @Input() canEdit = false;
  constructor() { }

  ngOnInit(): void {
  }

}
