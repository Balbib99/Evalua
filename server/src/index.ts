import express, { Application, urlencoded } from 'express';

//nos devuelve por consola las rutas a las que accedemos desde la web
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import alumnosRoutes from './routes/alumnosRoutes';

import cookieParser from 'cookie-parser';

class Server {

    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/alumnos', alumnosRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        })
    }
}

const server = new Server();
server.start();