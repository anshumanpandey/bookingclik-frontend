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

  let filterBy = "";
  if (params.filters) {
    filterBy = params.filters.reduce((prev, next) => {
      prev = `${prev}${next.activeValues.reduce((p,n) => { p = `${p}${n.value}`; return p}, "")}`
      return prev
    }, "");

  }

  return {
    "GRCGDS_VehAvailRateRQ": {
      "@xmlns": "http://www.opentravel.org/OTA/2003/05",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://www.opentravel.org/OTA/2003/05OTA_VehAvailRateRQ.xsd",
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
        "@Type": `${filterBy}`,
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