import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { GenericUtil } from '@worldskills/worldskills-angular-lib';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string;

  code: string;

  constructor(private route: ActivatedRoute, private translator: TranslateService) {
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    this.errorMessage = data && data.error ? data.error : 'Not found';

    this.route.queryParams.subscribe(
      queryParams => {
        if (queryParams.hasOwnProperty('code')) {
          this.code = queryParams.code;
        }
      }
    );
  }
}
