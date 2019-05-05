//userService.svc.js
(function () {
    'use strict';
    angular.module("app")
        .service("UserService", UserService);
    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {
        var service = {};
        service.get = get;
        service.getByUsername = getByUsername;
        service.create = create;
        service.deleteIssue = deleteIssue;
        return service;
        function get() {
            var deferred = $q.defer();
            deferred.resolve(getUsers());
            return deferred.promise;
        }
        function getByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), { username: title });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }
        function create(user) {
            var deferred = $q.defer();
            // simulate api call with $timeout
            $timeout(function () {
                getByUsername(user.title)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.title + '" is already exists' });
                        } else {
                            var users = getUsers();
                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;
                            // save to local storage
                            users.push(user);
                            createUser(users);
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);
            return deferred.promise;
        }
        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }
            return JSON.parse(localStorage.users);
        }
        function createUser(users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
        //Delete a contact
        function deleteIssue(id) {
            var users = getUsers();
            for (var i in users) {
                if (users[i].id == id) {
                    users.splice(i, 1);
                }
            }
            localStorage.setItem('users', JSON.stringify(users));
            return JSON.parse(localStorage.users);

        }
    }
})();