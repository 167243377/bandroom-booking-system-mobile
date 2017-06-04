import { FormControl } from '@angular/forms';

export class PhoneNoValidator {
    static isValid(control: FormControl): any {
        var phoneNo = control.value;

        if (phoneNo.length !== 8) {
            return {
                "phoneNoLengthMustBe8": true
            };
        }

        //no error
        return null;
    }

}