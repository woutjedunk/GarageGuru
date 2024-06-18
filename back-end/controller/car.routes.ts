import express, { NextFunction, Request, Response } from 'express'
import { CarDTO } from '../types';
import carService from "../services/car.service"
import { Car } from '../domain/model/Car';
import { Tspec } from 'tspec';



const carRouter = express.Router();


// for autgenerated swagger documentation

export type ApiSpec = Tspec.DefineApiSpec<{
    basePath: "/car"
    tags: ['Car']
    paths: {
        '/': {
            post: {
                summary: 'Post a new car',
                requestBody: CarDTO,
                responses: {
                    201: Car,
                }
            },
            get: {
                summary: 'Get all cars',
                handler: typeof getCars,
                responses: {
                    200: Car[],
                }
            },
        },
    },
}>;

const addCar = async (req: Request<CarDTO>, res: Response<Car>, next: NextFunction) => {
    try {
        const car = await <CarDTO>req.body
        res.status(201)
            .json(await carService.createCar(car))
    } catch (error) {
        next(error)
    }
}
carRouter.post('/', addCar)



const getCars = async (req: Request, res: Response<Array<Car>>, next: NextFunction) => {
    try {
        res.status(200)
            .json(await carService.getCars())
    } catch (error) {
        next(error)
    }
}
carRouter.get('/', getCars)



export default carRouter