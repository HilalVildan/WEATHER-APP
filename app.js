// 359505d2111f984f85000a01e255d68c

const liste = [];
const form = document.querySelector("form");
const text = document.querySelector(".text");
const input = document.querySelector(".input");
const city = document.querySelector(".city");
const buton = document.querySelector(".btn");
const idNumber = "359505d2111f984f85000a01e255d68c";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const spanList = city.querySelectorAll("div span");
  const spanListArray = Array.from(spanList).map((span) => span.innerText);
  // console.log(spanListArray);
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${idNumber}&units=metric`
    ).then((response) => response.json());

    if (spanListArray.includes(data.name)) {
      text.textContent = `You already know the weater for ${input.value}, pelease search for enother City!`;
      setTimeout(() => {
        text.textContent = "";
      }, 5000);
    } else {
      showScreen(data);
    }
  } catch (error) {
    text.textContent = "City not found !";
    setTimeout(() => {
      text.textContent = "";
    }, 5000);
  }

  form.reset();
});

const showScreen = (data) => {
  const { name, main, sys, weather } = data;
  console.log(name);
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  city.innerHTML += `
 
  <div class=" card border border-1" style="width: 19rem; height:22rem;">
  
  <div class="card-body">
     <h3 class="card-title mt-4 text-info"> <span>${name}</span>  <sup class='country text-white bg-warning'>${
    sys.country
  }</sup> </h3>
    <p class="card-text mt-2 display-1 mb-2 fw-bold ">${Math.ceil(
      main.temp
    )}<sup class='sup'>°C</sup></p>
    <img src=${iconUrl}> </img>
   <h3 class="card-text mt-4 text-info fw-light">${weather[0].description.toUpperCase()}</h3>
  </div>
</div>

    `;
};
