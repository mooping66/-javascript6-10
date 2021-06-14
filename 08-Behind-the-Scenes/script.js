'use strict';
/*
//@@ Scoping in Practice
function calcAge(birthYear) {
  const age = 2021 - birthYear;
  console.log(firstName); //mooping

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output); //mooping, you are 33, born in 1988
    if (birthYear >= 1988 && birthYear <= 1996) {
      var millennial = true;
      //* creating NEW variable with same name as output scope's variable
      const firstName = 'yuiesung';

      //* reassigning outer scope's variable
      output = 'NEW OUTPUT';

      const str = `Oh, and you're a millennial, ${firstName}`;
      console.log(str); //Oh, and you're a millennial, yuiesung
      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str); //outside can't call
    console.log(millennial); //true
    //console.log(add(2, 3)); //5 when comment 'use strict';
    console.log(output); //NEW OUTPUT
  }
  printAge();
}
const firstName = 'mooping';
calcAge(1988);
//console.log(age); //outside can't call

//@@ Hoisting and TDZ in Practice
//* variable
console.log(me);
//console.log(job);
//console.log(year);

var me = 'mooping';
let job = 'student';
const year = 1988;

//* function
console.log(addDecl(2, 3)); //5
//console.log(addExpr(2, 3));
console.log(addArrow);
//console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

//! example
console.log(undefined);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted'); //All products deleted
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); //true
console.log(y === window.y); //false
console.log(z === window.z); //false

//@@ The this Keyword in Practice
console.log(this); //window{...}

const calcAge = function (birthYear) {
  console.log(2021 - birthYear); //33
  console.log(this); //undefine
};
calcAge(1988);

const calcAgeArrow = birthYear => {
  console.log(2021 - birthYear); //33
  console.log(this); //window{...}
};
calcAgeArrow(1988);

const mooping = {
  year: 1988,
  calcAge: function () {
    console.log(this); //{year: 1988, calcAge: ƒ}
    console.log(2021 - this.year); //33
  },
};
mooping.calcAge();

const yuiesung = {
  year: 2017,
};
yuiesung.calcAge = mooping.calcAge; //{year: 2017, calcAge: ƒ}
yuiesung.calcAge(); //4

const f = mooping.calcAge;
f(); //undefined

//@@ Regular Functions vs. Arrow Functions
//var fistName = 'Yuiesung';

const mooping = {
  firstName: 'Mooping',
  year: 1988,
  calcAge: function () {
    //console.log(this); //{year: 1988, calcAge: ƒ}
    console.log(2021 - this.year); //33

    //* Solution 1
    //* use self or that
    // const self = this;

    // const isMillennial = function () {
    //   //console.log(this); //{firstName: //undefined
    //   //console.log(this.year >= 1988 && this.year <= 1996); //error
    //   console.log(self); //{firstName: "Mooping", year: 1988, calcAge: ƒ, greet: ƒ}
    //   console.log(self.year >= 1988 && self.year <= 1996); // true
    // };
    // isMillennial();

    //* Solution 2
    const isMillennial = () => {
      console.log(this); //{firstName: "Mooping", year: 1988, calcAge: ƒ, greet: ƒ}
      console.log(this.year >= 1988 && this.year <= 1996); //true
    };
    isMillennial();
  },

  greet: () => {
    console.log(this); //window{...}
    console.log(`Hey ${this.firstName}`); //Hey undefined
  },
};
mooping.greet();
//console.log(this.firstName); //undefined
mooping.calcAge();

//* Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  //Arguments(2) [2, 5, callee: (...), Symbol(Symbol.iterator): ƒ]
  //Arguments(4) [2, 5, 8, 12, callee: (...), Symbol(Symbol.iterator): ƒ]
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8); //error

//@@ Primitives vs. Objects (Primitive vs. Reference Types)
let age = 30;
let oldAge = age;
age = 31;
console.log(age); //31
console.log(oldAge); //30

const me = {
  name: 'mooping',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('friend', friend); //friend {name: "mooping", age: 27}
console.log('me', me); //me {name: "mooping", age: 27}
*/
//@@ Primitives vs. Objects in Practice
//* Primitive types
let lastName = 'Pinthong';
let oldLastName = lastName;
lastName = 'kuo';
console.log(lastName, oldLastName); //kuo Pinthong

//* Reference type
const yuiesung = {
  firstName: 'Yuiesung',
  lastName: 'Pinthong',
  age: 27,
};
const marriedYuiesung = yuiesung;
marriedYuiesung.lastName = 'kuo';
console.log('Before marriage', yuiesung); //Before marriage {firstName: "Yuiesung", lastName: "kuo", age: 27}
console.log('After marriage', marriedYuiesung); //After marriage {firstName: "Yuiesung", lastName: "kuo", age: 27}
//marriedYuiesung = {};

//* Copying object
const yuiesung2 = {
  firstName: 'Yuiesung',
  lastName: 'Pinthong',
  age: 27,
  family: ['Alice', 'Bob'],
};
const yuiesungCopy = Object.assign({}, yuiesung2);
yuiesungCopy.lastName = 'kuo';
//console.log('Before marriage', yuiesung2); //Before marriage {firstName: "Yuiesung", lastName: "Pinthong", age: 27}
//console.log('After marriage', yuiesungCopy); //After marriage {firstName: "Yuiesung", lastName: "kuo", age: 27}

yuiesungCopy.family.push('Mary');
yuiesungCopy.family.push('John');
console.log('Before marriage', yuiesung2); //Before marriage {firstName: "Yuiesung", lastName: "Pinthong", age: 27, family: Array(4)}
console.log('After marriage', yuiesungCopy); //After marriage {firstName: "Yuiesung", lastName: "kuo", age: 27, family: Array(4)}
