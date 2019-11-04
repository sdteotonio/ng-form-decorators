import { FormControl, FormGroup } from '@angular/forms';
import { NgFormControlModel } from '../model/ng-form-control.model';
import { NgFormGroupModel } from '../model/ng-form-group.model';
import { NgFormMatadataKeys } from '../model/ng-form-metadata-key.model';

export function buildForm(model: any): FormGroup {
    if (model) {
        const modelControls: NgFormControlModel[] = Reflect.getMetadata(NgFormMatadataKeys.NG_FORM_VALIDATORS, model) || [];
        const modelGroups: NgFormGroupModel[] = Reflect.getMetadata(NgFormMatadataKeys.NG_FORM_GROUP, model) || [];
        Object.keys(model)
            .filter(key =>
                !modelControls.some(formCtrl => formCtrl.control === key)
                && !modelGroups.some(formCtrl => formCtrl.name === key))
            .forEach(key => modelControls.push(<NgFormControlModel>{ control: key, validators: null }))
        const formControls = {};
        modelControls.forEach(controlObj => {
            formControls[controlObj.control] = new FormControl(model[controlObj.control], controlObj.validators);
        })
        modelGroups.forEach(group => {
            formControls[group.name] = group.formGroup;
        })
        return new FormGroup(formControls)
    }
}

export function NgFormMapper<M>(form: FormGroup, paramTo?: M): M {
    const mappedObject: M = <M>{};
    const getParamTo = (control) => {
        if (paramTo && paramTo.hasOwnProperty(control)) {
            return paramTo[control];
        }
        return control;
    }

    if (form) {
        Object.keys(form.controls).forEach(control => {
            const formAttr = form.get(control);
            if (formAttr instanceof FormControl) {
                mappedObject[getParamTo(control)] = formAttr.value;
            } else if (formAttr instanceof FormGroup) {
                mappedObject[getParamTo(control)] = NgFormMapper(formAttr, paramTo)
            }
        })
    }
    return mappedObject;
}
