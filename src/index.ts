import express from 'express';
import { router } from './routes';
import { Connection, createConnection } from 'mysql2/promise';

export class App {
    private express: express.Application;
    connection: Connection;

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
    }

    async database() {
        const mysql = require("mysql2/promise");
        const connection = await createConnection('mysql://root:vipcommerce@mysql-21022-0.cloudclusters.net:21022/vip');
        console.log("Conectou no MySQL!");
        return connection;
    }
}

let app = new App().getApp();
