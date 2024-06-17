import { Car } from "../domain/model/Car";
import { CarDTO } from "../types";
import CarDb from "../domain/data-acces/car.db"

const createCar = async (carInput: CarDTO): Promise<Car> => {
    try {
        const newCar = new Car(carInput)
        if(await CarDb.findCarWithLicensePlate(carInput.licensePlate)) throw Error("License plate is already in use")
 
        return await CarDb.createCar(newCar)
    } catch(error) {
        throw error;
    }
}

export default {
    createCar,
}