import { Injectable } from '@angular/core';
@Injectable()
export class LogService {

    writeToLog(logMessage: any) {
        console.log(logMessage);
    }
}
