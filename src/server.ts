import express, { Express, Request, Response } from 'express';
import { Config } from './config';
import { Logger } from './logger';
import { JsonResponse } from './logic/json-response';


export class Server {

    private readonly logger: Logger;
    private readonly config: Config;

  constructor(config: Config) {
    this.config = config;
    this.logger = config.logger;
  }

  run(): void {
    this.logger.log(`Server is starting...`);
    const app: Express = express();
    app.use(express.json());

    const isHttps = this.config.isHttps();
    var server;
    if (isHttps) {
      const fs = require('fs');
      const key = fs.readFileSync('./key.pem');
      const cert = fs.readFileSync('./cert.pem');
      this.logger.log(`Certificates loaded!`);
      const https = require('node:https');
      server = https.createServer({key: key, cert: cert }, app);
    }
    else {
      server = app;
    }

    app.post('/', (req: Request, res: Response) => {
      this.logger.log(`whoami ativado`);
      const body = req.body as JsonRequest.Request;
      res.json(this.extract("eu so legal!"));
      res.status(200);
    });

    app.get('/html', (req: Request, res: Response) => {
      res.setHeader("Content-Type", "text/html");
      res.send("<h1>ME</h1>");
      res.status(200);
    });

    app.post('*', (req: Request, res: Response) => {
      this.logger.log(`Requisição não atendida: ${req.originalUrl}`);
      res.status(404);
    });
    

    const port = this.config.getPort();
    server.listen(port, () => {
      this.logger.log(`Server is running at localhost:${port}`);
    });
  }

  extract(text: string): JsonResponse.Response {
    return {
      fulfillmentText: text,
      fulfillmentMessages: [],
      payload: { google: { expectUserResponse: false, richResponse: { items: [{ simpleResponse: { textToSpeech: text } }] } } },
      source: "glhv-google-agent-server"
    };
  }
}
