//homeController.js
(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);
    HomeController.$inject = ['UserService', '$rootScope', '$scope'];
    function HomeController(UserService, $rootScope, $scope) {
        var vm = this;
        vm.showUsers = false;
        vm.currentUser = null;
        vm.allUsers = [];
        initController();
        function initController() {
            //loadCurrentUser();
            loadAllIssues();
            //deleteCurrentIssue();
        }
        // function loadCurrentUser() {
        //     UserService.getByUsername($rootScope.globals.currentUser.username)
        //         .then(function (user) {
        //             vm.currentUser = user;
        //         });
        // }
        function loadAllIssues() {
            UserService.get()
                .then(function (users) {
                    vm.allUsers = users;
                    console.log(vm.allUsers);
                });
        }
        $scope.deleteCurrentIssue  = function(id) {
            UserService.deleteIssue(id);
            loadAllIssues();
            alert('Issue Deleted Successfully!!');
            
        }
        $scope.edit = function(users) {
            var allUsers = JSON.parse(localStorage.users);
            for (var i = 0; i < allUsers.length; i++) {
               if(users.id === allUsers[i].id){  //look for match with name
                allUsers[i].title = users.title;
                allUsers[i].description = users.description;
                break;  //exit loop since you found the person
               }
            }
            localStorage.setItem("users", JSON.stringify(allUsers));
            alert('Issue Updated Successfully');
       }

    }
})();