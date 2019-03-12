"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var errorHandler = require("errorhandler");
var mongoose = require("mongoose");
var cors = require("cors");
/**
 * The server.
 *
 * @class Server
 */
var Server = /** @class */ (function () {
    /**
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //add api
        this.api();
    }
    /**
     * Bootstrap the application.
     * @static
     */
    Server.bootstrap = function () {
        return new Server();
    };
    /**
     * Create REST API routes
     *
     * @class Server
     */
    Server.prototype.api = function () {
        var router = express.Router();
        // configure CORS
        var corsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: 'http://localhost:4200',
            preflightContinue: false
        };
        router.use(cors(corsOptions));
        // root request
        router.get('/', function (req, res, next) {
            console.log("sono qui");
            res.json({ announcement: 'Welcome to our API.' });
            next();
        });
        // create API routes
        // wire up the REST API
        // enable CORS pre-flight
        router.options('*', cors(corsOptions));
    };
    /**
     * Configure application
     *
     * @class Server
     */
    Server.prototype.config = function () {
        // morgan middleware to log HTTP requests
        this.app.use(morgan('dev'));
        //use json form parser middlware
        this.app.use(bodyParser.json());
        //use query string parser middlware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // connect to mongoose
        mongoose.connect('mongodb://localhost:27017/myDB', { useNewUrlParser: true });
        mongoose.connection.on('error', function (error) {
            console.error(error);
        });
        //catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            console.log("sono qui2");
            err.status = 404;
            next(err);
        });
        //error handling
        this.app.use(errorHandler());
    };
    return Server;
}());
exports.Server = Server;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QWdCO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQWhHQSxBQWdHQyxJQUFBO0FBaEdZLHdCQUFNIiwiZmlsZSI6InNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGJvZHlQYXJzZXIgZnJvbSAnYm9keS1wYXJzZXInO1xyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gJ2V4cHJlc3MnO1xyXG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSAnbW9yZ2FuJztcclxuaW1wb3J0IGVycm9ySGFuZGxlciA9IHJlcXVpcmUoJ2Vycm9yaGFuZGxlcicpO1xyXG5pbXBvcnQgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xyXG5pbXBvcnQgKiBhcyBjb3JzIGZyb20gJ2NvcnMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgc2VydmVyLlxyXG4gKlxyXG4gKiBAY2xhc3MgU2VydmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgU2VydmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBleHByZXNzIGFwcGxpY2F0aW9uLlxyXG4gICAgICogQHR5cGUge0FwcGxpY2F0aW9ufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQm9vdHN0cmFwIHRoZSBhcHBsaWNhdGlvbi5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBib290c3RyYXAoKTogU2VydmVyIHtcclxuICAgICAgICByZXR1cm4gbmV3IFNlcnZlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGV4cHJlc3NqcyBhcHBsaWNhdGlvblxyXG4gICAgICAgIHRoaXMuYXBwID0gZXhwcmVzcygpO1xyXG5cclxuICAgICAgICAvL2NvbmZpZ3VyZSBhcHBsaWNhdGlvblxyXG4gICAgICAgIHRoaXMuY29uZmlnKCk7XHJcblxyXG4gICAgICAgIC8vYWRkIGFwaVxyXG4gICAgICAgIHRoaXMuYXBpKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgUkVTVCBBUEkgcm91dGVzXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIFNlcnZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXBpKCkge1xyXG4gICAgICAgIHZhciByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuICAgICAgICAvLyBjb25maWd1cmUgQ09SU1xyXG4gICAgICAgIGNvbnN0IGNvcnNPcHRpb25zOiBjb3JzLkNvcnNPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBhbGxvd2VkSGVhZGVyczogWydPcmlnaW4nLCAnWC1SZXF1ZXN0ZWQtV2l0aCcsICdDb250ZW50LVR5cGUnLCAnQWNjZXB0JywgJ1gtQWNjZXNzLVRva2VuJ10sXHJcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB0cnVlLFxyXG4gICAgICAgICAgICBtZXRob2RzOiAnR0VULEhFQUQsT1BUSU9OUyxQVVQsUEFUQ0gsUE9TVCxERUxFVEUnLFxyXG4gICAgICAgICAgICBvcmlnaW46ICdodHRwOi8vbG9jYWxob3N0OjQyMDAnLFxyXG4gICAgICAgICAgICBwcmVmbGlnaHRDb250aW51ZTogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJvdXRlci51c2UoY29ycyhjb3JzT3B0aW9ucykpO1xyXG5cclxuICAgICAgICAvLyByb290IHJlcXVlc3RcclxuICAgICAgICByb3V0ZXIuZ2V0KCcvJywgKHJlcTogZXhwcmVzcy5SZXF1ZXN0LCByZXM6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQ6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic29ubyBxdWlcIik7XHJcbiAgICAgICAgICAgIHJlcy5qc29uKHsgYW5ub3VuY2VtZW50OiAnV2VsY29tZSB0byBvdXIgQVBJLicgfSk7XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gY3JlYXRlIEFQSSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8gd2lyZSB1cCB0aGUgUkVTVCBBUElcclxuXHJcbiAgICAgICAgLy8gZW5hYmxlIENPUlMgcHJlLWZsaWdodFxyXG4gICAgICAgIHJvdXRlci5vcHRpb25zKCcqJywgY29ycyhjb3JzT3B0aW9ucykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uZmlndXJlIGFwcGxpY2F0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQGNsYXNzIFNlcnZlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY29uZmlnKCkge1xyXG4gICAgICAgIC8vIG1vcmdhbiBtaWRkbGV3YXJlIHRvIGxvZyBIVFRQIHJlcXVlc3RzXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKG1vcmdhbignZGV2JykpO1xyXG5cclxuICAgICAgICAvL3VzZSBqc29uIGZvcm0gcGFyc2VyIG1pZGRsd2FyZVxyXG4gICAgICAgIHRoaXMuYXBwLnVzZShib2R5UGFyc2VyLmpzb24oKSk7XHJcblxyXG4gICAgICAgIC8vdXNlIHF1ZXJ5IHN0cmluZyBwYXJzZXIgbWlkZGx3YXJlXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7XHJcbiAgICAgICAgICAgIGV4dGVuZGVkOiB0cnVlXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvLyBjb25uZWN0IHRvIG1vbmdvb3NlXHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdCgnbW9uZ29kYjovL2xvY2FsaG9zdDoyNzAxNy9teURCJywgeyB1c2VOZXdVcmxQYXJzZXI6IHRydWUgfSk7XHJcbiAgICAgICAgbW9uZ29vc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL2NhdGNoIDQwNCBhbmQgZm9yd2FyZCB0byBlcnJvciBoYW5kbGVyXHJcbiAgICAgICAgdGhpcy5hcHAudXNlKGZ1bmN0aW9uIChlcnI6IGFueSwgcmVxOiBleHByZXNzLlJlcXVlc3QsIHJlczogZXhwcmVzcy5SZXNwb25zZSwgbmV4dDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb25vIHF1aTJcIik7XHJcbiAgICAgICAgICAgIGVyci5zdGF0dXMgPSA0MDQ7XHJcbiAgICAgICAgICAgIG5leHQoZXJyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9lcnJvciBoYW5kbGluZ1xyXG4gICAgICAgIHRoaXMuYXBwLnVzZShlcnJvckhhbmRsZXIoKSk7XHJcbiAgICB9XHJcbn0iXX0=
