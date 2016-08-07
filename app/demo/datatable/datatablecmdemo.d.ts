import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { Message } from '../../../components/common';
import { MenuItem } from '../../../components/common';
export declare class DataTableCMDemo implements OnInit {
    private carService;
    msgs: Message[];
    cars: Car[];
    selectedCar: Car;
    items: MenuItem[];
    constructor(carService: CarService);
    ngOnInit(): void;
    viewCar(car: Car): void;
    deleteCar(car: Car): void;
}
