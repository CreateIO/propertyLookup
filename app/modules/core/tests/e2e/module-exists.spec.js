var module-existsPage = require('./module-exists.po.js');

describe('module-exists page tests',function(){
    var module-existsPage = new module-existsPage();

    /**
     * Before each function, load the page
     */
    beforeEach(function() {
      module-existsPage.goTomodule-exists();
    });

    /**
     * Should navigate to module-exists page
     */
    it('should navigate to module-exists page by default', function(){
        expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1:9000/#!/module-exists');
    });

    it('should... ', function(){
        //Tests
    });

});
