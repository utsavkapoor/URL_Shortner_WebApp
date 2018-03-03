(() => {
    'use strict';

    const app = angular.module('StartPage');

    app.controller('signupForm', signupForm);

    function signupForm (){
        let signup = this;

        this.submitForm = () => {
            if(this.signup.$valid){
                console.log("Done");
            } else {
                console.log("Invalid");
            }
        }
    }
})();
