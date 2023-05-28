export type Direction = 'up' | 'down' | 'idle';

export interface Elevator {
    currentFloor: number;
    direction: Direction;
    passengers: number;
    weightLimit: number;
}

export interface Floor {
    floorNumber: number;
    passengersWaiting: number;
}

export interface ElevatorController {
    callElevator(floorNumber: number): void;
    setPassengersWaiting(floorNumber: number, passengersWaiting: number): void;
    getElevatorStatus(): {
        elevators: { currentFloor: number; direction: Direction; passengers: number }[];
        floors: { floorNumber: number; passengersWaiting: number }[];
    };
    setPassengersEntering(elevatorIndex: number, passengersEntering: number): void;

}

export class NearestElevatorController implements ElevatorController {
    elevators: Elevator[];
    floors: Floor[];

    constructor(elevators: Elevator[], floors: Floor[]) {
        this.elevators = elevators;
        this.floors = floors;
    }

    //call the nearest elevator to the specified floor
    public callElevator(floorNumber: number) {
        const nearestElevator = this.findNearestElevator(floorNumber);

        if (nearestElevator) {
            this.moveElevator(nearestElevator, floorNumber);
            this.updateFloorPassengers(floorNumber, nearestElevator);
        }
    }

    //set the number of passengers entering an elevator
    public setPassengersEntering(elevatorIndex: number, passengersEntering: number) {
        const elevator = this.elevators[elevatorIndex];
        if (elevator) {
            const availableSpace = elevator.weightLimit - elevator.passengers;
            const passengersToAdd = Math.min(availableSpace, passengersEntering);
            elevator.passengers += passengersToAdd;
        }
    }

    //set the number of passengers waiting on a specific floor
    public setPassengersWaiting(floorNumber: number, passengersWaiting: number) {
        const floor = this.floors.find(f => f.floorNumber === floorNumber);
        if (floor) {
            floor.passengersWaiting = passengersWaiting;
        }
    }
    //set the number of passengers leaving an elevator
    public setPassengersLeaving(elevatorIndex: number, passengersLeaving: number) {
        const elevator = this.elevators[elevatorIndex];
        if (elevator) {
            elevator.passengers -= passengersLeaving;
            if (elevator.passengers < 0) {
                elevator.passengers = 0;
            }
        }
    }


    // get the status of elevators and floors
    public getElevatorStatus() {
        return {
            elevators: this.elevators.map(elevator => ({
                currentFloor: elevator.currentFloor,
                direction: elevator.direction,
                passengers: elevator.passengers,
            })),
            floors: this.floors.map(floor => ({
                floorNumber: floor.floorNumber,
                passengersWaiting: floor.passengersWaiting,
            })),
        };
    }

    //find the nearest available elevator to a specific floor
    private findNearestElevator(floorNumber: number) {
        let nearestElevator: Elevator | null = null;
        let minDistance = Infinity;

        for (const elevator of this.elevators) {
            if (elevator.passengers < elevator.weightLimit) {
                const distance = Math.abs(elevator.currentFloor - floorNumber);
                if (distance < minDistance) {
                    nearestElevator = elevator;
                    minDistance = distance;
                }
            }
        }

        return nearestElevator;
    }

    //move the elevator to a specific floor and update its direction

    private moveElevator(elevator: Elevator, floorNumber: number) {
        elevator.currentFloor = floorNumber;

        if (elevator.currentFloor < floorNumber) {
            elevator.direction = 'up';
        } else if (elevator.currentFloor > floorNumber) {
            elevator.direction = 'down';
        } else {
            elevator.direction = 'idle';
        }
    }
    //update the number of passengers waiting on a floor after an elevator arrives
    private updateFloorPassengers(floorNumber: number, elevator: Elevator) {
        const floor = this.floors.find(f => f.floorNumber === floorNumber);
        if (floor) {
            floor.passengersWaiting -= elevator.weightLimit - elevator.passengers;
            if (floor.passengersWaiting < 0) {
                floor.passengersWaiting = 0;
            }
        }
    }

}