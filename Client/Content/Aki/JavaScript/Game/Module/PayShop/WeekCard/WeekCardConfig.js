"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardConfig = undefined;
const WeekCardById_1 = require("../../../../Core/Define/ConfigQuery/WeekCardById");
const WeekCardByPayGiftId_1 = require("../../../../Core/Define/ConfigQuery/WeekCardByPayGiftId");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class WeekCardConfig extends ConfigBase_1.ConfigBase {
  GetConfig(e) {
    e = WeekCardById_1.configWeekCardById.GetConfig(e);
    if (e) {
      return e;
    }
  }
  GetWeekConfigByPayGiftId(e) {
    e = WeekCardByPayGiftId_1.configWeekCardByPayGiftId.GetConfig(e);
    if (e !== undefined) {
      return e;
    }
  }
}
exports.WeekCardConfig = WeekCardConfig;
//# sourceMappingURL=WeekCardConfig.js.map