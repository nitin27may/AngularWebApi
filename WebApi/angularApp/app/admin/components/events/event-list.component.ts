import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';

import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'event-list-component',
    templateUrl: 'event-list.component.html'
})

export class EventListComponent implements OnInit {   
    exapnd: boolean = false;
    show: boolean = true;
    events: any;
    selectedEvent: any;
    @ViewChild('confirmationModal') public ConfirmationModal: ModalDirective;
    constructor(private formBuilder: FormBuilder,
        private apiService: APIService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private customToasterService: CustomToasterService,
        private loaderService: LoaderService) {

    }
    GetEvents() {
        this.loaderService.changePage(true);
        this.apiService.GetEvents().subscribe(
            data => {
                this.loaderService.changePage(false);
                for (let event of data) {
                    //note.DisplayDate = moment(note.CreateDate, "YYYYMMDD, h:mm:ss a").locale(this.language).format('MMMM DD, YYYY');
                    
                }
                this.events = data;
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }
    DeleteEvent(event: any) {
        this.loaderService.changePage(true);
        this.apiService.DeleteEvent(event).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.ConfirmationModal.hide();
                this.GetEvents();
                let displayMessage;
                this.translate.get('COMMON.DELSUCCESS').subscribe((res: string) => {
                    displayMessage = res;
                });
                this.customToasterService.clearToast();
                this.customToasterService.addToast({ title: "", msg: displayMessage, type: "success" });
            },
            error => {
                this.loaderService.changePage(false);
            }
        );
    }


    deletRole(event: any) {
        this.selectedEvent = event;
        this.ConfirmationModal.show();
    }

    hideConfirmation() {
        this.ConfirmationModal.hide();
    }

    confirmDeleteRole() {
        this.DeleteEvent(this.selectedEvent);
    }
   

    ngOnInit() {
        this.GetEvents();

    }


}
