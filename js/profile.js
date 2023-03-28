var stop = false

function display(id) {
	$(".togg").hide();
	$("#" + id).html(`
        <p>Hello fuck you what the fuck are you doing
        Hello fuck you what the fuck are you doing
        Hello fuck you what the fuck are you doing</p>
    `);
	$("#" + id).toggle(1000);
}

function find_loc(id) {
	console.log(id)
}

function PostData() {
	data = {}
	if (stop) {
		return
	}
	setTimeout(1000, () => {
		stop = false
	})
	stop = true
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
					<th style="text-align: center;">Frequency</th>
					<th style="text-align: center;">Details</th>
					<th style="text-align: center;">Location</th>
				</tr>
			`);
			console.log(result);

			if (result.errno != undefined) {
				alert("Invalid User");
			} else {
				// location.href = "login.html"
				for (const car of result.host) {
					$(".car-tab").append(`
                        <tr>
                            <td>${car.car_no}</td>    
                            <td>${car.company + " " + car.model}</td>    
                            <td>${car.used_this_month}</td>
                            <td><button class="btn btn-primary round" onclick=display('${car.car_no}')>Show</button></td>    
                            <td><button class="btn btn-primary round" onclick=find_loc('${car.car_no}')>Track</button></td>    
                        </tr>
                        <tr>
                            <td colspan="6" class="togg" id="${car.car_no}">     
                            </td>
                        </tr>
                    `)
				}
				$(".car-book").empty();
				$(".car-book").append(`
					<tr>
						<th style="text-align: center;">Number</th>
						<th style="text-align: center;">From</th>
						<th style="text-align: center;">To</th>
						<th style="text-align: center;">Details</th>
						<th style="text-align: center;">Location</th>
					</tr>
				`);
				for (const car of result.car_booked) {
					$(".car-book").append(`
						<tr>
							<td>${car.car_no}</td>
							<td>${car.from_time + " / " + car.from_date}</td>
							<td>${car.to_time + " / " + car.to_date}</td>
							<td><button class="btn btn-primary round" onclick=display('${car.car_no}')>Show</button></td>    
							<td><button class="btn btn-primary round" onclick=find_loc('${car.car_no}')>Track</button></td>    
						</tr>
						<tr>
							<td colspan="5" class="togg" id="${car.car_no}">     
							</td>
						</tr>
					`)
				}
			}
		},
	});
	var email = localStorage.getItem('email')
	$.ajax({
		type: "POST",
		url: "http://127.0.0.1:3000/user/profile",
		contentType: "application/json",
		data: JSON.stringify({ email: email }),
		dataType: "json",
		success: function (result) {
			$("#picture").attr("src", result.picture)
		},
	})
}

function onLoad() {
	var user_data = localStorage.getItem("user_data");
	if (!user_data) {
		location.href = "login.html";
		return;
	}
	PostData();
}

function changeProfile() {
	$("#submit_pic").click(function () {
		var formData = new FormData()
		console.log($('#pro-pic')[0].files[0])
		formData.append('profile_picture', $('#pro-pic')[0].files[0])
		formData.append('email', localStorage.getItem('email'))
		console.log(formData)
		$.ajax({
			type: "POST",
			url: "http://127.0.0.1:3000/user/upload",
			contentType: false,
			processData: false,
			data: formData,
			success: function (result) {
				console.log(result)
				location.reload()
			},
		})
	})
}

$(document).ready(function () {
	onLoad();
	window.onload = onLoad();
	window.blur = onLoad();
	changeProfile()
});
