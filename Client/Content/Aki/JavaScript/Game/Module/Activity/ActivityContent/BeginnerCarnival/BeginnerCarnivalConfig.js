"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BeginnerCarnivalConfig = void 0;
const NewbieCarnivalParamByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalParamByActivityId"),
  NewbieCarnivalRoleByRoleId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalRoleByRoleId"),
  NewbieCarnivalTaskByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskByTaskId"),
  NewbieCarnivalTaskByTaskType_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskByTaskType"),
  NewbieCarnivalTaskTypeById_1 = require("../../../../../Core/Define/ConfigQuery/NewbieCarnivalTaskTypeById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class BeginnerCarnivalConfig extends ConfigBase_1.ConfigBase {
  GetNewbieCarnivalTask(e) {
    return NewbieCarnivalTaskByTaskId_1.configNewbieCarnivalTaskByTaskId.GetConfig(e)
  }
  GetNewbieCarnivalTaskType(e) {
    return NewbieCarnivalTaskTypeById_1.configNewbieCarnivalTaskTypeById.GetConfig(e)
  }
  GetNewbieCarnivalParam(e) {
    return NewbieCarnivalParamByActivityId_1.configNewbieCarnivalParamByActivityId.GetConfig(e)
  }
  GetNewbieCarnivalRole(e) {
    return NewbieCarnivalRoleByRoleId_1.configNewbieCarnivalRoleByRoleId.GetConfig(e)
  }
  GetNewbieCarnivalTaskByTaskType(e) {
    return NewbieCarnivalTaskByTaskType_1.configNewbieCarnivalTaskByTaskType.GetConfigList(e)[0]
  }
}
exports.BeginnerCarnivalConfig = BeginnerCarnivalConfig;
//# sourceMappingURL=BeginnerCarnivalConfig.js.map