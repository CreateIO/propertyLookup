'use strict';

describe('Controller: CommuterController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var CommuterController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CommuterController = $controller('CommuterController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
