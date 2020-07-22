import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgModel} from '@angular/forms';

export class NgbDateCache {

  private cachedDates = {};

  constructor(public formatter: NgbDateParserFormatter) {
  }

  getNgbDate(date: string, model: NgModel) {
    if (!(date in this.cachedDates)) {
      this.cachedDates[date] = this.formatter.parse(date);
    }
    if (model.pristine && model.value != date) {
      this.setNgbDate(this.cachedDates[date], model);
    }
    return this.cachedDates[date];
  }

  setNgbDate(date: NgbDateStruct, model: NgModel) {
    const value = this.formatter.format(date);
    model.control.setValue(value, {emitModelToViewChange: false});
    if (value !== '') {
      model.control.setErrors(null);
    }
  }

}
