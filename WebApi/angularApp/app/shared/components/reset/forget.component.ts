import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { APIService } from '../../../core/services/api.service';
import { LoaderService } from '../../services/loader.service';
import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';

@Component({
    selector: 'forget',
    templateUrl: 'forget.component.html',   
    providers: [APIService, StorageService]
})

export class ForgetComponent {
    public user: any = { Email: '', Selected: false};
    constructor(private apiService: APIService,
        private router: Router,
        private loaderService: LoaderService,
        private storageService: StorageService) {
  
    }
    Reset() {
  
        this.loaderService.changePage(true);
        this.apiService.Reset(this.user).subscribe(            
            data => {
                this.loaderService.changePage(false);
                //this.router.navigate(['location/details']);
            },
                error => {
                    this.loaderService.changePage(false);
            }
        );
    }
}