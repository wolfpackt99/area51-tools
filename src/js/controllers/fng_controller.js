angular.module("area51Tools.controllers.fng", ['ngAnimate', 'toastr'])
    .controller('fngController', ['$scope', 'mailchimp', 'toastr', function ($scope, mailchimp, toastr) {
        //stuff
        $scope.defaultContact = {
            firstName: '',
            f3Name: '',
            workout: '',
            lastName: '',
            email: ''
        };

        $scope.submit = function () {
            mailchimp($scope.contact, function () {
                toastr.success($scope.contact.firstName + ' has been subscribed.');
                $scope.contact = angular.copy($scope.defaultContact);
            }, function (data) {
                toastr.error(data.error);
            });
        };
    }
                                 ]);