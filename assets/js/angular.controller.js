app = angular.module('weather',[]);  // weather nav aahe module cha
app.config(['$httpProvider',function($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    }]);
app.controller('currentweather', ['$scope', 'Data', function($scope, Data){  //$scope variable
        //declaring objects
        $scope.weatherforecast = {};
        $scope.sunrise = {};
        $scope.sunset = {};
        $scope.dtRefreshData = {};
        $scope.dtnext = {};
        $scope.dtprevious = {};
        $scope.searchkeyword = "";

        $(window).load(function(){
            $scope.init("toronto,ca");  //function call
        });
        
        //gettting input from user
        $scope.searchData = function(){
            if ($scope.searchkeyword != "") {
                $scope.init($scope.searchkeyword);  //function call
            } else {
                $scope.init("toronto,ca");  //function call
            }
        };
        
        //getting weather forecast data by api
        $scope.init = function(citynm){
            //calling services and fetch weather forecast records
            Data.getapi(citynm).success(function(data) {  //is cursor here then 42 line call
                $scope.weatherforecast = data;   //scope.weather forcasr la aat takla , api run hote tevva data milto to data madhye yeto 
                $scope.sunrise = new Date(1000 * $scope.weatherforecast.sys.sunrise);   //converting unix time into datetime format
                $scope.sunset = new Date(1000 * $scope.weatherforecast.sys.sunset);     //converting unix time into datetime format
                $scope.dtRefreshData = new Date(1000 * $scope.weatherforecast.dt);      //converting unix time into datetime format
                //$scope.dtnext.setDate($scope.dtRefreshData.getDate() + 1);
            });            
        };
    }]);
//cross browser cha error- api use karatana app id ghyava lagto


app.service('Data', function($http){   //upper data call here angular cha services server communication over the browser
    this.getapi = function($citynm){  //when i input mumbai, function call karto check 29 line 
        return $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$citynm+'&APPID=485279415462768402e72ac69c98cafd');
        //return $http.get('weather.json');
         
    };
});
