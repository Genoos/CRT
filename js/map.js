/**
 * 20.5937° N, 78.9629° E
 */


// var index = 0, frame = 0

let prev = [0, 0]

function getURL(latitude, longitude) {
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=20&output=embed`
}

function getCoords() {
    let car = localStorage.getItem('track')
    /**
     * Ajax code here
     */
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:3000/car/location/${car}`,
        success: function (coords) {
            if (coords.errno != undefined) {
                alert('car no found')
                location.href = './home.html'
            } else {
                console.log(coords)
                if (coords.location[0] == prev[0] && coords.location[1] == prev[1]) {
                    return
                }
                prev = coords.location
                $("#your-car").attr("src", getURL(coords.location[0], coords.location[1]))
                // $("#frame-" + frame).attr("src", getURL(coords.latitude, coords.longitude))
                // index = 1 - index
            }
        }
    })
}

function simulateTravelling() {
    setInterval(getCoords, 5000)
}

$(document).ready(function () {
    // $(".frame").on('load', function () {
        // setTimeout(function () {
            // $(this).show()
            // frame = 1 - frame
            // $("#frame-" + frame).hide()
        // }, 1000)
    // })
    $('#plate_no').text(localStorage.getItem("track"))
    getCoords()
    simulateTravelling()
})
