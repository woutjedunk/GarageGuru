import { UUID } from "crypto";

export interface CarDTO {
    /**
     * Car id
     * @example 123e4567-e89b-12d3-a456-426614174000
     */
    id?: UUID ;
    /**
     * Car make
     * @example Mercedes-Benz
     */
    make?: string;
    /**
     * Car model
     * @example W124
     */
    model?: string;
    /**
     * Car variant
     * @example 250D
     */
    variant?: string;
    /**
     * Car manufacture year
     * @example 1991
     */
    manufactureYear?: number;
    /**
     * Car license plate
     * @example 1-ABC-123
     */
    licensePlate?: string;
}


