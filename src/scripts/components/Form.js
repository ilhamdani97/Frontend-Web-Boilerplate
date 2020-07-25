
import BaseClass from '../BaseClass';
import validation, {
    isRequired,
    isEmail,
    isUserName,
    isPhoneNumber,
    isIdNumber,
    isGender,
    isAge
} from '../utilities/validation';

import services from '../services';

import { arrToObject } from '../utilities/function';

export class Form extends BaseClass {
    constructor(){
        super();
        const { dataSelector } = this;
    }

    handleError(selector, validationType, val){
        if( !validationType(val)){
            selector
            .addClass("is-error")
            .siblings('.err-msg')
            .text(`${val} is not valild`)
        }else{
            selector.removeClass("is-error");
        }
    }

    inputValidation(form, formValueObj, name, validationType){
        const val = formValueObj[name];
        const selector = form.find("#" + name);
        this.handleError(selector, validationType, val);
    }

    inputValidationKeyup(input, validationType, val){
        this.handleError(input, validationType, val);
    }

    checkValidation(form, formValue){
        console.log("arr", formValue);
        const formValueObj = arrToObject(formValue);
        console.log("obj", formValueObj);

        this.inputValidation(form, formValueObj, "name", isRequired);
        this.inputValidation(form, formValueObj, "email", isEmail);
        this.inputValidation(form, formValueObj, "userName", isUserName);

    }

    handleEventSubmit(){
        const form = $('[data-selector="form"]');
        form.on("submit", ()=> {
            event.preventDefault();
            const formValue = $(form).serialize();
            const formValueArray = $(form).serializeArray();
            this.checkValidation(form, formValueArray);

            const findError = form.find('.is-error');

            if(findError.length){
                findError.eq(0).focus();
                return false
            }

            /*
            services
            .register(formValueArray)
            .then( res => {
                console.log("res", res);
            }).catch ( e => {
                console.log("res", e);
            })
            */

          })
    }

    handleEventChange(){
        const form = $('[data-selector="form"]');
        form.on("change", ()=> {
            event.preventDefault();
            const formValueArray = $(form).serializeArray();
            this.checkValidation(form, formValueArray);
        })
    }
    handleEventInputKeyup(){
        const form = $('[data-selector="form"]');
        console.log("BLUR");
        const _this = this;
        form.find("input").on("keyup", function() {
            event.preventDefault();
            const input = $(this);
            const val = input.val();
            const validationType = $(this).data("validation");
            _this.inputValidationKeyup(input, validation[validationType], val);
        })
    }

    init(){
        this.handleEventSubmit();
        // this.handleEventChange();
        this.handleEventInputKeyup();
    }
}

export default new Form()
