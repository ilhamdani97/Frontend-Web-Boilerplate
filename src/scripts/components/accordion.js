import BaseClass from '../BaseClass';

export class Accordion extends BaseClass {
    constructor(){
        super();
        const { dataSelector } = this;
    }

    handleEventToggle(){
        const accordion = $('[data-selector="accordion"');
        accordion.find('h2').on("click", function() {
            const accordionContent = $(this).siblings('.content');
            const isShow = accordionContent.hasClass('is-show');
            if( isShow ){
                accordionContent.removeClass('is-show').stop(1).slideUp(400);
            }else{
                accordionContent.addClass('is-show').slideDown(400);
            }
        });
    }

    init(){
        this.handleEventToggle();
    }

}


export default new Accordion()