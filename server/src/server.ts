import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import mongoose from 'mongoose';
import cors from 'cors';
import bluebird from 'bluebird';

// Env
import { MONGODB_URI } from './configs/environment';


/**
 * The server.
 *
 * @class Server
 */
export class Server {

    /**
     * The express application.
     * @type {Application}
     */
    public app: express.Application;

    /**
     * Bootstrap the application.
     * @static
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * @constructor
     */
    constructor() {
        // Create expressjs application
        this.app = express();

        // Configure application
        this.config();

        // Add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     */
    public api() {
        // const router = express.Router();

        // Configure CORS
        this.app.use(cors());

        /*
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'http://localhost',
            preflightContinue: false
        };
        router.use(cors(corsOptions));
        */

        // Root request
        this.app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.json({ announcement: 'Welcome to our API.' });
            next();
        });

        // Enable CORS pre-flight
        // router.options('*', cors(corsOptions));
    }

    /**
     * Configure application
     *
     * @class Server
     */
    public config() {
        // Morgan middleware to log HTTP requests
        this.app.use(morgan('dev'));

        // Use json form parser middlware
        this.app.use(bodyParser.json());

        // Use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // Connect to mongoose
        (<any>mongoose).Promise = bluebird;
        const mongoUrl = MONGODB_URI;
        mongoose.connect(mongoUrl, { useNewUrlParser: true });
        mongoose.connection.on('error', error => {
            console.error(error);
        });

        // Catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // Error handling
        this.app.use(errorHandler());
    }
}