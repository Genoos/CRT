RadiusCars = [];

var cartype = null;
var seat = null;
var age = null;
var km = null;
var HtL = false;
var LtH = false;
var cost = null;
var transmision = null;

function view(car_no) {
  localStorage.setItem("car_no", car_no);
  location.href = "view.html";
}

function onLoad({ latitude, longitude, kms }) {
  /**
   * Ajax code here
   */
  let data = {
    latitude: latitude,
    longitude: longitude,
    kms: kms,
  };
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/car/nearby",
    headers: {
      token: localStorage.getItem("token"),
    },
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (result) {
      card_cars = result;
      RadiusCars = result;

      if (result.errno != undefined) {
        alert("No cars avaliable");
      } else {
        setCardCars(result);
        console.log(result);
        $("#6-seater").empty();
        $("#4-seater").empty();
        $("#2-seater").empty();
        $("#cars-ava").text(result.length);
        for (const car of result) {
          $(`#${car.seater_type}-seater`).append(`
                      <div class="row m-1">
                          <div class="col-3">
                              <img src="${car.car_picture}" alt="picture of ${car.company} ${car.model}" class="w-100" />
                          </div>
                          <div class="col-9">
                              <div style="display: flex; justify-content: space-around">
                                  <div style="display: flex; flex-direction: column; justify-content: center; height: 260px">
                                      <span class="my-2" style="font-size: 20px">Car No: ${car.car_no}</span>
                                      <span class="my-2" style="font-size: 20px">Company: ${car.company}</span>
                                      <span class="my-2" style="font-size: 20px">Model: ${car.model}</span>
                                      <span class="my-2" style="font-size: 20px">Daily Price: ${car.price_per_day}</span>
                                  </div>
                                  <div style="display: flex; flex-direction: column; justify-content: center; height: 260px">
                                      <span class="my-2" style="font-size: 20px"><button onclick="view('${car.car_no}')" class="btn btn-primary">View</button></span>
                                      <span class="my-2" style="font-size: 20px">Hourly Price: ${car.price_per_hour}</span>
                                      <span class="my-2" style="font-size: 20px">Manifactured in: ${car.manifactured_year}</span>
                                      <span class="my-2" style="font-size: 20px">Distance Driven: ${car.driven_distance}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  `);
        }
      }
    },
  });
}

function loadCars(value) {
  var email = localStorage.getItem("email");
  console.log(email);
  if (email == undefined) {
    location.href = "login.html";
  }
  $("#display-km").text(value);
  navigator.geolocation.getCurrentPosition(function (data) {
    data.coords.kms = +value;
    onLoad(data.coords);
  });
}

let filter_attributes = new Map();

let card_cars = [];
let display_cars = [];
let hour_cost = 300;

function setHourCost(value) {
  hour_cost = +value;
  $(".hour-cost").text(hour_cost);
  rearrangeArray();
}

function rearrangeArray() {
  let filters = [];
  asc = false;
  des = false;
  ageflag = false;
  kmsflag = false;
  pricearray = [];
  for (const [key, val] of filter_attributes.entries()) {
    console.log(key, val);
    if (key == "topfilters") {
      if (val == "HtL") {
        asc = true;
      } else if (val == "LtH") {
        des = true;
      } else if (val == "age") {
        ageflag = true;
      } else if (val == "kms") {
        kmsflag = true;
      }
    } else {
      filters.push([key, val]);
    }
  }
  display_cars = [];
  for (const car of card_cars) {
    let flag = true;

    for (const i of filters) {
      if (car[i[0]] != i[1]) {
        flag = false;
        break;
      }
    }
    if (flag && car.price_per_hour <= hour_cost) display_cars.push(car);
  }
  if (asc) {
    display_cars.sort((b, a) => a.price_per_hour - b.price_per_hour);
  } else if (des) {
    display_cars.sort((b, a) => b.price_per_hour - a.price_per_hour);
  } else if (ageflag) {
    display_cars.sort((a, b) => a.manifactured_year - b.manifactured_year);
  } else if (kmsflag) {
    display_cars.sort((a, b) => a.driven_distance - b.driven_distance);
  }
  for (const car of display_cars) {
    pricearray.push(car.price_per_hour);
  }
  console.log(pricearray);
  // console.log(display_cars.length);
  $("#cars-ava").text(display_cars.length);
  setCardCars(display_cars);
}

$(".fil-btn").click(function () {
  let id = $(this).attr("id");
  let name = $(this).attr("name");

  let [key, value] = [name, id];
  $(`.${key}`).css("color", "#666666");
  $(`.${key}`).css("background-color", "#FFFFFF");
  if (filter_attributes.has(key) && filter_attributes.get(key) == value) {
    filter_attributes.delete(key);
    $(this).css("color", "#666666");
    $(this).css("background-color", "white");
  } else {
    filter_attributes.set(key, value);
    $(this).css("color", "white");
    $(this).css("background-color", "green");
  }
  // console.log(filter_attributes);
  rearrangeArray();
});

function setCardCars(cars) {
  $(".card-cars").empty();
  for (const car of cars) {
    $(".card-cars").append(`
      <div class="col-3 py-5 mx-5">
        <div class="card" style="width: 22rem;">
          <img class="card-img-top" src="${car.car_picture}" alt="Card image cap" />
          <div class="card-body">
              <h5 class="card-title">Car No. ${car.car_no}</h5>
              <div class="d-flex">
                  <div class="col-12">
                    <div class="d-flex">
                      <p class="col-6">Company: </p>
                      <p class="col-6">${car.company} ${car.model}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Daily day: </p>
                      <p class="col-6">${car.price_per_day}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Hourly day: </p>
                      <p class="col-6">${car.price_per_hour}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Manifactured in: </p>
                      <p class="col-6">${car.manifactured_year}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Distance Driven: </p>
                      <p class="col-6">${car.driven_distance}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Transmission Type: </p>
                      <p class="col-6">${car.transmision}</p>
                    </div>
                    <div class="d-flex">
                      <p class="col-6">Seater Type: </p>
                      <p class="col-6">${car.seater_type}</p>
                    </div>
                  </div>
              </div>
              <button class="btn btn-primary">View Car</button>
          </div>
        </div>
      </div>
    `);
  }
}

$(document).ready(function () {
  loadCars(15);
});
