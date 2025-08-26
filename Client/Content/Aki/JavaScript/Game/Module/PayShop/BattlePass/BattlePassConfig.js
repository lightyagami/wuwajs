"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const BattlePassById_1 = require("../../../../Core/Define/ConfigQuery/BattlePassById");
const BattlePassRewardByBattlePassId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassRewardByBattlePassId");
const BattlePassTaskByTaskId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassTaskByTaskId");
const BattlePassUnlockPopByBattlePassTypeId_1 = require("../../../../Core/Define/ConfigQuery/BattlePassUnlockPopByBattlePassTypeId");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class BattlePassConfig extends ConfigBase_1.ConfigBase {
  GetAllRewardData(e) {
    e = BattlePassRewardByBattlePassId_1.configBattlePassRewardByBattlePassId.GetConfigList(e);
    return Array.from(e);
  }
  GetBattlePassData(e) {
    var a = BattlePassById_1.configBattlePassById.GetConfig(e);
    if (a) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 10, "获取战令配置错误，BattlePass表格里没有这个id", ["battlePassId", e]);
    }
  }
  GetBattlePassTask(e) {
    var a = BattlePassTaskByTaskId_1.configBattlePassTaskByTaskId.GetConfig(e);
    if (a) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 10, "获取战令配置错误，BattlePassTask表格里没有这个id", ["taskId", e]);
    }
  }
  GetBattlePassUnlock(e) {
    var a = BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId.GetConfig(e);
    if (a) {
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 53, "获取战令配置错误，BattlePassTask表格里没有这个id", ["taskId", e]);
    }
  }
  GetBattlePassUnlockReward(e, a) {
    a.length = 0;
    var s = BattlePassUnlockPopByBattlePassTypeId_1.configBattlePassUnlockPopByBattlePassTypeId.GetConfig(e);
    if (s) {
      for (var [t, r] of s.UnlockReward) {
        t = [{
          IncId: 0,
          ItemId: t
        }, r];
        a.push(t);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 53, "BattlePassUnlockPop里没有该type", ["type", e]);
    }
  }
}
exports.BattlePassConfig = BattlePassConfig;
//# sourceMappingURL=BattlePassConfig.js.map