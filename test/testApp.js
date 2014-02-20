angular.module('testApp', ['app', 'testApp.mockDataHTTP'])
	.config(function($provide) {
		$provide.value('$element', function() {

		});
		$provide.value('$modalInstance', function() {

		});
		
	});
