const User = require('../models/APIUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();


exports.registerAPIUser = async (req, res) => {
    //res.json({params: req.body})
    try {
        //res.json({params: req.body})
        //console.log("registerAPIUser");
        //let p = req.body.password;
        //console.log(p);
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        
        //console.log(hashedPassword);      
        // Checking out the hashed password
        //res.json({password: req.body.password, hashedPassword: hashedPassword});
        const user = new User({
             username: req.body.username,
             password: hashedPassword
         })

         await user.save();
         res.json({message: "You just got registered"}); 

    } 
    catch(error) {
          res.json({message: error});
    }
}

exports.generateAccessToken = async (req, res) => {
       
    console.log("generateAccessToken");
    let username = req.body.username;
    console.log(username);
    let password = req.body.password;
    console.log(password);
    res.json({params: req.body})
    
/*     try {
        const user = await User.findOne({username: req.body.username});
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (user && isPasswordCorrect) {
            const payLoad = {
                username: user.username,
                date: user.date
            }
            
            const accessToken = jwt.sign(payLoad, 'mysecret')
            res.json({accessToken: accessToken});
        } else {
            res.json({message: "Incorrect user information"});
        }
    } catch(error) {
        res.json({message: error});
    } */
}