import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidator {
    static notZero(control:AbstractControl):ValidationErrors | null{
        return control.value === 0 ? {notZero:true}:null
    }

    static notSpace(control:AbstractControl):ValidationErrors | null{
        return control.value?.includes(' ') ? {notSpace:true}:null
    }
}
