import BaseClass from '../BaseClass';
import { Popup } from '../components';

export class __NAME__ extends BaseClass {
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

export default new __NAME__()
