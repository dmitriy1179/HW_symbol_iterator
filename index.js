//1 class MonthIterator
const namE = Symbol("name");
const firstDay = Symbol("firstDay")
const dayS = Symbol("days")

class MonthIterator {
  constructor(name) {
    this[namE] = name;
    this[firstDay] = 1;
    this[dayS] = {
      "january": 31,
      "february": 28,
      "march": 31,
      "april": 30,
      "may": 31,
      "june": 30,
      "july": 31,
      "august": 31,
      "september": 30,
      "october": 31,
      "november": 30,
      "december": 31
    }
  }
  [Symbol.iterator](){
    return this
  }
  next() {
    let i = this[firstDay];
    if (i <= this[dayS][this[namE]]) {
      this[firstDay]++;
      return {done: false, value: i}
    } else {
      return {done: true, value: undefined}
    }
  }
  toString() {
    return this[namE]
  }
}

const starT = Symbol("start");
const enD = Symbol("end")
const monthS = Symbol("months");
const startToStr = Symbol("startToString")

class CalendarIterator {
  constructor(start, end) {
    this[monthS] = {
      1: "january",
      2: "february",
      3: "march",
      4: "april",
      5: "may",
      6: "june",
      7: "july",
      8: "august",
      9: "september",
      10: "october",
      11: "november",
      12: "december"
    };
    this[starT] = start;
    this[enD] = end;
    this[startToStr] = start;

  }
  [Symbol.iterator](){
    return this
  }
  next() {
    let start = this[starT];
    if (start <= this[enD]) {
      this[starT]++;
      return {done: false, value: new MonthIterator(this[monthS][start])}
    } else {
      return {done: true, value: undefined}
    }
  }
  toString() {
    let arr = [];
    for (let i = this[startToStr]; i <= this[enD]; i++) {
      arr.push(this[monthS][i])
    }
    return arr.join(", ")
  }
}

const calendar = new CalendarIterator(1, 2)
const month = calendar.next().value
console.log(month.toString())
console.log(month.next().value)
console.log(month.next().value)
console.log(month.next().value)

//2 Stories
const images = [
  "images/img-05.jpg",
  "images/img-06.jpg",
  "images/img-07.jpg",
  "images/img-08.jpg",
  "images/img-09.jpg",
  "images/img-10.jpg",
  "images/img-11.jpg",
  "images/img-12.jpg",
]
const launch_bar = document.getElementById("launch_bar");
launch_bar.setAttribute("style", "margin: 0 auto; padding: 10px; text-align: center;")
const input = document.getElementById("input");
const button = document.getElementById("btn");
const el = document.getElementById("el");
el.setAttribute("style", "margin: 0 auto; padding: 10px; text-align: center;")
const progress = document.getElementById("progress")

class Slider {
  constructor (arr, input, button, container, progress) {
    this.arr = arr
    this.input = input;
    this.button = button;
    this.container = container;
    this.interval = null;
    this.i = this.arr.length-1;
    this.image = document.createElement("img");
    this.progress = progress;
    this.progressInterval = 100/this.arr.length;
    this.progressBar = this.progressInterval
  }
  start() {
    this.button.disabled = true;

    this.image.src = this.arr[this.i];
    this.container.appendChild(this.image);
    this.progress.value = this.progressBar;
    this.progressBar += this.progressInterval;
    this.i--


    this.interval = setInterval(() => {
      this.container.innerHTML = ""
      if (this.i < 0) {
        clearInterval(this.interval);
        this.progress.value = 0;
        this.button.disabled = false
      }
      else {
        this.image.src = this.arr[this.i];
        this.container.appendChild(this.image);
        this.progress.value = this.progressBar;
      }
      this.progressBar += this.progressInterval;
      this.i--;
    }, this.input.value * 1000);
  }
  stop() {
    clearInterval(this.interval);
  }
  click() {
    this.button.addEventListener("click", () => {
      this.start();
    });
    this.image.addEventListener("mousedown", () => {
      this.stop();
    })
    this.image.addEventListener("mouseup", () => {
      this.start();
    }) 
    this.image.addEventListener("mouseenter", () => {
      this.stop();
    })
    this.image.addEventListener("mouseleave", () => {
      this.start();
    });
  }

}
const slide = new Slider(images, input, button, el, progress)
slide.click()

/*
class Slider1 {
  constructor (arr, input, button, container, progress) {
    this.arr = arr
    this.input = input;
    this.button = button;
    this.container = container;
    this.start = 0;
    this.end = this.arr.length-1
    this.image = document.createElement("img");
    this.progress = progress;
    this.progressInterval = 100/this.arr.length;
  }
  [Symbol.iterator](){
    return this
  }
  next() {
    this.container.innerHTML = "";
    let num = this.start;
    if (num <= this.end) {
      this.start++;
      this.image.src = this.arr[num];
      this.progress.value += this.progressInterval
      return {done: false, value: this.container.appendChild(this.image)}

    } else {
      this.progress.value = 0;
      this.button.disabled = false
      return {done: true, value: undefined}
    }
  }
  click(){
    let interval = null;
    this.button.addEventListener("click", () => {
      this.button.disabled = true;
      this.image.src = this.arr[0];
      this.container.appendChild(this.image);
      this.progress.value = this.progressInterval;
      this.start++;
      interval = setInterval(() => {
        this.next();
      }, this.input.value*1000);
    });
    this.image.addEventListener("mousedown", () => {
      clearInterval(interval)
    })
    this.image.addEventListener("mouseup", () => {
      interval = setInterval(() => {
        this.next();
      }, this.input.value*1000);
    });
    this.image.addEventListener("mouseenter", () => {
      clearInterval(interval)
    })
    this.image.addEventListener("mouseleave", () => {
      interval = setInterval(() => {
        this.next();
      }, this.input.value*1000);
    });
  }
}
const slide1 = new Slider1(images, input, button, el, progress)
slide1.click()
*/