import jwt from 'jsonwebtoken';
require('dotenv').config();

export async function authentication(req, res) {
  let jwtSecretKey = process.env.TOKEN_KEY;
  let data = {
    time: Date(),
  };
  const token = jwt.sign(data, jwtSecretKey);
  console.log(token)
  res.send(token);
};


export async function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
};

