const fetch = require('node-fetch');

class Accounts {


    constructor(ACCESS_TOKEN) {
        this.token = ACCESS_TOKEN;

    }

    async getAccounts(){

        try {
            console.log(this.token);
            let x = await fetch('https://<INSTRUCTURE CANVAS URL>/api/v1/accounts?access_token='+this.token);
            return x.json();
        } catch (error) {
            console.log(error);
            return null;
        }


        return null;

    }
}

module.exports = Accounts;
