const express = require('express');
const keys = require('./config/keys.js');

const app  = express();

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
require('./model/Account');
const Account = mongoose.model('accounts');

//Routes
app.get("/account", async (req, res) => {
    const{rUsername, rPassword} = req.query;

    if (rUsername == null || rPassword == null) {
        res.send('Invalid credentials');
        return;
    }

    var userAccount = await Account.findOne({username: rUsername});
    if(userAccount == null) {
        console.log('Create new account...');
        
        var newAccount = new Account({
            username: rUsername,
            password: rPassword,
            lastAuthentication: Date.now()
        });
        await newAccount.save();

        res.send(newAccount);
        return;
    } else {
        if(rPassword == userAccount.password) {
            userAccount.lastAuthentication = Date.now();
            await userAccount.save();

            res.send(userAccount);
        }
    }

    res.send('hello');
});

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port.toString());
})