const form = document.querySelector(".top-banner form");
const input = document.querySelector("div.container input");
const msg = document.querySelector(".container .msg");
const list = document.querySelector(".ajax-section .container .cities");

// localStorage.setItem("apiKey", EncryptStringAES("4d8fb5b93d4af21d66a2948710284366"));
// sessionStorage.setItem("apiKey", EncryptStringAES("4d8fb5b93d4af21d66a2948710284366"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
  form.reset();
});

const getWeatherDataFromApi = async () => {
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  //alert(apiKey);
  const cityName = input.value;
  const units = "metric";
  const lang = "tr";

  //httprequest url
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;

  try {
    const response = await fetch(url).then((response) => response.json());
    //const response = await axios(url);

    console.log(response);
    const { name, main, sys, weather } = response;
    console.log(name);
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;

    const cityNameSpanNodeList = list.querySelectorAll(".city span");
    //console.log(cityNameSpanNodeList);
    const cityNameSpanArray = [...cityNameSpanNodeList];

    if (cityNameSpanArray.length > 0) {
      const filteredArray = cityNameSpanArray.filter(
        (span) => span.innerText == name
      );
      //matching control
      if (filteredArray.length > 0) {
        msg.innerText = `You already know the weather for ${name}, Please search for another city 😉`;
        setTimeout(() => {
          msg.innerText = ``;
        }, 5000);
        return;
      }
      //else{}
    }
    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    createdLi.innerHTML = `
        <h2 class="city-name" data-name="${name}, ${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}
            <sup>°C</sup>
        </div>
        <figure>
            <img class="city-icon" src="${iconUrl}">
            <figcaption>${weather[0].description}</figcaption>
        </figure>`;

    //prepend vs. append == innerHTML +=
    list.prepend(createdLi);

    //Bad sample
    // document.querySelectorAll(".city-icon").forEach((img)=>{
    //     img.addEventListener("click", (e)=>{
    //         e.target.src = (e.target.src == iconUrl) ? iconUrlAWS : iconUrl;
    //     })
    // });

    //Capturing
    list.addEventListener("click", (e) => {
      if (e.target.className == "city-icon") {
        e.target.src = e.target.src == iconUrl ? iconUrlAWS : iconUrl;
      } else if (e.target.className == "city-temp") {
        alert(e.target.innerText);
      } else if (e.target.className == "city-name") {
        alert(e.target.innerText);
      }
    });

    //Bubbling
    // createdLi.addEventListener("click", (e)=>{
    //     alert(e.target.tagName + " element is clicked!!");
    //     window.location.href = "https://clarusway.com";
    // })
  } catch (error) {
    //Logging func.
    //sendErrorLogToApi(error, "getWeatherDataFromApi", "weatherJs");
    msg.innerText = `City not found!`;
    setTimeout(() => {
      msg.innerText = ``;
    }, 5000);
  }
};
