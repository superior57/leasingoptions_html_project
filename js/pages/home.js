

// displaying topvehicle data
getTopVehiclesAPI((res) => {
    const el_topvehicles = $('#topvehicles');
    const data = res.data;
    console.log(data[0]);
    data?.map((d, i) => {
        el_topvehicles.append(`
        <div class="col-sm-6 col-md-4 col-xl-3">
            <div class="card-shop wow animated fadeInUp delay-${i}">
            <div class="card-shop-header">
                <div class="">
                <a class="w-100 d-block text-decoration-none" href="#">
                    <img alt="${d.make} ${d.model} ${d.derivative}" class="izmo-image lazyloaded" src="${getImageURL(d.imageUrl)}">
                </a>
                </div>
                <div class="card-shop-title">
                <h4 class="mb-2">${d.make}</h4>
                <h5 class="mb-2">${d.model}</h5>
                <p class="brief">${d.derivative}</p>
                </div>
            </div>
            <div class="card-shop-body">
                <div class="d-flex align-items-end justify-content-between mb-3">
                <div class="w-100">
                    <ul>
                    <li><span>${d.personalDeal.term * 12}</span> Months Lease</li>
                    <li><span>${d.personalDeal.mileage}</span> Miles Per Annum</li>
                    <li><span>${formatMoney(d.personalDeal.initialRental)}</span> Initial Rental</li>
                    </ul>
                </div>
                <div class="price">
                    <p>${formatMoney(d.personalDeal.monthlyPrice)}</p><small>Per Month Inc. VAT</small>
                </div>
                </div>
                <a class="w-100 text-decoration-none btn btn-primary btn-lg btn-block" href="#">
                View This Deal</a>
            </div>
            </div>
        </div>
        `);
    });
});
