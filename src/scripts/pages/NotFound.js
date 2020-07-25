/*
name : NotFound
auto create By : ilham
auto create On : Tue, 10 July 2020
*/

import BaseClass from '../BaseClass';
import { Popup } from '../components';

export class NotFound extends BaseClass {
    constructor(){
        super();
    }

    methodHere(){
        console.log("Iam Method")
    }

    init(){
        this.methodHere();
    }

}

export default new NotFound()