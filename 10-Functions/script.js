'use strict';
/*
//@@ Default Parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //* ES5
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123'); //{flightNum: "LH123", numPassengers: 1, price: 199}
createBooking('LH123', 2, 800); //{flightNum: "LH123", numPassengers: 2, price: 800}
createBooking('LH123', 2); //{flightNum: "LH123", numPassengers: 2, price: 398}
createBooking('LH123', 5); //{flightNum: "LH123", numPassengers: 5, price: 995}
createBooking('LH123', undefined, 1000); //{flightNum: "LH123", numPassengers: 1, price: 1000}

//@@ How Passing Arguments Works: Value vs.Reference
const flight = 'LH124';
const mooping = {
  name: 'mooping Pinthong',
  passport: 7893729399,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Miss.' + passenger.name;
  if (passenger.passport === 7893729399) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
};
checkIn(flight, mooping); //alert('Checked in')
console.log(flight); //LH124
console.log(mooping); //{name: "Miss.mooping Pinthong", passport: 298839898674}

//* Is the same as doing...
const flightNum = flight;
const passenger = mooping;
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
newPassport(mooping); //this is random
checkIn(flight, mooping); //alert('Wrong passport')

//@@  Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//* Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
//Original string: JavaScript is the best!
//Transformed string: JAVASCRIPT is the best!
//Transformed by: upperFirstWord
transformer('JavaScript is the best!', oneWord);
//Original string: JavaScript is the best!
//Transformed string: javascriptisthebest!
//Transformed by: oneWord

//* Js uses callbacks all the time
const high5 = function () {
  console.log('🖐🏻');
};
document.body.addEventListener('click', high5); //🖐🏻
['mooping', 'Martha', 'Adam'].forEach(high5); //3🖐🏻

//@@  Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Mooping'); //Hey Mooping
greeterHey('Steven'); //Hey Steven
greet('Hello')('Mooping'); //Hello Mooping

//! Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Mooping'); //Hi Mooping

//@@ The call and apply Methods
const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],

  //* book:function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, 'Mooping Pinthong'); //Mooping Pinthong booked a seat on lufthansa flight LH239
lufthansa.book(635, 'John Smith'); //John Smith booked a seat on lufthansa flight LH635
console.log(lufthansa); //{airline: "lufthansa", iataCode: "LH", bookings: Array(2), book: ƒ}

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;

//book(23, 'Sarah William'); //error
book.call(eurowings, 23, 'Sarah William'); //Sarah William booked a seat on Eurowings flight EW23
console.log(eurowings); //{airline: "Eurowings", iataCode: "EW", bookings: Array(1)}

book.call(lufthansa, 239, 'Mary Cooper'); //Mary Cooper booked a seat on lufthansa flight LH239
console.log(lufthansa); //{airline: "lufthansa", iataCode: "LH", bookings: Array(3), book: ƒ}

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper'); //Mary Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); //{airline: "Swiss Air Lines", iataCode: "LX", bookings: Array(1)}

//* Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData); //George Cooper booked a seat on Swiss Air Lines flight LX583
console.log(swiss); //{airline: "Swiss Air Lines", iataCode: "LX", bookings: Array(2)}

book.call(swiss, ...flightData); //George Cooper booked a seat on Swiss Air Lines flight LX583

//@@ The bind Method
//book.call(eurowings, 23, 'Sarah William');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven William'); //Steven William booked a seat on Eurowings flight EW23
bookLH(23, 'Steven William'); //Steven William booked a seat on lufthansa flight LH23
bookLX(23, 'Steven William'); //Steven William booked a seat on Swiss Air Lines flight LX23

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Mooping Pinthong'); //Mooping Pinthong booked a seat on Eurowings flight EW23
bookEW23('Martha Cooper'); //Martha Cooper booked a seat on Eurowings flight EW23

//* With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
lufthansa.buyPlane();
//{airline: "lufthansa", iataCode: "LH", bookings: Array(4), planes: 300, book: ƒ, …}
//301
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
//<button class=​"buy">​Buy new plane 🛩​</button>​
//NaN
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//{airline: "lufthansa", iataCode: "LH", bookings: Array(4), planes: 301, book: ƒ, …}
//302

//* Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200)); //220

//* addVAT = (rate, value) => value + (value * 0.23);
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100)); //123
console.log(addVAT(23)); //28.29

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100)); //123
console.log(addVAT2(23)); //28.29
*/
/**
 * * Coding Challenge #1
 * ? Let's build a simple poll app! A poll has a question, an array of options from which people can choose, and an array with the number
 * ? of replies for each option. This data is stored in the starter 'poll' object below.
 * TODO Your tasks:
 * todo 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
 * todo 1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
 * What is your favorite programming language?
 * 0: JavaScript
 * 1: Python
 * 2: Rust
 * 3: C++
 * (Write option number)
 * todo 1.2. Based on the input number, update the 'answers' array property. For example, if the option is 3, increase the value at position 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g. answer 52 wouldn't make sense, right?)
 * todo 2. Call this method whenever the user clicks the "Answer poll" button.
 * todo 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
 * todo 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.
 * todo 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll object! So what should the this keyword look like in this situation?
 * ! Test data for bonus:
 * ! data 1: [5, 2, 3]
 * ! data 2: [1, 5, 3, 9, 6, 1]
 * ! Hints:
 * ! Use many of the tools you learned about in this and the last section 😉
 **/
