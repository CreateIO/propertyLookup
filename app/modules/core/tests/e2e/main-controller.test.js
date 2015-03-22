'use strict';

describe('MainController', function($scope){
	var scope;

	//mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('PropLookupRE.controllers.Main'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('MainController', {$scope: scope});

    })
    );
     // tests start here
    it('should have scope.address2 = 315 S. Garfield St, Arlington, VA 22204', function(){
        expect(scope.address2).toBe('315 S. Garfield St, Arlington, VA 22204');
        console.log('this works.');
    });
    it('expect this to be present', function(){
      
//        var docs = element(by.css('[ng-click="issue()"]'));
       expect(element(by.id('householdIncome2')).isPresent()).toBe(true);
//        var aaaissue = element(by.id('householdIncome2'));

//        var docs = element(by.id('docs'));
//        var nextPage = element(by.id('sources'));
//        docs.click();
//        expect(aaaissue.innerHTML.toEqual('Household Income'));
    });
});
