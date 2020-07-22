import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faBan, faEdit, faEye, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';
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
  faBan = faBan;
  faSave = faSave;

  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() view: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  @Input() editLabel: string = null;
  @Input() viewLabel: string = null;
  @Input() deleteLabel: string = null;
  @Input() cancelLabel: string = null;
  @Input() saveLabel: string = null;

  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    const editLabelObservable = this.editLabel != null ? of(this.editLabel) : this.translateService.get('Edit');
    const viewLabelObservable = this.viewLabel != null ? of(this.viewLabel) : this.translateService.get('View');
    const deleteLabelObservable = this.deleteLabel != null ? of(this.deleteLabel) : this.translateService.get('Delete');
    const cancelLabelObservable = this.cancelLabel != null ? of(this.cancelLabel) : this.translateService.get('Cancel');
    const saveLabelObservable = this.saveLabel != null ? of(this.saveLabel) : this.translateService.get('Save');
    combineLatest([
      editLabelObservable,
      viewLabelObservable,
      deleteLabelObservable,
      cancelLabelObservable,
      saveLabelObservable,
    ]).subscribe(
      ([
         editLabel,
         viewLabel,
         deleteLabel,
         cancelLabel,
         saveLabel,
       ]) => {
        this.editLabel = editLabel;
        this.viewLabel = viewLabel;
        this.deleteLabel = deleteLabel;
        this.cancelLabel = cancelLabel;
        this.saveLabel = saveLabel;
      });
  }

}
