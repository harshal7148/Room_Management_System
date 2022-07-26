import { Injectable } from "@angular/core";
import { AbstractControl, FormControl} from "@angular/forms";
import { BaseComponent } from "../base.component";

@Injectable()
export class FormValidation extends BaseComponent {
    constructor(){
        super();
    }
    onFormValidation(field?:AbstractControl, fieldName?:any , maxlength?:number) {
        if (field?.hasError('required')) {
          return 'Please enter' + ` ${fieldName}`;
        }
        else if(field?.hasError('maxlength')){
          return 'Maxlength is' + ` ${maxlength}`;
        }
        else if(field?.hasError('pattern')){
          return 'Please enter number only';
        }
        return '';
      } 
    }