// spec.js
describe('MainController', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8000');
//    console.log('it passes http://localhost:8000');

    expect(browser.getTitle()).toEqual('Property Lookup');
 //   console.log('it found title');

  });
  it('should have be able to find the menu buttons', function() {

    var docs = element(by.css('.navbar-brand-center'));
   
     expect(docs.getText()).toEqual('Good Karma, People');
  });
  it('should pass multiple buttons', function() {
    var docs = element(by.css('#docs'));
    var sources = element(by.css('#sources'));
	var pageHeader = element(by.css('.header-text2'));
    var householdIncome = element(by.css('#householdIncome'));

   	docs.click();
    expect(pageHeader.getText()).toContain('testing testing testing Current');
	console.log('testing pass');
   	element(by.css('[ng-click="issue()"]')).click();
    expect(householdIncome.getText()).toContain('NO MORE ISSUE!');
	console.log('issue pass');
  });

});