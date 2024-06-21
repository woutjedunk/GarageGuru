import { Car as CarPrisma } from "@prisma/client"
import { CarDTO } from "types";
import { UUID } from "crypto";



export class Car {
    readonly id?: UUID;   
    readonly make: string;
    readonly model: string;
    readonly variant?: string;
    readonly manufactureYear: number;
    readonly licensePlate: string;

    constructor(car: CarDTO & { id?: string }) {
        this.validate(car);

        if (car.id) this.id = car.id
        this.make = car.make;
        this.model = car.model;
        if (car.variant) this.variant = car.variant;
        this.manufactureYear = car.manufactureYear;
        this.licensePlate = car.licensePlate;
    }

    validate(car: CarDTO) {
        if (!car.make || typeof (car.make) != 'string')
            throw new Error("Car make can't be empty and must be a string");

        if (car.make.length > 32)   
            throw new Error("Car make needs to be 32 or less characters");

        if (!car.model || typeof (car.model) != 'string')
            throw new Error("Car model can't be empty and must be a string");

        if (car.model.length > 32)
            throw new Error("Car model needs to be 32 or less characters");

        if (car.variant && car.variant.length > 32)
            throw new Error("Car variant needs to be 32 or less characters");

        if (!car.manufactureYear || typeof(car.manufactureYear) != 'number')
            throw new Error("Car manufacture year can't be empty and must be a number");

        if (car.manufactureYear > new Date().getFullYear())
            throw new Error("Car manufacture year can't be in the future");

        if (!car.licensePlate || typeof(car.licensePlate) != "string")
            throw new Error("Car license plate can't be empty and must be a string");

        if (car.licensePlate && car.licensePlate.length > 32)
            throw new Error("Car license plate needs to be 32 or less characters");
    }

    static from(carPrisma: CarPrisma) {
        return new Car({
            id: carPrisma.id as UUID,
            make: carPrisma.make,
            model: carPrisma.model,
            variant: carPrisma.variant ?? undefined,
            manufactureYear: carPrisma.manufactureYear,
            licensePlate: carPrisma.licensePlate
        })
    }

    equals(car: Car) {
        return( this.make == car.make && 
                this.model == car.model &&
                this.variant == car.variant &&
                this.manufactureYear == car.manufactureYear &&
                this.licensePlate == car.licensePlate
        )
    }
}

