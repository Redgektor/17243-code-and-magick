"use strict";

function getMessage(a, b) {
  var typeOfA = typeof a;
  var typeOfB = typeof b;
  var isArrayA = Array.isArray(a);
  if (typeOfA === "boolean") {
    return a ? "Я попал в" + " " + b : "Я никуда не попал";

  } else if (typeOfA === "number") {
    return "Я прыгнул на" + " " + a * 100 + " " + "сантиметров";

  } else if (isArrayA && typeOfB === "undefined") {
    var stepsCount = a.reduce(function (sum, el) {
      return sum + el;
    }, 0);
    return "Я прошёл" + " " + stepsCount + " " + "шагов";

  } else if (isArrayA && Array.isArray(b)) {
    var metersCount = a.reduce(function (sum, current, i) {
      return sum + (current * b[i]);
    }, 0);
    return "Я прошёл" + " " + metersCount + " " + "метров";
  }
}
