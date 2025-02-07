import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import v1 from './v1';
import { initializeDB } from './db';

import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';

const PORT = +process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  credentials: true
}));
app.use('/api', v1);

let server;
if (process.env.PROTOCOL === 'https') {
  console.log('starting app over https');
  const serverOptions = {
    key: fs.readFileSync(path.join(__dirname, '../heleo.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ffad2677a2e232ba.pem')),
    ca: fs.readFileSync(path.join(__dirname, '../heleo.csr'))
  };
  server = https.createServer(serverOptions, app);
} else {
  console.log('starting app over http');
  server = http.createServer(app);
}

// Initialize socket.io server

server.listen(PORT, () => {
  initializeDB().then(
    async () => {
      try {
        console.log('database successfully initialized');
      } catch (error) {
        console.error(error.message || error);
      }
    },
    (error) => {
      setTimeout(() => {
        console.log(error);
      }, 5000);
    }
  );

  console.log(`Server listening on port ${PORT}`);
});
