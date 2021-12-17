import express from 'express';
import cors from 'cors';
import dotEnv from './config';

dotEnv()
const port = process.env.PORT || 9000
const app = express()

// allowing CORS
app.use(cors());
//get request parameter from url
app.use(express.urlencoded({ extended: true }));
//get request parameter from body post
app.use(express.json());

console.log(`server run on ${process.env.NODE_ENV} mode on port ${port}`);
