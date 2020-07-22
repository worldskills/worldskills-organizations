import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  styleUrls: ['./panel-header.component.css']
})
export class PanelHeaderComponent implements OnInit {

  @Input() title;
  @Input() editLink;

  constructor() { }

  ngOnInit(): void {
  }

}
