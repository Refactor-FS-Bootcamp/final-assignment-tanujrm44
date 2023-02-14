const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  weatherPart = wrapper.querySelector(".weather-part"),
  wIcon = weatherPart.querySelector("img"),
  arrowBack = wrapper.querySelector("header i")

let api

inputField.addEventListener("keyup", e => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value)
  }
})

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    alert("Your browser not support geolocation api")
  }
})

function requestApi(city) {
  api = `http://api.weatherapi.com/v1/current.json?key=9b5b2dd03ec449f6bf453510231302&q=${city}`
  fetchData()
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords
  api = `http://api.weatherapi.com/v1/current.json?key=9b5b2dd03ec449f6bf453510231302&q=${latitude},${longitude}
  `
  fetchData()
}

function fetchData() {
  infoTxt.innerText = "Getting weather details..."
  //  infoTxt.innerText = error.message
  infoTxt.classList.add("pending")
  fetch(api)
    .then(res => res.json())
    .then(result => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Something went wrong"
      infoTxt.classList.replace("pending", "error")
    })
}

function onError(error) {
  infoTxt.classList.add("error")
}

function weatherDetails(info) {
  console.log(info)
  const city = info.location.name
  const country = info.location.country
  const { text, icon } = info.current.condition
  const { temp_c, feelslike_c, humidity } = info.current

  weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp_c)
  weatherPart.querySelector(".weather").innerText = text
  weatherPart.querySelector(".location span").innerText = `${city}, ${country}`
  weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feelslike_c)
  weatherPart.querySelector(".humidity span").innerText = `${humidity}%`
  wIcon.src = icon
  infoTxt.classList.remove("pending", "error")
  infoTxt.innerText = ""
  inputField.value = ""
  wrapper.classList.add("active")
}

arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active")
})
