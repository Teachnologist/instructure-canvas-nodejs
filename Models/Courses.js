const fetch = require('node-fetch');

class Courses {


    constructor(ACCESS_TOKEN, ACCOUNT_ID) {
        this.token = ACCESS_TOKEN;
        this.account_id = ACCOUNT_ID;

    }

    async getCourses(account_id){

        try {
            console.log(this.token);
            let x = await fetch('https://<INSTRUCTURE CANVAS URL>/api/v1/courses?access_token='+this.token);

            return x.json();
        } catch (error) {
            console.log(error);
            this.count = 0;
            return error;
        }


        return null;

    }

    async getCoursesByUser(user_id){

        try {
            console.log(this.token);
            let x = await fetch('https://<INSTRUCTURE CANVAS URL>/api/v1/users/'+user_id+'/courses?access_token='+this.token);

            return x.json();
        } catch (error) {
            console.log(error);
            this.count = 0;
            return error;
        }


        return null;

    }
}

module.exports = Courses;
