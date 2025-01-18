/* Task 1: Compile Participant Details with Shorthand Property Names */
// TODO: Construct an object named `participant` with properties for `name`, `age`, and `studyField`. Utilize shorthand property names to simplify your code.

/* Task 2: Implement a Shorthand Function for Participant Info */
// TODO: Copy the `participant` object by adding a shorthand method named `displayInfo` that prints the participant's details using `this` and a template string.

/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
// TODO: Echo the above task with an arrow function. Observe the behavior of `this` and explain your findings.
/*
 * Observations:
 * TODO: Explain here.
 */

/* Task 4: Using Computed Property Names */
// TODO: Implement a function named `updateParticipantInfo` that takes a property name and value as arguments alongside an object and returns a new object with that property dynamically set.

// Task 1: Create a participant object with shorthand property names
const name = 'Abe Sanchez';
const age = 25;
const studyField = 'Computer Science';

// create the participant object using shorthand property names
const participant = {name, age, studyField};

console.log(participant);

// task 2: Add a shorthand method to display participant info
participant.displayInfo = function () {
    return `Name: ${this.name}, Age: ${this.age}, Study Field: ${this.studyField}`;
  };
  
  console.log(participant.displayInfo());

 // task 3: Implement a shorthand arrow function for participant info
 participant.displayInfo = () => {
    return `Name: ${this.name}. Age:${this.Age}, Study Field: ${this.studyField}`;

 };
 console.log(participant.displayInfo());
 //Observations:
 //Arrow functions don't bind their own "this", instead is inherited from the surrounding scope

 //Task 4: Update the participant object dynamically
 function updateParticipantInfo(property, value) {
    participant[property] = value;
  }
 
 updateParticipantInfo ('age', 30);
 console.log (participant.age);

 updateParticipantInfo("studyField", "Biology");
 console.log(participant.studyField);