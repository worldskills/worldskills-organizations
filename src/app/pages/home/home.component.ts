import {Component, OnInit} from '@angular/core';
import {RedirectHandler} from '@worldskills/worldskills-angular-lib';
import {ActivatedRoute} from '@angular/router';
import { homepage } from '../../app-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  initialized = false;

  constructor(
    private handler: RedirectHandler,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.handler.redirectOrReturn({url: [homepage], onlyIfExact: this.route})
      .subscribe(() => (this.initialized = true));
  }

}
