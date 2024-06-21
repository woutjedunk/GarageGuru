import express, { NextFunction, Request, Response } from 'express'

import carService from "#service/car.service"
import { Tspec } from 'tspec';
import { CarDTO } from '../types';
import { UUID } from 'crypto';






const carRouter = express.Router();


const addCar = async (req: Request<CarDTO>, res: Response<CarDTO>, next: NextFunction) => {
    try {
        const car = await req.body
        res.status(201)
            .json(await carService.createCar(car))
    } catch (error) {
        next(error)
    }
}
carRouter.post('/', addCar)



const getCars = async (req: Request, res: Response<Array<CarDTO>>, next: NextFunction) => {
    try {
        res.status(200)
            .json(await carService.getCars())
    } catch (error) {
        next(error)
    }
}
carRouter.get('/', getCars)




const getCar = async (req: Request, res: Response<CarDTO>, next: NextFunction) => {
    try {
        const id = <UUID>req.params.id
        res.status(200)
            .json(await carService.getCar(id))
    } catch (error) {
        next(error)
    }
}
carRouter.get('/:id', getCar)




const deleteCar = async (req: Request, res: Response<CarDTO>, next: NextFunction) => {
    try {
        const id = <UUID>req.params.id
        res.status(200)
            .json(await carService.deleteCar(id))
    } catch (error) {
        next(error)
    }
}
carRouter.delete('/:id', deleteCar)




export type ApiSpec = Tspec.DefineApiSpec<{
    basePath: "/car"
    tags: ['Car']
    paths: {
        '/': {
            get: {
                summary: 'Get all cars',
                responses: {
                    200: CarDTO[],
                }
            },
            post: {
                summary: 'Post a new car',
                body: CarDTO,
                responses: {
                    201: CarDTO,
                    400: {
                        "status": "application error",
                        "message": "License plate is already in use"
                    }
                }
            },
        },
        '/{id}': {
            get: {
                summary: "Get car with id",
                path: { id: UUID },
                responses: {
                    200: CarDTO,
                    404: {
                        "status": "application error",
                        "message": "Car not found"
                      }
                }
            }
            delete: {
                summary: "Delete car with id",
                path: { id: UUID },
                responses: {
                    200: CarDTO,
                    404: {
                        "status": "application error",
                        "message": "Car not found"
                      }
                }
            }
        }
    },
}>;


export default carRouter