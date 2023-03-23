function display(id) {
  $(".togg").hide();
  $("#" + id).html(`
        <p>Hello fuck you what the fuck are you doing
        Hello fuck you what the fuck are you doing
        Hello fuck you what the fuck are you doing</p>
    `);
  $("#" + id).toggle(1000);
}

function PostData() {
  data = {};
  var user_data = localStorage.getItem("user_data");
  user_data = JSON.parse(user_data);
  data._id = user_data._id;
  /**
   * Ajax code here
   */
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/user/cars",
    contentType: "application/json",
    data: JSON.stringify(data),
    dataType: "json",
    success: function (result) {
      $(".car-tab").empty();
      $(".car-tab").append(`
        <tr>
            <th style="text-align: center;">Number</th>
            <th style="text-align: center;">Company</th>
            <th style="text-align: center;">Model</th>
            <th style="text-align: center;">Frequency</th>
            <th style="text-align: center;">Details</th>
        </tr>
      `);
      console.log(result);

      if (result.errno != undefined) {
        alert("Invalid User");
      } else {
        // location.href = "login.html"
        for (const car of result) {
          $(".car-tab").append(`
                        <tr>
                            <td>${car.car_no}</td>    
                            <td>${car.company}</td>    
                            <td>${car.model}</td>    
                            <td>${car.used_this_month}</td>
                            <td><button class="btn btn-primary round" onclick=display('${car.car_no}')>Show</button></td>    
                        </tr>
                        <tr>
                            <td colspan="5" class="togg" id="${car.car_no}">     
                            </td>
                        </tr>
                    `);
        }
      }
    },
  });
}

function onLoad() {
  var user_data = localStorage.getItem("user_data");
  if (!user_data) {
    location.href = "login.html";
    return;
  }
  PostData();
}

$(document).ready(function () {
  onLoad();
  window.onload = onLoad();
  window.blur = onLoad();
});
