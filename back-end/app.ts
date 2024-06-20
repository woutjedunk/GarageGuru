import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import userRouter from './controller/user.routes';
// import { expressjwt } from 'express-jwt';
import { Request, Response, NextFunction } from 'express';
// import helmet from 'helmet';

import carRouter from './controller/car.routes';
import { Tspec, TspecDocsMiddleware } from 'tspec';






const initServer = async () => {
    const app = express();
    dotenv.config();
    // if (!process.env.JWT_SECRET) {
    //     throw new Error('JWT_SECRET must be defined')
    // }
    const port = process.env.APP_PORT || 3000;
    app.use(cors());
    app.use(bodyParser.json());

    // app.use(
    //     expressjwt({
    //         secret: process.env.JWT_SECRET!,
    //         algorithms: ['HS256'],
    //     }).unless({
    //         path: [
    //             '/api-docs',
    //             /^\/api-docs\/.*/,
    //             '/users/signup',
    //             '/users/login',
    //             /^\/users\/email\/*/,
    //             '/status',
    //         ],
    //     })
    // );



    // app.use('/users', userRouter);
    app.use("/car", carRouter)



    app.use('/docs', await TspecDocsMiddleware());

    app.get('/status', (req, res) => {
        res.json({ message: 'Back-end is running...' });
    });

    // const swaggerOpts = {
    //     definition: {
    //         openapi: '3.0.0',
    //         info: {
    //             title: 'MyVehicleVault API',
    //             version: '1.0.0',
    //         },
    //     },
    //     apis: ['./controller/*.routes.ts'],
    // };
    // const swaggerSpec = swaggerJsdoc(swaggerOpts);

    // app.use(helmet())

    // app.use(
    //     helmet.contentSecurityPolicy({
    //         directives: {
    //             connectSrc: ["'self'"],
    //         },
    //     })
    // )

    // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


    // error hanling
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        switch (err.name) {
            case 'UnauthorizedError':
                res.status(401).json({
                    status: 'application error',
                    message: err.message,
                });
                break;

            case 'ResourceNotFoundError':
                res.status(404).json({
                    status: 'application error',
                    message: err.message,
                })

            default:
                res.status(400).json({
                    status: 'application error',
                    message: err.message,
                });
                break;
        }
    });

    app.listen(port, () => {
        console.log(`Back-end is running on port ${port}.`);
    });
}

initServer();