//GET cars
// RadiusCars = [
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: "Maruti Suzuki Swift",
//     seater_type: 2,
//     price_per_hour: 200,
//     km: 100,
//     car_age: 2,
//     car_type: "SUV",
//     age: 2,
//     transmision: "Manual",
//   },
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: "Maruti Suzuki Swift",
//     seater_type: 2,
//     price_per_hour: 300,
//     km: 200,
//     car_age: 2,
//     car_type: "SUV",
//     age: 4,
//     transmision: "Manual",
//   },
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: "Maruti Suzuki Swift",
//     seater_type: 4,
//     price_per_hour: 400,
//     km: 400,
//     car_age: 6,
//     car_type: "Sedan",
//     age: 2,
//     transmision: "Manual",
//   },
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: "Maruti Suzuki Swift",
//     seater_type: 4,
//     price_per_hour: 450,
//     km: 100,
//     car_age: 12,
//     car_type: "Sedan",
//     age: 2,
//     transmision: "Automatic",
//   },
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: "japanese Suzuki Swift",
//     seater_type: 6,
//     price_per_hour: 600,
//     km: 1000,
//     car_age: 21,
//     car_type: "HatchBack",
//     age: 2,
//     transmision: "Manual",
//   },
//   {
//     id: 1,
//     car_no: "MH 12 1234",
//     car_name: " Suzuki Swift",
//     seater_type: 6,
//     price_per_hour: 600,
//     km: 1000,
//     car_age: 21,
//     car_type: "HatchBack",
//     age: 2,
//     transmision: "Automatic",
//   },
// ];
RadiusCars = [];

var cartype = null;
var seat = null;
var age = null;
var km = null;
var HtL = false;
var LtH = false;
var cost = null;
var transmision = null;

//Seat filter
$(document).ready(function () {
  console.log("r");
  $("#2-seat").click(function () {
    if ($("#seaterdiv").data("checked") == 2) {
      $("#seaterdiv").data("checked", null);

      $("#2-seat").css("background-color", "white");
      seat = null;
    } else {
      $("#seaterdiv").data("checked", 2);
      $("#2-seat").css("background-color", "green");
      $("#6-seat").css("background-color", "white");
      $("#4-seat").css("background-color", "white");
    }
  });

  $("#4-seat").click(function () {
    if ($("#seaterdiv").data("checked") == 4) {
      $("#seaterdiv").data("checked", null);
      $("#4-seat").css("background-color", "white");
      seat = null;
    } else {
      $("#seaterdiv").data("checked", 4);
      $("#4-seat").css("background-color", "green");
      $("#2-seat").css("background-color", "white");
      $("#6-seat").css("background-color", "white");
    }
  });

  $("#6-seat").click(function () {
    if ($("#seaterdiv").data("checked") == 6) {
      $("#seaterdiv").data("checked", null);
      $("#6-seat").css("background-color", "white");
      seat = null;
    } else {
      $("#seaterdiv").data("checked", 6);
      $("#6-seat").css("background-color", "green");
      $("#2-seat").css("background-color", "white");
      $("#4-seat").css("background-color", "white");
    }
    console.log(6);
  });

  $(".seatfilter").click(function () {
    seat = $("#seaterdiv").data("checked");

    console.log("at seatfilter", seat);
    mainfilter();
  });
});

// Age,km,HtL,LtH filter
$(document).ready(function () {
  $("#age").click(function () {
    if ($("#4filtersdiv").data("age") == true) {
      $("#4filtersdiv").data("age", false);
      $("#age").css("background-color", "white");
      age = null;
    } else {
      $("#4filtersdiv").data("age", true);
      $("#age").css("background-color", "green");
      age = true;
      console.log("age set");
    }
  });
  $("#kms").click(function () {
    if ($("#4filtersdiv").data("km") == true) {
      $("#4filtersdiv").data("km", false);
      $("#kms").css("background-color", "white");
      km = false;
    } else {
      $("#4filtersdiv").data("km", true);
      $("#kms").css("background-color", "green");
      km = true;
      console.log("km set");
    }
  });
  $("#HtL").click(function () {
    console.log("test");
    console.log($("#4filtersdiv").data("priceHtL"));
    if ($("#4filtersdiv").data("priceHtL")) {
      console.log("back be white");
      $("#4filtersdiv").data("priceHtL", false);
      $("#HtL").css("background-color", "white");
      HtL = false;
    } else {
      $("#4filtersdiv").data("priceHtL", true);
      HtL = true;
      LtH = false;
      $("#4filtersdiv").data("priceLtH", false);
      $("#LtH").css("background-color", "white");
      $("#HtL").css("background-color", "green");
      console.log("priceHtL set");
    }
  });
  $("#LtH").click(function () {
    if ($("#4filtersdiv").data("priceLtH") == true) {
      $("#4filtersdiv").data("priceLtH", false);
      $("#LtH").css("background-color", "white");
      LtH = false;
    } else {
      $("#4filtersdiv").data("priceLtH", true);
      $("#LtH").css("background-color", "green");

      LtH = true;
      HtL = false;
      $("#4filtersdiv").data("priceHtL", false);
      $("#HtL").css("background-color", "white");
      console.log("priceLtH set");
    }
  });

  $("#4filtersdiv").click(function () {
    mainfilter();
  });
});

