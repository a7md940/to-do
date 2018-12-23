import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class Unique {

    static UniqueUsername(c: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return fetch(environment.apiURL + 'api/user/?username=' + c.value, {method: 'GET'})
        .then(res => res.json())
        .then( (result: any) =>{
            return !result.success ? {unique: true} : null;
        });
    }

    static UniqueEmail(c: AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return fetch(environment.apiURL + 'api/user/?email=' + c.value, {method: 'GET'})
        .then(res => res.json())
        .then( (result: any) =>{
            return !result.success ? {uniqueEmail: true} : null;
        });
    }
}