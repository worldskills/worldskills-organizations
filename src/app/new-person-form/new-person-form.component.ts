import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NewPerson } from 'src/types/person';

// NOTE: at this point the calling component will be responsible for the entities and the POST
@Component({
  selector: 'app-new-person-form',
  templateUrl: './new-person-form.component.html',
  styleUrls: ['./new-person-form.component.css']
})
export class NewPersonFormComponent implements OnInit {

  @Output() save: EventEmitter<NewPerson> = new EventEmitter<NewPerson>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  firstName: string;
  lastName: string;
  email: string;

  constructor() { }

  ngOnInit(): void {

  }

  submit() {
    const details: NewPerson = {
      email_addresses: [{ email_address: this.email, type: {  name: 'Primary'}}],
      first_name: this.firstName,
      last_name: this.lastName,
      entities: []
    };
    this.save.emit(details);
  }

  abort() {
    this.cancel.emit();
  }

}
