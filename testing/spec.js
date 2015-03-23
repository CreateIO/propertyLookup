// spec.js
describe('MainController', function() {

it('should have a title', function() {
    browser.get('http://localhost:8000');
//    console.log('it passes http://localhost:8000');

    expect(browser.getTitle()).toEqual('Property Lookup');
 //   console.log('it found title');

  });
  it('should have be able to find the title', function() {
    var docs = element(by.css('.navbar-brand-center'));
    expect(docs.getText()).toContain('Good Karma Commutability');
  });
  it('should say the address', function() {

    var addressTextArea = element(by.model('model.address'));
    var addressTextDisplay = element(by.binding('model.address'));
    addressTextArea.sendKeys('1320 14th St NW, DC', protractor.Key.ENTER);
    expect(addressTextDisplay.getText()).toContain('1320 14th St NW, DC');
  });

//  it('should say Hi', function() {
//    var textArea = element(by.model('areaText'));
//    textArea.sendKeys('Hi!', protractor.Key.ENTER);
//    expect(textArea.getAttribute('value')).toContain('Hi!');
//  });


});