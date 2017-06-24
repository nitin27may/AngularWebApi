import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../../services/storage.service';
import { StorageType } from '../../model/storage.enum';

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html'
})

export class NavigationComponent {
    user: any;
    constructor(private router: Router,
        private storageService: StorageService) {
        if (this.storageService.get(StorageType.session, "userDetails")) {
            this.user = JSON.parse(this.storageService.get(StorageType.session, "userDetails"));
        }
    }
    Logout() {
        this.storageService.remove(StorageType.session, "jwtToken");
        this.storageService.remove(StorageType.session, "userDetails");
        this.router.navigate(['login']);
    }
}