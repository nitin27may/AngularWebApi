import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';
import { ValidationService } from '../../../shared/services/validation.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'event-add-component',
    templateUrl: 'event-add.component.html'
})

export class EventAddComponent implements OnInit {
    eventForm: any;
    Id: any;
    exapnd: boolean = false;
    show: boolean = true;
    roleList: any;
    //Datepciker Configuration
    datepickerOpts = {
        startDate: new Date(1900, 1, 1),
        autoclose: true,
        todayBtn: 'linked',
        enableOnReadonly: true,
        todayHighlight: true,
        assumeNearbyYear: true,
        format: 'MM d, yyyy',
        placeholder: ' ',
        hideIcon: false,
        endDate: new Date()
    }
    lossTimepciker = { minuteStep: 1, placeholder: ' ', showMeridian: true, hideIcon: false, template: 'dropdown' };
    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private apiService: APIService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private loaderService: LoaderService,
        private customToasterService: CustomToasterService) {

    }

   
    GetEvent(id: any) {
         this.loaderService.changePage(true);
        this.apiService.GetEvent(id).subscribe(
            data => {
                data.EventStartTime = new Date(data.EventStartTime);
                data.EventEndTime = new Date(data.EventEndTime);
                this.loaderService.changePage(false);
                (<FormGroup>this.eventForm)
                    .patchValue(data, { onlySelf: true });
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    saveEvent(event: any) {
        console.log(event);
        let displayMessage: string, messgeKey: string;
        if (this.Id) {
            event.Id = this.Id;
            messgeKey = 'COMMON.UPSUCCESS';
        } else {
            messgeKey = 'COMMON.ADDSUSCESS';
        }
        this.loaderService.changePage(true);

        this.apiService.AddUpdateEvents(event).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.translate.get(messgeKey).subscribe((res: string) => {
                    displayMessage = res;
                });
                this.customToasterService.addToast({ title: "", msg: displayMessage, type: "success" });
                this.router.navigate(['/admin/events']);

            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }

    ngOnInit() {
        this.Id = +this.route.snapshot.params['id'];
        if (this.Id) {
            this.GetEvent(this.Id);
        }
        this.eventForm = this.formBuilder.group({
            'Name': ['', [Validators.required, Validators.minLength(2)]],
            'Orgnizer': ['', [Validators.required, Validators.minLength(2)]],
            'EventType': ['', [Validators.required, Validators.minLength(2)]],
            'Status': ['', [Validators.required]],
            'Address': ['', [Validators.required, Validators.minLength(2)]],
            'City': ['', [Validators.required, Validators.minLength(2)]],
            'State': ['', [Validators.required, Validators.minLength(2)]],
            'Country': ['', [Validators.required, Validators.minLength(2)]],
            'EventStartTime': [''],
            'EventEndTime': ['']
            
        });

    }


}
