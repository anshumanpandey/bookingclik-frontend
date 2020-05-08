import { Moment } from "moment"
import { GRCGDSCode } from "../types"

type Params = {
  pickUpDate: Moment
  pickUpTime: Moment

  dropOffDate: Moment
  dropOffTime: Moment

  pickUpLocation: GRCGDSCode
  dropOffLocation: GRCGDSCode
}

export default (params: Params) => {

  return {
    "GRCGDS_VehAvailRateRQDeep": {
      "@xmlns": "http://www.opentravel.org/OTA/2003/05",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://www.opentravel.org/OTA/2003/05OTA_VehAvailRateRQ.xsd",
      "@TimeStamp": "2010-11-12T11:00:00",
      "@Target": "Test",
      "@Version": "1.002",
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
        "@Type": "",
        "VehRentalCore": {
          "@PickUpDateTime": params.pickUpDate.format(`YYYY-MM-DD`) + 'T' + params.pickUpTime.format(`HH:mm:ss`),
          "@ReturnDateTime": params.dropOffDate.format(`YYYY-MM-DD`) + 'T' + params.dropOffTime.format(`HH:mm:ss`),
          "PickUpLocation": { "@LocationCode": params.pickUpLocation.internalcode },
          "ReturnLocation": { "@LocationCode": params.dropOffLocation.internalcode }
        },
        "DriverType": { "@Age": "30" },
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