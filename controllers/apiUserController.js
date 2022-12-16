const User = require('../models/APIUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerAPIUser = async (req, res) => {
    
    try {
         console.log(req.body);   
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        console.log(hashedPassword); 
        const user = new User({
             username: req.body.username,
             password: hashedPassword
         })
         console.log(user);
         await user.save();
         res.json({message: "You just got registered "}); 
    } 
    catch(error) {
          res.json({message: error});
    }
}

exports.generateAccessToken = async (req, res) => {      
    
     try {
        const user = await User.findOne({username: req.body.username});
        console.log(req.body.username);
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        
        if (user && isPasswordCorrect) {
            const payLoad = {
                username: user.username,
                date: user.date
            }
            
            const accessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET)
            res.json({accessToken: accessToken});
        } else {
            res.json({message: "Incorrect user information"});
        }
    } catch(error) {
        res.json({message: error});
    } 
}