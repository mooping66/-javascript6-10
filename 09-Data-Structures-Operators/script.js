'use strict';
//@@ Enhanced Object Literals
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

//* Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //* ES6 Enhanced Object Literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj); //time: "22:30", address: "via del sole,21", mainIndex: 2, starterIndex: 2}
  // },
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
    //Order received! Garlic Bread and Risotto will be delivered to via del sole,21 at 22:30
    //Order received! Bruschetta and Pizza will be delivered to via del sole,21 at 20:00
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
    //Here is your delicious pasta with mushrooms, asparagus and cheese
    //Here is your delicious pasta with mushrooms, asparagus and cheese
  },

  orderPizza(mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    //mushrooms
    //(3) ["onion", "olives", "spinach"]
    console.log(otherIngredient);
    //mushrooms
    //[]
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'via del sole,21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'via del sole,21',
  starterIndex: 1,
});

/*
//@@ Destructuring Arrays
const arr = [2, 3, 4];
const a = [0];
const b = [1];
const c = [2];

const [x, y, z] = arr;
console.log(x, y, z); //2 3 4
console.log(arr); //(3) [2, 3, 4]

let [main, , secondary] = restaurant.categories;
console.log(main, secondary); //Italian Vegetarian

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); //Vegetarian Italian

[main, secondary] = [secondary, main];
console.log(main, secondary); //Vegetarian Italian

//* Receive 2 return value from a function
//console.log(restaurant.order(2, 0)); //(2)["Garlic Bread", "Pizza"]
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); //Garlic Bread Pizza

//* Nested destructuring
const nested = [2, 4, [5, 6]];
//const [i, , j] = nested;
//console.log(i, j); //2 (2) [5, 6]
const [i, , [j, k]] = nested;
console.log(i, j, k); //2 5 6

//* Default value
//const [p, q, r] = [8, 9];
//console.log(p, q, r); //8 9 undefined
const [p = 1, q = 1, r = 1] = [8];
console.log(p, q, r); //8 1 1

//@@ Destructuring Objects
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
//Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ["Italian", "Pizzeria", "Vegetarian", "Organic"]

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
//Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4) ["Italian", "Pizzeria", "Vegetarian", "Organic"]

//* Default value
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//* Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b); //23 7

//* Nested object
const { fri } = openingHours;
console.log(fri); //open: 11, close: 23}

const {
  fri: { open, close },
} = openingHours;
console.log(open, close); //11 23

const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); //11 23

//* The Spread Operator
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[2]];
console.log(badNewArr); //(4) [1, 2, 7, 9]

const newArr = [1, 2, ...arr];
console.log(newArr); //(5) [1, 2, 7, 8, 9]

const newArr1 = [1, 2, arr];
console.log(newArr1); //(3) [1, 2, Array(3)]

console.log(...newArr); //1 2 7 8 9
console.log(1, 2, 7, 8, 9); //1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu); //(4) ["Pizza", "Pasta", "Risotto", "Gnocchi"])

//* Copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy); //3) ["Pizza", "Pasta", "Risotto"]

//* join 2 array
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu); //(7) ["Focaccia", "Brochette", "Garlic Bread", "Caprese Salad", "Pizza", "Pasta", "Risotto"]

//* Iterables; arrays,string, maps, sets, NOT Objects
const str = 'mooping';
const letters = [...str, ' ', 'P.'];
console.log(letters); //["m", "o", "o", "p", "i", "n", "g", " ", "P."]
console.log(...str); //m o o p i n g
//console.log(`${...str} Pinthong`); //error

//* Real-world example
const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];
console.log(ingredients); //(3) ["mushrooms", "asparagus", "cheese"]

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

//* Object
const newRestaurant = { foundedIn: 1988, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant); //{foundedIn: 1988, name: "Classico Italiano", location: "Via Angelo Tavanti 23, Firenze, Italy", categories: Array(4), starterMenu: Array(4), …}

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Restorals Roma';
console.log(restaurantCopy.name); //Restorals Roma
console.log(restaurant.name); //Classico Italiano

//@@ Rest Pattern and Parameters
//* 1.Destructuring
//* SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

//* REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); //1 2 (3) [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); //Pizza Risotto (4) ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

//* Object
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); //{thu: {…}, fri: {…}}

//* 2.Functions
const add = function (...numbers) {
  console.log(numbers);
  //(2) [2, 3]
  //(4) [5, 3, 7, 2]
  //(7) [8, 2, 5, 3, 2, 1, 4]
  //(3) [23, 5, 7]
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
  }
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

//@@ Short Circuiting (&& and ||)
console.log('--- OR ---');
//* Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'mooping'); //3
console.log('' || 'mooping'); //mooping
console.log(true || 0); //true
console.log(undefined || null); //null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); //Hello

restaurant.numGuests = 0;
const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1); //10

const guest2 = restaurant.numGuests || 10;
console.log(guest2); //10

console.log('--- AND ---');
console.log(0 && 'mooping'); //0
console.log(7 && 'mooping'); //mooping
console.log('Hello' && 23 && null && 'mooping'); //null

//* Practical Example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
  //mushrooms
  //["spinach"]
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
//mushrooms
//["spinach"]

//@@ The Nullish Coalescing Operator (??)
//restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); //10

//* Nullish:null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //10
*/

