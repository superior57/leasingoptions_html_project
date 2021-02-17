import LeasingDealTypes from "../types/LeasingDealTypes.js";

export const GetDealTypeUrl = (leasingDealType, trailingPart) => {
    let result = "";

    if (leasingDealType == LeasingDealTypes.Business) {
        result = "/car-leasing" + (trailingPart ?? "") + "?leasingdeal=business";
    } else if (leasingDealType == LeasingDealTypes.Personal) {
        result = "/car-leasing" + (trailingPart ?? "");
    } else if (leasingDealType == LeasingDealTypes.Van) {
        result = "/van-leasing" + (trailingPart ?? "");
    }

    return result;
}