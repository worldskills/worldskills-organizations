import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-organization-search-form',
  templateUrl: './organization-search-form.component.html',
  styleUrls: ['./organization-search-form.component.css']
})
export class OrganizationSearchFormComponent implements OnInit {

  @Input() loading = false;
  @Input() name: string;

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  searchClicked() {
    this.search.emit(this.name);
  }

}
