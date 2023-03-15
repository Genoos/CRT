
var cars = {
    "2-seater": [],
    "4-seater": [],
    "6-seater": []
}

function onLoad() {
    /**
     * Ajax code here
     */
    let arr = [
        {
            name: "car-2-1",
            link: "img/product-1.png",
            type: "2-seater",
            price: 100
        },
        {
            name: "car-2-2",
            link: "img/product-2.png",
            type: "2-seater",
            price: 120
        },
        {
            name: "car-2-3",
            link: "img/product-3.png",
            type: "2-seater",
            price: 140
        },
        {
            name: "car-2-4",
            link: "img/product-4.png",
            type: "2-seater",
            price: 150
        },
        {
            name: "car-2-5",
            link: "img/product-2.png",
            type: "2-seater",
            price: 120
        },
        {
            name: "car-4-1",
            link: "img/product-1.png",
            type: "4-seater",
            price: 103
        },
        {
            name: "car-4-2",
            link: "img/product-2.png",
            type: "4-seater",
            price: 123
        },
        {
            name: "car-4-3",
            link: "img/product-3.png",
            type: "4-seater",
            price: 143
        },
        {
            name: "car-4-4",
            link: "img/product-4.png",
            type: "4-seater",
            price: 153
        },
        {
            name: "car-4-5",
            link: "img/product-2.png",
            type: "4-seater",
            price: 123
        },
        {
            name: "car-6-1",
            link: "img/product-1.png",
            type: "6-seater",
            price: 105
        },
        {
            name: "car-6-2",
            link: "img/product-2.png",
            type: "6-seater",
            price: 125
        },
        {
            name: "car-6-3",
            link: "img/product-3.png",
            type: "6-seater",
            price: 145
        },
        {
            name: "car-6-4",
            link: "img/product-4.png",
            type: "6-seater",
            price: 155
        },
        {
            name: "car-6-5",
            link: "img/product-2.png",
            type: "6-seater",
            price: 125
        },
    ]
    cars = {
        "2-seater": [],
        "4-seater": [],
        "6-seater": []
    }
    for (const car of arr) {
        cars[car.type].push(car)
    }
    console.log(cars)
    // loadCarousel("2-seater")
    // loadCarousel("4-seater")
    // loadCarousel("6-seater")
}

function loadCarousel(id) {
    const element = document.getElementById(id)
    var html = ""
    for (const car of cars[id]) {
        var htl = `
        <div class="pb-5">
            <div class="product-item position-relative bg-light d-flex flex-column text-center">
                <img class="img-fluid mb-4 box-img" src="${car.link}" alt="" />
                <h6 class="text-uppercase">${car.name}</h6>
                <h5 class="text-primary mb-0">${car.price} rupees/hour</h5>
                <div class="btn-action d-flex justify-content-center">
                    <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-eye"></i></a>
                </div>
            </div>
        </div>
        `
        html += `
        <div class="pb-5">
        <div class="product-item position-relative bg-light d-flex flex-column text-center">
            <img class="img-fluid mb-4 box-img" src="img/product-1.png" alt="" />
            <h6 class="text-uppercase">Suzuki Swift</h6>
            <h5 class="text-primary mb-0">$199.00</h5>
            <div class="btn-action d-flex justify-content-center">
                <a class="btn btn-primary py-2 px-3" href=""><i class="bi bi-eye"></i></a>
            </div>
        </div>
    </div>
        `
        let div0 = document.createElement("div")
        div0.className = "pb-5"
        {
            let div1 = document.createElement("div")
            div1.className = "product-item position-relative bg-light d-flex flex-column text-center"
            {
                let img = document.createElement("img")
                img.className = "img-fluid mb-4 box-img"
                img.src = car.link
                div1.appendChild(img)
                let h6 = document.createElement("h6")
                h6.className = "text-uppercase"
                h6.innerText = car.name
                div1.appendChild(h6)
                let h5 = document.createElement("h5")
                h5.className = "text-primary mb-0"
                h5.innerText = car.price + " rupees/hour"
                div1.appendChild(h5)
                let div2 = document.createElement("div")
                div2.className = "btn-action d-flex justify-content-center"
                {
                    let a = document.createElement("a")
                    a.className = "btn btn-primary py-2 px-3"
                    div2.appendChild(a)
                    let i = document.createElement("i")
                    i.className = "bi bi-eye"
                    div2.appendChild(i)
                }
                div1.appendChild(div2)
            }
            div0.appendChild(div1)
        }
        console.log(div0)
        // element.appendChild(div0)
    }
    element.innerHTML = html
}

window.onload = onLoad