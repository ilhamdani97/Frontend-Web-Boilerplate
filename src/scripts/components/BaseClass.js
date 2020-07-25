export default class BaseClass {
    constructor(){
        this.window = window;
        this.selector = {
            window : $(window),
            body : $('body'),
            root : $('.root'),
            header : $('.header'),
            main : $('.main'),
            footer : $('.footer')
        };
        this.dataSelector = dataSelector;
        this.isMobile = isMobile;
        this.utils = {
            dataSelector : dataSelector,
            isMobile : isMobile
        }
    }
}