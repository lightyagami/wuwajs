"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BeginnerCarnivalConfig = undefined;
const NewbieCarnivalParamByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalParamByActivityId");
const NewbieCarnivalRoleByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalRoleByRoleId");
const NewbieCarnivalTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskByTaskId");
const NewbieCarnivalTaskByTaskType_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskByTaskType");
const NewbieCarnivalTaskTypeById_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskTypeById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BeginnerCarnivalConfig extends ConfigBase_1.ConfigBase {
  GetNewbieCarnivalTask(e) {
    return NewbieCarnivalTaskByTaskId_1.configNewbieCarnivalTaskByTaskId.GetConfig(e);
  }
  GetNewbieCarnivalTaskType(e) {
    return NewbieCarnivalTaskTypeById_1.configNewbieCarnivalTaskTypeById.GetConfig(e);
  }
  GetNewbieCarnivalParam(e) {
    return NewbieCarnivalParamByActivityId_1.configNewbieCarnivalParamByActivityId.GetConfig(e);
  }
  GetNewbieCarnivalRole(e) {
    return NewbieCarnivalRoleByRoleId_1.configNewbieCarnivalRoleByRoleId.GetConfig(e);
  }
  GetNewbieCarnivalTaskByTaskType(e) {
    return NewbieCarnivalTaskByTaskType_1.configNewbieCarnivalTaskByTaskType.GetConfigList(e)[0];
  }
}
exports.BeginnerCarnivalConfig = BeginnerCarnivalConfig;
//# sourceMappingURL=BeginnerCarnivalConfig.js.map