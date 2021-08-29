import express from 'express';
import { Application } from 'express-serve-static-core';


const app:Application = express();
app.disable('x-powered-by');


export default app;