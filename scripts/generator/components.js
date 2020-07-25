import BaseClass from '../BaseClass';

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
