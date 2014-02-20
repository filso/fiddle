angular.module('testApp', ['busuuApp', 'testApp.mockDataHTTP'])
	.config(function($provide) {
		$provide.value('$element', function() {

		});
		$provide.value('$modalInstance', function() {

		});
		
	});
