import { AbstractControlOptions, ValidatorFn } from '@angular/forms';

export interface NgFormControlModel {
    control: string;
    validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions
}