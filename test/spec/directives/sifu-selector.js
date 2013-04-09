'use strict';

describe('Directive: sifuSelector', function () {
  beforeEach(module('trellonextApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<sifu-selector></sifu-selector>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the sifuSelector directive');
  }));
});
