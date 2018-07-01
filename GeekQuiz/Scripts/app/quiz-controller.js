angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http) {
        $scope.answered = false;
        $scope.title = "loading questions...";
        $scope.options = [];
        $scope.correctAnswer = false;
        $scope.working = false;

        $scope.answer = function () {
            return $scope.correctAnswer ? 'correct' : 'incorrect';
        };

        $scope.nextQuestion = function () {
            $scope.working = false;
            $scope.answered = false;
            $scope.title = 'loading question...';
            $scope.options = [];

            $http.get("/api/trivia").then(function (data) {
                data = data.data;
                $scope.options = data.options;
                $scope.title = data.title;
                $scope.answered = false;
                $scope.working = false;
            }, function (error) {
                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });
        };

        $scope.sendAnswer = function (option) {
            $scope.working = true;
            $scope.answered = true;

            $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id })
                .then(function (data) {
                    data = data.data
                    $scope.correctAnswer = (data === true);
                    $scope.working = false;
                }, function (error) {
                    $scope.title = "Oops... something went wrong";
                    $scope.working = false;
                });
        };
    });