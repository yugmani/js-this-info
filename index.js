// Import stylesheets
import './style.css';

//Object methods, "this"
// **************************************

//let's create an object.
let user = {
  name: 'Peter',
  age: 30,
};

// a function sayHi() is created and assigned it to the property user.sayHi of the object.
user.sayHi = function () {
  console.log('Hello!');
};

//Now, the function is called here;
user.sayHi(); //Hello!

// So, sayHi is a method of the object user.

// we can use a pre-declared function as a method:
// ------------------------------------------------

//declaring a function
function walk() {
  console.log('I am walking.');
}

//addding function walk() as a method of user.
user.walk = walk;

//call this new method
user.walk(); //I am walking.

// Method shorthand
// ------------------------------------

let myOrder = {
  name: 'iPhone13',
  price: 1300,
  //writing a method with function keyword
  makeCall: function () {
    console.log('Dial my number!');
  },

  //writing a method without function keyword
  takeSnap() {
    console.log('Click! Click!!');
  },
};

//“this” in methods
// ---------------------------------------

//It’s common that an object method needs to access the information stored in the object to do its job.

// For instance, the code inside user.sayHi() may need the name of the user.

// To access the object, a method can use the this keyword.

// The value of this is the object “before dot”, the one used to call the method.

let car = {
  make: 'Honda',
  model: 'Civic',
  hunk() {
    console.log(`${this.make} hunks.`); //using `this` keyword
  },
  drive() {
    console.log(`I am driving ${car.make}.`); //without `this` keyword
  },
};

//During the execution of car.hunk(), the value of this is car.
car.hunk(); //Honda hunks.

// instead of `this.make` we may use `car.make` without `this` keyword;

//…But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.

let newCar = car;
car = null; //overwriting

newCar.hunk(); //Honda hunks. --> this is fine.
// But
// newCar.drive(); //index.js:56 Error: Cannot read properties of null (reading 'make') --> ? because there is no `this` keyword used to access properties.

//“this” is not bound
let truck = {
  make: 'Tata',
};

let suv = {
  make: 'fords',
};

function repair() {
  console.log(`${this.make} is being repaired.`);
}

truck.r = repair;
suv.r = repair;

truck.r(); //Tata is being repaired.
suv.r(); //fords is being repaired.
truck['r'](); //Tata is being repaired.
suv['r'](); //fords is being repaired.

// Calling without an object: this == undefined
// repair(); //Cannot read properties of undefined (reading 'make')
//this is undefined in strict mode. I

//In non-strict mode the value of this in such case will be the global object (window in a browser,

//The consequences of unbound this
// --------------------------------------

//In JavaScript this is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”.

// a function with `this` can be reused for different objects.

// Arrow functions have no “this”
// --------------------------------------

//Arrow functions don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.
let laptop = {
  make: 'Apple',
  model: 'MacBook air',
  start() {
    let arrow = () => console.log(this.model);
    arrow();
  },
};

laptop.start(); //MacBook air
// here arrow() uses `this` from the outer laptop.start() method:

//Tasks
// ***********************************************

//1. Using "this" in object literal
//--------------------------------------------

// Here the function makeUser returns an object.

// What is the result of accessing its ref? Why?
// function makeUser() {
//   return {
//     name: "John",
//     ref: this
//   };
// }

// let user1 = makeUser();

// alert( user1.ref.name ); // What's the result?
// Error: Cannot read property 'name' of undefined

function makeUser() {
  return {
    name: 'John',
    ref: function () {
      return this;
    },
  };
}

let user1 = makeUser();

console.log(user1.ref().name); //John

//2. Create a calculator
//--------------------------------------------

// Create an object calculator with three methods:

// read() prompts for two values and saves them as object properties.
// sum() returns the sum of saved values.
// mul() multiplies saved values and returns the result.
let calculator = {
  // ... your code ...
  read() {
    // this.x = prompt("Enter x");
    // this.y = prompt("Enter y");
  },

  sum() {
    return +this.x + +this.y;
  },
  mul() {
    return this.x * this.y;
  },
};

// calculator.read();
// console.log(calculator.sum()); // 2, 3 -> 5
// console.log(calculator.mul()); // 2, 3 -> 6

// 3. Chaining
//--------------------------------------------

// There’s a ladder object that allows to go up and down:

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this; //To make a chainable function
  },
  down() {
    this.step--;
    return this; //To make a chainable function
  },
  showStep: function () {
    // shows the current step
    console.log(this.step);
    return this; //To make a chainable function
  },
};
// Now, if we need to make several calls in sequence, can do it like this:

// ladder.up();
// ladder.up();
// ladder.down();
// ladder.showStep(); // 1
// ladder.down();
// ladder.showStep(); // 0
// Modify the code of up, down and showStep to make the calls chainable, like this:

ladder.up().up().up().showStep().down().down().showStep(); // shows 3 then 1
// Such approach is widely used across JavaScript libraries.
