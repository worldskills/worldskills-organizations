import {Component, Input, OnInit} from '@angular/core';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  @Input() title;
  @Input() editLink;
  faEdit = faEdit;

  constructor() {
  }

  ngOnInit(): void {
  }

}
