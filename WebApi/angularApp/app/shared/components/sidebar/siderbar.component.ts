import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';
@Component({
    selector: 'sidebar',
    templateUrl: 'sidebar.component.html'
})

export class SidebarComponent {
    user: any;
    dasboardm : boolean = true;
    constructor(private router: Router,
        private storageService: StorageService) {
        if (this.storageService.get(StorageType.session, "userDetails")) {
            this.user = JSON.parse(this.storageService.get(StorageType.session, "userDetails"));
        }
    }
}
