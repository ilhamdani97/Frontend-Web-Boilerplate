import BaseClass from '../BaseClass';
import { Popup, Accordion, Form } from '../components';

export class Home extends BaseClass {

    constructor(){
        super();
        const { dataSelector } = this;
    }

    init(){
        Form.init();
        Accordion.init();
        Popup.init();
    }
}

export default new Home();