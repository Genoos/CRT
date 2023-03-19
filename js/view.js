
$("#entercode").prop('disabled', true);
var price_per_hour = 100
var price_per_day = 1600
var price=$("#price").text();
$("#priceGenerator").click(function(){
    var start_date = new Date($("#start_date").val())
    var start_time = $("#start_time").val()
    var end_date = new Date($("#end_date").val())
    var end_time = $("#end_time").val()
    //combining into single object
    const start_data_time = new Date(`${start_date.toDateString()} ${start_time}`)
    const end_data_time = new Date(`${end_date.toDateString()} ${end_time}`)
    //difference in milliseconds
    let diffMs=start_data_time-end_data_time
    //convert the difference to hours
    let diffHours = Math.floor(diffMs/(1000*60*60))
    if(diffHours <= -1){
        diffHours = Math.abs(diffHours)
        const no_of_days = Math.floor(diffHours/24)
        const no_of_hours = diffHours%24
        const final_cost = (no_of_days * price_per_day) + (no_of_hours * price_per_hour)
        console.log(final_cost)
        $("#price").text("₹"+final_cost);
        price = "₹"+final_cost
        $("#entercode").prop('disabled', false);
    }
    else{
        $('#errorStatus').empty();
        $('#errorStatus').append('<small class="promo-invalid" style="color: rgb(199, 35, 35);">Invalid Date</small>')
    }
    
})

// apply the discount
var promocode = "abc123"
var promostatus=""
$("#button-addon2").click(function(){
    if($("#entercode").prop("disabled")&& $('#button-addon2').text()=='Apply'){
        return
    }

    if(promostatus==""){
        var enteredPromocode = $("#entercode").val()
        if(promocode == enteredPromocode){
            let actual_price =price;
            actual_price = actual_price.substring(1)
            actual_price = parseInt(actual_price)
            let discount_price = actual_price-Math.ceil((actual_price*50)/100)
            $("#price").text("₹"+discount_price)
            promostatus="applied"
            promocode=""
            //Change the button to remove promo
            $('#button-addon2').css({
                'background-color': 'rgb(199, 35, 35)',
            });
            $("#button-addon2").text("Remove")
            //promo status
            $('#promocodestatus').empty();
            $("#promocodestatus").append('<small class="promo-valid" style="color:#7AB730;">Promo Sucessfully Applied</small>')
            $("#entercode").prop('disabled', true);
        }
        else{
            $('#promocodestatus').empty();
            $("#promocodestatus").append('<small class="promo-invalid" style="color: rgb(199, 35, 35);">Promo invalid</small>')
        }

        
    }
    else{
        $("#entercode").prop('disabled', false);
        $("#entercode").val(null)
        $("#price").text(price);
        $('#button-addon2').css({
            'background-color': '#7AB730',
        });
        $("#button-addon2").text("Apply")
        promocode = "abc123"
        promostatus=""
        $('#promocodestatus').empty();
            $("#promocodestatus").append('<small class="promo-invalid" style="color: #7AB730;">Promo Removed</small>')
    }
})