const getTopVehiclesAPI = async(callBack) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettopvehicles?leasingDealType=2&take=4', fetchHeaders)
    const data = await res.json()
    callBack(data);
}