const poll = {
  question: 'What is your favorite programming language?',
  //* This generates [0, 0, 0, 0]. More in the next section!
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],

  answers: new Array(4).fill(0),
  //todo 1
  registerNewAnswer() {
    //todo 1.1 Get answer
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    console.log(answer); //3 (input 3)

    //todo 1.2 Register answer
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    //console.log(this.answers); test

    //todo 4
    this.displayResults();
    this.displayResults('string');
  },

  //todo 3
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers); //(4) [0, 0, 1, 0]
    } else if (type === 'string') {
      //* Poll results are 13, 3, 4, 1
      console.log(`Poll result are ${this.answers.join(', ')}`); //Poll result are 0, 0, 1, 0
    }
  },
};
//poll.registerNewAnswer(); test
//todo 2
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

//todo 5
poll.displayResults.call({ answers: [5, 2, 3] }, 'string'); //Poll result are 5, 2, 3
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string'); //Poll result are 1, 5, 3, 9, 6, 1
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }); //(6) [1, 5, 3, 9, 6, 1]

/*
//@@ Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce(); //This will never run again

//* IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})(); //This will never run again (call in last ())
//console.log(isPrivate); //isPrivate is not defined

(() => console.log('This will ALSO never run again'))(); //This will ALSO never run again (call in last ())

{
  const isPrivate = 23;
  var notPrivate = 46;
}
//console.log(isPrivate); //isPrivate is not defined
console.log(notPrivate); //46

//@@ Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker(); //1 passengers
booker(); //2 passengers
booker(); //3 passengers

console.log(booker); //ƒ () {passengerCount++; console.log(`${passengerCount} passengers`);}

//@@ More Closure Examples
//! Example1
let f;
const g = function () {
  const a = 23;
  console.log(a);
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  console.log(b);
  f = function () {
    console.log(b * 2);
  };
};
g(); //23
f(); //46
console.dir(f); //ƒ f(a:23)

//* Re-assigning f function
h(); //777
f(); //1554
console.dir(f); //ƒ f(b:777)

//! Example2
const boardPassenger = function (n, wait) {
  //const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passenger`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} second`);
};
// setTimeout(function () {
//   console.log('TIMER');
// }, 1000); //TIME test

const perGroup = 1000;

boardPassenger(180, 3);
//Will start boarding in 3 second
//We are now boarding all 180 passengers
//There are 3 groups, each with 60 passenger (n/3)

//Will start boarding in 3 second
//We are now boarding all 180 passengers
//There are 3 groups, each with 1000 passenger (1000)
*/
/**
 * * Coding Challenge #2
 * ? This is more of a thinking challenge than a coding challenge 🤓
 * TODO Your tasks:
 * todo 1. Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the body element is clicked. Do not select the h1 element again!
 * todo 2. And now explain to yourself (or someone around you) why this worked! Take all the time you need. Think about when exactly the callback function is executed, and what that means for the variables involved in this example
 **/
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  //todo 1
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
