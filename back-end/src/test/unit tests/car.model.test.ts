import { Car } from 'domain/model/Car';
import { CarDTO } from "types";

// Mock CarDTO data for testing
const validCarData: CarDTO = {
    make: "Toyota",
    model: "Camry",
    manufactureYear: 2020,
    licensePlate: "ABC-1234"
};

const invalidCarData = {
    make: "",
    model: "Camry",
    manufactureYear: 2020,
    licensePlate: "ABC-1234"
};

describe('Car Model', () => {
    it('should create a car instance with valid data', () => {
        const car = new Car(validCarData);
        expect(car.make).toBe(validCarData.make);
        expect(car.model).toBe(validCarData.model);
        expect(car.manufactureYear).toBe(validCarData.manufactureYear);
        expect(car.licensePlate).toBe(validCarData.licensePlate);
    });

    it('should throw an error if make is empty', () => {
        expect(() => {
            new Car(invalidCarData as CarDTO);
        }).toThrow("Car make can't be empty and must be a string");
    });

    it('should throw an error if model is empty', () => {
        const data = { ...validCarData, model: "" };
        expect(() => {
            new Car(data as CarDTO);
        }).toThrow("Car model can't be empty and must be a string");
    });

    it('should throw an error if manufactureYear is in the future', () => {
        const data = { ...validCarData, manufactureYear: new Date().getFullYear() + 1 };
        expect(() => {
            new Car(data as CarDTO);
        }).toThrow("Car manufacture year can't be in the future");
    });

    it('should throw an error if licensePlate is empty', () => {
        const data = { ...validCarData, licensePlate: "" };
        expect(() => {
            new Car(data as CarDTO);
        }).toThrow("Car license plate can't be empty and must be a string");
    });

    it('should return true for equals method when cars are equal', () => {
        const car1 = new Car(validCarData);
        const car2 = new Car(validCarData);
        expect(car1.equals(car2)).toBe(true);
    });

    it('should return false for equals method when cars are not equal', () => {
        const car1 = new Car(validCarData);
        const car2 = new Car({ ...validCarData, model: "Corolla" });
        expect(car1.equals(car2)).toBe(false);
    });
});