import { ServerRespond } from "./DataStreamer";

export interface Row {
  timestamp: Date;
  price_abc: number;
  price_def: number;
  ratio: number;
  upper_bound: number;
  lower_bound: number;
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const ABC = serverRespond[0];
    const DEF = serverRespond[1];
    const ABCask = ABC.top_ask.price;
    const ABCbid = ABC.top_bid.price;
    const DEFask = DEF.top_ask.price;
    const DEFbid = DEF.top_bid.price;
    const timestamp =
      ABC.timestamp > DEF.timestamp ? ABC.timestamp : DEF.timestamp;

    const priceABC = (ABCask + ABCbid) / 2;
    const priceDEF = (DEFask + DEFbid) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + 0.06;
    const lowerBound = 1 - 0.06;
    const trigger =
      ratio > upperBound || ratio < lowerBound ? ratio : undefined;

    return {
      price_abc: priceABC,
      price_def: priceDEF,
      ratio,
      timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert: trigger,

      // return an object with the following properties and values, changed from an array to an object
    };
  }
}
