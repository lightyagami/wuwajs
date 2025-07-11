"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthCardConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MonthCardContentById_1 = require("../../../../Core/Define/ConfigQuery/MonthCardContentById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class MonthCardConfig extends ConfigBase_1.ConfigBase {
  GetConfig(o) {
    var e = MonthCardContentById_1.configMonthCardContentById.GetConfig(o);
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 10, "获取物品配置错误", ["MonthCardConfig", o]);
    }
  }
}
exports.MonthCardConfig = MonthCardConfig;
//# sourceMappingURL=MonthCardConfig.js.map