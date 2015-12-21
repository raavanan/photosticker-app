angular.module('origami', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('editor', {
      url: "/editor",
      templateUrl: "partials/editor.html",
      controller: "editorCtrl"
    })

    $urlRouterProvider.otherwise("/editor");
})
.controller('appCtrl', ["$scope", appCtrl])
.controller('editorCtrl',["$scope", editorCtrl])
