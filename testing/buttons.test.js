'use strict';

describe('MainController', function($scope){
	var scope;
	//mock Application to allow us to inject our own dependencies
    beforeEach(angular.mock.module('PropLookupRE'));
    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        $controller('MainController', {$scope: scope});
    })
    );
     // tests start here
    it('should be clickable to geocoder', function(done){
        console.log(typeof(by));
        var result = element[0].querySelectorAll('.issueTesting');

        var docs = angular.element('[ng-click="issue()"]');

//        var docs = angular.elementofhtml(by.css('[ng-click="issue()"]'));
        var aaaissue = angular.element(by.id('householdIncome2'));
//        var docs = element(by.id('docs'));
  //      var nextPage = element(by.id('sources'));
        docs.click();
        expect(aaaissue.toEqual('Household Income'));
        done;
    });
});
