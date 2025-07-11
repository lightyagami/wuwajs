"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityScratchTicketConfig = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const ScratchCardActivityReById_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardActivityReById");
const ScratchCardRewardReById_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRewardReById");
const ScratchCardRewardReByType_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRewardReByType");
const ScratchCardRoundReByRoundId_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardRoundReByRoundId");
const ScratchCardTimesReByTaskId_1 = require("../../../../../Core/Define/ConfigQuery/ScratchCardTimesReByTaskId");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityScratchTicketConfig extends ConfigBase_1.ConfigBase {
  GetScratchTicketConfig(r) {
    var e = ScratchCardActivityReById_1.configScratchCardActivityReById.GetConfig(r);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchCardActivityRe读表失败", ["activityId", r]);
    }
    return e;
  }
  GetScratchTicketRoundConfig(r) {
    var e = ScratchCardRoundReByRoundId_1.configScratchCardRoundReByRoundId.GetConfig(r);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRoundRe读表失败", ["id", r]);
    }
    return e;
  }
  GetScratchTicketRewardConfig(r) {
    var e = ScratchCardRewardReById_1.configScratchCardRewardReById.GetConfig(r);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRewardRe读表失败", ["id", r]);
    }
    return e;
  }
  GetScratchTicketRewardConfigList(r) {
    var e = ScratchCardRewardReByType_1.configScratchCardRewardReByType.GetConfigList(r);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchCardRewardRe读表失败", ["roundId", r]);
    }
    return e;
  }
  GetScratchTicketConditionConfig(r) {
    var e = ScratchCardTimesReByTaskId_1.configScratchCardTimesReByTaskId.GetConfig(r);
    if (e === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScratchTicket", 58, "ScratchCardTimesRe读表失败", ["id", r]);
    }
    return e;
  }
}
exports.ActivityScratchTicketConfig = ActivityScratchTicketConfig;
//# sourceMappingURL=ActivityScratchTicketConfig.js.map