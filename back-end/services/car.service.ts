import { Car } from "../domain/model/Car";
import { CarDTO } from "../types";
import CarDb from "../domain/data-acces/car.db"
import { UUID } from "crypto";
import NotFoundError from "../util/error/NotFoundError";

const createCar = async (carInput: CarDTO): Promise<Car> => {
    try {
        const newCar = new Car(carInput)
        if (await CarDb.findCarWithLicensePlate(carInput.licensePlate)) throw Error("License plate is already in use")

        return await CarDb.createCar(newCar)
    } catch (error) {
        throw error;
    }
}

const getCars = async (): Promise<Array<Car>> => {
    try {
        return await CarDb.findAllCars()
    } catch (error) {
        throw error
    }

}

const getCar = async (id: UUID): Promise<Car> => {
    try {
        const car = await CarDb.findCarWithId(id)
        if (car) return car;
        throw new NotFoundError("Car not found")
    } catch(error) {
        throw error
    }
}

const deleteCar = async (id: UUID): Promise<Car> => {
    try {
        const car = await CarDb.findCarWithId(id)
        if (car) return await CarDb.deleteCar(id)
        throw new NotFoundError("Car not found")
    } catch (error) {
        throw error
    }

}

export default {
    createCar,
    getCars,
    getCar,
    deleteCar,
}