/**
 * * Coding Challenge #1
 * ? We're building a football betting app (soccer for my American friends 😅)! Suppose we get data from a web service about a certain game
 * ? ('game' variable on next page). In this challenge we're gonna work with that data.
 * TODO Your tasks:
 * todo 1. Create one player array for each team (variables 'players1' and 'players2')
 * todo 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
 * todo 3. Create an array 'allPlayers' containing all players of both teams (22 players)
 * todo 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
 * todo 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
 * todo 6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
 * todo 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
 * ! Test data :
 * ! for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
 **/
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//todo 1
const [players1, players2] = game.players;
console.log(players1, players2);
//(11) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski"]
//(11) ["Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"]
//todo 2
const [gk1, ...fieldPlayers1] = players1;
console.log(gk1, fieldPlayers1);
//Neuer
//(10) ["Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski"]
const [gk2, ...fieldPlayers2] = players2;
console.log(gk2, fieldPlayers2);
//Burki
//(10) ["Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"]
//todo 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//(22) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski", "Burki", "Schulz", "Hummels", "Akanji", "Hakimi", "Weigl", "Witsel", "Hazard", "Brandt", "Sancho", "Gotze"]
//todo 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//(14) ["Neuer", "Pavard", "Martinez", "Alaba", "Davies", "Kimmich", "Goretzka", "Coman", "Muller", "Gnarby", "Lewandowski", "Thiago", "Coutinho", "Perisic"]
//todo 5
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2); //1.33 3.25 6.5
//todo 6
const printGoals = function (...players) {
  console.log(players); //4) ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"]
  console.log(`${players.length} goals were scored`);
  //4 goals were scored
  //2 goals were scored

  //4 goals were scored
};
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
printGoals(...game.scored);
//todo 7
team1 < team2 && console.log('Team1 is more likely to win');
team1 > team2 && console.log('Team2 is more likely to win');
/*
//@@ Looping Arrays: The for-of Loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) {
  console.log(item);
  // Focaccia
  // Bruschetta
  // Garlic Bread
  // Caprese Salad
  // Pizza
  // Pasta
  // Risotto
}

for (const [item] of menu.entries()) {
  console.log(`${item[0] + 1}:${item[1]}`);
  //  1:Focaccia
  //  2:Bruschetta
  //  3:Garlic Bread
  //  4:Caprese Salad
  //  5:Pizza
  //  6:Pasta
  //  7:Risotto
}
console.log([...menu.entries()]); //(7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}:${el}`);
  //  1:Focaccia
  //  2:Bruschetta
  //  3:Garlic Bread
  //  4:Caprese Salad
  //  5:Pizza
  //  6:Pasta
  //  7:Risotto
}

//@@ Optional Chaining (?.)
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//* WITH optional chaining
console.log(restaurant.openingHours.mon?.open); //undefined
console.log(restaurant.openingHours?.mon?.open); //undefined

//example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);

  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day},we open at ${open}`);
  // On mon,we open at closed
  // On tue,we open at closed
  // On wed,we open at closed
  // On thu,we open at 12
  // On fri,we open at 11
  // On sat,we open at 0
  // On sun,we open at closed
}

//* Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
//(2) ["Focaccia", "Pasta"]
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
//Method does not exist

//* Array
const users = [{ name: 'mooping', email: 'yuiesung66@gmail.com' }];
// const users = [];
console.log(users[0]?.name ?? 'user array empty');
//mooping
//user array empty

if (users.length > 0) {
  console.log(users[0].name);
} else {
  console.log('user array empty');
}
//mooping
//user array empty

//@@ Looping Objects: Object Keys, Values and Entries
for (const day of Object.keys(openingHours)) {
  console.log(day);
  // thu
  // fri
  // sat
}

//* Property NAMES
const properties = Object.keys(openingHours);
console.log(properties); //(3) ["thu", "fri", "sat"]

let openStr = `We are open on ${properties.length} days :`;

for (const day of properties) {
  openStr += `${day},`;
}
console.log(openStr); //We are open on 3 days :thu,fri,sat,

//* Property VALUE
const values = Object.values(openingHours);
console.log(values); //(3) [{…}, {…}, {…}]

//* Entire object
const entries = Object.entries(openingHours);
console.log(entries); //(3) [Array(2), Array(2), Array(2)]

// * [key, value]
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
  // On thu we open at 12 and close at 22
  // On fri we open at 11 and close at 23
  // On sat we open at 0 and close at 24
}
*/
/**
 * * Coding Challenge #2
 * ? Let's continue with our football betting app! Keep using the 'game' variable from before.
 * TODO Your tasks:
 * todo 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
 * todo 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
 * todo 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this: Odd of victory Bayern Munich: 1.33, Odd of draw: 3.25, Odd of victory Borrussia Dortmund: 6.5 Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names 😉
 * todo 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this: {Gnarby: 1, Hummels: 1, Lewandowski: 2 }
 **/
