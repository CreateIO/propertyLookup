'use strict';

describe('Filter: Capitalize', function () {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var Capitalize;

    beforeEach(inject(function ($filter) {
        Capitalize = $filter('capitalize');
    }));

    it('should ...', function () {

    });

});
