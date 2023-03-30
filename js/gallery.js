function view(car_no) {
    localStorage.setItem("car_no", car_no)
    location.href = "view.html"
}

function onLoad({ latitude, longitude, kms }) {
    /**
     * Ajax code here
     */
    let data = {
        latitude: latitude,
        longitude: longitude,
        kms: kms
    }
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:3000/car/nearby",
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (result) {
            if (result.errno != undefined) {
                alert("No cars avaliable")
            } else {
                console.log(result)
                $("#6-seater").empty()
                $("#4-seater").empty()
                $("#2-seater").empty()
                $("#cars-ava").text(result.length)
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
                    `)
                }
            }
        }
    })
}

function loadCars(value) {
    $('#display-km').text(value)
    navigator.geolocation
        .getCurrentPosition(function (data) {
            data.coords.kms = +value
            onLoad(data.coords)
        });
}

$(document).ready(function () {
    loadCars(5)
})
