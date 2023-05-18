import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import WebRoute from "./routes/web";
import ApiRoute from "./routes/api";


const app =  express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use(express.static(__dirname));
app.use(cookieParser());

app.use('/api', ApiRoute);


export default  app;
