import express from 'express';
import cookieParser from 'cookie-parser';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import dotenv from 'dotenv';
import { __dirname } from './utils.js';

// Rutas
import userRouter from './routes/user.routes.js';
import sessionsRouter from './routes/sessions.routers.js'
import viewsRouter from './routes/views.routes.js';

dotenv.config();

const app = express();

// Variables de entorno
const uriMongo = process.env.URI_MONGO;
const PORT = process.env.PORT || 3000;
const firmaCookie = process.env.FIRMA_COOKIE || 'firmaCookie';

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(firmaCookie));
app.use(express.static(__dirname + '/public'));

// Configuración de motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Inicializar Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api', userRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/views', viewsRouter);

// Conexión a MongoDB y levantamiento del servidor
mongoose
  .connect(uriMongo)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Listening on PORT: ' + PORT);
    })
  )
  .catch((error) => console.error('Error en conexión:', error));
