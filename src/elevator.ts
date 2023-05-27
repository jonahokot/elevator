export class Elevator {
    currentFloor: number;
    direction: 'up' | 'down' | 'stopped';
    peopleCount: number;

    constructor() {
        this.currentFloor = 0;
        this.direction = 'stopped';
        this.peopleCount = 0;
    }

    getStatus(): string {
        return `Current Floor: ${this.currentFloor}\nDirection: ${this.direction}\nPeople Count: ${this.peopleCount}`;
    }
}