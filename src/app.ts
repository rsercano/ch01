import express from 'express';
import * as http from 'http';
import {Bootstrap} from "./bootstrap";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const bootstrap = new Bootstrap(app);

bootstrap.initialize();
bootstrap.configureRoots();

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});