import jwt from 'jsonwebtoken';
require('dotenv').config();

export async function authentication(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.sign(token, process.env.TOKEN_KEY)
    console.log(decoded)
    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401).send("Invalid Token");
  }

  return next();

};


// export async function requestTime(req, res, next) {
//   req.requestTime = Date.now()
//   return next();
// }
