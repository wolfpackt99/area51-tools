angular.module("area51Tools.controllers.fng", [])
    .controller('fngController', ['$scope', 'mailchimp', function ($scope, mailchimp) {
        //stuff
        $scope.contact = {
            firstName: '',
            lastName: '',
            email: ''
        };

        $scope.submit = function () {
            alert('test');
            mailchimp($scope.contact, function () {
                alert('success');
            }, function () {
                alert('failed');
            });
        }
}]);