//todo 1
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}:${player}`);
  // Goal 1:Lewandowski
  // Goal 2:Gnarby
  // Goal 3:Lewandowski
  // Goal 4:Hummels
}
//todo 2
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) {
  average += odd;
  average /= odds.length;
  console.log(average);
  // 0.44333333333333336
  // 1.231111111111111
  // 2.577037037037037
}
//todo 3
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
  // Odd of victory Bayern Munich 1.33
  // Odd of draw 3.25
  // Odd of victory Borrussia Dortmund 6.5
}
/*
//@@ Sets
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(orderSet); //Set(3) {"Pasta", "Pizza", "Risotto"}

console.log(new Set('mooping')); //Set(6) {"m", "o", "p", "i", "n", …}
console.log(orderSet.size); //3
console.log(orderSet.has('Pizza')); //true
console.log(orderSet.has('Bread')); //false

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
console.log(orderSet); //Set(4) {"Pasta", "Pizza", "Risotto", "Garlic Bread"}

orderSet.delete('Risotto');
console.log(orderSet); //(3) {"Pasta", "Pizza", "Garlic Bread"}

// orderSet.clear();
// console.log(orderSet); //Set(0) {}

for (const order of orderSet) {
  console.log(order);
  // Pasta
  // Pizza
  // Garlic Bread
}

//! Example
const staff = ['waiter', 'Chef', 'Waiter', 'manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); //(4) ["waiter", "Chef", "Waiter", "manager"]
console.log(
  new Set(['waiter', 'Chef', 'Waiter', 'manager', 'Chef', 'Waiter']).size
); //4
console.log(new Set('moopingpinthong').size); //8

//@@ Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); //Map(3) {"name" => "Classico Italiano", 1 => "Firenze, Italy", 2 => "Lisbon, Portugal"}
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open 😀')
  .set(false, 'We are close 😭');
console.log(rest.get('name')); //Classico Italiano
console.log(rest.get(true)); //We are open 😀
console.log(rest.get(1)); //Firenze, Italy

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); //We are open 😀

console.log(rest.has('categories')); //true
rest.delete(2);
console.log(rest); //Map(7) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}

// rest.clear();
// console.log(rest); //Map(0) {}
console.log(rest.size); //7

const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest); //Map(8) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}
console.log(rest.size); //8
//console.log(rest.get([1,2])); //error that not array todo arr
console.log(rest.get(arr)); //test

rest.set(document.querySelector('h1'), 'Heading');
console.log(rest); //Map(9) {"name" => "Classico Italiano", 1 => "Firenze, Italy", "categories" => Array(4), "open" => 11, "close" => 23, …}
// [[Entries]]
// 0: {"name" => "Classico Italiano"}
// 1: {1 => "Firenze, Italy"}
// 2: {"categories" => Array(4)}
// 3: {"open" => 11}
// 4: {"close" => 23}
// 5: {true => "We are open 😀"}
// 6: {false => "We are close 😭"}
// 7: {Array(2) => "Test"}
// 8: {h1 => "Heading"}
console.log(rest.size); //9

//@@ Maps: Iteration
const question = new Map([
  ['question', 'what is the best programing language in the world?'],
  [1, 'c'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);
console.log(question); //Map(7) {"question" => "what is the best programing language in the world?", 1 => "c", 2 => "Java", 3 => "JavaScript", "correct" => 3, …}

console.log(Object.entries(openingHours)); //3) [Array(2), Array(2), Array(2)]
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap); //Map(3) {"thu" => {…}, "fri" => {…}, "sat" => {…}}

//! Quiz app
console.log(question.get('question')); //what is the best programing language in the world?
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
    // Answer 1: c
    // Answer 2: Java
    // Answer 3: JavaScript
  }
}
//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer); //3 (input 3)
console.log(question.get(question.get('correct') === answer)); //Correct (input 3)

//* Convert map to array
console.log([...question]); //(7) [Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
console.log(question.entries()); //MapIterator {"question" => "what is the best programing language in the world?", 1 => "c", 2 => "Java", 3 => "JavaScript", "correct" => 3, …}
console.log([...question.keys()]); //(7) ["question", 1, 2, 3, "correct", true, false]
console.log([...question.values()]); //(7) ["what is the best programing language in the world?", "c", "Java", "JavaScript", 3, "Correct", "Try again!"]
*/

/**
 * * Coding Challenge #3
 * ? Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game.
 * ? The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
 * TODO Your tasks:
 * todo 1. Create an array 'events' of the different game events that happened (no duplicates)
 * todo 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
 * todo 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
 * todo 4. Loop over 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this: [FIRST HALF] 17: ⚽ GOAL
 **/
const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);
//todo 1
console.log(gameEvents.values()); //MapIterator {"⚽ GOAL", "🔁 Substitution", "⚽ GOAL", "🔁 Substitution", "🔶 Yellow card", …}

const events = new Set(gameEvents.values());
console.log(events); //Set(4) {"⚽ GOAL", "🔁 Substitution", "🔶 Yellow card", "🔴 Red card"}
//todo 2
gameEvents.delete(64);
//todo 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
  //An event happened, on average, every 9 minutes
);

const time = [...gameEvents.keys()].pop();
console.log(time); //92
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
  //An event happened, on average, every 9.2 minutes
);
//todo 4
for (const [min, event] of gameEvents) {
  const half = min <= 24 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
  // [FIRST HALF] 17: ⚽ GOAL
  // [SECOND HALF] 36: 🔁 Substitution
  // [SECOND HALF] 47: ⚽ GOAL
  // [SECOND HALF] 61: 🔁 Substitution
  // [SECOND HALF] 69: 🔴 Red card
  // [SECOND HALF] 70: 🔁 Substitution
  // [SECOND HALF] 72: 🔁 Substitution
  // [SECOND HALF] 76: ⚽ GOAL
  // [SECOND HALF] 80: ⚽ GOAL
  // [SECOND HALF] 92: 🔶 Yellow card
}
/*
//@@ Working With Strings - Part 1
const airline = 'TAP Air Portugal';
let plane = 'A320';

console.log(plane[0]); //A
console.log(plane[1]); //3
console.log(plane[2]); //2
console.log('B737'[0]); //B

console.log(airline.length); //16
console.log('B737'.length); //4

console.log(airline.indexOf('r')); //6 (TAP_Air)
console.log(airline.lastIndexOf('r')); //10 (lagutroP_r)
console.log(airline.indexOf('portugal')); //-1

console.log(airline.slice(4)); //Air Portugal (TAP_...start...)
console.log(airline.slice(4, 7)); //Air (TAP_...start-end..._Portugal)

console.log(airline.slice(0, airline.indexOf(' '))); //TAP (end...' ')
console.log(airline.slice(airline.lastIndexOf(' '))); // Portugal (lagutroP_...end)
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal (lagutroP...end)

console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //AP Air Portuga

const checkMiddleSeat = function (seat) {
  //! B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat 😭');
  } else {
    console.log('You got lucky 😀');
  }
};
checkMiddleSeat('11B'); //You got the middle seat 😭
checkMiddleSeat('23C'); //script.js:763 You got lucky 😀
checkMiddleSeat('3E'); //You got the middle seat 😭

console.log(new String('mooping')); //String {"mooping"}
console.log(typeof new String('mooping')); //object
console.log(typeof new String('mooping').slice(1)); //string

//@@ Working With Strings - Part 2
console.log(airline.toLowerCase()); //tap air portugal
console.log(airline.toUpperCase()); //TAP AIR PORTUGAL

//* Fix capitalization in name
const passenger = 'mOOpiNG';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); //Mooping

//* Comparing email
const email = 'hello@mooping.com';
const loginEmail = ' Hello@Mooping.com \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail); //hello@mooping.com

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail); //hello@mooping.com
console.log(email == normalizedEmail); //true

//* Replacing
const priceTH = '288,97฿';
const priceUS = priceTH.replace('฿', '$').replace(',', '.');
console.log(priceUS); //288.97$

const announcement =
  'All passengers come to barding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); //All passengers come to barding gate 23. Boarding door 23!
console.log(announcement.replaceAll('door', 'gate')); //All passengers come to barding gate 23. Boarding gate 23!
console.log(announcement.replace(/door/g, 'gate')); //All passengers come to barding gate 23. Boarding gate 23!

//* Booleans
plane = 'Airbus A320neo';
console.log(plane.includes('A320')); //true
console.log(plane.includes('Boeing')); //false
console.log(plane.startsWith('Air')); //true
console.log(plane.startsWith('Aib')); //false

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the New Airbus family'); //Part of the New Airbus family
}

//! Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a Pocket KnifE'); //You are NOT allowed on board
checkBaggage('Socks and Camera'); //Welcome aboard!
checkBaggage('Got some SNACKS and a gUn for protection'); //You are NOT allowed on board

//@@ Working With Strings - Part 3
//* Split and Join
console.log('a+very+nice+string'.split('+')); //(4) ["a", "very", "nice", "string"]
console.log('Mooping Pinthong'.split(' ')); //(2) ["Mooping", "Pinthong"]

const [firstName, lastName] = 'Mooping Pinthong'.split(' ');
const newName = ['Miss.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName); //Miss. Mooping PINTHONG

const capitalizeName = function (name) {
  const names = name.split(' ');
  const nameUpper = [];
  for (const n of names) {
    //nameUpper.push(n[0].toUpperCase() + n.slice(1));
    nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(nameUpper.join(' '));
};
capitalizeName('mille and smith davis'); //Mille And Smith Davis
capitalizeName('mooping pinthong'); //Mooping Pinthong

//* Padding
const massage = 'Go to gate 23!';
console.log(massage.padStart(25, '+')); //+++++++++++Go to gate 23!
console.log(massage.padStart(20, '+').padEnd(30, '+')); //++++++Go to gate 23!++++++++++
console.log('Mooping'.padStart(25, '+')); //++++++++++++++++++Mooping
console.log('Mooping'.padStart(20, '+').padEnd(30, '+')); //+++++++++++++Mooping++++++++++

//* Comparing credit card
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '.');
};
console.log(maskCreditCard(9700767324)); //......7324
console.log(maskCreditCard(4232435678224)); //.........8224
console.log(maskCreditCard(3434242432543808)); //............3808

//* Repeat
const massage2 = 'Bad weather... All Departure Delayed...';
console.log(massage2.repeat(3));
//Bad weather... All Departure Delayed...Bad weather... All Departure Delayed...Bad weather... All Departure Delayed...

const planesInline = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInline(5); //There are 5 planes in line ✈✈✈✈✈
planesInline(3); //There are 3 planes in line ✈✈✈
planesInline(12); //There are 12 planes in line ✈✈✈✈✈✈✈✈✈✈✈✈
*/
/**
 * * Coding Challenge #2
 * ? Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
 * ? The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.
 * todo Test data:
 * todo 1. (pasted to textarea, including spaces):
 * underscore_case
 * .first_name
 * Some_Variable
 * ..calculate_AGE
 * delayed_departure
 * todo 2. Should produce this output (5 separate console.log outputs):
 * underscoreCase   ✅
 * firstName        ✅✅
 * someVariable     ✅✅✅
 * calculateAge     ✅✅✅✅
 * delayedDeparture ✅✅✅✅✅
 * ! Hints:
 * ! Remember which character defines a new line in the textarea 😉
 * ! The solution only needs to work for a variable made out of 2 words, like a_b
 * ! Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
 * ! This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue! Afterwards, test with your own test data!
 **/
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
//todo 1
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  console.log(rows);
  //(5) ["underscore_case", " first_name", "Some_Variable", "  calculate_AGE", "delayed_departure"]
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    console.log(row);
    // underscore_case
    //  first_name
    // Some_Variable
    //   calculate_AGE
    // delayed_departure
    console.log(first, second);
    // underscore case
    // first name
    // some variable
    // calculate age
    // delayed departure
    //todo 2
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
    // underscoreCase      ✅
    // firstName           ✅✅
    // someVariable        ✅✅✅
    // calculateAge        ✅✅✅✅
    // delayedDeparture    ✅✅✅✅✅
  }
});
/*
//@@ String Methods Practice
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

console.log(flights.split('+'));
//(4) ["_Delayed_Departure;fao93766109;txl2133758440;11:25", "_Arrival;bru0943384722;fao93766109;11:45", "_Delayed_Arrival;hel7439299980;fao93766109;12:05", "_Departure;fao93766109;lis2323639855;12:30"]
const getCode = str => str.slice(0, 3).toUpperCase();
for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  //console.log(type); test
  // const output0 = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
  //   '_',
  //   ' '
  // )} ${getCode(from)} to ${getCode(to)} (${time.replace(':', 'h')})`.padStart(
  //   40
  // );
  // console.log(output0);
  //              🔴 Delayed Departure FAO to TXL (11h25)
  //                           Arrival BRU to FAO (11h45)
  //                🔴 Delayed Arrival HEL to FAO (12h05)
  //                         Departure FAO to LIS (12h30)
  const output1 = `${type.startsWith('_Delayed') ? '🔴' : ''}`;
  const output2 = `${type.replaceAll('_', ' ')}`;
  const output3 = `${getCode(from)} to ${getCode(to)}`;
  const output4 = `(${time.replace(':', 'h')})`;
  console.log([output1, output2, output3, output4].padStart(50, ''));
}
*/
