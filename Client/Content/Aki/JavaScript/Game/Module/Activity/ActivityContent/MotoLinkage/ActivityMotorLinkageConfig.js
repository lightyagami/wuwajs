"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMotorLinkageConfig = undefined;
const MotorLinkageIpAll_1 = require("../../../../../Core/Define/ConfigQuery/MotorLinkageIpAll");
const MotorLinkageIpById_1 = require("../../../../../Core/Define/ConfigQuery/MotorLinkageIpById");
const MotorLinkageQuestAll_1 = require("../../../../../Core/Define/ConfigQuery/MotorLinkageQuestAll");
const MotorLinkageQuestByIp_1 = require("../../../../../Core/Define/ConfigQuery/MotorLinkageQuestByIp");
const MotorLinkageQuestByQuestId_1 = require("../../../../../Core/Define/ConfigQuery/MotorLinkageQuestByQuestId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityMotorLinkageConfig extends ConfigBase_1.ConfigBase {
  GetIpConfig(e) {
    return MotorLinkageIpById_1.configMotorLinkageIpById.GetConfig(e);
  }
  GetIpConfigAll() {
    return MotorLinkageIpAll_1.configMotorLinkageIpAll.GetConfigList();
  }
  GetQuestConfig(e) {
    return MotorLinkageQuestByQuestId_1.configMotorLinkageQuestByQuestId.GetConfig(e);
  }
  GetQuestConfigListByIpId(e) {
    return MotorLinkageQuestByIp_1.configMotorLinkageQuestByIp.GetConfigList(e);
  }
  GetQuestConfigAll() {
    return MotorLinkageQuestAll_1.configMotorLinkageQuestAll.GetConfigList();
  }
}
exports.ActivityMotorLinkageConfig = ActivityMotorLinkageConfig;
//# sourceMappingURL=ActivityMotorLinkageConfig.js.map