import BaseClass from './BaseClass';
import { email } from './variables'; 

import {
    Home,
    Login,
    Register
}
from "./pages";

class App extends BaseClass{
    load(){
        $(window).on("load", function() {
            console.log("WINDOW LOAD");
        });
    }
    ready(){
        $(document).ready(function($) {
            console.log("DOC READY");
            Home.init();
            Login.init();
            Register.init();
		});
    }
    init(){
        this.load();
        this.ready();
    }
}

const getApp = new App();
getApp.init();