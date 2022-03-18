
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
	  //récupère le token dans headers
    const token = req.headers.authorization.split(' ')[1];  
    req.token = jwt.verify(token,process.env.TOKEN_SECRET); // Verif token 
    console.log(req.token)

 
    next();
  } catch(error) {
    res.status(401).json({
	  	message : "requête non authentifiée"
    });

  }
};