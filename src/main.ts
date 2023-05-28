import * as readline from 'readline';
import { Elevator, Floor, NearestElevatorController } from './elevator';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


//define initial elevators and floors
const elevators: Elevator[] = [
    { currentFloor: 1, direction: 'idle', passengers: 0, weightLimit: 10 },
    { currentFloor: 3, direction: 'idle', passengers: 0, weightLimit: 10 },
];

const floors: Floor[] = [
    { floorNumber: 1, passengersWaiting: 0 },
    { floorNumber: 2, passengersWaiting: 0 },
    { floorNumber: 3, passengersWaiting: 0 },
];

const controller = new NearestElevatorController(elevators, floors);

function prompt() {
    rl.question('Enter command (call [floor], move [elevator] [floor] , status, set [floor] [passengers],enter [elevator] [passengers], leave [elevator] [passengers] , exit): ',
        input => {
            const [command, ...args] = input.split(' ');

            switch (command) {
                case 'call':
                    const floorNumber = parseInt(args[0]);
                    controller.callElevator(floorNumber);
                    console.log(`Called elevator to floor ${floorNumber}`);
                    break;
                case 'status':
                    const status = controller.getElevatorStatus();
                    console.log('Elevator status:');
                    for (const elevator of status.elevators) {
                        console.log(
                            `Current floor: ${elevator.currentFloor}, Direction: ${elevator.direction}, Passengers: ${elevator.passengers}`
                        );
                    }
                    console.log('Floor status:');
                    for (const floor of status.floors) {
                        console.log(`Floor number: ${floor.floorNumber}, Passengers waiting: ${floor.passengersWaiting}`);
                    }
                    break;
                case 'set':
                    const setFloorNumber = parseInt(args[0]);
                    const passengersWaiting = parseInt(args[1]);
                    controller.setPassengersWaiting(setFloorNumber, passengersWaiting);
                    console.log(`Set passengers waiting on floor ${setFloorNumber} to ${passengersWaiting}`);
                    break;
                case 'move':
                    const elevatorIndex = parseInt(args[0]);
                    const targetFloor = parseInt(args[1]);
                    const elevator = elevators[elevatorIndex];
                    elevator.currentFloor = targetFloor;
                    console.log(`Moved elevator ${elevatorIndex} to floor ${targetFloor}`);
                    break;
                case 'enter':
                    const enterElevatorIndex = parseInt(args[0]);
                    const passengersEntering = parseInt(args[1]);
                    controller.setPassengersEntering(enterElevatorIndex, passengersEntering);
                    console.log(`Set ${passengersEntering} passengers entering elevator ${enterElevatorIndex}`);
                    break;
                case 'leave':
                    const leaveElevatorIndex = parseInt(args[0]);
                    const passengersLeaving = parseInt(args[1]);
                    controller.setPassengersLeaving(leaveElevatorIndex, passengersLeaving);
                    console.log(`Set ${passengersLeaving} passengers leaving elevator ${leaveElevatorIndex}`);
                    break;
                case 'exit':
                    rl.close();
                    return;
                default:
                    console.log('Invalid command');
            }

            prompt();
        });
}

prompt();