"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorDevelopConfig = undefined;
const MotorDevelopActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MotorDevelopActivityByActivityId");
const MotorDevelopTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/MotorDevelopTaskByTaskId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityMotorDevelopConfig extends ConfigBase_1.ConfigBase {
  GetActivityDataById(e) {
    return MotorDevelopActivityByActivityId_1.configMotorDevelopActivityByActivityId.GetConfig(e);
  }
  GetMotorDevelopTaskById(e) {
    return MotorDevelopTaskByTaskId_1.configMotorDevelopTaskByTaskId.GetConfig(e);
  }
}
exports.ActivityMotorDevelopConfig = ActivityMotorDevelopConfig;
//# sourceMappingURL=ActivityMotorDevelopConfig.js.map