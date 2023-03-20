/**
 * 20.5937° N, 78.9629° E
 */


var index = 0

function getURL(latitude, longitude) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=20&output=embed`
}

function getCoords() {
    let car = "AP17X1729"
    /**
     * Ajax code here
     */
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:3000/car/location/${car}`,
        success: function (coords) {
            console.log(coords)
            $("#your-car").attr("src", getURL(coords.latitude, coords.longitude))
        }
    })
}

function simulateTravelling() {
    getCoords()
    setInterval(getCoords, 5000)
}

$(document).ready(function () {
    simulateTravelling()
})
