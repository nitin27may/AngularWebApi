import { Component } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';
// AoT compilation doesn't support 'require'.
import './app.component.scss';
import '../style/app.scss';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
    startLoader: boolean = false;
    public constructor(private loaderService: LoaderService) {
        this.loaderService.pageNumberChanged$.subscribe(param => {
            this.startLoader = param;
        });
    }
  }