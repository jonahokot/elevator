# Elevator System
The Elevator System is a simple implementation of an elevator control system. It allows you to manage multiple elevators across different floors and provides functionality to call an elevator, set the number of passengers waiting on each floor, set the number of passengers entering and leaving an elevator, and retrieve the status of all elevators and floors.

## Features
The Elevator System includes the following features:

Elevator Status: You can retrieve the status of all elevators, including their current floor, direction of movement, and the number of passengers.

Call Elevator: You can call the nearest available elevator to a specific floor.

Set Passengers Waiting: You can set the number of passengers waiting on a specific floor.

Set Passengers Entering: You can set the number of passengers entering an elevator.

Set Passengers Leaving: You can set the number of passengers leaving an elevator.

## Usage
To use the Elevator System, follow these steps:

 Installation: Start by installing the necessary dependencies. Run ```npm install``` to install the required packages.

 Configuration: Open the index.ts file and configure the initial state of the elevators and floors. You can set the number of elevators, their initial positions, and weight limits. You can also define the number of floors and the initial number of passengers waiting on each floor.

 Running the System: Start the elevator system by running ```npm start``` in the terminal. This will launch the program and display a prompt where you can enter commands.

### Available Commands:
call [floor]: Call the nearest available elevator to the specified floor.
status: Retrieve the status of all elevators and floors.
set [floor] [passengers]: Set the number of passengers waiting on a specific floor.
enter [elevator] [passengers]: Set the number of passengers entering an elevator.
leave [elevator] [passengers]: Set the number of passengers leaving an elevator.
exit: Exit the program.
### Interacting with the System: 
Enter the desired command in the prompt to interact with the elevator system. For example, you can call an elevator by typing call 3, set the number of passengers waiting on floor 2 by typing set 2 5, or retrieve the status of all elevators and floors by typing status.

### Testing
To run the unit tests for the Elevator System, use the following command:

```npm test```

This will execute the test suite and display the test results.