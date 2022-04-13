const numbers = document.querySelectorAll(".screen span");
const [am, pm] = document.querySelectorAll(".screen em");
const main = document.querySelector("main");
const menus = document.querySelectorAll("nav span");

const setTime = (now) => {
  let hr = null;

  let hour = now.getHours();
  let min = now.getMinutes();
  let sec = now.getSeconds();

  if (hour > 12) {
    hr = hour - 12;
    pm.classList.add("on");
    am.classList.remove("on");
  } else {
    hr = hour;
    pm.classList.remove("on");
    am.classList.add("on");
  }
  return [hr, min, sec];
};

const getTime = (time, index) => {
  if (time < 10) time = "0" + time;
  numbers[index].innerText = time;
};

setInterval(() => {
  let now = new Date();
  let hr = now.getHours();

  const data = [
    { condition: hr >= 5 && hr < 11, name: "morning" },
    { condition: hr >= 11 && hr < 16, name: "afternoon" },
    { condition: hr >= 16 && hr < 19, name: "evening" },
    { condition: hr >= 19 || hr < 5, name: "night" },
  ];

  data.map(({ condition, name }, index) => {
    if (condition) {
      main.className = "";
      main.classList.add(name);

      menus.forEach((menu) => menu.classList.remove("on"));
      menus[index].classList.add("on");
    }
  });

  const times = setTime(now);

  times.forEach((time, index) => {
    getTime(time, index);
  });
}, 1000);
