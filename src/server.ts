import express, {Request, Response} from "express";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || "";
const validUserData : {email: string, password: string} = {
  email: process.env.EMAIL || "",
  password: process.env.PASSWORD || "",
};

interface User {
  email: string;
  password: string;
}

const verifyToken = (req: Request, res: Response, next: Function) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, secretKey, (err: any, data: any) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.body.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
  if (typeof req.body !== 'object') {
    res.status(400).send({ error: 'Invalid body' });
    return;
  }

  try {
    const user : User = req.body;
  
    // This emulates a collection on some sort of database
    const userData = [{
      id: 1,
      email: validUserData.email,
      password: validUserData.password,
    }];
  
    if (user.email.length === 0 || user.password.length === 0) {
      res.status(400).send({ error: 'Email or password is empty' });
      return;
    }
  
    const foundUser = userData.find((target) => target.email === user.email && target.password === user.password);
  
    if (!foundUser) {
      res.status(400).send({ error: 'Email or password is incorrect' });
      return;
    }
  
    const token = jwt.sign({...foundUser, password: null}, secretKey);
    res.json({
      message: 'Signed in',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

// This is a protected route
app.get("/hello", verifyToken, async (_, res : express.Response) => {
  res.status(200).send({ msg: "Hello world" });
});

app.listen(port, () => console.log(`API listening on port ${port}`));
