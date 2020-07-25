
import BaseClass from '../BaseClass';

export class Popup extends BaseClass {
    constructor(){
        super();
        const { dataSelector } = this;

        this.selector["popup"] = $('[data-selector="popup"]');
        this.selector["popup2"] = dataSelector('popup');
        this.selector["popupButton"] = dataSelector('action-popup');
        this.selector["popupButtonDestroy"] = dataSelector('action-popup-destroy');

    }

	show(type = 'default', callBack){
        const { popup } = this.selector;
        popup.addClass("is-show");
        if( type == 'fade'){
            popup.
            addClass("is-show").
            fadeIn(400, 'linear', callBack);
        }else{
            popup.
            addClass("is-show").
            show(0, 'linear', callBack);
        }
    }

	hide(callBack){
        const { popup } = this.selector;
        popup.removeClass("is-show").
        fadeOut(400, 'linear', callBack);
    }

    destroy(callBack){
        const { popup } = this.selector;
        popup.empty();
        if( typeof callBack == "function"){
            callBack();
        }
    }

    handleEventHide(){
        const { popup } = this.selector;
        const popupInner = popup.find('.inner');
        popup.on('click', (event) => {
            event.preventDefault();
            this.hide();
        });
        popupInner.on('click', function(event) {
            event.stopPropagation();
        });
    }
    
    handleEventShow(){
        const { popupButton } = this.selector;
        popupButton.on('click', (event) => {
            event.preventDefault();
            this.show('fade', function(){
                // alert("IAM CALLBACK");
            });
        });
    }

    handleEventDestroy(){
        const { popupButtonDestroy } = this.selector;
        popupButtonDestroy.on('click', (event) => {
            event.preventDefault();
            this.destroy();
        });
    }

    init(){
        this.handleEventHide();
        this.handleEventShow();
        this.handleEventDestroy();
    }
}

export default new Popup()
