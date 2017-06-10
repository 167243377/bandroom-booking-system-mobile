import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phoneNoFormat' })
export class PhoneNoFormatPipe implements PipeTransform {

    transform(value: String): String {
        if (!value) {
            return value;
        }
        
        var first4Digi = value.substring(0, 4);
        var last4Digi = value.substring(4);

        return first4Digi + " " + last4Digi;
    }
}