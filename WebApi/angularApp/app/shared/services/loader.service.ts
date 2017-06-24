import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {

    private pageNumberChangedSource = new Subject<any>();
    private language = new Subject<string>();

    pageNumberChanged$ = this.pageNumberChangedSource.asObservable();
    language$ = this.language.asObservable();


    changePage(param: any) {
        this.pageNumberChangedSource.next(param);
    }
    updateLanguage(lang: string) {
        this.language.next(lang);
    }

}