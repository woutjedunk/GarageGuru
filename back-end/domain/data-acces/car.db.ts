import database from "../../util/database";
import { Car } from "../model/Car"
import DatabaseError from "../../util/error/DatabaseError";

const createCar = async (car: Car): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                make: car.make,
                model: car.model,
                variant: car.variant,
                manufactureYear: car.manufactureYear,
                licensePlate: car.licensePlate
            }
        })
        if (carPrisma) return Car.from(carPrisma)
    } catch (error) {
        console.error(error);
        throw new DatabaseError();
    }
}

const findCarWithLicensePlate = async (licensePlate: string): Promise<Car> => {
    try {
        const carPrisma = await database.car.findUnique({
            where: {
                licensePlate: licensePlate
            }
        })
        if (carPrisma) return Car.from(carPrisma)
    } catch (error) {
        console.error(error);
        throw new DatabaseError()
    }
}

const findAllCars = async(): Promise<Array<Car>> => {
    try {
        const carsPrisma = await database.car.findMany()
        return carsPrisma.map((carPrisma) => Car.from(carPrisma))
    } catch( error ) {
        console.error(error)
        throw new DatabaseError()
    }

}

export default {
    createCar,
    findCarWithLicensePlate,
    findAllCars,
}