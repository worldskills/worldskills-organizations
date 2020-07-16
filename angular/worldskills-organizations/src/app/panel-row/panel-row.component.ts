import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-panel-row',
  templateUrl: './panel-row.component.html',
  styleUrls: ['./panel-row.component.css']
})
export class PanelRowComponent implements OnInit {

  @Input() alignRightRowRight = false;
  @Input() alignLeftRowLeft = false;

  constructor() { }

  ngOnInit(): void {
  }

}
