// spec.js
describe('MainController', function() {
  it('should have a title', function() {
    browser.get('http://localhost:8000');
    console.log('it passes http://localhost:8000');

    expect(browser.getTitle()).toEqual('Property Lookup');
    console.log('it passes');
  });
});