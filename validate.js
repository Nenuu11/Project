var uiController  = (function () {
    var dom = {
        fnameField: '.first-name',
        lnameField: '.last-name',
        ageField: '.age',
        emailField: '.email',
        btnRegister: '.btn-register'
    };

    return{
        getUserData: function () {
            var FMtype;
            var radioList = document.querySelectorAll('.radio__list-item').value;
            if (document.getElementById('f-option').checked) {
                FMtype = document.getElementById('f-option').value;
              }else{
                FMtype = document.getElementById('s-option').value;
              }

            return{
                firstName : document.querySelector(dom.fnameField).value,
                lastName : document.querySelector(dom.lnameField).value,
                age : document.querySelector(dom.ageField).value,
                email : document.querySelector(dom.emailField).value,
                gender : FMtype,
            };
   
        },

        clearFields : function () {
          document.querySelector(dom.fnameField).value = '';
          document.querySelector(dom.lnameField).value = '';
          document.querySelector(dom.ageField).value = '';
          document.querySelector(dom.emailField).value  = ''; 
        },

        DOMstr: dom,
    }
})();

var controller = (function (uiCtrl) {
    var queryString;
    var checkValidation = function () {
        // 1)get user data
        // uiCtrl.getUserData()

        //2)validate data
        var namevalid = true;
        var agevalid = true;
        var mailvalid = true;
        var fname = uiCtrl.getUserData().firstName;
        var lname = uiCtrl.getUserData().lastName;
        var age = uiCtrl.getUserData().age;
        var email = uiCtrl.getUserData().email;
        queryString = "?fname=" + fname + "&lname=" + lname + "&age=" + age + "&email=" + email ;

            //2.1)name
            if(fname.length < 3 || lname.length < 3){
                namevalid = false;
            }else {
                namevalid = true
            }

            //2.2)age
            if(isNaN(age)){
                agevalid = false;
            }else {
                if((age < 16) || (age > 50)){
                    alert('enter age between 16 and 50');
                    agevalid = false;
                }else{
                    agevalid = true;
                }
            }

            //2.3)email
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!re.test(String(email).toLowerCase())){
                mailvalid = false;

            }else{
                mailvalid = true;
            }
        return namevalid && agevalid && mailvalid ;
    };
    
    var register = function () {
        event.preventDefault();
        if(checkValidation()){
           window.location.href = "exam.html"+ queryString;
        }
        uiCtrl.clearFields();
        console.log(queryString);
    };

    document.querySelector(uiCtrl.DOMstr.btnRegister).addEventListener('click',register);

})(uiController);

