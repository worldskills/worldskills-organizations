import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faEdit, faEye, faTimes} from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from '@ngx-translate/core';
import {combineLatest, of} from 'rxjs';

@Component({
  selector: 'app-panel-row-actions',
  templateUrl: './panel-row-actions.component.html',
  styleUrls: ['./panel-row-actions.component.css']
})
export class PanelRowActionsComponent implements OnInit {

  faEdit = faEdit;
  faTimes = faTimes;
  faEye = faEye;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() view: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Input() editLabel: string = null;
  @Input() viewLabel: string = null;
  @Input() deleteLabel: string = null;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const editLabelObservable = this.editLabel != null ? of(this.editLabel) : this.translateService.get('Edit');
    const viewLabelObservable = this.viewLabel != null ? of(this.viewLabel) : this.translateService.get('View');
    const deleteLabelObservable = this.deleteLabel != null ? of(this.deleteLabel) : this.translateService.get('Delete');
    combineLatest([
      editLabelObservable,
      viewLabelObservable,
      deleteLabelObservable
    ]).subscribe(([editLabel, viewLabel, deleteLabel]) => {
      this.editLabel = editLabel;
      this.viewLabel = viewLabel;
      this.deleteLabel = deleteLabel;
    });
  }

}
