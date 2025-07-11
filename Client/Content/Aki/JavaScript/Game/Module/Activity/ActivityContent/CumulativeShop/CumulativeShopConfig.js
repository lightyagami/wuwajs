"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopConfig = undefined;
const ConsumptiveTaskById_1 = require("../../../../../Core/Define/ConfigQuery/ConsumptiveTaskById");
const ConsumptiveTaskTabById_1 = require("../../../../../Core/Define/ConfigQuery/ConsumptiveTaskTabById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class CumulativeShopConfig extends ConfigBase_1.ConfigBase {
  GetCumulativeShopTaskConfig(e) {
    return ConsumptiveTaskById_1.configConsumptiveTaskById.GetConfig(e);
  }
  GetCumulativeShopTaskTabConfig(e) {
    return ConsumptiveTaskTabById_1.configConsumptiveTaskTabById.GetConfig(e);
  }
}
exports.CumulativeShopConfig = CumulativeShopConfig;
//# sourceMappingURL=CumulativeShopConfig.js.map