
## A utility to assist in creating Angular forms through Classes using TypeScript annotations.

First the definitions in the tsconfig.json file must be updated:

    {
	    "compilerOptions":{
			...
			"emitDecoratorMetadata": true,
		    "experimentalDecorators": true
		}
	    
    }
 Obs: **The model must be initialized with default values to perform the mapping and build the JavaScript models.**
 
Now we can define a template, and use the annotations available for form configuration:

	import { NgFormValidators } from 'ng-form-decorators';
	class User {
		name: string = '';
		@NgFormValidators([Validators.required, Validators.max(45)])
		idade: number = null;
	}

 
Use NgFormGroup to define a FormGroup as an attribute of another FormGroup through the building model.

	import { NgFormValidators, NgFormGroup } from 'ng-form-decorators';
    class  Home {
		@NgFormValidators([Validators.required])
		number:  number  =  null;
		street:  string  =  null;
		@NgFormGroup()
		user:  User;
	}

At the end of the definitions, define a variable in the component to represent FormGroup and annotate it with NgFormModel defining the authoring template, and then a form will be built and injected into the variable.
	
	import { NgFormModel } from 'ng-form-decorators';
	import { Home } from './models/home.model.ts';
	export  class  AppComponent  {
	
		@NgFormModel(Home)
		formHome:  FormGroup;
	}
