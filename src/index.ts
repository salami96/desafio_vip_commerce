import express from 'express';
import { router } from './routes';
import { Connection, createConnection } from 'mysql2/promise';

let connection: Connection;
export class App {
    private express: express.Application;

    constructor() {
        this.express = express();
        this.express.use(express.json());
        this.listen();
        this.database();
    }

    public getApp(): express.Application {
        return this.express;
    }

    private listen(): void {
        this.express.use('/', router);
        this.express.listen(8000, () => {
            console.log('Server running in port: 8000');
        })
    }

    async database() {
        const newConnection = await createConnection('mysql://root:vipcommerce@mysql-21022-0.cloudclusters.net:21022/vip');
        console.log("Conectou no MySQL!");
        connection = newConnection;
    }
}

export { connection };

new App().getApp();
