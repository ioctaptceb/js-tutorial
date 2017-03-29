// This is a Comment! It is a line in the code that is not executed by the compiler

// here it is grey

/** this is a multi-line comment
  use these to clarify any part of your code that might be confusing to other coders
**/

/*
its basically
the exact same thing
but for several lines
*/

// Need help? Check out the docs!
// JavaScript: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
// Easel.js (used to make shapes): http://www.createjs.com/docs/easeljs/modules/EaselJS.html
// Tween.js (used to make things move): http://www.createjs.com/docs/tweenjs/modules/TweenJS.html

/************** The Ingredients ***************/

/*
   You can organize your code any way you like, but the best practice is to
   write your code the same way you would write a recipe. The data and
   pieces of logic you use should go at the top. Constants and variables
   come first, then functions with small pieces of logic. The sequence in
   which these actions are placed towards the bottom. This makes it easier
   for others to read your code, and it can make your code more
   performant.
*/

const defaultStart = {
  x: 400,
  y: 100,
  alpha: 0
};

const defaultEnd = {
  x: 100,
  y: 100,
  alpha: 1
};

// this is an example of a function that can generate a shape
function newCircle(xPosition, yPosition, size, color) {
  const circle = new createjs.Shape();
  circle.graphics.beginFill(color).drawCircle(0, 0, size);
  circle.x = xPosition;
  circle.y = yPosition;
  return circle;
}

// This is an example of a function that can animate a shape
// as a bonus, we are using defaults here to make things easier
function animateCircle(circle, start = defaultStart, end = defaultEnd) {
  createjs.Tween.get(circle, {loop: true})
    .to(start, 1000, createjs.Ease.getPowInOut(4))
    .to(end, 800, createjs.Ease.getPowInOut(2));
}

/** Events

  These events are outside of the init() function, but they have access to
  a stage object. The stage object is "passed in", which makes it
  available to the inner function. This is known as a higher order
  function. Higher order functions are generated functions that have
  access to variables that are defined "on the go". They are super useful
  but can be confusing. Ask if you have questions!

**/
function handleTick(stage) {
  return function(event) {
    const randomX = Math.random() * 500;
    const randomY = Math.random() * 400;
    const randomSize = Math.random() * 100;
    const circle = newCircle(randomX, randomY, randomSize, 'Crimson');
    stage.addChild(circle);
    stage.update();
  };
}

function handleClick(stage) {
  return function(event) {
    console.log(event.target.clientX)
    const randomSize = Math.random() * 100;
    const circle = newCircle(event.clientX, event.clientY, randomSize, 'Crimson');
    stage.addChild(circle);
    stage.update();
  };
}

/************** The Instructions ***************/

// this is our start method. It determines what happens on the screen
// You can see that this piece of code is run through the DOM. Take a look
// at the <body> tag.
function init() {
  const stage = new createjs.Stage('stage');
  const circle = newCircle(100, 100, 50, 'Black');
  const customStart = {
    x: 400,
    y: 150,
    alpha: 0
  };
  const customEnd = {
    x: 100,
    y: 50,
    alpha: 1
  };

  stage.addChild(circle);
  animateCircle(circle);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', stage);
  document.addEventListener('click', handleClick(stage));
  /*** here are some methods to get you started:
  createjs.Ticker.addEventListener('tick', handleTick(stage));

  // random event

  // clicking a shape
  stage.addEventListener('click', handleClick(stage));

  // clicking anywhere
  // In this case, we are using the document (a DOM api) because we
  // are interested in the entire stage, rather than just the shape

  ***/

  // if you get lost, just remember: https://twitter.com/AGShortee/status/836826732363673601
}
