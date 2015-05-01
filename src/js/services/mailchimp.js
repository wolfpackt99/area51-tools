angular.module("area51Tools.services.mailchimp",[])
    .factory('mailchimp', ['$http', function ($http) {
        var endpointFragment = 'https://us10.api.mailchimp.com/2.0/lists/subscribe',
            apiKey = '782bcc4984694d3254ce0e83c8777c25-us10',
            listId = 'cda6f4f549';
        //(string apikey, string id, struct email, struct merge_vars, string email_type, bool double_optin, bool update_existing, bool replace_interests, bool send_welcome)
        return function (contact, success, error) {
            //api call here.

            $http.post(endpointFragment, {
                apikey: apiKey,
                id: listId,
                email: {
                    email: contact.email
                },
                merge_vars:{
                    fname: contact.firstName,
                    lname: contact.lastName
                },
                double_optin: false,
                send_welcome: true,

            }).
            success(function (data, status, headers, config) {
                success(data);
            }).
            error(function (data, status, headers, config) {
                error(data);
            });

        };
}]);