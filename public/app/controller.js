angular.module('app.controller',[])
.controller('myController',function($scope,$state){
    $scope.play=function(){
        $state.go('video');
    }
})
.controller('indexController',function($scope,$http,$rootScope,$state){
	$rootScope.user={};
	$rootScope.user.name='游客';
	$scope.welcome='欢迎你,';
	$scope.hasReg=true;
	$scope.haslogout=false;
	$scope.$on('$stateChangeStart',function(event,data){
	var url='http://119.29.223.196:5000/api/loginData';
	var checkUrl='http://119.29.223.196:5000/api/checkLogin';
	$http.get(url)
		.success(function(res){
			 if(res){
				 $rootScope.user.name=res.user.name;
				 $scope.hasReg=false;
				 $scope.haslogout=true;
			 }
			 else{
				 $rootScope.user.name='游客';
				 $scope.hasReg=true;
				 $scope.haslogout=false;
			 }
		})
		.error(function(err){
			console.log(err);
		});
	})
	$scope.logout=function(){
		var logoutUrl='http://119.29.223.196:5000/api/logout';
		$http.get(logoutUrl)
			.success(function(res){
				$state.go('signIn');
			})
	}
})
.controller('regController',function($scope,$http,$interval,$state){
    $scope.user={};
    $scope.user.tel='';
    $scope.user.username='';
    $scope.user.password='';
    $scope.user.repassword='';
    $scope.user.code='';
    $scope.user.send="发送验证码";
    $scope.user.sec='';
    $scope.user.go=false;
    $scope.sendCode=function(){
        if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.user.tel))){
            alert('请输入正确的手机号码!');
        }
        else{
            $scope.user.go=true;
            $scope.user.send='重新发送';
            $scope.user.sec=60;
            var time=$interval(function(){
                if($scope.user.sec==0){
                    $interval.cancel(time);
                    $scope.user.sec='';
                    $scope.user.go=false;
                }
                else{
                    $scope.user.sec--;
                }
            },1000);
            var transform = function(data){
                if(!angular.isObject(data)){
                    return ((data == null) ? "" : data.toString());
                }
                var buffer = [];
                for(var p in data){
                    if(!data.hasOwnProperty(p))
                        continue;
                    buffer.push(encodeURIComponent(p) + "=" +
                        encodeURIComponent((data[p] == null)?"":data[p]));
                }
                return buffer.join("&");
            }
            var config = {
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                transformRequest: transform
            };
            var url="http://119.29.223.196:5000/api/sendCode";
            var data={
                'tel':$scope.user.tel
            };
            $http.post(url,data,config)
                .success(function(res){
                    console.log(res);
                })
                .error(function(error){
                    console.log(error);
                });
        }

    };
    $scope.activate=function(){
        var transform = function(data){
            if(!angular.isObject(data)){
                return ((data == null) ? "" : data.toString());
            }
            var buffer = [];
            for(var p in data){
                if(!data.hasOwnProperty(p))
                    continue;
                buffer.push(encodeURIComponent(p) + "=" +
                    encodeURIComponent((data[p] == null)?"":data[p]));
            }
            return buffer.join("&");
        };
        var config = {
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            transformRequest: transform
        };
        var data={
            'tel':$scope.user.tel,
            'name':$scope.user.username,
            'password':$scope.user.password,
            'code':$scope.user.code
        };
        var url="http://119.29.223.196:5000/api/checkCode";
        $http.post(url,data,config)
            .success(function(res){
				alert('注册成功');
				$state.go('signIn');
                console.log(res);
            })
            .error(function(error){
                console.log(error);
            })
    }
})
.controller('signInController',function($scope,$http,$state){
    $scope.user={};
    $scope.user.tel='';
    $scope.user.password='';
    $scope.signIn=function(){
        var transform = function(data){
			if(!angular.isObject(data)){
				return ((data == null) ? "" : data.toString());
			}
			var buffer = [];
			for(var p in data){
				if(!data.hasOwnProperty(p))
					continue;
				buffer.push(encodeURIComponent(p) + "=" + 
					encodeURIComponent((data[p] == null)?"":data[p]));
			}
			return buffer.join("&");
		}
        var config = {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                        },
                        transformRequest: transform
         };
         var data={
             'tel':$scope.user.tel,
             'password':$scope.user.password
         }   
         var url="http://119.29.223.196:5000/api/login";
         $http.post(url,data,config)
                 .success(function(res){
					 $state.go('home');
                     console.log(res);
                 })
                 .error(function(error){
                     console.log(error);
					 alert('密码输入错误');
                 })
    }
})
.controller('forgetController',function($scope,$http,$interval,$state){
    $scope.user={};
    $scope.user.tel='';
    $scope.user.password='';
    $scope.user.repassword='';
    $scope.user.code='';
    $scope.user.send="发送验证码";
    $scope.user.sec='';
    $scope.user.go=false;
    $scope.sendCode=function(){
        if(!(/^1[3|4|5|7|8]\d{9}$/.test($scope.user.tel))){
            alert('请输入正确的手机号码!');
        }
        else{
            $scope.user.go=true;
            $scope.user.send='重新发送';
            $scope.user.sec=60;
            var time=$interval(function(){
                if($scope.user.sec==0){
                    $interval.cancel(time);
                    $scope.user.sec='';
                    $scope.user.go=false;
                }
                else{
                    $scope.user.sec--;
                }
            },1000);
            var transform = function(data){
                if(!angular.isObject(data)){
                    return ((data == null) ? "" : data.toString());
                }
                var buffer = [];
                for(var p in data){
                    if(!data.hasOwnProperty(p))
                        continue;
                    buffer.push(encodeURIComponent(p) + "=" +
                        encodeURIComponent((data[p] == null)?"":data[p]));
                }
                return buffer.join("&");
            }
            var config = {
                headers: {
                    "content-type": "application/x-www-form-urlencoded;charset=utf-8"
                },
                transformRequest: transform
            };
            var url="http://119.29.223.196:5000/api/sendCode2";
            var data={
                'tel':$scope.user.tel
            };
            $http.post(url,data,config)
                .success(function(res){
                    console.log(res);
                })
                .error(function(error){
                    console.log(error);
                });
        }

    };
    $scope.activate=function(){
        var transform = function(data){
            if(!angular.isObject(data)){
                return ((data == null) ? "" : data.toString());
            }
            var buffer = [];
            for(var p in data){
                if(!data.hasOwnProperty(p))
                    continue;
                buffer.push(encodeURIComponent(p) + "=" +
                    encodeURIComponent((data[p] == null)?"":data[p]));
            }
            return buffer.join("&");
        };
        var config = {
            headers: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
            },
            transformRequest: transform
        };
        var data={
            'tel':$scope.user.tel,
            'newPassword':$scope.user.password,
            'code':$scope.user.code
        };
        var url="http://119.29.223.196:5000/api/checkCode2";
        $http.post(url,data,config)
            .success(function(res){
                console.log(res);
				alert('密码重置成功');
				$state.go('signIn');
            })
            .error(function(error){
                console.log(error);
				alert('认证失败');
            });
    };
})
.controller('loginSuccessController',function($scope){
    
})
.controller('bombController',function($scope,$http){
    $scope.user={};
    $scope.user.count=0;
    $scope.user.tel='';
                
					 $scope.bomb=function(){
									 var transform = function(data){
										if(!angular.isObject(data)){
											return ((data == null) ? "" : data.toString());
										}
										var buffer = [];
										for(var p in data){
											if(!data.hasOwnProperty(p))
												continue;
											buffer.push(encodeURIComponent(p) + "=" + 
												encodeURIComponent((data[p] == null)?"":data[p]));
										}
										return buffer.join("&");
									}
									var config = {
													headers: {
														"content-type": "application/x-www-form-urlencoded;charset=utf-8"
													},
													transformRequest: transform
									 };
									 var data={
										 'tel':$scope.user.tel
									 };
									 var url='http://119.29.223.196/dayusdk/sendSms.php';
										for(var i=0;i<10;i++){
											$http.post(url,data,config)
											 .success(function(res){
												 $scope.user.count++;
												 console.log(res);
											 })
											.error(function(err){
												console.log(err);
											})
										}
										
					 }   
})
.controller('fileController',function($scope,$http){
	$scope.user={};
	$http.get('http://119.29.223.196:5000/count')
		.success(function(res){
			console.log(res);
			$scope.obj=res;
		})
		.error(function(err){
			//
		})
	$scope.delPhoto=function(src){
		var data={
			'photoPath':src
		};
		var url='http://119.29.223.196:5000/delPhoto';
		$http.post(url,data)
			.success(function(res){
				console.log(res);
			})
			.error(function(err){
				console.log(err);
			})
	}
})