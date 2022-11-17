(() => {
    let app = angular.module("app",[]);
    
    app.controller("students",function($scope,$http) {
        $scope.header=['idno','lastname','firstname','course','level','action'];
        //Show Students
        $http({
            method:"GET",
            url:"http://localhost:1234/students"
        }).then(response => {
            $scope.students=response.data
        });
        //add new student
        $scope.addStudent = () => {
            $http({
                method:"POST",
                url:"/students",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    idno: $scope.idno,
                    lastname: $scope.lastname,
                    firstname: $scope.firstname,
                    course: $scope.course,
                    level: $scope.level
                }
            }).then(() => location.reload())
        }
        //delete student
        $scope.deleteStudent = (idno) => {
            $scope.idno = idno;
            $http({
                method: "DELETE",
                url:"/students",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    idno: $scope.idno
                }
            }).then(()=>(location.reload()))
        }
        //update button function
        $scope.updateStudent = function() {
            $http({
            method:"GET",
            url:"http://localhost:1234/students"
        }).then(response => {
            $scope.users=response.data
        });
            $http({
                method:"PUT",
                url:"/students",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    idno: $scope.idno,
                    lastname: $scope.lastname,
                    firstname: $scope.firstname,
                    course: $scope.course,
                    level: $scope.level
                }
            }).then(()=>(location.reload()))
        }
        //function to show data to the inputs for update
        $scope.showDataStudent = (idno, lastname, firstname, course, level) => {
            $scope.idno = idno;
            $scope.lastname = lastname;
            $scope.firstname = firstname;
            $scope.course = course;
            $scope.level = level;
        }
        //function to clear the all inputs
        $scope.clearAllStudent = () => {
            $scope.idno = "";
            $scope.lastname = "";
            $scope.firstname = "";
            $scope.course = "";
            $scope.level = "";
        }
        //function to clear the inputs without the ID
        $scope.clearWithoutIdStudent = () => {
            $scope.lastname = "";
            $scope.firstname = "";
            $scope.course = "";
            $scope.level = "";
        }        
    })
    //USERS CONTROLLER
    app.controller("users", function($scope,$http) {
        $scope.header=['id','username','password','action'];
        //Show Students
        $http({
            method:"GET",
            url:"http://localhost:1234/users"
        }).then(response => {
            $scope.users=response.data
        });
        //add new student
        $scope.addUser = () => {
            $http({
                method:"POST",
                url:"/users",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: $scope.id,
                    username: $scope.username,
                    password: $scope.password,
                }
            }).then(() => location.reload())
        }
        //delete student
        $scope.deleteUser = (id) => {
            $scope.id = id;
            $http({
                method: "DELETE",
                url:"/users",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: $scope.id
                }
            }).then(()=>(location.reload()))
        }
        //update button function
        $scope.updateUser = function() {
            $http({
                method:"GET",
                url:"http://localhost:1234/user"
                }).then(response => {
                    $scope.users=response.data
            });
            $http({
                method:"PUT",
                url:"/users",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: $scope.id,
                    username: $scope.username,
                    password: $scope.password,
                }
            }).then(()=>(location.reload()))
        }
        //function to show data to the inputs for update
        $scope.showDataUser = (id, username, password) => {
            $scope.id = id;
            $scope.username = username;
            $scope.password = password;
        }
        //function to clear the all inputs
        $scope.clearAllUser = () => {
            $scope.id = "";
            $scope.username = "";
            $scope.password = "";
        }
        //function to clear the inputs without the ID
        $scope.clearWithoutIdUser = () => {
            $scope.username = "";
            $scope.password = "";
        }
    })
})()

let logout = () => window.location.href = "/"