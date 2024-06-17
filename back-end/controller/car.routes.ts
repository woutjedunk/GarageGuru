import express, { NextFunction, Request, Response } from 'express'
import { CarDTO } from '../types';
import carService from "../services/car.service"
import { Car } from '../domain/model/Car';


const carRouter = express.Router();

carRouter.post('/', async (req: Request<CarDTO>, res: Response<Car>, next: NextFunction) => {
    try {
        const car = await <CarDTO>req.body
        res.status(201)
            .json(await carService.createCar(car))
    } catch (error) {
        console.log("hier wel")
        next(error)
    }
})

carRouter.get('/all', async (req: Request, res: Response<Array<Car>>, next: NextFunction) => {
    try {
        res.status(200)
            .json(await carService.getCars())
    } catch (error) {
        console.log('hallow')
        next(error)
    }
})

export default carRouter