export const getTopVehiclesAPI = async(callBack) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/advertisevehicles/gettopvehicles?leasingDealType=2&take=4', fetchHeaders)
    const data = await res.json()
    callBack(data);
}

export const GetModelsAPI = async(vehicleType, manufacturerUrl) =>{
    const res = await fetch(process.env.NEXT_PUBLIC_MICROSERVICE_VEHICLE_URL + 'api/vehiclesinfo/info/' + vehicleType + '/' + manufacturerUrl + '/shortmodels', fetchHeaders)
    const data = await res.json()
    return data;
}