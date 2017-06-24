import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';

import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'role-list-component',
    templateUrl: 'role-list.component.html'
})

export class RoleListComponent implements OnInit {   
    exapnd: boolean = false;
    show: boolean = true;
    roles: any;
    selectedRole: any;
    @ViewChild('confirmationModal') public ConfirmationModal: ModalDirective;
    constructor(private formBuilder: FormBuilder,
        private apiService: APIService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private customToasterService: CustomToasterService,
        private loaderService: LoaderService) {

    }
    GetRoles() {
        this.loaderService.changePage(true);
        this.apiService.GetRoles().subscribe(
            data => {
                this.loaderService.changePage(false);
                this.roles = data;
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }
    DeleteRole(role: any) {
        this.loaderService.changePage(true);
        this.apiService.DeleteRole(role).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.ConfirmationModal.hide();
                this.GetRoles();
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


    deletRole(role: any) {
        this.selectedRole = role;
        this.ConfirmationModal.show();
    }

    hideConfirmation() {
        this.ConfirmationModal.hide();
    }

    confirmDeleteRole() {
        this.DeleteRole(this.selectedRole);
    }
   

    ngOnInit() {
        this.GetRoles();

    }


}
