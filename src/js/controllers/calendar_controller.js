angular.module("area51Tools.controllers.calendar", ['toastr'])
    .controller('calendarController', ['$scope', 'toastr', function ($scope, toastr) {
        "use strict";
        //16226295143-1tn95lqchvbqh4385bqjq422jthvmm16.apps.googleusercontent.com
        var CLIENT_ID = '16226295143-1tn95lqchvbqh4385bqjq422jthvmm16.apps.googleusercontent.com',
            //'16226295143-1tn95lqchvbqh4385bqjq422jthvmm16.apps.googleusercontent.com', --android
            //'16226295143-ukm3a7qfmota0qqa9qaoa771rdcqi87n.apps.googleusercontent.com', --localhost:8000
            SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'],
            Calendars = [
                {
                    'name': 'Bagpipe',
                    id: 'l5jvg6rn8d1bpcqg76l14hoq7o@group.calendar.google.com'
                    },
                {
                    'name': 'Stonehenge',
                    id: '1gb26eve59nn0ipbpn33ud9tk8@group.calendar.google.com'
                    },
                {
                    'name': 'The Brave',
                    id: 'um2l72805ggd9nqoq411nf6p50@group.calendar.google.com'
                    },
                {
                    'name': 'The Maul',
                    id: 'sn0n3fk13inesa7cju33fpejg4@group.calendar.google.com'
                    }
            ];

        /**
         * Check if current user has authorized this application.
         */

        $scope.items = [];


        angular.element(document).ready(function () {
            logger('begin auth call');
            try {
                gapi.auth.authorize({
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': true
                }, handleAuthResult);
            } catch (e) {
                logger('auth call failed: ' + e.message);
            }
        });

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        function handleAuthResult(authResult) {
            //logger('begin handleAuthResult: ' + authResult);
            var authorizeDiv = document.getElementById('authorize-div');
            if (authResult && !authResult.error) {
                // Hide auth UI, then load Calendar client library.
                authorizeDiv.style.display = 'none';
                loadCalendarApi();
            } else {
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                authorizeDiv.style.display = 'inline';
            }
        }

        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        $scope.handleAuthClick = function () {
            logger('auth click');
            gapi.auth.authorize({
                    client_id: CLIENT_ID,
                    scope: SCOPES,
                    immediate: false
                },
                handleAuthResult);
            return false;
        }

        /**
         * Load Google Calendar client library. List upcoming events
         * once client library is loaded.
         */
        function loadCalendarApi() {
            logger('load calendar');
            gapi.client.load('calendar', 'v3', getAllEvents);
        }

        $scope.allEvents = [];

        function getAllEvents() {
            for (var j = 0; j < Calendars.length; j++) {
                var cal = Calendars[j];
                listUpcomingEvents(cal);
            }
        }

        /**
         * Append a pre element to the body containing the given message
         * as its text node.
         *
         * @param {string} message Text to be placed in pre element.
         */
        function appendPre(message) {
            var pre = document.getElementById('output');
            var textContent = document.createTextNode(message + '\n');
            pre.appendChild(textContent);
        }

        function listUpcomingEvents(calendar) {
            logger('get: ' + calendar.name);
            var request = gapi.client.calendar.events.list({
                'calendarId': calendar.id,
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime'
            });

            request.execute(function (resp) {
                var events = {
                    name: calendar.name,
                    items: resp.items
                }
                if (events.items.length > 0) {
                    $scope.allEvents.push(events);
                    $scope.$digest();
                }

            });
        }

        function logger(message) {
            toastr.info(message);
        }
            }]);