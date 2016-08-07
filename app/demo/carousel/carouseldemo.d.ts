import { Message } from '../../../components/common';
import { Car } from '../domain/car';
export declare class CarouselDemo {
    cars: Car[];
    msgs: Message[];
    constructor();
    selectCar(car: Car): void;
}
