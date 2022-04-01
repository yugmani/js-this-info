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
