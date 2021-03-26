import { Component, forwardRef, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MembershipStatuses } from '../../app-config';

@Component({
  selector: 'app-membership-select',
  templateUrl: './membership-select.component.html',
  styleUrls: ['./membership-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MembershipSelectComponent),
      multi: true
    }
  ]
})
export class MembershipSelectComponent implements ControlValueAccessor {

  value: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @HostBinding('style.opacity')
  get opacity(): number {
    return this.disabled ? 0.25 : 1;
  }

  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter<string>();

  // Function to call when the range changes.
  onChange = (value: string) => {};

  // Function to call when the input is touched.
  onTouched = () => {};

  constructor() { }

  writeValue(obj: any): void {
    if (obj && !this.disabled) {
      this.value = obj as string;
      this.value = obj;
      this.onChange(obj);
      this.change.emit(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get membershipStatuses() {
    return MembershipStatuses;
  }

}
