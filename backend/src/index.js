import path from 'path';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

import { fileURLToPath } from 'url';
import { connectDB } from './database/db.js';

const server = express();

const allowedOrigins = [
    //URL de desenvolvimento
    'http://localhost:5173',
    //URL de produção (definida no .env)
    process.env.FRONTEND_URL

].filter(Boolean);

//recria __dirname no ambiente ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors({
    origin: function(origin, callback) {
        //permitir solicitações sem origem (como aplicativos móveis, solicitações curl)
        if (!origin) 
            return callback(null, true)
        ; 
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'A política CORS para este site não permite acesso da Origem especificada.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    //permitir o envio de cookies
    credentials: true 
}));

//responde às requisições OPTIONS
server.options('*', cors()); 

server.use( express.json() );
server.use( express.urlencoded( { extended: true } ) );
server.use( "/", routes );

connectDB();

server.listen(process.env.PORT || 7777 || 80, () => {
    console.log("\n ✔️  servidor rodando ✔️ \n");
});