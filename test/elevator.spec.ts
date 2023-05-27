import { expect } from "chai";
import "mocha"
import { Elevator } from "../src/elevator";

describe('Elevator', () => {
    it('should display the elevator stsus correctly', () => {
        const elevator = new Elevator();
        elevator.currentFloor = 3;
        elevator.direction = "up";
        elevator.peopleCount = 5

        expect(elevator.getStatus()).to.equal('Current Floor: 3\nDirection: up\nPeople Count: 5')
    })
})