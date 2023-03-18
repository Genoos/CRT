// apply the discount
var promocode = "abc123"
var promostatus=""
var price=$("#price").text();
$("#button-addon2").click(function(){
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

