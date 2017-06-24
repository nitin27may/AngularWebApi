import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ValidationService } from '../../../shared/services/validation.service';
import { CustomToasterService } from '../../../shared/services/custom-toaster.service';

import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
    selector: 'user-list-component',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {   
    exapnd: boolean = false;
    show: boolean = true;
    users: any;
    selectedUser: any;
    @ViewChild('confirmationModal') public ConfirmationModal: ModalDirective;
    constructor(private formBuilder: FormBuilder,
        private apiService: APIService,
        private validationService: ValidationService,
        private translate: TranslateService,
        private customToasterService: CustomToasterService,
        private loaderService: LoaderService) {

    }
    GetUsers() {
        this.loaderService.changePage(true);
        this.apiService.GetUsers().subscribe(
            data => {
                this.loaderService.changePage(false);
                this.users = data;
            },
            error => {

                this.loaderService.changePage(false);
            }
        );
    }
    DeleteUser(user: any) {
        this.loaderService.changePage(true);
        this.apiService.DeleteUser(user).subscribe(
            data => {
                this.loaderService.changePage(false);
                this.ConfirmationModal.hide();
                this.GetUsers();
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


    deleteUser(user: any) {
        this.selectedUser = user;
        this.ConfirmationModal.show();
    }

    hideConfirmation() {
        this.ConfirmationModal.hide();
    }

    confirmDeleteUser() {
        this.DeleteUser(this.selectedUser);
    }
   

    ngOnInit() {
        this.GetUsers();

    }


}
