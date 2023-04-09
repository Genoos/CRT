
function onLoad() {
    let data = localStorage.getItem('payment_status')
    console.log(data)
    $('#data').text(data)
}

$(document).ready(function () {
    onLoad()
})
