// environments
const process = {
    env: {
        NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL: "https://vehicle-website.api.leasingoptions.co.uk/",
        NEXT_PUBLIC_CDN: "https://imagecdn.leasingoptions.co.uk/"
    }
}

const fetchHeaders = {
    headers: {
        'LO-ORIGINAL-IP': '127.0.0.1',
        'LO-ORIGINAL-USERAGENT': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'LO-ORIGINAL-HOSTNAME': 'localhost:3000'
    }
}
const currencySymbol = "£";
const state = {
    is_displaied_model_makes: false,
    leasing_deal_type: 0,
};

// functions
const getImageURL = (image) => {
    return process.env.NEXT_PUBLIC_CDN + image
}

const formatMoney = (money) => {
    return currencySymbol + money
}