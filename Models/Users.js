const fetch = require('node-fetch');

class Users {


    constructor(ACCESS_TOKEN, ACCOUNT_ID) {
        this.token = ACCESS_TOKEN;
        this.account_id = ACCOUNT_ID;

    }

    async getUsers(){

        try {
            console.log(this.token);
            let x = await fetch('https://<INSTRUCTURE CANVAS URL>/api/v1/accounts/'+this.account_id+'/users?access_token='+this.token);

            return x.json();
        } catch (error) {
            console.log(error);
            this.count = 0;
            return null;
        }


        return null;

    }
}

module.exports = Users;
