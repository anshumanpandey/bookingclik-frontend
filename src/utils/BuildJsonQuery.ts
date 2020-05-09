import { Moment } from "moment"
import { GRCGDSCode } from "../types"
import { DinamicFilter } from "../widget/DynamicFilterState";

type Params = {
  pickUpDate: Moment
  pickUpTime: Moment

  dropOffDate: Moment
  dropOffTime: Moment

  pickUpLocation: GRCGDSCode
  dropOffLocation: GRCGDSCode

  filters?: DinamicFilter[]
}

export default (params: Params) => {

  let filtersToSend = [];

  if (params.filters) {
    const transmissionFilter = params.filters.find(f => f.category.propertyToWatch == 'transmission')
    if (!transmissionFilter){
      filtersToSend.push('*')
    } else {
      const keysToSend = transmissionFilter.activeValues.reduce((p,n) => {p = p+n.value; return p}, "")
      filtersToSend.push(keysToSend)
    }

    const carTypeFilter = params.filters.find(f => f.category.propertyToWatch == 'car_class')
    if (!carTypeFilter){
      filtersToSend.push('*')
    } else {
      const keysToSend = carTypeFilter.activeValues.reduce((p,n) => {p = p+n.value; return p}, "")
      filtersToSend.push(keysToSend)
    }
  }

  return {
    "GRCGDS_VehAvailRateRQ": {
      "POS": {
        "Source": {
          "RequestorID": {
            "@Type": process.env.REACT_APP_ACCOUNT_TYPE,
            "@ID": process.env.REACT_APP_ACCOUNT_ID,
          }
        }
      },
      "VehAvailRQCore": {
        "@Status": "Available",
        "Currency": { "@Code": "EUR" },
        "@Type": `${filtersToSend.join(';')}`,
        "VehRentalCore": {
          "@PickUpDate": params.pickUpDate.format(`YYYY-MM-DD`),
          "@PickUpTime": params.pickUpTime.format(`HH:mm:ss`),
          "@ReturnDate": params.dropOffDate.format(`YYYY-MM-DD`),
          "@ReturnTime": params.dropOffTime.format(`HH:mm:ss`),
          "PickUpLocation": { "@LocationCode": params.pickUpLocation.internalcode },
          "ReturnLocation": { "@LocationCode": params.dropOffLocation.internalcode }
        },
      },
      "VehAvailRQInfo": {
        "Customer": {
          "Primary": {
            "DriverType": {
              "@Age": "30"
            },
            "CitizenCountryName": {
              "@Code": "GB"
            }
          }
        },
        "TPA_Extensions": {
          "ConsumerIP": "192.168.102.14"
        }
      }
    }
  }

}