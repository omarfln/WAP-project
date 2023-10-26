const Account = require("../model/accounts");
let controller  = {
    createAccount: function(req, res, next){
        let {accountType, firstName, lastName, ssn, balance} = req.body;
        if (accountType && firstName && lastName && ssn && balance){
            let account = new Account (accountType, firstName, lastName, ssn, balance);
            account.create();
            res.status(201).json({message: "successfully added!"});
        }
        else{
            res.status(404).json({message: "Please provide full data"});
        }
    },

    getAccounts: function (req, res, next) {
        res.status(200).json(Account.getAll());
    },

    payAccount: function (req, res, next){
        const accountId = req.params.accountId;
        const { amount } = req.body;
        console.log(amount);
        console.log(accountId);
        if (amount <=0){
            res.status(404).json({ message: "Payment failed, amount should be > 0"  });
        }
        else{
            const result = Account.pay(accountId, amount);
            if (result) {
                res.status(200).json({ message: "Payment successful" });
            } else {
                res.status(400).json({ message: "Payment failed" });
            }
        }
    }, 


    accountWithdrew: function(req, res, next) {
        const accountId = req.params.id;
        const { amount } = req.body;

        const result = Account.withdrow(accountId, amount);
        if (amount <=0){
            res.status(404).json({ message: "Withdrawal failed, amount should be > 0"  });
        }
        else{
            if (result ) {
                if (result === -1){
                    res.status(404).json({ message: amount + "$ exceeds account balance!" });
                }
                else{
                    res.status(200).json({ message: "Withdrawal successful" });
                }
            }
            else {
                res.status(404).json({ message: "Withdrawal failed" });
            }
        }
    }, 
    editAccount: function(req, res, next){
        const accountId = req.params.id;
        const { newAccountType } = req.body;

        const result = Account.editType(accountId, newAccountType);
        if (result) {
            res.status(200).json({ message: "Account type changed successfully" });
        } else {
            res.status(404).json({ message: "Failed to change account type" });
        }
    }, 

    deleteAccount (req, res, next) {
    const accountId = req.params.id;

    const result = Account.removeById(accountId);
    if (result) {
        res.status(200).json({ message: "Account deleted successfully" });
    } else {
        res.status(404).json({ message: "Failed to delete account" });
    }
    }
    
};

module.exports = controller;