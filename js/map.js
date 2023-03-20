/**
 * 20.5937° N, 78.9629° E
 */


var index = 0
var coords = {}

function getURL(latitude, longitude) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=20&output=embed`
}

function getCoords() {
    coords.latitude += 0.0001
    coords.longitude += 0.0001
    $("#your-car").attr("src", getURL(coords.latitude, coords.longitude))
    return
    $("#your-car-" + index).attr("src", getURL(coords.latitude, coords.longitude))
    index = 1 - index
    setTimeout(() => {
        $("#your-car-" + index).hide()
        index = 1 - index
        $("#your-car-" + index).show()
        index = 1 - index
    }, 4000)
}

function simulateTravelling() {
    coords.latitude = 17.4477228
    coords.longitude = 78.3757079
    setInterval(getCoords, 5000)
}

$(document).ready(function () {
    $("#your-car-0").attr("src", getURL(17.4477228, 78.3757079))
    simulateTravelling()
})
