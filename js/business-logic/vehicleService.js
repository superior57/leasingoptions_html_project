import {} from "./../API/VehicleAPI.js";
import CollectionsHelper from "./../helpers/collectionsHelper.js";

export const GetStaticMakes = (vehicleType) =>{
    return CollectionsHelper.makes().filter(x => x.vehicleType.includes(vehicleType)).map((item) => ({ id: item.id, text: item.text }));
}

export const GetStaticBudgets = () => {
    return CollectionsHelper.budgets();
}
