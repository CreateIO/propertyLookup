var module-existsPage = (function(){

    //Declare all the page elements here
    function module-existsPage(){
        this.field1 = element(by.model('field1'));
        //this.field2 = element(by.model('field2'));
        //this.btn1 = element(by.id('btn1'));
    }

    /**
     * Navigate to the module-exists page
     */
    module-existsPage.prototype.goTomodule-exists = function(){
        browser.get('http://127.0.0.1:9000/#!/module-exists');
    };

    /**
    * Get value of model - field1
    */
    module-existsPage.prototype.getField1 = function(){
        return this.field1.getAttribute('value');
    };

    /**
     * Set value of model - field1
     */
    module-existsPage.prototype.setField1 = function(value){
        this.field1.sendKeys(value);
    };

    return module-existsPage;
})();

module.exports = module-existsPage;
