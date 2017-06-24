import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../services/loader.service';
import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.component.html',
    providers: [APIService, StorageService]
})

export class ConfirmationComponent implements OnInit {
    display: boolean = false;
    constructor(private apiService: APIService,
        private router: Router,
        private route: ActivatedRoute,
        private loaderService: LoaderService,
        private storageService: StorageService) {

    }
    Confirmation(token: string) {
        this.loaderService.changePage(true);
        this.apiService.GetConfirmation(token).subscribe(
            data => {
                this.display = true;
                this.loaderService.changePage(false);
            },
            error => {
                this.display = false;
                this.loaderService.changePage(false);
            });
    }
    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        this.Confirmation(id);

    }
}