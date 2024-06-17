import express, { NextFunction, Request, Response } from 'express'
import { CarDTO } from '../types';
import carService from "../services/car.service"


const carRouter = express.Router();

carRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const car = await <CarDTO>req.body
        return await carService.createCar(car)
    } catch (error) {
        next(error)
    }
})

carRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error)
    }
})

export default carRouter