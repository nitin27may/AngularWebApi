import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'control-messages',
    templateUrl: 'control-message.component.html'
})
export class ControlMessagesComponent {
    @Input() control: FormControl;
    constructor(private validationService: ValidationService) { }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }

        return null;
    }
}