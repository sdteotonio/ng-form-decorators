import { AbstractControlOptions, ValidatorFn } from '@angular/forms';
import "reflect-metadata";
import { buildForm } from '../core/form-decorator-core';
import { NgFormControlModel } from '../model/ng-form-control.model';
import { NgFormGroupModel } from '../model/ng-form-group.model';
import { NgFormMatadataKeys } from '../model/ng-form-metadata-key.model';

/**
 * Annotation used to assign field validations
 * @param validators Angular Validtors
 */
export function NgFormValidators(validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions) {
    return (target: any, key: string) => {
        const validatorsList: NgFormControlModel[] = Reflect.getMetadata(NgFormMatadataKeys.NG_FORM_VALIDATORS, target) || [];
        validatorsList.push({
            control: key,
            validators
        })
        Reflect.defineMetadata(NgFormMatadataKeys.NG_FORM_VALIDATORS, validatorsList, target);
    }
}

/**
 * Annotation used to define a FormGroup for an attribute of any class.
 */
export function NgFormGroup() {
    return (target: any, key: string) => {
        const groupList: NgFormGroupModel[] = Reflect.getMetadata(NgFormMatadataKeys.NG_FORM_GROUP, target) || [];
        var targetModel = Reflect.getMetadata("design:type", target, key);
        groupList.push({
            name: key,
            formGroup: buildForm(Reflect.construct(targetModel, []))
        })
        Reflect.defineMetadata(NgFormMatadataKeys.NG_FORM_GROUP, groupList, target);
    }
}

/**
 * Annotation used to build a FormGroup from a class by noting a component attribute
 * @param model Class to construction
 */
export function NgFormModel(model: Function) {
    return (target: any, key: string) => {
        if (model) {
            Reflect.defineProperty(target, key, {
                value: buildForm(Reflect.construct(model, []))
            })
        }
    }
}


function NgFormMapper(model: Function) {
    return (
        _target: Object,
        _propertyName: string,
        propertyDesciptor: PropertyDescriptor): PropertyDescriptor => {
        const method = propertyDesciptor.value;
        propertyDesciptor.value = function (...args: any[]) {
            const formRawValue = method.apply(this, args);
            console.log(Object.getOwnPropertyNames(new model.prototype.constructor));
            return formRawValue;
        }
        return propertyDesciptor;
    }
};