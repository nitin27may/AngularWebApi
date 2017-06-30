import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
    selector: 'validation-messages',
    templateUrl: 'validation-message.component.html'
})
export class ValidationMessagesComponent {
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