"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightConfig = undefined;
const MotorFightActivityByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightActivityByActivityId");
const MotorFightAttrShowAll_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightAttrShowAll");
const MotorFightAttrShowById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightAttrShowById");
const MotorFightItemById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightItemById");
const MotorFightItemTypeById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightItemTypeById");
const MotorFightLevelTypeById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightLevelTypeById");
const MotorFightQualityById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightQualityById");
const MotorFightRankAll_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightRankAll");
const MotorFightRoleByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightRoleByActivityId");
const MotorFightRoleById_1 = require("../../../../../Core/Define/ConfigQuery/MotorFightRoleById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class MotorFightConfig extends ConfigBase_1.ConfigBase {
  GetMotorFightRoleList(t) {
    return MotorFightRoleByActivityId_1.configMotorFightRoleByActivityId.GetConfigList(t);
  }
  GetMotorFightQuality(t) {
    return MotorFightQualityById_1.configMotorFightQualityById.GetConfig(t);
  }
  GetMotorFightItemType(t) {
    return MotorFightItemTypeById_1.configMotorFightItemTypeById.GetConfig(t);
  }
  GetMotorFightActivityConfig(t) {
    return MotorFightActivityByActivityId_1.configMotorFightActivityByActivityId.GetConfig(t);
  }
  GetMotorFightLevelType(t) {
    return MotorFightLevelTypeById_1.configMotorFightLevelTypeById.GetConfig(t);
  }
  GetMotorFightAttrShow() {
    var t = [...MotorFightAttrShowAll_1.configMotorFightAttrShowAll.GetConfigList()];
    t.sort((t, o) => t.SortId - o.SortId);
    return t;
  }
  GetMotorFightAttrShowById(t) {
    return MotorFightAttrShowById_1.configMotorFightAttrShowById.GetConfig(t);
  }
  GetMotorFightRoleConfig(t) {
    return MotorFightRoleById_1.configMotorFightRoleById.GetConfig(t);
  }
  GetMotorFightItemConfig(t) {
    return MotorFightItemById_1.configMotorFightItemById.GetConfig(t);
  }
  GetMotorFightRobotRankList() {
    return MotorFightRankAll_1.configMotorFightRankAll.GetConfigList();
  }
}
exports.MotorFightConfig = MotorFightConfig;
//# sourceMappingURL=MotorFightConfig.js.map