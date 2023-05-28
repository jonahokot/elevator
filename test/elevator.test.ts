import { expect } from 'chai';
import { NearestElevatorController, Elevator, Floor } from '../src/elevator';

describe('NearestElevatorController', () => {
    let controller: NearestElevatorController;
    let elevators: Elevator[];
    let floors: Floor[];

    beforeEach(() => {
        //initial state before each test   
        elevators = [
            { currentFloor: 0, direction: 'idle', passengers: 0, weightLimit: 10 },
            { currentFloor: 3, direction: 'idle', passengers: 0, weightLimit: 10 },
        ];
        floors = [
            { floorNumber: 0, passengersWaiting: 0 },
            { floorNumber: 1, passengersWaiting: 0 },
            { floorNumber: 2, passengersWaiting: 0 },
            { floorNumber: 3, passengersWaiting: 0 },
        ];
        controller = new NearestElevatorController(elevators, floors);
    });

    it('should show the status of all elevators', () => {
        // check that the initial elevator status is correct
        const status = controller.getElevatorStatus();
        expect(status.elevators).to.deep.equal([
            { currentFloor: 0, direction: 'idle', passengers: 0 },
            { currentFloor: 3, direction: 'idle', passengers: 0 },
        ]);
    });

    
    it('should call the nearest elevator to the specified floor', () => {
        controller.callElevator(2);
        expect(elevators[1].currentFloor).to.equal(2);
    });


    it('should update the number of passengers waiting on the specified floor', () => {
        floors[2].passengersWaiting = 5;
        controller.callElevator(2);
        expect(floors[2].passengersWaiting).to.equal(0);
    });

    it('should set the number of passengers entering an elevator', () => {
        controller.setPassengersEntering(0, 5);
        expect(elevators[0].passengers).to.equal(5);
    });

    it('should not exceed the weight limit of an elevator', () => {
        controller.setPassengersEntering(0, 15);
        expect(elevators[0].passengers).to.equal(10);
    });

});
