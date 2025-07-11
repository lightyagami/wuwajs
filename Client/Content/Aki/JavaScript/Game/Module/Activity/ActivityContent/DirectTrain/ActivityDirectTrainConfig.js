"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainConfig = undefined;
const DirectTrainActivityById_1 = require("../../../../../Core/Define/ConfigQuery/DirectTrainActivityById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityDirectTrainConfig extends ConfigBase_1.ConfigBase {
  GetDirectTrainActivityConfById(i) {
    return DirectTrainActivityById_1.configDirectTrainActivityById.GetConfig(i);
  }
}
exports.ActivityDirectTrainConfig = ActivityDirectTrainConfig;
//# sourceMappingURL=ActivityDirectTrainConfig.js.map