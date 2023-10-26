const { updateAccount } = require("../controller/accountsController");

const accounts = [
    { id:1 , accountType: 'savings', firstName: "Omar", lastName: "Flayan" , ssn: 123456, balance: 250},
    { id:2 , accountType: 'savings', firstName: "Omar", lastName: "Flayan" , ssn: 123456, balance: 380},
    { id:3 , accountType: 'checking', firstName: "Omar", lastName: "Flayan" , ssn: 123456, balance: 2502},
    { id:4 , accountType: 'savings', firstName: "Omar", lastName: "Flayan" , ssn: 123456, balance: 1000},
];



class Account {
    constructor(accountType, firstName, lastName, ssn, balance) {
        this.id = accounts[accounts.length-1].id + 1;
        this.accountType = accountType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.balance = balance;
    }
    create() {
        accounts.push(this);
        //this.saveToLocalStorage();
    }
    static getAll(){
        return accounts;
        // if (localStorage.getItem('accounts')){
        //     const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
        //     return storedAccounts 
        // }
        // else{
        //     return accounts;
        // }
    }

    static removeById(id){
        id = parseInt(id);
        let deletedAccount ;
        let index = accounts.findIndex(a => a.id === id);
        if(index > -1){
            deletedAccount = accounts[index];
            accounts.splice(index, 1);
        }
        return deletedAccount;
    }

    static pay(id, amount){
        id = parseInt(id);
        let index = accounts.findIndex(a => a.id === id);
        let accountPaid;
        if (index > -1){
            accountPaid = accounts[index].balance += amount;
        }
        return accountPaid;
    }

    static withdrow(id, amount){
        id = parseInt(id);
        let index = accounts.findIndex(a => a.id === id);
        let amountWithd;
        if (index > -1){
            if (amount <= accounts[index].balance){
                amountWithd = accounts[index].balance -= amount;
            }
            else{
                amountWithd = -1;
            }
        }
        return amountWithd;
    }

    static editType(id, type){
        id = parseInt(id);
        let index = accounts.findIndex(a=> a.id === id)
        let edit;
        if (index > -1){
            edit = accounts[index].accountType = type;
        }
        return edit;
    }

    // static saveToLocalStorage() {
    //     const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    //     storedAccounts.push(this);
    //     localStorage.setItem('accounts', JSON.stringify(storedAccounts));
    // }

    // static saveAccountsToLocalStorage() {
    //     localStorage.setItem('accounts', JSON.stringify(accounts));
    // }
}
module.exports = Account;