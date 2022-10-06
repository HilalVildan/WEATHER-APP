let liste = [];
const text = document.querySelector(".text");
const ekran = document.querySelector(".row");

const getirCity = async (name) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=359505d2111f984f85000a01e255d68c&units=metric`
    );

    if (!response.ok) {
      throw new Error("Böyle bir sehir yok");
      
    }

    const data = await response.json();


    ekranaBastir(data);
    // console.log(data);
  } catch (error) {
    alert(error.message);
  }
};

document.querySelector(".btn").onclick = (event) => {
  let cityName = document.querySelector(".form-control").value;
  document.querySelector(".form-control").value = "";
  
  event.preventDefault();

  if (liste.includes(cityName)) {
    text.textContent =
      "You already know the weater for a city, please search for enother city";


    setTimeout(() => {
      text.textContent = "";
    }, 2000);
  } else {
    liste.push(cityName);
    getirCity(cityName);
  }
  console.log(liste);
};

//ekrana bastirma

ekranaBastir = (data) => {
  const { name, main, sys, weather } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  ekran.innerHTML += `<div class=" col-md-8 col-lg-6 col-xl-4 d-flex justify-content-center align-items-center g-5">

    <div class="card" style="color: #4B515D; border-radius: 35px;">
   
   <div class="card-body p-4">

            <div class=" div-1 d-flex">
              <h3 class="flex-grow-1" style="font-size: 2rem;" > ${name} <sup class=" sup-box bg-warning  ">&nbsp;&nbsp;${
    sys.country
  }&nbsp;&nbsp;</sup> </h3>
            
            </div>

            <div class="d-flex flex-column text-center mt-4 mb-4">
              <p class="display-4 mb-0 font-weight-bold" style="color: #1C2331; font-size: 5rem;"> ${Math.ceil(
                main.temp
              )} <sup>°C</sup> </p>
            </div>

            <div class="d-flex align-items-center flex-column ">
<div>
                <img src=${iconUrl}
                  width="100px">
              </div>


              <div class="flex-grow-1" style="font-size: 1rem;">
                <h3 class="card-text mt-5 text-info fw-light">${weather[0].description.toUpperCase()}</h3>
              </div>
              
            </div>

          </div>
          </div>
          
          </div>`;
};
