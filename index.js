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
function progressBar(time, container) {
  let curTime = 0
  const progress = document.createElement("progress");
  progress.setAttribute("style", "width: 50px; margin: 5px");
  container.appendChild(progress);
  progress.max = time;
  let intervalID =  setInterval(() => {
    progress.value = curTime;
    curTime += 10;
    if(curTime === time) {
      clearInterval(intervalID);
    }
  }, 10);
  return {
    progressStop: function() {
      clearInterval(intervalID);
      return curTime
    },
    progressStart: function() {
      intervalID =  setInterval(() => {
        progress.value = curTime;
        curTime += 10;
        if(curTime === time) {
          clearInterval(intervalID);
        }
      }, 10);
    }
  }
}

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
el.setAttribute("style", "margin: 0 auto; padding: 10px; text-align: center; width: 500px")
const progressBarItem = document.getElementById("progressBar")
progressBarItem.setAttribute("style", "margin: 0 auto; padding: 10px; text-align: center;")

class Slider {
  constructor (arr, input, button, container) {
    this.arr = arr
    this.input = input;
    this.button = button;
    this.container = container;
    this.interval = null;
    this.i = this.arr.length-1;
    this.image = document.createElement("img");
    this.bar = null;
    this.curTimeBar = 0;
    this.isMouseDown = false;
  }
  start() {
    this.interval = setInterval(() => {
      this.container.innerHTML = ""
      if (this.curTimeBar !== 0) {
        clearInterval(this.interval);
        this.curTimeBar = 0;
        this.start()
      }
      if (this.i < 0) {
        clearInterval(this.interval);
        progressBarItem.innerHTML = "";
        this.button.disabled = false;
      }
      else {
        this.image.src = this.arr[this.i];
        this.container.appendChild(this.image);
        this.bar = progressBar(this.input.value * 1000, progressBarItem)
      }
      this.i--;
    }, this.input.value * 1000 - this.curTimeBar);
  }
  stop() {
    clearInterval(this.interval);
  }
  
  click() {
      this.button.addEventListener("click", () => {
        this.button.disabled = true;
        this.image.src = this.arr[this.i];
        this.container.appendChild(this.image);
        this.bar = progressBar(this.input.value * 1000, progressBarItem)
        this.i--
        this.start();
    });
    this.container.addEventListener("mouseup", () => {
      if (this.isMouseDown === true) {
        this.stop();
        this.curTimeBar = this.bar.progressStop();
        this.isMouseDown = false;
      }
    })
    this.container.addEventListener("mousedown", () => {
      this.start();
      this.bar.progressStart();
      this.isMouseDown = true;
    }) 
    this.image.addEventListener("mouseenter", () => {
      if (this.isMouseDown === false) {
        this.stop();
        this.curTimeBar = this.bar.progressStop();
      }
    })
    this.image.addEventListener("mouseleave", () => {
      if (this.isMouseDown === false) {
        this.start();
        this.bar.progressStart();
      }
    });
  }
}
const slide = new Slider(images, input, button, el)
slide.click()

/*
class Slider1 {
  constructor (arr, input, button, container) {
    this.arr = arr
    this.input = input;
    this.button = button;
    this.container = container;
    this.start = 0;
    this.end = this.arr.length-1
    this.image = document.createElement("img");
    this.bar = null;
    this.interval = null;
    this.curTimeBar = 0;
    this.isMouseDown = false;
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
      this.bar = progressBar(this.input.value * 1000, progressBarItem)
      return {done: false, value: this.container.appendChild(this.image)}

    } else {
      this.button.disabled = false;
      progressBarItem.innerHTML = "";
      return {done: true, value: undefined}
    }
  }
  click(){
    this.button.addEventListener("click", () => {
      this.button.disabled = true;
      this.bar = progressBar(this.input.value * 1000, progressBarItem)
      this.image.src = this.arr[0];
      this.container.appendChild(this.image);
      this.start++;
      this.interval = setInterval(() => {
        if (this.curTimeBar !== 0) {
          this.curTimeBar = 0;
          clearInterval(this.interval)
          this.interval = setInterval(() => {
            this.next();
          }, this.time = this.input.value * 1000 - this.curTimeBar);
        }
        this.next();
      }, this.time = this.input.value * 1000 - this.curTimeBar);
    });
    this.image.addEventListener("mouseup", () => {
      if (this.isMouseDown === true) {
        clearInterval(this.interval);
        this.curTimeBar = this.bar.progressStop();
        this.isMouseDown = false;
      }
    })
    this.image.addEventListener("mousedown", () => {
      this.interval = setInterval(() => {
        if (this.curTimeBar !== 0) {
          this.curTimeBar = 0;
          clearInterval(this.interval)
          this.interval = setInterval(() => {
            this.next();
          }, this.time = this.input.value * 1000);
        }
        this.next();
      }, this.time = this.input.value * 1000 - this.curTimeBar);
      this.bar.progressStart();
      this.isMouseDown = true
    });
    
    this.image.addEventListener("mouseenter", () => {
      if (this.isMouseDown === false) {
        clearInterval(this.interval);
        this.curTimeBar = this.bar.progressStop();
      }
    })
    this.image.addEventListener("mouseleave", () => {
      if (this.isMouseDown === false) {
        this.interval = setInterval(() => {
          if (this.curTimeBar !== 0) {
            this.curTimeBar = 0;
            clearInterval(this.interval)
            this.interval = setInterval(() => {
              this.next();
            }, this.time = this.input.value * 1000);
          }
          this.next();
        }, this.time = this.input.value * 1000 - this.curTimeBar);
        this.bar.progressStart();
      }  
    });
  }
}
const slide1 = new Slider1(images, input, button, el)
slide1.click()
*/