import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrganizationRelationType } from 'src/types/organization';

@Component({
  selector: 'app-organization-search-form',
  templateUrl: './organization-search-form.component.html',
  styleUrls: ['./organization-search-form.component.css']
})
export class OrganizationSearchFormComponent implements OnInit {

  @Input() loading = false;
  @Input() name: string;
  @Input() relation: string;

  @Output() search: EventEmitter<OrganizationSearch> = new EventEmitter<OrganizationSearch>();

  ngOnInit(): void {
  }

  searchClicked() {
    this.search.emit({
      name: this.name,
      relation: this.relation
    });
  }

}

export interface OrganizationSearch {
  name: string;
  relation?: string;
}
