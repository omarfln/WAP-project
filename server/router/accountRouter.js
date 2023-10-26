const express = require("express");

const accountController = require ("../controller/accountsController")

const router = express.Router();

router.post("/create-account", accountController.createAccount);
router.get("/get-accounts", accountController.getAccounts);
router.post("/pay-account/:accountId", accountController.payAccount);
router.post("/withdraw-account/:id", accountController.accountWithdrew);
router.put("/edit-account-type/:id",  accountController.editAccount);
router.delete("/delete-account/:id", accountController.deleteAccount);



module.exports = router;