//Cost filter

$(document).ready(function () {
  $("#costinput").click(function () {
    $("#costdiv").data("cost", $("#costinput").val());
    cost = $("#costdiv").data("cost");

    mainfilter();
  });
});

// cartype filter
$(document).ready(function () {
  $("#SUV").click(function () {
    if ($("#cartypediv").data("cartype") == "SUV") {
      $("#cartypediv").data("cartype", null);
      $("#SUV").css("background-color", "white");
      mainfilter();
      cartype = null;
    } else {
      $("#cartypediv").data("cartype", "SUV");
      $("#SUV").css("background-color", "green");
      cartype = "SUV";
      mainfilter();
    }
  });

  $("#Sedan").click(function () {
    2;
    if ($("#cartypediv").data("cartype") == "Sedan") {
      $("#cartypediv").data("cartype", null);
      $("#Sedan").css("background-color", "white");
      mainfilter();
      cartype = null;
    } else {
      $("#cartypediv").data("cartype", "Sedan");
      $("#Sedan").css("background-color", "green");
      mainfilter();
      cartype = "Sedan";
    }

    console.log("sedan");
  });

  $("#HatchBack").click(function () {
    if ($("#cartypediv").data("cartype") == "HatchBack") {
      $("#cartypediv").data("cartype", null);
      $("#HatchBack").css("background-color", "white");
      mainfilter();
      cartype = null;
    } else {
      $("#cartypediv").data("cartype", "HatchBack");
      $("#HatchBack").css("background-color", "green");
      cartype = "HatchBack";
      mainfilter();
    }
    console.log("hatchback");
  });
});

// Transmision filter
$(document).ready(function () {
  $("#Manual").click(function () {
    if ($("#transmisiondiv").data("transmision") == "Manual") {
      $("#transmisiondiv").data("transmision", null);
      $("#Manual").css("background-color", "white");
      transmision = null;
    } else {
      $("#transmisiondiv").data("transmision", "Manual");
      transmision = "Manual";
      $("#Manual").css("background-color", "green");
    }
  });
  $("#Automatic").click(function () {
    if ($("#transmisiondiv").data("transmision") == "Automatic") {
      $("#transmisiondiv").data("transmision", null);
      $("#Automatic").css("background-color", "white");
      transmision = null;
    } else {
      $("#transmisiondiv").data("transmision", "Automatic");
      transmision = $("#transmisiondiv").data("transmision");
      $("#Automatic").css("background-color", "green");
    }
  });
});
$(document).ready(function () {
  $("#transmisiondiv").click(function () {
    mainfilter();
  });
});

// Combined filter
function mainfilter() {
  if (seat != null) {
    cars = RadiusCars.filter(function (car) {
      return car.seater_type == seat;
    });
  }

  if (age != null) {
    cars = cars.filter(function (car) {
      return car.age <= age;
    });
  }
  if (km != null) {
    cars = cars.filter(function (car) {
      return car.driven_distance <= km;
    });
  }
  if (cartype != null) {
    cars = cars.filter(function (car) {
      return car.car_type == cartype;
    });
  }
  if (transmision != null) {
    cars = cars.filter(function (car) {
      return car.transmision == transmision;
    });
  }
  if (HtL) {
    cars.sort(function (a, b) {
      return b.price_per_hour - a.price_per_hour;
    });
  } else if (LtH) {
    cars.sort(function (a, b) {
      return a.price_per_hour - b.price_per_hour;
    });
  }
  Rerender(cars);
}

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
      RadiusCars = result;

      if (result.errno != undefined) {
        alert("No cars avaliable");
      } else {
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

function Rerender(result) {
  $("#filteroptions").click(function () {
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
  });
}

$(document).ready(function () {
  loadCars(15);
  $("#sidecostinput").change(function () {
    mainfilter();
  });
});
