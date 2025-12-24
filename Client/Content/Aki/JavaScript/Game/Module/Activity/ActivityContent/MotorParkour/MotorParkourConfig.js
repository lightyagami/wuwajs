"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourConfig = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MotorParkourByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourByActivityId");
const MotorParkourById_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourById");
const MotorParkourByInstId_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourByInstId");
const MotorParkourNPCById_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourNPCById");
const MotorParkourRankById_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourRankById");
const MotorParkourRecordById_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourRecordById");
const MotorParkourRewardById_1 = require("../../../../../Core/Define/ConfigQuery/MotorParkourRewardById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class MotorParkourConfig extends ConfigBase_1.ConfigBase {
  GetMotorParkourLevelByActivityId(r) {
    return MotorParkourByActivityId_1.configMotorParkourByActivityId.GetConfigList(r) ?? [];
  }
  GetMotorParkourLevelById(r) {
    return MotorParkourById_1.configMotorParkourById.GetConfig(r);
  }
  GetMotorParkourLevelByInstId(r) {
    return MotorParkourByInstId_1.configMotorParkourByInstId.GetConfig(r);
  }
  GetMotorParkourTaskById(r) {
    return MotorParkourRewardById_1.configMotorParkourRewardById.GetConfig(r);
  }
  GetMotorParkourRecordById(r) {
    var o = MotorParkourRecordById_1.configMotorParkourRecordById.GetConfig(r);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "摩托跑酷记录配置不存在", ["id", r]);
    }
  }
  GetMotorParkourNpcById(r) {
    var o = MotorParkourNPCById_1.configMotorParkourNPCById.GetConfig(r);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "摩托跑酷npc配置不存在", ["id", r]);
    }
  }
  GetMotorParkourRankById(r) {
    var o = MotorParkourRankById_1.configMotorParkourRankById.GetConfig(r);
    if (o) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "摩托跑酷排名配置不存在", ["id", r]);
    }
  }
}
exports.MotorParkourConfig = MotorParkourConfig;
//# sourceMappingURL=MotorParkourConfig.js.map